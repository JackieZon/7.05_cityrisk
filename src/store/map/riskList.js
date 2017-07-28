import {getRisk} from './../../servers/api'

const state = {
    name:'riskList',
    riskList:[],
    defaultData:{
        RiskName: "",
        RiskStatus: -1,
        pageIndex: 1 ,
        pageSize: 10,
        total: 0,
    },
}

const actions = {
    awaitData({commit}) {
        commit('getUserInfo', subei_common.getUserInfo());
    },
    getRisk({commit,dispatch,getters,state}){

        console.log(JSON.stringify(state.defaultData));

        getRisk(state.defaultData).then((data)=>{
            
            console.log(data.info);
            commit('saveDefaultData',{total: data.all.total})
            commit('saveGetRiskList',data.info);

        });
    }
}
const getters = {

    pendingAudit: state => {
        return state.riskList.filter( res => res.RiskStatus == 1 || res.RiskStatus == 0 )
    },

    Audited: state => {
        return state.riskList.filter( res => res.RiskStatus == 2 || res.RiskStatus == 3 )
    }

}

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