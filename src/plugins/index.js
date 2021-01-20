//工具函数
import * as tools from '../common/js/tools'
//全局方法
import * as globalMethods from '../common/js/globalMethods'
//全局自定义指令
import directive from '../directive'
//全局过滤器
import filter from '../filters'
//mixin
import mixin from '../mixin'
//全局组件
import packages from '../package'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const install = Vue => {
  Vue.use(directive)
  Vue.use(filter)
  Vue.use(packages)
  Vue.use(ElementUI)
  Vue.mixin(mixin)
  Vue.prototype.$tools = tools
  Vue.prototype.$globalMethods = globalMethods
}

export default install
