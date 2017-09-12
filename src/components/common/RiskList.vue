<template>
  <div id="danger">
     <!-- <group>  -->
      <div class="dangerList">
        <div class="listItem">
                                                                                                                      
          <p class="title"><Icon class="Icon" :name="'location1'" style="color:#33CC99"/><span class="titleInfo">{{item.RiskAddress? item.RiskAddress :'暂无'}}</span></p>
          <div class="mark">
            <p :style="{'color':statusColor[riskStatus.indexOf(item.RiskLvName)]}">{{ item.RiskLvName }}<Icon class="iconPad" :name="'level'" /></p>
            <p>{{ item.RiskScore | s_toNum}}<Icon class="iconPad" :name="'trend-icon'" style="color:#33CC99" /></p>
          </div>
          <div class="content">
            <p><Icon class="Icon" :name="'riskName'" style="color:#33CC99" />名称 :&nbsp;{{ item.RiskName | s_toStr}}</p>
            <p><Icon class="Icon" :name="'address'" style="color:#33CC99" /><span class="ellipsis">地址 :&nbsp;{{ (item.RiskAreaName1?item.RiskAreaName1:'-') + (item.RiskAreaName2?item.RiskAreaName2:'-') + (item.RiskAreaName3?item.RiskAreaName3:'-') + (item.RiskAreaName4?item.RiskAreaName4:'-') + (item.RiskAreaName5?item.RiskAreaName5:'-') }}</span></p>
            <p><Icon class="Icon" :name="'state'" style="color:#33CC99" />审核状态 : &nbsp;<span :style="{'color':statusColor[item.RiskStatus]}">{{ RiskAssessStatusName[item.RiskStatus] }}</span></p>
          </div>
          <div class="dateFot">

            <p class="date">{{ item.RiskAddDate | s_toDate}}</p>
            <div class="lngAndlat">
              <div class="lng">经纬度: {{ item.RiskLng | s_toStr }}/{{ item.RiskLat | s_toStr }}</div>
            </div>
            
          </div>
        </div>
      </div>
    <!-- </group> -->
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
            fontColor:['#D62F27','#F98A1E','#F0E615','#3265FE','#3265FE'],
            // fontColor:['#FF0000','orangered','#FF8C00','#FFD700','#1E90FF'],
            statusColor:['#FF0000','orangered','#FF8C00','#1E90FF','#33CC99'],
            RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
        }
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  #danger{
    background: #fbf9fe;
    box-sizing: border-box;
    
    .listItem{
      background: url('./../../assets/img/isRight.png') 100% 50% no-repeat;
      background-size: 22px;
    }

    .dangerList {
      background: #fff;
      padding: 10px;
      position:relative;
    }
    
     /* .weui-cells{
      margin-top: 0 !important;
      padding: 10px !important;
      background: #fff !important;
    }  */

    .dateFot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date{
        font-size:12px!important;
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
        font-size: 16px;
        // width: 45%;
        text-align: center;
      }
    }
    .mark { 
      position: absolute;
      right: 15px;
      top: 10px;
      width: 65px;
      p{
        line-height: 22px;
        font-size: 12px;
        justify-content: flex-end;
      }
      .iconPad{
        margin-left:5px;
      }
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
      .itemP{

      }
    }
  }

</style>
