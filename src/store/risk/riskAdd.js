import {getRiskBaseType,getRiskObjectType,postRiskAdd} from './../../servers/api'

const state = {
    AccidentPossibility:{},
    ExposedDegree:{},
    AccidentConsequence:{},
    RiskType:{},
    riskBaseType:[],
    riskObjectType:[],
    postRiskAdd:{
        "ListRiskAssess": [
            {
                "ListRiskAssessDetail":[],
                "ID":0,
                "RiskID":0,
                "RiskAgencyID":0,
                "RiskAssessTypeIDs":"string",
                "RiskAssessTypeNames":"string",
                "RiskAssessLv":0,
                "RiskAssessScore":0,
                "RiskAssessManID":0,
                "RiskAssessManName":"string",
                "RiskAssessManNameTel":"string",
                "RiskAssessDate":"2017-07-18T07:29:49.680Z",
                "RiskAssessStatus":0,
                "RiskAssessAuditIntro":"string",
                "RiskAssessAuditMan":0,
                "RiskAssessAuditManName":"string",
                "RiskAssessAuditDate":"2017-07-18T07:29:49.680Z"
            }
        ],
        "ID": 0,
        "RiskName": "",
        "RiskIntro": "string",
        "RiskLv": 0,
        "RiskScore": 0,
        "riskObjectTypeChoose":"",
        "riskObjectTypeChildChoose":"",
        "RiskObjectTypeID1": 1,
        "RiskObjectTypeID2": 0,
        "RiskArea1": "string",
        "RiskArea2": "string",
        "RiskArea3": "string",
        "RiskArea4": "string",
        "RiskArea5": "string",
        "RiskAddress": "string",
        "RiskLng": "string",
        "RiskLat": "string",
        "RiskDutyIDs": "string",
        "RiskRegulatoryIDs": "string",
        "RiskAddMan": 0,
        "RiskAddManName": "string",
        "RiskAddDate": "2017-07-18T07:43:02.272Z",
        "RiskStatus": 0,
        "RiskAuditIntro": "string",
        "RiskAuditMan": 0,
        "RiskAuditManName": "string",
        "RiskAuditDate": "2017-07-18T07:43:02.272Z"
    }
}

const actions = {
    saveData: function ({commit}) {
        commit("getUserInfo", subei_common.getUserInfo())
    },
    getRiskBaseType: ({commit,dispatch,getters,state}) => {

        getRiskBaseType().then((res)=>{

            const AccidentPossibility = res.filter(item=>item.BaseTypeNo == 'AccidentPossibility')
            const ExposedDegree = res.filter(item=>item.BaseTypeNo == 'ExposedDegree')
            const AccidentConsequence = res.filter(item=>item.BaseTypeNo == 'AccidentConsequence')
            const RiskType = res.filter(item=>item.BaseTypeNo == 'RiskType')

            commit('saveAccidentPossibility',AccidentPossibility);
            commit('saveExposedDegree',ExposedDegree);
            commit('saveAccidentConsequence',AccidentConsequence);
            commit('saveRiskType',RiskType);

        });

    },
    getRiskObjectType: ({commit,dispatch,getters,state})=>{
        getRiskObjectType().then((res)=>{
            commit('saveRiskObjectType',res);
        })
    },
    postRiskAdd({commit,state}){
        postRiskAdd(state.postRiskAdd).then((res)=>{
            console.log(res);
        })
    }
}
const getters = {}

const mutations = {
    saveData: (state, payload) => {
        state = {...state, ...payload}
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
    saveRiskObjectType: (state, payload) =>{
        state.riskObjectType = payload;
    },

    upRiskAdd: (state, payload) => {
        console.log(payload)
        state.postRiskAdd = {...state.postRiskAdd, ...payload}
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}