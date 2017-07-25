import { getEvaluatioList, getRiskBaseType, postRiskAssessAdd } from './../../servers/api'
const state = {

    evaluatioList: [],

    riskAssessData: {
        "ListRiskAssessDetail": [
            {
                "ID": 0,
                "RiskID": 0,
                "RiskAssessID": 0,
                "RiskAssessTypeID": 0,
                "RiskAssessTypeName": "string",
                "RiskAssessLID": 0,
                "RiskAssessLName": "string",
                "RiskAssessLScore": 0,
                "RiskAssessEID": 0,
                "RiskAssessEName": "string",
                "RiskAssessEScore": 0,
                "RiskAssessCID": 0,
                "RiskAssessCName": "string",
                "RiskAssessCScore": 0,
                "RiskAssessDetailLv": 0,
                "RiskAssessDetailScore": 0
            }
        ],
        "ID": 0,
        "RiskID": 0,
        "RiskAgencyID": 0,
        "RiskAssessIntro": "string",
        "RiskAssessTypeIDs": "string",
        "RiskAssessTypeNames": "string",
        "RiskAssessLv": 0,
        "RiskAssessScore": 0,
        "RiskAssessMan": 0,
        "RiskAssessManName": "string",
        "RiskAssessManTel": "string",
        "RiskAssessDate": "2017-07-25T07:17:03.982Z",
        "RiskAssessStatus": 0,
        "RiskAssessAuditIntro": "string",
        "RiskAssessAuditMan": 0,
        "RiskAssessAuditManName": "string",
        "RiskAssessAuditDate": "2017-07-25T07:17:03.982Z"
    },

    RiskType: {},
    AccidentConsequence: {},
    ExposedDegree: {},
    AccidentPossibility: {},
    riskTypeValue: ''





}
const mutations = {

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
    }

}
const actions = {

    //获取基础数据
    getRiskBaseType: ({ commit, dispatch, getters, state }) => {

        getRiskBaseType().then((res) => {
            const AccidentPossibility = res.filter(item => item.BaseTypeNo == 'RiskAssessL')
            const ExposedDegree = res.filter(item => item.BaseTypeNo == 'RiskAssessE')
            const AccidentConsequence = res.filter(item => item.BaseTypeNo == 'RiskAssessC')
            const RiskType = res.filter(item => item.BaseTypeNo == 'RiskAssessType')

            commit('saveAccidentPossibility', AccidentPossibility);
            commit('saveExposedDegree', ExposedDegree);
            commit('saveAccidentConsequence', AccidentConsequence);
            commit('saveRiskType', RiskType);

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