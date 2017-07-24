import {getRiskBaseType,getRiskObjectType,postRiskAdd} from './../../servers/api'

const state = {
    riskBaseType:[],
    riskObjectType:[],
    riskBaseType:{
        RiskAssessL:[],
        RiskAssessE:[],
        RiskAssessC:[],
        RiskAssessType:[]
    },
    postRiskAdd:{
        "ListRiskAssess": [
            {
            "ListRiskAssessDetail": [
                // {
                //     "ID": 0,
                //     "RiskID": 0,
                //     "RiskAssessID": 0,

                //     "RiskAssessTypeID": 0,      //** 评估类型ID /火灾ID */
                //     "RiskAssessTypeName": "",   //** 类型的名称 /火灾 */

                //     "RiskAssessLID": 0,         //**ID */
                //     "RiskAssessLName": "",      //**名称 */
                //     "RiskAssessLScore": 0,      //**分值 */

                //     "RiskAssessEID": 0,         //**ID */
                //     "RiskAssessEName": "",      //**名称 */
                //     "RiskAssessEScore": 0,      //**分值 */

                //     "RiskAssessCID": 0,         //**ID */
                //     "RiskAssessCName": "",      //**名称 */
                //     "RiskAssessCScore": 0,      //**分值 */

                //     "RiskAssessDetailLv": 0,    //** 4(可忽略)，3(低)，2(中等)，1(高)，0(极高) 风险等级 */
                //     "RiskAssessDetailScore": 0  //**分值 10000 */
                // }
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
            // {
            //     "ID":0,
            //     "RiskID":0,
            //     "RiskRegulatoryName":"我是监管机构的名称",
            //     "RiskRegulatoryContactMan":"我是监管机构的联系人",
            //     "RiskRegulatoryContactTel":"15070713710",
            //     "RiskRegulatoryArea1":"广东省",
            //     "RiskRegulatoryArea2":"深圳市",
            //     "RiskRegulatoryArea3":"福田区",
            //     "RiskRegulatoryArea4":"",
            //     "RiskRegulatoryArea5":"",
            //     "RiskRegulatoryAddress":"福田街道办",
            //     "RiskRegulatoryAddMan":"",
            //     "RiskRegulatoryAddDate":"2017-07-21T03:50:54.813Z"
            // }
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

            const RiskAssessL = res.filter(item=>item.BaseTypeNo == 'RiskAssessL')
            const RiskAssessE = res.filter(item=>item.BaseTypeNo == 'RiskAssessE')
            const RiskAssessC = res.filter(item=>item.BaseTypeNo == 'RiskAssessC')
            const RiskAssessType = res.filter(item=>item.BaseTypeNo == 'RiskAssessType')

            commit('saveRiskBaseType',{RiskAssessL: RiskAssessL[0].detail_BaseDataList, RiskAssessE:RiskAssessE[0].detail_BaseDataList, RiskAssessC:RiskAssessC[0].detail_BaseDataList, RiskAssessType:RiskAssessType[0].detail_BaseDataList});

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
    saveRiskObjectType: (state, payload) =>{
        state.riskObjectType = payload;
    },
    saveRiskBaseType: (state, payload)=>{
        console.log(payload);
        state.riskBaseType = {...state.riskBaseType, ...payload}
    },
    upRiskAdd: (state, payload) => {
        // console.log(payload)
        state.postRiskAdd = {...state.postRiskAdd, ...payload}
    },
    // 增加、编辑、删除、责任主体
    pushListRiskDuty: (state, payload)=>{
        state.postRiskAdd.ListRiskDuty.push(payload);
    },
    deleteListRiskDuty: (state, payload)=>{
        state.postRiskAdd.ListRiskDuty.splice(payload.index,1);
    },
    editListRiskDuty: (state, payload)=>{
        state.postRiskAdd.ListRiskDuty[payload.index] = payload.list;
    },

    // 增加、编辑、删除、监管机构
    pushListRegulatory: (state, payload)=>{
        state.postRiskAdd.ListRiskRegulatory.push(payload);
    },
    deleteListRegulatory: (state, payload)=>{
        state.postRiskAdd.ListRiskRegulatory.splice(payload.index,1);
    },
    editListRegulatory: (state, payload)=>{
        console.log(payload);
        state.postRiskAdd.ListRiskRegulatory[payload.index] = payload.list;
    },
    
    // 增加、编辑、删除、评估信息
    pushAssessDetail: (state, payload)=>{
        state.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail.push(payload);
    },
    deleteAssessDetail: (state, payload)=>{
        state.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail.splice(payload.index,1);
    },
    editAssessDetail: (state, payload)=>{
        console.log(payload);
        state.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail[payload.index] = payload.list;
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}