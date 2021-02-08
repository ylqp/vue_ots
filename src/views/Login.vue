<template>
  <div class="home">
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
import { getCheckCode, login } from '@/service/user'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      loginParams: {
        needCheckCode: 0,
        name: 'stu3',
        pass: 'e10adc3949ba59abbe56e057f20f883e',
        checkCode: '',
        roleType: 2,
        tenant: 'cate'
      }
    }
  },
  methods: {
    async loginIn () {
      const { data } = await login(this.loginParams)
      console.log(data)
    }
  },
  mounted: function () {
      getCheckCode()
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
