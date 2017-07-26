import {getRisk} from './../../servers/api'

const state = {
    name:'riskList',
    riskList:[],
    defaultData:{
        "RiskName": "",
    },
}

const actions = {
    awaitData({commit}) {
        commit('getUserInfo', subei_common.getUserInfo());
    },
    getRisk({commit,dispatch,getters,state}){
        getRisk(state.defaultData).then((res)=>{
            commit('saveGetRiskList',res);
        });
    }
}
const getters = {}

const mutations = {
    saveData(state, payload){
        state = {...state, ...payload}
    },
    saveGetRiskList(state, payload){
        state.riskList.push(...payload);
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}