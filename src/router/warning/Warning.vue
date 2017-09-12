<template>
  <div class="warning">
    <div class="war-list">
      <div class="list-info" :style="{'border-left':`5px solid ${color[item.RiskWarnStatus]}`}">
        <p class="administrators">
          <Icon :name="'location1'" :style="{'color': color[item.RiskWarnStatus]}" /> 福田区
        </p>
        <div class="dis-flex">
          <p class="address">
           发布人:&nbsp; {{ item.RiskWarnAddManName | s_toStr }}
          </p>
        </div>
        <p class="address">
          预警地址 : {{ item.RiskName }}
        </p>
        <p class="address">
          预警内容 : {{ item.RiskWarnContent }}
        </p>
        <div class="dis-flex">
          <p class="date">
            {{ item.RiskWarnDate | s_toDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    components: {
    },
    created (){
      console.log(JSON.stringify(this.item))
    },
    data() {
      return {
        color: ['#FF0000', '#FF8C00', '#1E90FF', '#33CC99'],
      }
    }
  }

</script>
<style scoped>
  img {
    width: 20px;
    height: 20px;
  }

  .warning {
    padding: 15px 15px 0 15px;
  }

  .warning .war-list {
    width: 100%; // height: 200px;
    background-color: #FFFFFF; // border-radius: 10px;
    position: relative;
  }

  .war-list .left {
    width: 5px;
    height: 200px;
    border-radius: 10px 0 0 10px; // float: left;
  }

  .war-list .list-info {
    // width: 84%;
    padding: 10px 15px; // position: absolute;
    // top: 20px;
    // left: 15px;
    border-radius: 5px 0 0 5px;
  }

  .list-info .address {
    box-sizing: border-box;
    /* padding: 0 15px; */
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 28px;
  }

  .list-info .notice {
    // float: left;
  }

  .list-info .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .administrators {
    width: 100%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dis-flex {
    display: flex;
    flex-direction: row-reverse;
  }

  .date {
    font-size: 14px;
    padding: 5px 0;
  }
</style>