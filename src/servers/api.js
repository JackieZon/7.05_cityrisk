import axiosApi from './../utils/axios.js'
import {
  param_baseUrl,
  param_baseUrls,
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

// 用户登录
// http://wx-cityrisk.subei88.com:8080/api/Member/MemberLogin
export const getMemberLogin = async (param) => {
  return await axiosApi(`${param_baseUrl}Member/MemberLogin`, "post", param);
}

// 获取用户信息
// http://wx-cityrisk.subei88.com:8080/api/Member/MemberInfo/10098
export const getMemberInfo = async (Id) => {
  return await axiosApi(`${param_baseUrl}Member/MemberInfo/${Id}`,'get');
}

// 用户信息绑定微信
// http://wx-cityrisk.subei88.com:8080/api/Member/MemberAccount
export const postMemberAccount = async (params) => {
  console.log(`这是绑定微信的参数||${JSON.stringify(params)}`);
  console.log(params);
  return await axiosApi(`${param_baseUrl}Member/MemberAccount?openId=${params.openId}`, 'post', params.param);
}

// 用户信息解除绑定微信
// http://wx-cityrisk.subei88.com:8080/api/Member/MemberAccountOff?openId=123
export const postMemberAccountOff = async () => {
  const openId = window.sessionStorage.openId;
  return await axiosApi(`${param_baseUrl}Member/MemberAccountOff?openId=${openId}`, 'get');
}

// 编辑用户信息
// http://wx-cityrisk.subei88.com:8080/api/Member/MemberUpdate
export const editMemberInfo = async (param) => {
  return await axiosApi(`${param_baseUrl}Member/MemberUpdate`, 'post', param);
}

// 获取图片链接
// http://wx-cityrisk.subei88.com/Common/UploadPhoto?type=RiskHidden
export const postUploadPhoto = async (param) => {
  console.log('在api文件');
  console.log(param.formData);
  return await axiosApi(`${param_baseUrls}Common/UploadPhoto?type=${param.type}`, 'postFile', param.formData);
}

// 得到城市地址
// http://wx-cityrisk.subei88.com:8080/api/Area
export const getArea = async () => {
  return await axiosApi(`${param_baseUrl}Area`,'get');
}

// 得到机构地址
// http://wx-cityrisk.subei88.com:8080/api/AreaByAgencyId
export const getAreaByAgencyId = async () => {
  return await axiosApi(`${param_baseUrl}AreaByAgencyId`,'get');
}

// 风险基础数据-列表
// http://wx-cityrisk.subei88.com:8080/api/RiskBaseType
export const getRiskBaseType = async () => {
  return await axiosApi(`${param_baseUrl}RiskBaseType`, 'get');
}

// 风险对象类型-列表
// http://wx-cityrisk.subei88.com:8080/api/RiskObjectType
export const getRiskObjectType = async () => {
  return await axiosApi(`${param_baseUrl}RiskObjectType`, 'get');
}

// 获取审核人员
// http://wx-cityrisk.subei88.com:8080/api/RiskSelectAduitUser
export const getRiskSelectAduitUser = async () => {
  return await axiosApi(`${param_baseUrl}RiskSelectAduitUser`, 'get');
}

// 风险-新增
// http://wx-cityrisk.subei88.com:8080/api/RiskAdd
export const postRiskAdd = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskAdd`, 'post', param);
  return data;
}

// 新增风险评估
// http://wx-cityrisk.subei88.com:8080/api/RiskAssessAdd
export const postRiskAssessAdd = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskAssessAdd`, "post", param);
  return data
}

// http://wx-cityrisk.subei88.com:8080/api/RiskAssessInfo
// 风险评估-详情
export const getRiskAssessInfo = async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskAssessInfo`, 'post', param);
    return data;
}

// 风险列表
// http://wx-cityrisk.subei88.com:8080/api/Risk
export const getRisk = async(param)=>{
  const data = await axiosApi(`${param_baseUrl}Risk?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}&listType=${param.listType}`,"post",param);
  return data;
}

// 风险详情
// http://wx-cityrisk.subei88.com:8080/api/RiskInfo/1029
export const getRiskInfo = async(id)=>{
  console.log(`在接口里得到的ID是=${id}`);
  const data = await axiosApi(`${param_baseUrl}RiskInfo/${id}`,"post",{});
  return data;
}

// 风险源审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskStatus_Audit
export const updateRiskStatusAudit = async (param) => {
  const data = await axiosApi(`${param_baseUrl}UpdateRiskStatus_Audit`, 'post', param);
  return data
}

// 风险评估-列表【分页】
// http://wx-cityrisk.subei88.com:8080/api/RiskAssess
export const getRiskAssess = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskAssess`, 'post', param);
  return data;
}

// 风险源-撤回审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskStatus_Recall

export const updateRiskStatusRecall = async (param) => {
  console.log(param)
  const data = await axiosApi(`${param_baseUrl}UpdateRiskStatus_Recall?ID=${param}`,'post');
  return data;
}

// 获取隐患列表
// http://wx-cityrisk.subei88.com:8080/api/RiskHidden
export const getRiskHidden = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskHidden?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
  return data;
}

// 获取隐患整改列表
// http://wx-cityrisk.subei88.com:8080/api/RiskHiddenChanged
export const getRiskHiddenChanged = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskHiddenChanged?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
  return data;
}

