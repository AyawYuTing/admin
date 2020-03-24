import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import Qs from 'qs'
import Store from '../store';
import $Vm from '../main'
axios.defaults.withCredentials = false
axios.defaults.crossDomain = true
axios.defaults.baseURL = "http://127.0.0.1:3000";

let base = '';
export const postRequest = (url, params) => {
	console.log('postRequest--------------------',url,params);
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    }).catch(err => {
        console.log('http util post catch ', err);
        return Promise.reject(err);
    })
}
//测试
export const postRequestWithoutCatch = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    })
}
export const postFile = (url, formData) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 5000
    }).catch(err => {
        console.log('http util  postfile catch ', err);
        return Promise.reject(err);

    });
}

export const getRequest = (url, params) => {
	console.log('getRequest--------------------',url,params);
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        timeout: 5000
    }).catch(err => {
        console.log('http util getRequest catch ', err);
        return Promise.reject(err);
    });
}

//添加请求拦截器
axios.interceptors.request.use(config => {
    if (Store.getters.is_login_in) {
        //判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${Store.getters.user_data.token}`;
    }
    return config;
}, err => {
    Message.error({ message: '请求超时!' });
    return Promise.reject(err);
})
//添加响应拦截器
axios.interceptors.response.use(response => {
    console.log(response)
    let resqContentType = response.headers['content-type'];
    if (resqContentType.indexOf('json') == -1) {
        Message.error({ message: '服务器错误,不是JSON字符串' });
        return Promise.reject(new Error('服务器错误,不是JSON字符串'));;
    }
    if (response.status == 200) {
        //验证JSON
        let dataObj = '';
        function strIsJSON(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    console.log('error：' + str + '!!!' + e);
                    return false;
                }
            }
            return false;
        };
        let isJSON = false;
        try {
            dataObj = JSON.stringify(response.data);
            isJSON = strIsJSON(dataObj);
        } catch (err) {
            console.log('JSON ERR');
        }
        if (!isJSON) {
            Message.error({ message: '服务器错误,不是JSON字符串' });
            return Promise.reject(new Error('服务器错误,不是JSON字符串'));
        }
    }
    if (response.data.status == 0 || response.data.code=='0000') {
        return Promise.resolve(response.data.data);
    } else {
        if (response.data.msg.indexOf("重新登录") !== -1) {
            console.log("侦测登录无效")
            let timestamp = (new Date()).getTime();
            Store.commit("update_no_login_notice_time", timestamp)
            Store.commit('remove_user_data');
        }
        Message.error({ message: response.data.msg });
        return Promise.reject(new Error(response.data.msg));
    }
}, err => {
    console.log('httpUtil err', err);
    if (err.response === null || err.response === undefined) {
        Message.error({ message: '您的网络好像存在问题,连接超时' });
        return Promise.reject(new Error('您的网络好像存在问题,连接超时'));
    } else {
        if (err.response.status == 504 || err.response.status == 404) {
            Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
        } else if (err.response.status == 403) {
            Message.error({ message: '权限不足,请联系管理员!' });
        } else if (err.response.status == 401) {
        	
            var timestamp = (new Date()).getTime();
            //上次显示Message时间差
            let timeDis = timestamp - Store.getters.no_login_notice_time
            console.log('timeDis---------',timeDis);
//          if (timeDis > 300) {
			if (timeDis < 500) {
				return;
           }
            Store.commit('update_no_login_notice_time', timestamp);
            console.log('Store.getters.user_data---------',Store.getters.user_data);
        	if(Store.getters.user_data){
        		Store.commit('remove_user_data');
 				console.log('登录过期----------------------------------------------------',Store.getters);
 				if ($Vm.$route.matched.some(record => record.meta.roles == 'serve')) {
	                $Vm.$router.replace({ path: '/login', query: { to: "server" } });
	            } else if ($Vm.$route.matched.some(record => record.meta.roles == 'personal')) {
	                $Vm.$router.replace({ path: '/login', query: { to: "parsonal" } });
	            }else{
	            	Store.commit('update_loginOver', true);
	            }
        		return;
        	}
            Store.commit('remove_user_data');
            // 当登录无效状态的用户试图登录进入后台管理页时拦截回登录页
            if ($Vm.$route.matched.some(record => record.meta.roles == 'serve')) {
                $Vm.$router.replace({ path: '/login', query: { to: "server" } });
            } else if ($Vm.$route.matched.some(record => record.meta.roles == 'personal')) {
                $Vm.$router.replace({ path: '/login', query: { to: "parsonal" } });
            }
        } else {
            if (err.response.data.msg) {
                Message.error({ message: err.response.data.msg });
            } else {
                Message.error({ message: '未知错误!' });
            }
        }
    }
    return Promise.reject(err);
})
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postRequestWithoutCatch = postRequestWithoutCatch;
Vue.prototype.postFile = postFile;
export default axios
