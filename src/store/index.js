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
import {getArea, postUploadPhoto} from './../servers/api'
import {countAreas} from './../utils/areas'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
    isLoading: false,
    areaData:[],
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
    showToast({commit,dispatch,getters,state},payload){
      
      console.log(payload);
      commit('upToastMag',payload);
      dispatch('hideToast');
      
    },
    getArea({commit,dispatch,getters,state}){
      getArea().then((data)=>{
        const allAreas = countAreas(data.info);
        commit('saveArea',allAreas);
      })
    },
    postUploadPhoto: async ({commit,dispatch,getters,state},payload) => {
      return await postUploadPhoto(payload);
    },
    publicFun({commit,dispatch,getters,state},payload){
      console.log(JSON.stringify(payload));
      commit(`savePublicFun`,payload);
    }
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
    savePublicFun(state, payload){
      state.public = {...state.public, ...payload}
    }
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
    myAssessAuditInfo
  }
});
