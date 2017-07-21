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
            "ListRiskAssessDetail": [
                {
                "ID": 0,
                "RiskID": 0,
                "RiskAssessID": 0,
                "RiskAssessTypeID": 0,
                "RiskAssessTypeName": "",
                "RiskAssessLID": 0,
                "RiskAssessLName": "",
                "RiskAssessLScore": 0,
                "RiskAssessEID": 0,
                "RiskAssessEName": "",
                "RiskAssessEScore": 0,
                "RiskAssessCID": 0,
                "RiskAssessCName": "",
                "RiskAssessCScore": 0,
                "RiskAssessDetailLv": 0,
                "RiskAssessDetailScore": 0
                }
            ],
            "ID": 0,
            "RiskID": 0,
            "RiskAgencyID": 0,
            "RiskAssessTypeIDs": "",
            "RiskAssessTypeNames": "",
            "RiskAssessLv": 0,
            "RiskAssessScore": 0,
            "RiskAssessManID": 0,
            "RiskAssessManName": "",
            "RiskAssessManNameTel": "",
            "RiskAssessDate": "2017-07-21T02:40:24.200Z",
            "RiskAssessStatus": 0,
            "RiskAssessAuditIntro": "",
            "RiskAssessAuditMan": 0,
            "RiskAssessAuditManName": "",
            "RiskAssessAuditDate": "2017-07-21T02:40:24.200Z"
            }
        ],
        "ListRiskRegulatory":[
            {
                // "ID":0,
                // "RiskID":0,
                // "RiskRegulatoryName":"",
                // "RiskRegulatoryContactMan":"",
                // "RiskRegulatoryContactTel":"",
                // "RiskRegulatoryArea1":"",
                // "RiskRegulatoryArea2":"",
                // "RiskRegulatoryArea3":"",
                // "RiskRegulatoryArea4":"",
                // "RiskRegulatoryArea5":"",
                // "RiskRegulatoryAddress":"",
                // "RiskRegulatoryAddMan":"",
                // "RiskRegulatoryAddDate":"2017-07-21T03:50:54.813Z"
            }
        ],
        "ListRiskDuty": [
            // {
            // "ID": 0,
            // "RiskID": 0,
            // "RiskDutyName": "string",
            // "RiskDutyContactMan": "string",
            // "RiskDutyContactTel": "string",
            // "RiskDutyArea1": "string",
            // "RiskDutyArea2": "string",
            // "RiskDutyArea3": "string",
            // "RiskDutyArea4": "string",
            // "RiskDutyArea5": "string",
            // "RiskDutyAddress": "string",
            // "RiskDutyAddMan": "string",
            // "RiskDutyAddDate": "2017-07-21T02:40:24.201Z"
            // }
        ],
        "RiskObjectTypeIDsArray": [
            0
        ],
        "RiskStatusName": "",
        "RiskLvName": "",
        "ID": 0,
        "RiskName": "",
        "RiskIntro": "",
        "RiskLv": 0,
        "RiskScore": 0,
        "RiskObjectTypeID1": 0,
        "RiskObjectTypeID2": 0,
        "RiskArea1": "广东省",
        "RiskArea2": "深圳市",
        "RiskArea3": "南山区",
        "RiskArea4": "",
        "RiskArea5": "",
        "RiskAddress": "",
        "RiskLng": "",
        "RiskLat": "",
        "RiskDutyIDs": "",
        "RiskRegulatoryIDs": "",
        "RiskAddMan": 0,
        "RiskAddManName": "",
        "RiskAddDate": "2017-07-21T02:40:24.201Z",
        "RiskStatus": 0,
        "RiskAuditIntro": "",
        "RiskAuditMan": 0,
        "RiskAuditManName": "",
        "RiskAuditDate": "2017-07-21T02:40:24.201Z",
        "ObjectTypeName1": "",
        "ObjectTypeName2": ""
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
        // console.log(payload)
        state.postRiskAdd = {...state.postRiskAdd, ...payload}
    },
    pushListRiskDuty: (state, payload)=>{

        console.log(payload);

        state.postRiskAdd.ListRiskDuty.push(payload);

        console.log(state.postRiskAdd.ListRiskDuty);

    },
    deleteListRiskDuty: (state, payload)=>{
        state.postRiskAdd.ListRiskDuty.splice(payload.index,1);
    },
    editListRiskDuty: (state, payload)=>{
        
        console.log(payload);
        state.postRiskAdd.ListRiskDuty[payload.index] = payload.list;

    }
}

export default {
    state,
    actions,
    getters,
    mutations
}