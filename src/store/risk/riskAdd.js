import {getRiskBaseType,getRiskObjectType,postRiskAdd} from './../../servers/api'
import { addRiskDefault } from './../../utils/defaultData.js'
import Vue from 'vue'
import {store} from './../index'

const state = {
    // riskBaseType:[],
    riskObjectType:[],
    riskBaseType:{
        RiskAssessL:[],
        RiskAssessE:[],
        RiskAssessC:[],
        RiskAssessType:[],
        KnowLedgesType:[],
        RiskIntro:[],
    },
    postRiskAdd:{
        "ListRiskAssess": [
            {
                "ListRiskAssessDetail": [
                    // {
                    // 	"RiskAssessTypeID":19,
                    // 	"RiskAssessTypeName":"火灾",
                    // 	"RiskAssessLID":1,
                    // 	"RiskAssessLName":"完全可以预料",
                    // 	"RiskAssessLScore":10,
                    // 	"RiskAssessEID":7,
                    // 	"RiskAssessEName":"连续暴露",
                    // 	"RiskAssessEScore":10,
                    // 	"RiskAssessCID":13,
                    // 	"RiskAssessCName":"10人以上死亡",
                    // 	"RiskAssessCScore":100,
                    // 	"RiskAssessDetailLv":"0",
                    // 	"RiskAssessDetailScore":10000
                    // }
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

                    //     "RiskAssessDetailLv": 0,    //**风险等级 0(极高) ，1(高)，2(中等)，3(低), 4(可忽略)*/
                    //     "RiskAssessDetailScore": 0  //**分值 10000 */
                    // }
                ],
                "ID": 0,
                "RiskID": 0,
                "RiskAssessIntro":"",
                "RiskAssessIntroID":"",
                "RiskAssessRemark":"",
                "RiskAgencyID": 0,
                "RiskAssessTypeIDs": "",
                "RiskAssessTypeNames": "",
                "RiskAssessLv": 0,
                "RiskAssessScore": 0,
                "RiskAssessLvName":'',
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
        "RiskIntroID": "",
        "RiskLv": 0,
        "RiskScore": 0,

        "RiskTypeID":"",
        "RiskTypeName":"",
        
        "RiskObjectTypeID1": 0,
        "RiskObjectTypeID2": 0,
        "RiskAreaIDsArray":[],
        "RiskArea1": "",
        "RiskArea2": "",
        "RiskArea3": "",
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
    },
    cleanRiskAddData:{
        "ListRiskAssess": [
            {
            "ListRiskAssessDetail": [],
            "ID": 0,
            "RiskID": 0,
            "RiskAssessIntro":"",
            "RiskAgencyID": 0,
            "RiskAssessTypeIDs": "",
            "RiskAssessTypeNames": "",
            "RiskAssessLv": 0,
            "RiskAssessScore": 0,
            "RiskAssessLvName":'',
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
        "ListRiskRegulatory":[],
        "ListRiskDuty": [],
        "RiskObjectTypeIDsArray": [],
        "RiskStatusName": "",
        "RiskLvName": "",
        "ID": 0,
        "RiskName": "",
        "RiskIntro": "",
        "RiskLv": 0,
        "RiskScore": 0,
        "RiskObjectTypeID1": 0,
        "RiskObjectTypeID2": 0,
        "RiskAreaIDsArray":[],
        "RiskArea1": "",
        "RiskArea2": "",
        "RiskArea3": "",
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

        getRiskBaseType().then((data)=>{

            const RiskAssessL = data.info.filter(item=>item.BaseTypeNo == 'RiskAssessL')
            const RiskAssessE = data.info.filter(item=>item.BaseTypeNo == 'RiskAssessE')
            const RiskAssessC = data.info.filter(item=>item.BaseTypeNo == 'RiskAssessC')
            const RiskAssessType = data.info.filter(item=>item.BaseTypeNo == 'RiskAssessType')
            const KnowLedgesType = data.info.filter(item=>item.BaseTypeNo == 'KnowLedgesType')
            const RiskIntro = data.info.filter(item=>item.BaseTypeNo == 'RiskIntro')
            

            commit('saveRiskBaseType',{RiskAssessL: RiskAssessL[0].detail_BaseDataList, RiskAssessE:RiskAssessE[0].detail_BaseDataList, RiskAssessC:RiskAssessC[0].detail_BaseDataList, RiskAssessType:RiskAssessType[0].detail_BaseDataList, KnowLedgesType: KnowLedgesType[0].detail_BaseDataList, RiskIntro: RiskIntro[0].detail_BaseDataList});

        });

    },
    getRiskObjectType: ({commit,dispatch,getters,state})=>{
        getRiskObjectType().then((data)=>{
            commit('saveRiskObjectType',data.info);
        })
    },
    postRiskAdd({commit,state},payload){
        
        let $router = payload.$router;

        postRiskAdd(state.postRiskAdd).then((res)=>{
            
            store.commit('updateLoadingStatus', {isLoading: false})

            Vue.$vux.toast.show({
                text: (state.postRiskAdd.RiskStatus==0?'保存成功':'提交成功'),
                type: 'success',
                onHide(){
                    $router.replace({name:'auditList'});
                }
            });

            
        })
    }
}
const getters = {}

const mutations = {
    cleanPostRiskAdd: (state) =>{
        state.postRiskAdd = {...addRiskDefault};
    },

    saveData: (state, payload) => {
        state = {...state, ...payload}
    },
    saveRiskObjectType: (state, payload) =>{
        state.riskObjectType = payload;
    },
    saveRiskBaseType: (state, payload)=>{
        state.riskBaseType = {...state.riskBaseType, ...payload}
    },
    upRiskAdd: (state, payload) => {
        console.log(payload)
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
        state.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail[payload.index] = payload.list;
    },
	saveAssess: (state, payload)=>{
		state.postRiskAdd.ListRiskAssess[0] = { ...state.postRiskAdd.ListRiskAssess[0], ...payload};
    },
    upAssessData: (state, payload)=>{
        state.postRiskAdd.ListRiskAssess[0].RiskAssessLv = payload.RiskAssessLv;
        state.postRiskAdd.ListRiskAssess[0].RiskAssessScore = payload.RiskAssessScore;
        state.postRiskAdd.ListRiskAssess[0].RiskAssessLvName = payload.RiskAssessLvName;
    },
    
    // 用户编辑风险
    editRisk(state, payload){
        console.log(`用户编辑风险点`);
        state.postRiskAdd = payload;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}