import Vue from 'vue'
import App from './App.vue'
import OTSAPI from './http/api'
import request from './http/request'
import router from './router'
import store from './store'
import plugins from './plugins'
import $request from './http'
// import ElementUI from 'element-ui'


Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$request = $request
Vue.prototype.OTSAPI = OTSAPI
Vue.prototype.$eventBus = new Vue()
Vue.use(plugins)
// Vue.use(ElementUI)
// console.log(OTSAPI)
//基础样式
import './assets/style/reset.css'
import './assets/style/common.css'
// import './assets/style/icon/iconfont.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
