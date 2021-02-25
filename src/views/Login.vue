<template>
  <el-container>
    <el-header>在线作业与考试系统</el-header>
    <el-main>
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="用户名" prop="userName">
            <el-input clearable v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input clearable type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode" v-if="loginParams.needCheckCode">
            <div class="checkCodeBox">
                <el-input clearable v-model="form.checkCode" class="checkCode"></el-input>
                <img :src= "checkCodeImg" @click="handleCheckCode"/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginIn"  @keyup.enter="loginIn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <el-footer>
      <ots-footer></ots-footer>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import OtsFooter from '@/components/footer.vue'
import { getCheckCode, login } from '@/http/modules/login.js'
import md5 from 'js-md5'
const loginStatus = {
    'needCheckCode' : '需要验证码',
    'checkCodeError' : '验证码错误',
    'noUserName' : '用户名不存在',
    'maxFailTime' : '半小时内错误次数超过5次',
    'passwordError' : '密码错误',
    'userDisenabled' : '用户停用',
    'userNorole' : '用户无权限',
    'orgDisenabled' : '组织机构已停用',
}
export default {
  name: 'Login',
  components: {
    OtsFooter
  },
  data () {
    return {
      checkCodeImg: '',
      loginParams: {
        roleType:2, // 学生
        needCheckCode:0,
        name: "",
        pass: "",
        checkCode: "",
        tenant: this.$route.query.tenant || 'cate'
      },
      form: {
        userName: '',
        password: '',
        checkCode: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async handleCheckCode () {
      this.loginParams.needCheckCode = 1
      await getCheckCode()
      // 刷新最新验证码
      this.checkCodeImg = '/api/checkCode?' + Math.random()
    },
    getLoginStatus (reason) {
        return loginStatus[reason] || '登录失败，请联系管理员'
    },
    handleFalse (reason) {
      let loginStatus = this.getLoginStatus(reason)
      if (reason === 'needCheckCode') {
          this.handleCheckCode()
      }
      this.$message.error(loginStatus)
    },
    async loginIn () {

      try {

        // 1. 表单验证
        await this.$refs.form.validate()
        // 2. 处理参数
        this.loginParams.name = this.form.userName
        this.loginParams.pass = md5(this.form.password)
        this.loginParams.checkCode =this.form.checkCode
        // 3. 调接口并处理结果
        const { data } = await login(this.loginParams)
        if (JSON.parse(data.succeeded)){ //JSON.parse("false")
          // 跳转首页
          this.$router.push('/')
        }else{
          // 处理错误
          this.handleFalse(data.reason)
        }

      } catch (error) {

        console.log('登录失败' + error)

      }

    }

  },
  created () {
    // 获取session
    getCheckCode()
  },
  mounted: function () {
    document.onkeydown = e => {
      // console.log(e)
      let _key = window.event.keyCode
      // let _key = e.keyCode
      if (_key === 13) {
        this.loginIn()
      }
    }
  }
}
</script>
<style scoped>
  .el-container {
    min-height: 100vh;
  }
  .el-header {
    background-color: #3388ff;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    height: 40px !important;
  }
  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-card {
    padding: 20px;
  }
  .checkCodeBox {
    display: flex;
    justify-content: space-between;
  }
  .checkCode {
    width: 100px;
  }
</style>
