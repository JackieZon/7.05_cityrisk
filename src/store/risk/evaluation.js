import { getEvaluatioList, getRiskBaseType } from './../../servers/api'
const state = {

    evaluatioList: [],
    riskAssessData: {
        "ListRiskAssessDetail": [
            {

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
        "RiskID": 0,
        "RiskAgencyID": 0,
        "RiskAssessManID": 0,
        "RiskAssessManName": "string",
        "RiskAssessManNameTel": "string",
        "RiskAssessDate": "2017-07-21T02:05:45.015Z",
    },

    RiskType: {},
    AccidentConsequence: {},
    ExposedDegree: {},
    AccidentPossibility: {},
    riskTypeValue:''






    // //可能性
    // Possibility:[],

    // //频繁程度
    // frequentlyDegree:[],

    // //后果
    // consequence:[],

    // //风险类型
    // riskType:[]

}
const mutations = {

    saveEvaluatioList: (state, payload) => {
        state.evaluatioList = payload
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
    riskTypeValue:(state,payload) => {
        // alert(JSON.stringify(payload))
    }

}
const actions = {

    //获取评估列表
    getEvaluatioList: ({ commit, dispatch, getters, state }) => {
        getEvaluatioList({ userID: 4 }).then((res) => {
            const evaluatioList = res.filter(item => item.ID == 4)
            commit("saveEvaluatioList", evaluatioList[0].ListRiskAssess[0].ListRiskAssessDetail);
        })

    },

    //获取基础数据
    getRiskBaseType: ({ commit, dispatch, getters, state }) => {

        getRiskBaseType().then((res) => {
            // console.log(JSON.stringify(res));

            const AccidentPossibility = res.filter(item => item.BaseTypeNo == 'AccidentPossibility')
            const ExposedDegree = res.filter(item => item.BaseTypeNo == 'ExposedDegree')
            const AccidentConsequence = res.filter(item => item.BaseTypeNo == 'AccidentConsequence')
            const RiskType = res.filter(item => item.BaseTypeNo == 'RiskType')

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