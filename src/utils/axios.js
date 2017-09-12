import axios from 'axios'
import qs from 'qs'
import {store} from './../store/index'
import Vue from 'vue'
import {setCookie} from './weixin'

export default (url, type, param) => {

  // store.commit('updateLoadingStatus', {isLoading: true});
  const goBack = ()=>{
    setTimeout(()=>{
      setCookie('.ASPXAUTH','',-1);
      history.go(((history.length * -1) + 1));
    },1500);
  }

  switch (type) {

    case 'get':
      const getApi = new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(url,param).then((res) => {

          if (res.status >= 200 && res.status < 300) {

            if (res.data.status) {
              resolve({info:res.data.info,all:res.data});
            }else{

                Vue.$vux.toast.show({
                    text: res.data.info,
                    type: 'cancel',
                });
                if(res.data.infocode==-3000||res.data.infocode=='-3000'||res.data.infocode=='-1'){
                  goBack();
                }

            }

          }

        }).catch((res) => {
          reject(res);
        })
        
      });
      return getApi;
      break;
      
    case 'post':
      const postApi = new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.post(url, qs.stringify(param)).then((res) => {
        
          if (res.status >= 200 && res.status < 300) {
            if (res.data.status) {
              resolve({info:res.data.info,all:res.data});
            }else{
                Vue.$vux.toast.show({
                    text: res.data.info,
                    type: 'cancel',
                });
                if(res.data.infocode==-3000||res.data.infocode=='-3000'||res.data.infocode=='-1'){
                  goBack();
                }
            }
          }

        }).catch((res) => {
          reject(res);
        })

      });
      return postApi;
      break;
      
    case 'postFile':
      const postFileApi = new Promise((resolve, reject) => {
        axios.defaults.withCredentials = false
        axios.post(url, param).then((res) => {
          
          // setTimeout(()=>{
          //   store.commit('updateLoadingStatus', {isLoading: false});
          // },800);

          if (res.status >= 200 && res.status < 300) {
            if (res.data.status) {
              resolve({info:res.data.info,all:res.data});
            }else{
                Vue.$vux.toast.show({
                    text: res.data.info,
                    type: 'cancel',
                });
                if(res.data.infocode==-3000||res.data.infocode=='-3000'||res.data.infocode=='-1'){
                  goBack();
                }
            }
          }

        }).catch((res) => {
          reject(res);
        })

      });
      return postFileApi;
      break;

    default:
      console.log('缺少传输类型参数！（get or post）');
  }
}
