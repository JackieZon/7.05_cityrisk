import {getRisk} from './../../servers/api'

const state = {
    name:'riskListMap',
    defaultData:{
        "RiskName": "",
    }
}

const actions = {
    awaitData({commit}) {
        commit("getUserInfo", subei_common.getUserInfo());
    },
    getRisk({commit,dispatch,getters,state}){
        getRisk(state.defaultData).then((res)=>{
            console.log(res);
        });
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