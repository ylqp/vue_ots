
import home from '../../http/modules/home'

const state = {userFPSettings: []}
const getters = {}
const mutations = {
    setUserFPSettings (state, settings) {
        state.userFPSettings = settings
    }
}
const actions = {
    async getUserFPSettings ({ commit }) {
        
        const { data } = await home.getUserFPSettings()
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
