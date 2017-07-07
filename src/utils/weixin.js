import request from './fetch.js';
import qs from 'qs';

import { apiUrl, baseUrl, appId } from './config';

// 获取 URL 中的参数
export function getUrlParam(name) {
  // 构造一个含有目标参数的正则表达式对象、匹配目标参数
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const param = window.location.search.substr(1).match(reg);

  // 返回参数值
  if (param !== null) {
    return decodeURI(param[2]);
  } else {
    return null;
  }
}

export function getStrParam(obj,paramName) {
//模板消息 点击跳转时查看详情;
  let name,value;

  let index = obj.indexOf('?');           //包含问号后面的参数的位数

  let paramStr = obj.substring(index+1);

  let paramArr = paramStr.split('&');

  let paramObj = {}

  for(let k in paramArr){

    index = paramArr[k].indexOf("=");

    if(index>0){

      name=paramArr[k].substring(0,index);
      value=paramArr[k].substring(index+1);
      paramObj[name] = value;
    }
  };

  return paramObj[paramName];
}

// 微信网页授权，保存用户基本信息
export function oAuth() {

  const openId = sessionStorage.getItem('openId');
  const memberId = sessionStorage.getItem('memberId');
  const code = getUrlParam('code');
  const state = getUrlParam('state');

  if (!openId || !memberId) {
    if (!code) {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
    }
    else {

      const res = request(`/Weixin/wx_Oauto?oAuth_Code=${code}&oAuth_State=${state}`);
      res.then(v => {

        console.log('res-----' + JSON.stringify(v));
        localStorage.serverUrl = JSON.stringify(v);
        // alert('openId 是：'+ v.openid);

        sessionStorage.setItem('key', v.info.key);
        sessionStorage.setItem('memberId', v.info.id);
        sessionStorage.setItem('openId', v.info.openid);
        sessionStorage.setItem('phone', v.info.tel);

        window.location.reload();

      });

    }
  }
}

// 微信配置初始化
export function wxInit(callback) {
  const res = request(`/Weixin/wx?url=${encodeURIComponent(window.location.href)}`, {
    // method: 'POST'
  });
  res.then(v => {
    console.log(JSON.stringify(v));
    wx.config({
      debug: false, // 开启调试模式, 调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: v.info.jsapi_appId, // 必填，公众号的唯一标识
      timestamp: v.info.jsapi_timestamp, // 必填，生成签名的时间戳
      nonceStr: v.info.jsapi_nonceStr, // 必填，生成签名的随机串
      signature: v.info.jsapi_signature,// 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      if(typeof(callback) == "function"){
        // alert('配置成功！');
        callback();
      };

    });
  });
}

export function wxPay(orderId, callback) {
  const openId = sessionStorage.getItem('openId');
  const res = request(`/Weixin/wx_Pay?url=${encodeURIComponent(window.location.href)}&openId=${openId}&orderId=${orderId}`);
  res.then(v => {
    console.log('支付接口返回结果');
    console.log(v)
    wx.chooseWXPay({
      timestamp: v.info.jsapi_timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: v.info.jsapi_nonceStr, // 支付签名随机串，不长于 32 位
      package: v.info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: v.info.paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        callback(true, orderId);
      },
      fail: function (res) {
        console.log('支付失败');
        console.log(JSON.stringify(res));
        callback(false, '支付失败');
      },
      cancel: function (res) {
        console.log('支付取消');
        console.log(JSON.stringify(res));
        callback(false, '支付取消');
      }
    });
  });
}

export function wxPay2(orderId, callback) {
  const openId = localStorage.getItem('openId');
  const res = request(`/Weixin/wx_Pay2?url=${encodeURIComponent(window.location.href)}&openId=${openId}&orderId=${orderId}`);
  res.then(v => {
    wx.chooseWXPay({
      timestamp: v.jsapi_timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: v.jsapi_nonceStr, // 支付签名随机串，不长于 32 位
      package: v.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: v.paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        callback('success');
      },
      fail: function (res) {
        alert('支付失败');
        callback();
      },
      cancel: function (res) {
        alert('支付取消');
        callback();
      }
    });
  });
}

// 获取地理位置
export function wxGetLocation(callback) {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      callback(res.latitude, res.longitude);
    }
  });
}

export function wxOpenLocation(latitude, longitude, name, address) {
  wx.openLocation({
    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
    name: name, // 位置名
    address: address, // 地址详情说明
    scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
  });
}

export function wxUploadImage(callback) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      //var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      const localId = res.localIds[0];

      wx.uploadImage({
        localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          // var serverId = res.serverId; // 返回图片的服务器端ID
          callback(res);
        },
        fail: function (res) {
          // alert(JSON.stringify(res));
        }
      });

    }
  });
}

export function wxScanQRCodes(callback) {

  // wx.checkJsApi({
  //   jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //   success: function(res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      // alert(res.checkResult.scanQRCode);
  //     if(res.checkResult.scanQRCode){

        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (ret) {
            // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if(typeof(callback) == "function"){
              callback(ret.resultStr);
            }
          }
        });

    //   }
  //   }
  // });
}

// 预览图片接口
export function wxPreviewImage(current, urls) {
  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: urls // 需要预览的图片http链接列表
  });
}
