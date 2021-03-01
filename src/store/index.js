import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import examType from './modules/examType'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    takePhotoInTest: 0
  },
  mutations: {
    setNeedPhoto (state, settings) {
      state.takePhotoInTest = settings
    }
  },
  actions: {
  },
  modules: {
    user,
    examType
  }
})
