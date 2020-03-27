<template>
  <div id="sidebar">
    <el-container style="width:200px;">
      <el-aside id="elaside" width="200px" style="border-top:1px solid rgb(240, 243, 244)">
        <el-menu :default-openeds="['1', '1']">
          <router-link to="/home">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                首页
              </template>
            </el-submenu>
          </router-link>

          <router-link to="/driver">
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-flag"></i>
                引导指南
              </template>
            </el-submenu>
          </router-link>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-coin"></i>
              部分组件
            </template>
            <el-menu-item-group>
              <router-link to="/slide">
                <el-menu-item index="5-1">
                  <i class="el-icon-s-claim"></i>
                  滑动验证
                </el-menu-item>
              </router-link>

              <router-link to="/uploadpic">
                <el-menu-item index="5-2">
                  <i class="el-icon-upload"></i>
                  上传图片
                </el-menu-item>
              </router-link>

              <router-link to="/carousel">
                <el-menu-item index="5-3">
                  <i class="el-icon-lunbo iconfont"></i>
                  轮播
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-setting"></i>漫画管理
            </template>
            <el-menu-item-group>
              <router-link to="/nav1">
                <el-menu-item index="3-1">
                  <i class="el-icon-coffee"></i>全部漫画
                </el-menu-item>
              </router-link>

              <router-link to="/nav2">
                <el-menu-item index="3-2">
                  <i class="el-icon-cherry"></i>菜单2
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <router-link to="/categories">
            <el-submenu index="10">
              <template slot="title">
                <i class="el-icon-coin"></i>分类管理
              </template>
            </el-submenu>
          </router-link>
          <router-link to="/error">
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-s-release"></i>
                404
              </template>
            </el-submenu>
          </router-link>
        </el-menu>
      </el-aside>
    </el-container>

    <div class="wrap" id="sidebarwrap">
      <router-view :key="key"></router-view>
    </div>
  </div>
</template>



<script>
export default {
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },
  watch:{
    "$route":function(){
      console.log(this.$route)
    }
  }
};
</script>

<style scoped>
.el-container {
  box-sizing: border-box;
}
#sidebar {
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: -1px;
  margin-left: -1px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(240, 243, 244);
}
#elaside {
  transition: 1s;
}
/* 滚动条 */
.el-aside::-webkit-scrollbar {
  width: 5px;
  height: 20px;
  background-color: rgb(95, 100, 119);
}
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.el-header {
  color: #fff;
  line-height: 60px;
}
.el-container {
  height: 100%;
}
.el-aside {
  color: #fff;
  margin-left: 2px;
}
.el-menu {
  height: 100%;
  background: #FFFFFF;
  color: #333333;
}
.el-menu .el-submenu {
  background: #FFFFFF;
}
.el-menu-item-group {
  background: #FFFFFF;
}
.el-submenu__title {
  color: #333333 !important;
}

/* 图标颜色 */
.el-submenu__title i {
  color: #d9d9d9;
}
/* 二级菜单 */
.el-menu-item {
  color: #333333;
}

/* view */
.wrap {
  position: absolute;
  left: 200px;
  right: 0;
  top: 100px;
  bottom: 0;
  margin: auto;
  background: #ffffff;
  width: calc(100% - 300px);
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  overflow-y: scroll;
  transition: 1s;
}

.wrap::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.wrap::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.wrap::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>