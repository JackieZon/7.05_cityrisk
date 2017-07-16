<template>
  <div class="danger">
    <group>
      <p class="title">{{'华文大厦'}}<img src="./../../assets/icon/location1.svg" alt=""></p>
      <div class="mark">
        <p><img src="./../../assets/icon/level.svg" alt="">{{ '蓝色' }}</p>
        <p><img src="./../../assets/icon/windPower.svg" alt="">{{ '18级' }}</p>
      </div>
      <div class="content">
        <p><img src="./../../assets/icon/riskName.svg" alt="">险源名称 : {{ '热带强台风' }}</p>
        <p><img src="./../../assets/icon/address.svg" alt="">险源地址 : {{ '深圳市南山区西丽街道' }}</p>
      </div>
      <div>
        <p style="float: left;">{{ '2017 7-16 21:02' }}</p>
        <p style="float: right;">纬度 : {{ '20.1' }}</p>
        <p style="float: right;margin-right:10px;">经度 : {{ '10' }}</p>
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
<style lang="less">
  .danger{
    background: #f1f1f1;
    box-sizing: border-box;

    .weui-cells{
      padding: 10px 15px;
      background: #fff!important;
      margin:0px!important;
    }

    .title { 
      line-height: 25px; 
      font-size: 17px; 
      display: flex;
      justify-content: center;
    }
    .mark { 
      position: absolute;
      right: 15px; 
      top: 10px;
      p{line-height: 22px;}
    }
    p { 
      display: flex; 
      align-items: center; 
      font-size: 14px; 
      line-height: 30px; 
      img { 
        width: 20px; 
        height: 20px; 
        margin-right: 5px; 
      }
    }
    .content { 
      padding: 20px 0 10px; 
    }
  }

</style>
