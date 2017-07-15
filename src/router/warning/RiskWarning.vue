<template>
  <div id="warning">

    <div class="war-list" v-for="item in searchList">

      <div class="left"></div>

      <div class="list-info">
        <p class="address">
          <img src="../../assets/icon/address.svg" alt="">预警区 : {{ item.address }}
        </p>

        <img v-if="item.notice === 1" class="notice" src="../../assets/icon/location-red.svg" alt="">
        <img v-if="item.notice === 2" class="notice" src="../../assets/icon/location-yellow.svg" alt="">
        <img v-if="item.notice === 3" class="notice" src="../../assets/icon/location-blue.svg" alt="">

        <p class="content">{{ item.noticeType }} : {{ item.content }}</p>

      </div>

    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data (){
        return {
          searchList:[
            {
              address: "罗湖区",
              content: "今日狂风大作,请各位做好最充足的防雷措施",
              noticeType: "雷电预警",
              notice:1
            },
            {
              address: "罗湖区",
              content: "今日狂风大作,请各位做好最充足的防雷措施",
              noticeType: "雷电预警",
              notice:1
            },
            {
              address: "宝安区",
              content: "今日全市进入暴雨状态，请大家做好防雨措施!",
              noticeType: "暴雨预警",
              notice:2
            },
            {
              address: "龙华新区",
              content: "今日全市进入暴雨状态，请大家做好防雨措施!",
              noticeType: "暴雨预警",
              notice:3
            }
          ]
        }
    }
  }
</script>
<style>
  img { width: 20px; height: 20px; margin-right: 10px; }

  #warning { padding: 15px; }
    #warning .war-list { width: 100%; height: 100px; background-color: #FFFFFF; border-radius: 10px; margin-bottom: 20px; }
      .war-list .left { width: 7px; height: 100px; border-radius: 10px 0 0 10px; background: #33CC99; float: left; }
      .war-list .list-info { float: left; width: 84%; height: 80px; padding: 10px 15px; }
        .list-info .address { line-height: 30px; font-size: 16px; display: flex; align-items: center; margin-bottom: 15px; }
        .list-info .notice { float: left; margin-top: 3px; }
        .list-info .content { overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical; }
</style>
