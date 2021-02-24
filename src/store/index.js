import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import examType from './modules/examType'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    examType
  }
})
