// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routerConfig from './../config/router.config'
import {store} from './../src/store/store'
import './../config/components.config'

Vue.use(VueRouter);

const router = new VueRouter(routerConfig)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
});

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
});



FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
