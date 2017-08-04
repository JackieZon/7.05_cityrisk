<template>
  <div class="warning">
    <div class="war-list">
      <div class="left" :style="{background:(color[3])}"></div>
      <div class="list-info">
        <p class="address">
          预警区 : {{ '我是区域' }}
        </p>
        <p class="content">{{ '我是类型' }} : {{ '我是地址' }}</p>
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
          color:['#FF0000','#FF8C00','#1E90FF','#33CC99'],
        }
    }
  }
</script>
<style scoped>
  img { width: 20px; height: 20px; margin-right: 10px; }

  .warning { padding: 15px; }
    .warning .war-list { width: 100%; height: 100px; background-color: #FFFFFF; border-radius: 10px; margin-bottom: 20px; }
      .war-list .left { width: 5px; height: 100px; border-radius: 10px 0 0 10px; float: left; }
      .war-list .list-info { float: left; width: 84%; height: 80px; padding: 10px 15px; }
        .list-info .address { line-height: 30px; font-size: 16px; display: flex; align-items: center; margin-bottom: 15px; }
        .list-info .notice { float: left; margin-top: 3px; }
        .list-info .content { overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical; }
</style>
