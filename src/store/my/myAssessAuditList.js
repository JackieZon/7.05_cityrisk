import { getRiskAssess } from "./../../servers/api"

const state = {
    defaultEvaluationListData:{
        RiskID:0,
        RiskAssessStatus:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    evaluationList:[],
}

const mutations = {
    saveDefaultEvaluationListDatas(state,payload){ //改变状态
        state.defaultEvaluationListData = { ...state.defaultEvaluationListData, ...payload}
    },
    saveEvaluationLists(state, payload){//存储列表数据
        state.evaluationList = state.evaluationList.concat(payload);
        // console.log(state.evaluationList);
    },
    clearEvaluationLists(state, payload){//清空列表数据
        state.evaluationList = [];
    },
}

const actions = {
    getRiskAssessList({commit,state,dispatch,getters}){
        getRiskAssess(state.defaultEvaluationListData).then((res) => {
             commit('saveDefaultEvaluationListDatas',{total: res.all.total});
            commit('saveEvaluationLists',res.info);
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