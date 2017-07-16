<template>
    <div id="alarm">
      <group v-for="item in searchList">
        <div class="header">
          <p>{{ item.riskZone }}</p>
        </div>
        <div class="content">

          <p class="content-info">
            <img src="../../assets/icon/address.svg" alt="">
            <span>风险地址 :&nbsp;&nbsp;{{ item.riskAddress }}</span>
          </p>

          <p class="content-info">
            <img src="../../assets/icon/time1.svg" alt="">
            <span>事故日期 :&nbsp;&nbsp;</span>
            <span>{{ item.date }}</span>
          </p>

          <img class="describe-icon" src="../../assets/icon/describe.svg" alt="">
          <p class="describe">
            <span>事故描述 :&nbsp;</span>
            <span>{{ item.describe }}</span>
           </p>

        </div>
      </group>
    </div>
</template>
<script>
  import { Group } from "vux"
  export default {

      components:{
          Group
      },

    data (){
          return {
              searchList:[
                {
                  riskZone: "南山区",
                  riskAddress: "西丽街道茶光路3322号",
                  date: "2017-05-12 15:03",
                  describe: "该楼年限已久，破损严重，外墙脱离，导致楼下停车场多辆汽车被砸坏，存在严重安全隐患"
                },
                {
                  riskZone: "宝安区",
                  riskAddress: "石岩街道XX路",
                  date: "2017-05-16 11:23",
                  describe: "道路4号井盖破旧塌陷，造成2个市民轻度受伤，存在严重安全隐患！"
                },
                {
                  riskZone: "南山区",
                  riskAddress: "西丽街道茶光路3322号",
                  date: "2017-05-12 15:03",
                  describe: "该楼年限已久，破损严重，外墙脱离，导致楼下停车场多辆汽车被砸坏，存在严重安全隐患"
                }
              ]
          }
    }


  }
</script>
<style scoped>
    img { width: 20px; height: 20px; margin-right: 10px; }
    span { font-size: 15px; }
  #alarm .header { width: 100%; height: 35px; background-color:#33CC99; text-align: center; color: white; }
    #alarm .header p { line-height: 35px; }
  #alarm .content { width: 100%; height: 100px; padding: 15px 15px; }
  .content .content-info { display: flex; align-items: center; padding: 6px 0; }
    .describe-icon { float: left; margin-top: 4px; }
   .describe { width: 81%; overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical; }
</style>
