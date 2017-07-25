import Vue from 'vue'
import Vuex from 'vuex'
import regExp from './../utils/regExp'
import tiskAdd from './risk/riskAdd'
import riskList from './map/riskList'
import evaluation from "./risk/evaluation"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
    isLoading: false,
    toast:{
      toastState: false,
      toastValue: '',
    },
    confirm:{
      state: false,
      msg:'我是提醒消息',
      control:()=>{}
    }
  },
  actions: {
    hideToast(context){
      setTimeout(()=>{
        context.commit('upToastMag',{
          toastState: false
        })
      },1500)
    },
    showToast({commit,dispatch,getters,state},payload){
      commit('upToastMag',payload);
      dispatch('hideToast');
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
    }
  },
  modules:{
    tiskAdd,
    evaluation,
    riskList
  }
});
