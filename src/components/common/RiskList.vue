<template>
  <div class="danger">
    <group>
      <p class="title">{{'华文大厦'}}<img src="./../../assets/icon/location1.svg" alt=""></p>
      <div class="alert">
        <p><img src="./../../assets/icon/level.svg" alt="">{{ '蓝色' }}</p>
        <p><img src="./../../assets/icon/windPower.svg" alt="">{{ '18级' }}</p>
      </div>
      <div class="content">
        <p><img src="./../../assets/icon/riskName.svg" alt="">险源名称 : {{ '热带强台风' }}</p>
        <p><img src="./../../assets/icon/address.svg" alt="">险源地址 : {{ '深圳市南山区西丽街道' }}</p>
        <p style="float: left;"><img src="./../../assets/icon/longitude.svg" alt="">经度 : {{ '10' }}</p>
        <p style="float: right;"><img src="./../../assets/icon/latitude.svg" alt="">纬度 : {{ '20.1' }}</p>
      </div>
    </group>
  </div>
</template>
<script>
  import { Group, Cell, CellFormPreview, XButton, XTable, XInput } from "vux"
  export default {
    components:{
      Group
    },
    data (){
        return {
            searchList:[]
        }
    },
  }
</script>
<style>
  .danger{background: #fbf9fe;box-sizing: border-box;}
  .danger .weui-cells { padding: 10px 15px; }

  .danger .title { line-height: 25px; font-size: 17px; position: absolute; top: 15px; left: 35%; }

  .danger .alert { position: absolute;right: 10px; top: 10px; }

  .danger p { display: flex; align-items: center; font-size: 14px; line-height: 30px; }
    .danger p img { width: 20px; height: 20px; margin-right: 10px; }

  .danger .content { padding-top: 50px; }
    .danger .weui-cells{
        background: #fff!important;
        margin-top:0px!important;
    }
</style>
