import axios from 'axios'
import OTSAPI from '../../http/api.js'

const state = {userFPSettings: []}
const getters = {}
const mutations = {
    setUserFPSettings (state, settings) {
        state.userFPSettings = settings
    }
}
const actions = {
    async getUserFPSettings ({ commit }) {
        
        const { data } = await axios({
            method: 'GET',
            url: OTSAPI.UserFPSettings
        })
        commit('setUserFPSettings', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
