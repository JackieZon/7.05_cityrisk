import {getRisk} from './../../servers/api'

const state = {
    name:'riskList',
    riskList:[],
    defaultData:{
        RiskName: "",
        page: 1 ,
        rows: 10,
    },
}

const actions = {
    awaitData({commit}) {
        commit('getUserInfo', subei_common.getUserInfo());
    },
    getRisk({commit,dispatch,getters,state}){
        console.log(JSON.stringify(state.defaultData));
        getRisk(state.defaultData).then((res)=>{
            console.log(res.length)
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
    },
    deleteRiskList(state, payload){
        state.riskList = [];
    },
    saveDefaultData(state, payload){
        state.defaultData = {...state.defaultData,...payload}
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}