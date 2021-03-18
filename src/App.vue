<template>
  <div id="app">
    <!-- 登录页不展示菜单 -->
    <router-view  />
    <!-- <footer v-show="this.$route.name !== 'Login'">弘成教育科技有限公司</footer> -->
  </div>
</template>
<script>

// import HelloWorld from '@/components/HelloWorld.vue' 
export default {
  data () {
    return {
        winInnerHeight: window.innerHeight,
    }
  },
  computed: {
      mainHeight: function () {
          return (this.winInnerHeight - 61 - 40) + 'px'
      }
  },
  mounted () {
    console.log(this.$tools.getBrowser())
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
footer {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background-color: #222D44;
      text-align: center;
      color: #fff;
}
/* el 样式在子组件中不管用 */
.el-scrollbar .el-scrollbar__wrap{
    overflow-x: hidden !important;
    /* overflow: scroll;
    width: 110%;
    height: 120%; */
}
</style>
