import axios from 'axios'
import qs from 'qs'
import {store} from './../store/index'
import Vue from 'vue'

export default (url, type, param) => {

  // store.commit('updateLoadingStatus', {isLoading: true});

  switch (type) {

    case 'get':
      const getApi = new Promise((resolve, reject) => {
        axios.get(url,param).then((res) => {

          // setTimeout(()=>{
          //   store.commit('updateLoadingStatus', {isLoading: false});
          // },800)

          if (res.status >= 200 && res.status < 300) {
            if (res.data.status) {
              resolve({info:res.data.info,all:res.data});
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
        axios.post(url, qs.stringify(param)).then((res) => {
          
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
            }
          }

        }).catch((res) => {
          reject(res);
        })

      });
      return postApi;
      break;

    default:
      console.log('缺少获取数据类型参数！');
  }
}
