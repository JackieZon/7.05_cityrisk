import { getRiskWarnInfo } from './../../servers/api.js'
const state = {
    warningInfo: {}
}

const actions = {
    getRiskWarnInfo({ commit, state, dispatch }, payload) {
        getRiskWarnInfo(payload).then((res) => {
            if (res.all.status) {
                commit('saveWarningInfo', res.info)
            }
        })
    }
}

const mutations = {
    saveWarningInfo(state, payload) {
        state.warningInfo = payload;
    }
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}
