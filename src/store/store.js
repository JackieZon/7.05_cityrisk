import Vue from 'vue'
import Vuex from 'vuex'
import regExp from './../utils/regExp'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    regExp,
  }
});
store.registerModule('main', {
  state: {
    regExp,
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

store.registerModule('app', {
  state: {
      data:['jack','jackie','Tomy']
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
