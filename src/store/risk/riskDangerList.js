import { getRiskHidden, getRiskHiddenInfo } from './../../servers/api'

const state = {
    defaultDangerListData:{
        RiskID:1092,
        RiskHiddenStatus:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    dangerList:[],
    dangerInfo:{},
}

const mutations = {
    saveDefaultDangerListData(state,payload){
        state.defaultDangerListData = { ...state.defaultDangerListData, ...payload}
    },
    saveDangerList(state, payload){
        state.dangerList = state.dangerList.concat(payload);
        console.log(state.dangerList);
    },
    saveDangerInfo(state, payload){
        state.dangerInfo = payload;
    },
    clearDangerList(state, payload){
        state.dangerList = [];
    },
}

const actions = {
    getRiskHidden({commit,dispatch,getters,state}){
        getRiskHidden(state.defaultDangerListData).then((res)=>{
            console.log(res);
            commit('saveDefaultDangerListData',{total: res.all.total});
            commit('saveDangerList',res.info);
        });
    },
    getRiskHiddenInfo({commit,dispatch,getters,state},payload){
        console.log(payload.ID);
        getRiskHiddenInfo({ID:payload.ID }).then((res)=>{
            commit('saveDangerInfo',res.info);
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}