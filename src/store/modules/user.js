
import home from '../../http/modules/home'

const state = {
    userFPSettings: JSON.parse(window.localStorage.getItem('userFPSettings') || 'null')
}
const getters = {}
const mutations = {
    setUserFPSettings (state, settings) {
        state.userFPSettings = settings
        
        // 数据持久化
        window.localStorage.setItem('userFPSettings', JSON.stringify(settings))
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
