<template>
  <div id="danger">
    <group>
      <p class="title"><Icon class="Icon" :name="'location1'" style="color:#33CC99"/><span class="titleInfo">{{item.RiskFullAddress?item.RiskFullAddress:'暂无'}}</span></p>
      <div class="mark">
        <p :style="{'color':fontColor[riskStatus.indexOf(item.RiskLvName)]}"><Icon class="Icon" :name="'level'" />{{ item.RiskLvName }}</p>
        <p><Icon class="Icon" :name="'trend-icon'" style="color:#33CC99" />{{ item.RiskScore | s_toNum}}</p>
      </div>
      <div class="content">
        <p><Icon class="Icon" :name="'riskName'" style="color:#33CC99" />名称 :&nbsp;{{ item.RiskName | s_toStr}}</p>
        <p><Icon class="Icon" :name="'address'" style="color:#33CC99" />地址 :&nbsp;{{ (item.RiskAreaName1?item.RiskAreaName1:'-') + (item.RiskAreaName2?item.RiskAreaName2:'-') + (item.RiskAreaName3?item.RiskAreaName3:'-') + (item.RiskAreaName4?item.RiskAreaName4:'-') + (item.RiskAreaName5?item.RiskAreaName5:'-') }}</p>
        <p><Icon class="Icon" :name="'state'" style="color:#33CC99" />审核状态 : &nbsp;<span :style="{'color':statusColor[item.RiskStatus]}">{{ RiskAssessStatusName[item.RiskStatus] }}</span></p>
      </div>
      <div class="dateFot">

        <p class="date">{{ item.RiskAddDate | s_toDate}}</p>
        <div class="lngAndlat">
          <div class="lng">经纬度: {{ item.RiskLng | s_toStr }}/{{ item.RiskLat | s_toStr }}</div>
        </div>
        
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
    props:['item'],
    data (){
        return {
            searchList:[],
            riskStatus:['极高','高','中等','低','可忽略'],
            fontColor:['#FF0000','#FF8C00','#FFD700','#1E90FF'],
            statusColor:['#FF0000','#FF8C00','#1E90FF','#33CC99'],
            RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
        }
    },
    mounted(){
    }
  }
</script>
<style lang="less">
  #danger{
    background: #fbf9fe;
    box-sizing: border-box;

    .weui-cells{
      padding: 10px;
      background: #fff!important;
      margin:0px!important;
    }

    .dateFot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date{
        font-size:10px!important;
      }
      .lngAndlat{
        float: right;
        .lng{
          font-size:12px!important;
        }
      }

    }
    .Icon{
      margin-right: 5px;
    }

    .title { 
      line-height: 100%;
      font-size: 17px; 
      display: flex;
      justify-content: center;
      .titleInfo{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 45%;
        text-align: center;
      }
    }
    .mark { 
      position: absolute;
      right: 15px; 
      top: 10px;
      width: 65px;
      p{line-height: 22px;}
    }
    p { 
      display: flex; 
      align-items: center; 
      font-size: 14px; 
      line-height: 30px; 
      img { 
        vertical-align: sub;
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
