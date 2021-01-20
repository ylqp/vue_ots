<template>
  <div class="home" v-loading="loading">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
     -->
     <div class="title">在线考试与作业系统</div>
     <div class="content">
       <span class="iconfont icon-icon-test"></span>
       <el-button type="primary" @click="loginIn">登录</el-button>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    loginIn: function () {
      let oParams = {
          "needCheckCode":0,
          "name":'stu3',
          "pass":"e10adc3949ba59abbe56e057f20f883e",
          "checkCode":"",
          "roleType":2,//学生
          "tenant":"cate"
      }
      this.$http({
          url: '/api/auth/ots',
          // url: '/api/checkCode',
          method: 'post',
          params: oParams
      }).then((data) => {
          if(Boolean(data.data.succeeded) === true){
            // 跳转首页
            this.$router.push('/home')
          }
      })
    }
  },
  mounted: function () {
      this.$http({
          // url: '/api/auth/ots',
          url: '/api/checkCode',
          method: 'post',
      }).then((data) => {
        
      })
  }
}
</script>
<style scoped>
.title{
  width: 100%;
  height: 80px;
  background-color: white;
  color: #242834;
}
.content{
  color: aqua;
}
</style>
