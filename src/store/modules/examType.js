
import home from '../../http/modules/home'

const state = {examTypeList: []}
const getters = {
}
const mutations = {
    setExamTypeList (state, settings) {
        state.examTypeList = settings
    }
}
const actions = {
    async geExamTypeList ({  commit, rootState  }) {
        // console.log(rootState)
        // console.log(rootState.user.userFPSettings)
        if (rootState.user.userFPSettings && rootState.user.userFPSettings.uesrName){
            const { data } = await home.getExamType({userid: rootState.user.userFPSettings.uesrName})
            commit('setExamTypeList', data)
        } else {
            // 跳到登录页
            
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
