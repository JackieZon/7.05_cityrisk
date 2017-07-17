import Vue from 'vue'
import Vuex from 'vuex'
import regExp from './../utils/regExp'
import tiskAdd from './risk/riskAdd'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  },
  modules:{
    tiskAdd,
  }
});
