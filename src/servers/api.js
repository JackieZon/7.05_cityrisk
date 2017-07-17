import {axiosApi} from './../utils/axios.js'
import {param_baseUrl} from './../utils/subei_config'
// import axios from 'axios'

// JackieZon 账户的信息
export const getJackieZon = () => {
  const author = new Promise((resolve, reject) => {
    axios.get('https://api.github.com/users/JackieZon')
      .then((res) => {
        resolve(res);
      }).catch((res) => {
        reject(res);
      })
  });
  return author;
}

// 风险基础数据-列表
export const getRiskBaseType = ()=>{
    const riskBaseType = new Promise((resolve, reject) => {
        axiosApi(`${param_baseUrl}RiskBaseType`)
        .then((res) => {
            resolve(res);
        }).catch((res) => {
            reject(res);
        })
    });
    return riskBaseType;
}

// 风险对象类型-列表
export const getRiskObjectType = ()=>{
    const riskObjectType = new Promise((resolve, reject) => {
        axiosApi(`${param_baseUrl}RiskObjectType`)
        .then((res) => {
            resolve(res);
        }).catch((res) => {
            reject(res);
        })
    });
    return riskObjectType;
}