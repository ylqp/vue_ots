import request from '../../http/request'
import OTSAPI from '../../http/api.js'

const state = {examTypeList: []}
const getters = {}
const mutations = {
    setExamTypeList (state, settings) {
        state.examTypeList = settings
    }
}
const actions = {
    async geExamTypeList ({ commit }) {
        
        const { data } = await request({
            method: 'GET',
            url: OTSAPI.QueryActivityTypeListByStudentIdAndCourseCode
        })
        commit('setExamTypeList', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
