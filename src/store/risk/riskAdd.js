import {getRiskBaseType} from './../../servers/api'

const state = {
    riskBaseType:[]
}

const actions = {
    saveData: function ({commit}) {
        commit("getUserInfo", subei_common.getUserInfo())
    },
    getRiskBaseType: ({commit,dispatch,getters,state}) => {
        if(JSON.stringify(state.riskBaseType)=='[]'){
            getRiskBaseType().then((res)=>{
                commit('saveData',{riskBaseType:res});
            });
        }
    }
}
const getters = {}

const mutations = {
    saveData: (state, payload) => {
        state = {...state, ...payload}
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}