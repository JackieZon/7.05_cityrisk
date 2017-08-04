import { getRiskWarn } from './../../servers/api'

const state = {
    warnList:[],
    
}

const actions = {
    getRiskWarn({commit,dispatch,getters,state},payload){
        getRiskWarn(payload).then((res)=>{
            commit('saveRiskInfo',res.info)
        });
    }
}
const getters = {}

const mutations = {
    saveWarnList(state,payload){
        state.warnList.push(payload);
    },
    clearWarnList(state,payload){
        state.warnList = [];
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}