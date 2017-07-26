import {getRiskInfo} from './../../servers/api'

const state = {
    name:'riskInfo',
    riskInfo:{},
}

const actions = {
    getRiskInfo({commit,dispatch,getters,state},payload){
        getRiskInfo(payload).then((res)=>{
            commit('saveRiskInfo',res)
        });
    }
}
const getters = {}

const mutations = {
    saveRiskInfo(state,payload){
        state.riskInfo = payload;
    },
    saveGetRiskInfo(state, payload){
        state.riskList.push(...payload);
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}