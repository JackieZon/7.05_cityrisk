<template>
  <div id="danger">

    <group v-for="item in searchList">
      <p class="title">{{ item.position }}<img src="../../assets/icon/location1.svg" alt=""></p>
      <div class="alert">
        <p><img src="../../assets/icon/level.svg" alt="">{{ item.grade }}</p>
        <p><img src="../../assets/icon/windPower.svg" alt="">{{ item.windPower }}</p>
      </div>
      <div class="content">
        <p><img src="../../assets/icon/riskName.svg" alt="">险源名称 : {{ item.riskName }}</p>
        <p><img src="../../assets/icon/address.svg" alt="">险源地址 : {{ item.riskAddress }}</p>
        <p style="float: left;"><img src="../../assets/icon/longitude.svg" alt="">经度 : {{ item.longitude }}</p>
        <p style="float: right;"><img src="../../assets/icon/latitude.svg" alt="">纬度 : {{ item.latitude }}</p>
      </div>
    </group>

  </div>
</template>
<script>
  import { Group, Cell, CellFormPreview, XButton, XTable, XInput } from "vux"
  export default {
    data (){
        return {
            searchList:[{
              riskName: "热带强台风",
              riskAddress:"深圳市南山区西丽街道",
              grade:"蓝色",
              windPower:"18级",
              longitude: "10",
              latitude: "20.1",
              position: "华文大厦",
              colour:"2"
            },{
              riskName: "雷电预警",
              riskAddress:"深圳市南山区西丽街道",
              grade:"黄色",
              windPower:"4级",
              longitude: "12",
              latitude: "18.1",
              position: "茶光大厦",
              colour:"3"
            },{
              riskName: "大暴雨",
              riskAddress:"深圳市南山区西丽街道",
              grade:"红色",
              windPower:"10级",
              longitude: "13",
              latitude: "22",
              position: "华文大厦",
              colour:"1"
            }]
        }
    },
    components:{
        Group
    }
  }
</script>
<style>
  #danger .weui-cells { padding: 10px 15px; }

  #danger .title { line-height: 25px; font-size: 17px; position: absolute; top: 15px; left: 35%; }

  #danger .alert { position: absolute;right: 10px; top: 10px; }

  #danger p { display: flex; align-items: center; font-size: 14px; line-height: 30px; }
    #danger p img { width: 20px; height: 20px; margin-right: 10px; }

  #danger .content { padding-top: 50px; }

</style>
