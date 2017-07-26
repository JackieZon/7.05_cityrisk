
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routerConfig from './router.config'
import {store} from './../src/store/index'
import './../config/components.config'
import './assets/css/animate.css'
import BaiduMap from 'vue-baidu-map'
import './utils/filter'
// requires and returns all modules that match 
const requireAll = requireContext => requireContext.keys().map(requireContext);
// import all svg
const req = require.context('./assets/icon', true, /\.svg$/);
requireAll(req);

Vue.use(BaiduMap, {
  ak: 'fTznLHvlDdp9ysB1b6xrbh0upjxx3C89'
})

Vue.use(VueRouter);

// 获取后台基础数据
store.dispatch('getRiskBaseType');
store.dispatch('getRiskObjectType');

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
