import {getRiskInfo} from './../../servers/api'

const state = {
    name:'riskInfo',
    riskInfo:{},
    evaluation:""
}

const actions = {
    getRiskInfo({commit,dispatch,getters,state},payload){
        getRiskInfo(payload).then((res)=>{
            commit('saveRiskInfo',res.info)
        });
    }
}
const getters = {

    evaluationInfo : state => {
        return state.riskInfo.ListRiskAssess.filter( res => res.ID == state.evaluation )
    }

}

const mutations = {
    saveRiskInfo(state,payload){
        state.riskInfo = payload;
    },
    saveGetRiskInfo(state, payload){
        state.riskList.push(...payload);
    },
    saveEvaluationInfoId(state, payload){
        state.evaluation = payload;
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}