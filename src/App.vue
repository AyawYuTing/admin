<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: Helvetica, ‘Hiragino Sans GB’, ‘Microsoft Yahei’, ‘微软雅黑’,
    Arial, sans-serif;
  background: #ffffff;
}
#app {
  width: 100%;
  height: 100%;
}
a {
  color: #333333;
  text-decoration: none;
}
.title {
  color: #333333;
  width: 100%;
  font-size: 1rem;
  border-bottom: 1px solid #c3c6cf;
  padding: 20px 20px;
}
</style>

