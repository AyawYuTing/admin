module.exports = {
	publicPath: './',                 //根路径
	devServer: {
		open: true,              //自动开启首页
		host: 'localhost',
		// port: '8080',            //端口号
		https: false,
		hotOnly: false,
		proxy: {
			'/api': {
				target: 'localhost:3000', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}


}