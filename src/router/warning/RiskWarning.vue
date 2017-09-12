<template>
  <div class="riskWarning">
    <div class="war-list">
      <div class="left" :style="{background:(color[item.RiskAccidentStatus])}"></div>
      <div class="list-info">
        <p class="administrators">
          <Icon :name="'location1'" :style="{'color': color[item.RiskAccidentStatus]}" /> 福田区
        </p>
        <div class="dis-flex">
          <p class="address">
            发布人:&nbsp;{{item.RiskAccidentAddManName | s_toStr}}
          </p>
        </div>
        <p class="address">
          事故地址 : {{ item.RiskName }}
        </p>
        <p class="address">
          事故描述 : {{ item.RiskAccidentIntro }}
        </p>
        <div class="dis-flex">
          <p class="date">
            {{ item.RiskAccidentOccurDate | s_toDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data() {
      return {
        color: ['#FF0000', '#FF8C00', '#1E90FF', '#33CC99']
      }
    },
    methods: {

    }

  }

</script>
<style lang="less" scoped>
  .riskWarning {
    padding: 15px 15px 0 15px;
    img {
      width: 20px;
      height: 20px;
    }

    .war-list {
      width: 100%;
      background-color: #FFFFFF;
      border-radius: 10px;
    }

    .war-list .left {
      width: 5px;
      height: 160px;
      border-radius: 10px 0 0 10px;
      float: left;
    }

    .war-list .list-info {
      box-sizing: border-box;
      padding: 10px 15px;
      height: 160px;
    }

    .list-info .address {
      box-sizing: border-box;
      /* padding: 15px; */
      line-height: 28px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .list-info .notice {}

    .list-info .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .administrators {
      text-align: center;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dis-flex {
      display: flex;
      flex-direction: row-reverse;
      .date {
        font-size: 14px;
      }
    }
  }
</style>