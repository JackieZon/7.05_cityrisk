export default {

  //得到url的参数
  getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window
      .location
      .search
      .substr(1)
      .match(reg);

    if (r != null) 
      return (r[2]);
    else 
      return "";

    }
  ,

  //得到key
  getKey : function () {

    let key = window
      .localStorage
      .getItem("key")

    return key

  },

  //得到用户id
  getUserInfo : function () {

    let openid = window
      .localStorage
      .getItem("openid")

    let uid = window
      .localStorage
      .getItem("uid")

    let userid = window
      .localStorage
      .getItem("userid")

    let username = window
      .localStorage
      .getItem("username")

    let userphoto = window
      .localStorage
      .getItem("userphoto")

    let usertel = window
      .localStorage
      .getItem("usertel")

    if (openid == undefined || openid == "undefined") 
      openid = " ";
    
    if (uid == undefined || uid == "undefined") 
      uid = 0;
    
    if (userid == undefined || userid == "undefined") 
      userid = "";
    
    if (username == undefined || username == "undefined") 
      username = "";
    
    if (userphoto == undefined || userphoto == "undefined") 
      userphoto = "";
    
    if (usertel == undefined || usertel == "undefined") 
      usertel = "";
    
    // console.log("getUserInfo: " + JSON.stringify({"openid": openid,
    // "userid":userid, "username": username, "userphoto": userphoto, "usertel":
    // usertel}));

    return {
      "uid": uid,
      "userid": userid,
      "username": username,
      "userphoto": userphoto,
      "usertel": usertel,
      "openid": openid
    };
  },

  //检查用户是否登录
  checkuser : function () {}

}
