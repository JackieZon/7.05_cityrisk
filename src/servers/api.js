import axiosApi from './../utils/axios.js'
import {
  param_baseUrl
} from './../utils/subei_config'

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
// http://wx-cityrisk.subei88.com:8080/api/RiskBaseType
export const getRiskBaseType = async () => {
  const riskBaseType = await axiosApi(`${param_baseUrl}RiskBaseType`, 'get')
  return riskBaseType;
}

// 风险对象类型-列表
// http://wx-cityrisk.subei88.com:8080/api/RiskObjectType
export const getRiskObjectType = async () => {
  const riskObjectType = await axiosApi(`${param_baseUrl}RiskObjectType`, 'get');
  return riskObjectType;
}

// 风险-新增
// http://wx-cityrisk.subei88.com:8080/api/RiskAdd
export const postRiskAdd = async (param) => {
  const riskAdd = await axiosApi(`${param_baseUrl}RiskAdd`, 'post', param);
  return riskAdd;
}

// 新增风险评估
// http://wx-cityrisk.subei88.com:8080/api/RiskAssessAdd
export const postRiskAssessAdd = async (param) => {
  const riskAssessAdd = await axiosApi(`${param_baseUrl}RiskAssessAdd`, "post", param);
  return riskAssessAdd
}

// 风险列表
// http://wx-cityrisk.subei88.com:8080/api/Risk
export const getRisk = async(param)=>{
  console.log(`在api接口文件里`);
  console.log(param);
  const riskList = await axiosApi(`${param_baseUrl}Risk?page=${param.page}&rows=${param.rows}`,"post",param);
  return riskList;
}

// 风险详情
// http://wx-cityrisk.subei88.com:8080/api/RiskInfo/1029
export const getRiskInfo = async(id)=>{
  console.log(`在接口里得到的ID是=${id}`);
  const riskInfo = await axiosApi(`${param_baseUrl}RiskInfo/${id}`,"post",{});
  return riskInfo;
}

// 风险源审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskStatus_Audit
export const updateRiskStatusAudit = async (param) => {
  const riskStatusAudit = await axiosApi(`${param_baseUrl}UpdateRiskStatus_Audit`, 'post', param);
  return riskStatusAudit
}

// 风险评估-列表【分页】
// http://wx-cityrisk.subei88.com:8080/api/RiskAssess
export const getRiskAssess = async (param) => {
  const riskAssess = await axiosApi(`${param_baseUrl}RiskAssess`, 'post', param);
  return riskAssess;
}

// 风险源-撤回审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskStatus_Recall

export const updateRiskStatusRecall = async (param) => {
  console.log(param)
  const RiskStatusRecall = await axiosApi(`${param_baseUrl}UpdateRiskStatus_Recall?ID=${param}`,'post');
  return RiskStatusRecall;
}