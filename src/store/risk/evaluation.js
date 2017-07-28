import { getRiskBaseType, postRiskAssessAdd, getRiskAssess } from './../../servers/api'
const state = {

    evaluatioList: [],
    riskAssessList: [],
    defaultData:{
        "RiskID": 0,
        // "RiskAssessStatus": 0,
        pageIndex: 1 ,
        pageSize: 10,
        total: 0,
    },
    riskAssessData: {
        "ListRiskAssessDetail": [
            // {
            //     "ID": 0,
            //     "RiskID": 0,
            //     "RiskAssessID": 0,
            //     "RiskAssessTypeID": 0,
            //     "RiskAssessTypeName": "string",
            //     "RiskAssessLID": 0,
            //     "RiskAssessLName": "string",
            //     "RiskAssessLScore": 0,
            //     "RiskAssessEID": 0,
            //     "RiskAssessEName": "string",
            //     "RiskAssessEScore": 0,
            //     "RiskAssessCID": 0,
            //     "RiskAssessCName": "string",
            //     "RiskAssessCScore": 0,
            //     "RiskAssessDetailLv": 0,
            //     "RiskAssessDetailScore": 0
            // }
        ],
        "ID": 0,
        "RiskID": 1022,
        "RiskAgencyID": 0,
        "RiskAssessIntro": "",
        "RiskAssessTypeIDs": "string",
        "RiskAssessTypeNames": "",
        "RiskAssessLv": 0,
        "RiskAssessScore": 0,
        "RiskAssessMan": 0,
        "RiskAssessManName": "Tomy",
        "RiskAssessManTel": "15920970565",
        "RiskAssessDate": "2017-07-25T07:17:03.982Z",
        "RiskAssessStatus": 0,
    },

    RiskType: {},
    AccidentConsequence: {},
    ExposedDegree: {},
    AccidentPossibility: {},
    riskTypeValue: '',
    openEvaluationList: false

}
const mutations = {

    saveID: (state, payload) => {
        state.riskAssessData.RiskID = payload;
        // state.riskAssessData.ListRiskAssessDetail.RiskID = payload;
    },

    saveEvaluatioList: (state, payload) => {
        state.evaluatioList.push(payload)
        window.sessionStorage.setItem("evaluatioList", payload)
    },
    saveAccidentPossibility: (state, payload) => {
        state.AccidentPossibility = payload;
    },
    saveExposedDegree: (state, payload) => {
        state.ExposedDegree = payload;
    },
    saveAccidentConsequence: (state, payload) => {
        state.AccidentConsequence = payload;
    },
    saveRiskType: (state, payload) => {
        state.RiskType = payload;
    },

    pushAssessDetails: (state, payload) => {
        state.riskAssessData.ListRiskAssessDetail.push(payload);
        state.riskAssessData.RiskAssessTypeNames += payload.RiskAssessTypeName + " "
    },

    deleteAssessDetails: (state, payload) => {
        state.riskAssessData.ListRiskAssessDetail.splice(payload.index, 1);
    },
    editAssessDetails: (state, payload) => {
        state.riskAssessData.ListRiskAssessDetail[payload.index] = payload.list;
    },
    saveAssesss: (state, payload) => {
        state.riskAssessData.RiskAssessIntro = payload.RiskAssessIntro;
    },
    saveDefaultData: (state, payload)=>{
        // console.log(payload);
        state.defaultData = {...state.defaultData, ...payload}
    },
    saveRiskAssessList(state, payload){

        if(payload.type==0){
            state.riskAssessList = [];
            state.riskAssessList = state.riskAssessList.concat(payload.res);
        }else if(payload.type==1){
            state.riskAssessList = state.riskAssessList.concat(payload.res);
        }
        
    },
    deleteRiskAssessList(){
        state.riskAssessList = [];
    },
}
const actions = {

    //获取基础数据
    getRiskBaseType: ({ commit, dispatch, getters, state }) => {

        getRiskBaseType().then((data) => {
            const AccidentPossibility = data.info.filter(item => item.BaseTypeNo == 'RiskAssessL')
            const ExposedDegree = data.info.filter(item => item.BaseTypeNo == 'RiskAssessE')
            const AccidentConsequence = data.info.filter(item => item.BaseTypeNo == 'RiskAssessC')
            const RiskType = data.info.filter(item => item.BaseTypeNo == 'RiskAssessType')

            commit('saveAccidentPossibility', AccidentPossibility);
            commit('saveExposedDegree', ExposedDegree);
            commit('saveAccidentConsequence', AccidentConsequence);
            commit('saveRiskType', RiskType);

        })
    },

    postRiskAdds({ commit, state }) {
        // console.log(JSON.stringify(state.riskAssessData))
        postRiskAssessAdd(state.riskAssessData).then((data) => {
            if(data.all.status){
                state.openEvaluationList = true
            }
            console.log(JSON.stringify(data))
        })
    },

    getRiskAssess({commit, state},payload){
        getRiskAssess(state.defaultData).then((data)=>{

            console.log(`我是评估列表${payload.type}`);
            console.log(JSON.stringify(data));
            
            commit('saveDefaultData',{total:data.all.total});
            commit('saveRiskAssessList',{res:data.info,type: payload.type,});
        })
    }


}

const getters = {

}

export default {

    state,
    mutations,
    actions,
    getters

}