// 获取隐患详情
// http://wx-cityrisk.subei88.com:8080/api/RiskHiddenInfo
export const getRiskHiddenInfo = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskHiddenInfo`,'post',param);
  return data;
}

// 添加隐患
// http://wx-cityrisk.subei88.com:8080/api/RiskHiddenAdd
export const postRiskHiddenAdd = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskHiddenAdd`,'post',param);
  return data;
}

// 删除隐患
// http://wx-cityrisk.subei88.com:8080/api/RiskHiddenDelete?ID=1062
export const postRiskHiddenDelete = async (param) => {
  const data = await axiosApi(`${param_baseUrl}RiskHiddenDelete?ID=${param}`,'post',{});
  return data;
}

// 撤回隐患
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskHiddenStatus_Recall?ID=1054
export const postUpdateRiskHiddenStatus_Recall = async (param) => {
  const data = await axiosApi(`${param_baseUrl}UpdateRiskHiddenStatus_Recall?ID=${param}`,'post',{});
  return data;
}

//撤回整改隐患整改
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskHiddenChangedStatus_Recall?ID=1111
export const postUpdateRiskHiddenChangedStatus_Recall = async (param) => {
  const data = await axiosApi(`${param_baseUrl}UpdateRiskHiddenChangedStatus_Recall?ID=${param}`,'post',{});
  return data;
}

// 审核隐患
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskHiddenStatus_Audit
export const postUpdateRiskHiddenStatus_Audit = async (param) => {
  const data = await axiosApi(`${param_baseUrl}UpdateRiskHiddenStatus_Audit`,'post',param);
  return data;
}

// 审核整改
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskHiddenChangedStatus_Audit
export const postUpdateRiskHiddenChangedStatus_Audit = async (param) => {
  const data = await axiosApi(`${param_baseUrl}UpdateRiskHiddenChangedStatus_Audit`,'post',param);
  return data;
}

//风险评估-撤回审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskAssessStatus_Recall
export const updateRiskAssessStatusRecall = async (param) => {
    const data = await axiosApi(`${param_baseUrl}UpdateRiskAssessStatus_Recall?ID=${param}`,'post');
    return data;

}

//风险评估-审核
// http://wx-cityrisk.subei88.com:8080/api/UpdateRiskAssessStatus_Audit
export const updateRiskAssessStatusAudit = async (param) => {
    const data = await axiosApi(`${param_baseUrl}UpdateRiskAssessStatus_Audit`,'post',param);
    return data;
}

// 风险预警
// http://wx-cityrisk.subei88.com:8080/api/RiskWarn
export const getRiskWarn = async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskWarn?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
    return data
}

// 风险预警过滤数据

export const getShufflingRiskWarn = async (param) =>{

  let data = await axiosApi(`${param_baseUrl}ShufflingRiskWarn?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
  return data;
  
}

// 风险删除
// http://wx-cityrisk.subei88.com:8080/api/RiskDelete
export const riskDelete = async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskDelete?ID=${param}`,'post');
    return data;
}


// 风险事故
// http://wx-cityrisk.subei88.com:8080/api/RiskAccident
export const riskAccident = async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskAccident?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
    return data;
}

//风险预警-详情
// http://wx-cityrisk.subei88.com:8080/api/RiskWarnInfo
export const getRiskWarnInfo = async (param) => {
    return await axiosApi(`${param_baseUrl}RiskWarnInfo/${param}`,'post');
}

//风险事故-详情
// http://wx-cityrisk.subei88.com:8080/api/RiskAccidentInfo
export const getRiskAccidentInfo = async (param) => {
    return await axiosApi(`${param_baseUrl}RiskAccidentInfo/${param}`,'post');
}

// 知识库列表
// http://wx-cityrisk.subei88.com:8080/api/Knowledge
export const getKnowledgeList = async (param) => {
    return await axiosApi(`${param_baseUrl}Knowledge?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,'post',param);
}

// 知识库-详情
// http://wx-cityrisk.subei88.com:8080/api/KnowledgeInfo
export const getKnowledgeInfo = async (param) => {
    return await axiosApi(`${param_baseUrl}KnowledgeInfo/${param}`,'post');
}

// 风险敦促人员-列表
// http://wx-cityrisk.subei88.com:8080/api/RiskHiddenChargeUser
export const getRiskHiddenChargeUser = async () => {
  return await axiosApi(`${param_baseUrl}RiskHiddenChargeUser`, 'get');
}



export const api =
{
    updateRiskAssessStatusRecall : async (param) => {
    const data = await axiosApi(`${param_baseUrl}UpdateRiskAssessStatus_Recall?ID=${param}`,'post');
    return data;
  },

     getRiskAssessInfo : async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskAssessInfo`, 'post', param);
    return data;
},

// 新增风险评估
// http://wx-cityrisk.subei88.com:8080/api/RiskAssessAdd
      postRiskAssessAdd : async (param) => {
        const data = await axiosApi(`${param_baseUrl}RiskAssessAdd`, "post", param);
      return data
},

      riskAssessDelete : async (param) => {
    const data = await axiosApi(`${param_baseUrl}RiskAssessDelete?ID=${param}`,'post');
      return data
},

// 风险预警
// http://wx-cityrisk.subei88.com:8080/api/RiskWarn
      getRiskWarn : async (param,callback) => {
        const data = await axiosApi(`${param_baseUrl}RiskWarn?pageIndex=${param.warn.pageIndex}&pageSize=${param.warn.pageSize}`,'post',param.warnData);
        // console.log(JSON.stringify(data))
        callback(data)
      }

 
  
}
