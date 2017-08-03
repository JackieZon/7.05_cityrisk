import  { ToastPlugin, Datetime } from 'vux'
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routerConfig from './router.config'
import BaiduMap from 'vue-baidu-map'
import {store} from './../src/store/index'
import './../config/components.config'
import './assets/css/animate.css'
import './utils/filter.js'
import {wxInit} from './utils/weixin'

//微信api初始化
// wxInit();

Vue.use(ToastPlugin);
Vue.use(Datetime);

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
store.dispatch('getArea');

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
