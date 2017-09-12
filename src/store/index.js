import Vue from 'vue'
import Vuex from 'vuex'
import regExp from './../utils/regExp'
import tiskAdd from './risk/riskAdd'
import riskList from './map/riskList'
import riskInfo from './map/riskInfo'
import evaluation from "./risk/evaluation"
import myAuditInfo from "./risk/myAuditInfo"
import myAuditList from "./risk/myAuditList"
import myAssessAuditList from "./my/myAssessAuditList"
import riskDangerList from './risk/riskDangerList'
import evaluationList from './risk/evaluationList'
import myAssessAuditInfo from './my/myAssessAuditInfo'
import warnAndAccident from './my/warnAndAccident'
import warningInfo from './warning/warningInfo'
import riskWarningInfo from './warning/riskWarningInfo'
import knowledgeBase from './knowledgeBase/knowledgeBase'
import {getArea, getAreaByAgencyId, postUploadPhoto, getRiskSelectAduitUser, getMemberInfo, editMemberInfo, postMemberAccount, postMemberAccountOff} from './../servers/api'
import {countAreas, areaByAgencyId} from './../utils/areas'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
    memberInfo:{},
    isLoading: false,
    areaData:[],
    areaByAgencyId:[],
    riskSelectAduitUser:[],
    toast:{
      toastState: false,
      toastValue: '我是123',
    },
    confirm:{
      state: false,
      msg:'我是提醒消息',
      control:()=>{}
    },
    public:{}
  },
  actions: {
    hideToast(context){
      setTimeout(()=>{
        context.commit('upToastMag',{
          toastState: false
        });
      },1500);
    },
    showToast({commit,dispatch},payload){
      
      console.log(payload);
      commit('upToastMag',payload);
      dispatch('hideToast');
      
    },
    getArea({commit,dispatch}){

      getArea().then((data)=>{

        console.log(data.info);
        
        const allAreas = countAreas(data.info);
        commit('saveArea',allAreas);
      });

    },
    getAreaByAgencyId({commit,dispatch}){
      getAreaByAgencyId().then((res)=>{
        let areaArr = [res.info[0].AgencyArea1,res.info[0].AgencyArea2,res.info[0].AgencyArea3,res.info[0].AgencyArea4];
        areaArr = areaArr.map((val)=>{
          return String(val);
        })
        const dataArea = areaByAgencyId(res.info);
        commit('saveAreaByAgencyId',dataArea);
        console.log('--------------------------------');
        commit('upRiskAdd',{RiskAreaIDsArray: areaArr});
      })
    },
    postMemberAccount({commit,dispatch},payload){
      postMemberAccount(payload).then((res)=>{
        console.log(`我是绑定后返回的数据${JSON.stringify(res)}`);
      });

    },
    postMemberAccountOff({commit,dispatch},payload){

      console.log(payload);
      
      let $router = payload.router;
      postMemberAccountOff().then((res)=>{
        $router.push({name: 'login'});
        // history.go(history.length * -1 + 1);
      })
    },
    getMemberInfo({commit,dispatch},payload){
      getMemberInfo(payload).then((res)=>{
        commit('saveMemberInfo',res.info);
      })

    },
    editMemberInfo: async ({commit,dispatch,getters,state},payload) => {
     return await editMemberInfo(state.memberInfo);
    },
    postUploadPhoto: async ({commit,dispatch,getters,state},payload) => {
      return await postUploadPhoto(payload);
    },
    publicFun({commit,dispatch,getters,state},payload){
      console.log(JSON.stringify(payload));
      commit(`savePublicFun`,payload);
    },
    getRiskSelectAduitUser({commit,dispatch,getters,state},payload){
      getRiskSelectAduitUser().then((res)=>{
        commit('saveRiskSelectAduitUser',res.info);
      })
    },
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    upToastMag(state, payload){
      state.toast = {...state.toast, ...payload }
    },
    openConfirm(state, payload){
      state.confirm = { ...state.confirm,...payload };
    },
    saveArea(state, payload){
      state.areaData = payload;
    },
    saveAreaByAgencyId(state, payload){
      state.areaByAgencyId = payload;
    },
    savePublicFun(state, payload){
      state.public = {...state.public, ...payload}
    },
    saveRiskSelectAduitUser(state, payload){
      state.riskSelectAduitUser = [];
      state.riskSelectAduitUser = state.riskSelectAduitUser.concat(payload);
    },
    saveMemberInfo(state, payload){
      state.memberInfo = payload;
    },
    changeMemberInfo(state, payload){
      state.memberInfo = {...state.memberInfo, ...payload};
      console.log(state.memberInfo.UserNickName);
    },
  },
  modules:{
    tiskAdd,
    evaluation,
    riskList,
    riskInfo,
    myAuditInfo,
    myAuditList,
    myAssessAuditList,
    riskDangerList,
    evaluationList,
    myAssessAuditInfo,
    warningInfo,    
    warnAndAccident,
    riskWarningInfo,
    knowledgeBase
  }
});
