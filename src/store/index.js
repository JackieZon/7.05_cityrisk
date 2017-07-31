import Vue from 'vue'
import Vuex from 'vuex'
import regExp from './../utils/regExp'
import tiskAdd from './risk/riskAdd'
import riskList from './map/riskList'
import riskInfo from './map/riskInfo'
import evaluation from "./risk/evaluation"
import myAuditInfo from "./risk/myAuditInfo"
import myAuditList from "./risk/myAuditList"
import {getArea} from './../servers/api'
import {countAreas} from './../utils/areas'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
    isLoading: false,
    areaData:[],
    toast:{
      toastState: false,
      toastValue: '',
    },
    confirm:{
      state: false,
      msg:'我是提醒消息',
      control:()=>{}
    },
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
      payload.state=true;
      console.log(payload);
      commit('upToastMag',payload);
      dispatch('hideToast');
    },
    getArea({commit,dispatch,getters,state}){
      getArea().then((data)=>{
        const allAreas = countAreas(data.info);
        commit('saveArea',allAreas);
      })
    }
    // http://wx-cityrisk.subei88.com:8080/api/Area
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
    }
  },
  modules:{
    tiskAdd,
    evaluation,
    riskList,
    riskInfo,
    myAuditInfo,
    myAuditList
  }
});
