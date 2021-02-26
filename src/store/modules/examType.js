
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
            // const { data } = await home.getExamType({userid: rootState.user.userFPSettings.uesrName})
            // 这个接口不传也可以  后台自己取
            const { data } = await home.getExamType()
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
