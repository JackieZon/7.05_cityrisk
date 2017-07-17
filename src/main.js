
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routerConfig from './router.config'
import {store} from './../src/store/index'
import './../config/components.config'
import './assets/css/animate.css'
import AMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'fTznLHvlDdp9ysB1b6xrbh0upjxx3C89'
})

Vue.use(AMap);
Vue.use(VueRouter);

AMap.initAMapApiLoader({
  key: '82bdc74ed1bc8b1fd9630d9b0d076bfc',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

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
