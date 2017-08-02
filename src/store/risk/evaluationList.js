import { getRiskAssess } from "./../../servers/api"

const state = {
    defaultEvaluationListData:{
        RiskID:1092,
        RiskAssessStatus:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    evaluationList:[],
}

const mutations = {
    saveDefaultEvaluationListData(state,payload){ //改变状态
        state.defaultEvaluationListData = { ...state.defaultEvaluationListData, ...payload}
    },
    saveEvaluationList(state, payload){//存储列表数据
        state.evaluationList = state.evaluationList.concat(payload);
        // console.log(state.evaluationList);
    },
    clearEvaluationList(state, payload){//清空列表数据
        state.evaluationList = [];
    },
}

const actions = {
    getRiskAssess({commit,state,dispatch,getters}){
        getRiskAssess(state.defaultEvaluationListData).then((res) => {
             commit('saveDefaultEvaluationListData',{total: res.all.total});
            commit('saveEvaluationList',res.info);
            console.log(`我是数据${JSON.stringify(res.info)}`)
            // console.log(res)
        })
    }
}

const getters = {

}

export default {

    state,
    mutations,
    getters,
    actions

}