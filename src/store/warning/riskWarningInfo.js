import { getRiskAccidentInfo } from './../../servers/api.js'
const state = {
    warningInfoData: {}
}

const getters = {

}

const mutations = {
    saveWarningInfoData(state, payload) {
        state.warningInfoData = payload;
    }
}

const actions = {
    getRiskAccidentInfo({ state, commit, dispatch }, payload) {
        getRiskAccidentInfo(payload).then((res) => {
            if (res.all.status) {
                commit('saveWarningInfoData',res.info)
            } else {
                alert(JSON.stringify(res.all.info))
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}