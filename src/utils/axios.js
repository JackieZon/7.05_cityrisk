import axios from 'axios'
import qs from 'qs'

export default (url, type, param) => {
  switch (type) {

    case 'get':

      const getApi = new Promise((resolve, reject) => {
        axios.get(url,param).then((res) => {

          if (res.status >= 200 && res.status < 300) {
            if (res.data.status) {
              resolve(res.data.info);
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
            console.log(res);
          if (res.status >= 200 && res.status < 300) {
            if (res.data.status) {
              resolve(res.data.info);
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
