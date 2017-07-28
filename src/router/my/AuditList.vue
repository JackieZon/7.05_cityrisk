<template>
  <div id="audit">
    <div class="title">
      <Heads :title="'审核列表'"></Heads>
      <tab :line-width=2 active-color='#33CC99'>
        <tab-item selected @on-item-click="changeTab(-1)">全部审核</tab-item>
        <tab-item @on-item-click="changeTab(0)">未提交</tab-item>
        <tab-item @on-item-click="changeTab(1)">待审核</tab-item>
        <tab-item @on-item-click="changeTab(3)">已审核</tab-item>
      </tab>
    </div>
    <PullUpRefresh
      :pullDown="pullDown"
      :pullUp="pullUp"
      :item="riskList"
      :default="defaultData"
    >
      <RiskList v-for="(item,index) in riskList" class="riskList" :item="item" :key="index" @click.native="goRiskInfo(item)" ></RiskList>
    </PullUpRefresh>
    <!--<group v-for="item in searchList">
      <div class="header">
        <p>{{ item.title }}</p>
      </div>
      <div class="content">
        <Icon slot="icon" class="flexBox" :name="'number'" />审核编号&nbsp;:
        <span>{{ item.number }}</span>
      </div>

      <div class="content">
        <Icon slot="icon" class="flexBox" :name="'company'" />单位名称&nbsp;:
        <p>{{ item.company }}</p>
      </div>

      <div class="content">
        <Icon slot="icon" class="flexBox" :name="'time'" />发起时间&nbsp;:
        <span>{{ item.date }}</span>
      </div>

      <div class="content">
        <Icon slot="icon" class="flexBox" :name="'state'" />目前状态&nbsp;:
        <span style="color: #8B8AEE;" v-if="item.state === 1">待审核</span>
        <span style="color: #ffef7d;" v-if="item.state === 2">审核中</span>
        <span style="color: #ff3b3b;" v-if="item.state === 3">审核失败</span>
        <span style="color: #33CC99;" v-if="item.state === 4">审核通过</span>
      </div>

      <div id="but">
        <x-button mini type="warn">撤销</x-button>
        <x-button mini type="primary">修改</x-button>
      </div>
    </group>-->
  </div>
</template>
<script>
  import RiskList from './../../components/common/RiskList.vue'
  import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem } from "vux"
  import {mapMutations, mapState, mapActions} from 'vuex'

  export default {
    components:{
      Group,
      XButton,
      Tab,
      TabItem,
      Heads,
      RiskList,
      PullUpRefresh,
    },
    data(){
        return {
            searchList:[],
            resList:{
              "ListRiskDuty": null,
              "ListRiskRegulatory": null,
              "ListRiskAssess": [
                {
                  "ListRiskAssessDetail": [
                    {
                      "ID": 1121,
                      "RiskID": 1070,
                      "RiskAssessID": 1153,
                      "RiskAssessTypeID": 19,
                      "RiskAssessTypeName": "",
                      "RiskAssessLID": 1,
                      "RiskAssessLName": "",
                      "RiskAssessLScore": 0,
                      "RiskAssessEID": 8,
                      "RiskAssessEName": "",
                      "RiskAssessEScore": 0,
                      "RiskAssessCID": 15,
                      "RiskAssessCName": "",
                      "RiskAssessCScore": 0,
                      "RiskAssessDetailLv": 4,
                      "RiskAssessDetailScore": 900
                    }
                  ],
                  "RiskAssessStatusName": "暂存",
                  "RiskAssessLvName": "极高",
                  "ID": 1153,
                  "RiskID": 1070,
                  "RiskAgencyID": 0,
                  "RiskAssessIntro": "",
                  "RiskAssessTypeIDs": "",
                  "RiskAssessTypeNames": "",
                  "RiskAssessLv": 0,
                  "RiskAssessScore": 0,
                  "RiskAssessMan": 0,
                  "RiskAssessManName": "",
                  "RiskAssessManTel": "",
                  "RiskAssessDate": "2017-07-27T20:33:58",
                  "RiskAssessStatus": 0,
                  "RiskAssessAuditIntro": "",
                  "RiskAssessAuditMan": 0,
                  "RiskAssessAuditManName": "",
                  "RiskAssessAuditDate": "1900-01-01T00:00:00"
                }
              ],
              "ListRiskHidden": null,
              "ListRiskWarn": null,
              "ListRiskAccident": null,
              "RiskFullAddress": "广东省/深圳市/宝安区/放电饭锅电饭锅",
              "RiskAreaIDsArray": [
                2494,
                2495,
                2498
              ],
              "RiskObjectTypeIDsArray": [
                1,
                5
              ],
              "RiskStatusName": "暂存",
              "RiskLvName": "极高",
              "ID": 1070,
              "RiskAgencyID": 0,
              "RiskName": "dasd ",
              "RiskIntro": "大撒打算的撒",
              "RiskLv": 0,
              "RiskScore": 0,
              "RiskObjectTypeID1": 1,
              "RiskObjectTypeName1": "城市工业危险源",
              "RiskObjectTypeID2": 5,
              "RiskObjectTypeName2": "危险化学品重大危险源",
              "RiskArea1": 2494,
              "RiskAreaName1": "广东省",
              "RiskArea2": 2495,
              "RiskAreaName2": "深圳市",
              "RiskArea3": 2498,
              "RiskAreaName3": "宝安区",
              "RiskArea4": -1,
              "RiskAreaName4": "",
              "RiskArea5": -1,
              "RiskAreaName5": "",
              "RiskAddress": "放电饭锅电饭锅",
              "RiskLng": "",
              "RiskLat": "",
              "RiskDutyIDs": "",
              "RiskRegulatoryIDs": "",
              "RiskAddMan": 1,
              "RiskAddManName": "admin",
              "RiskAddDate": "2017-07-27T20:06:52",
              "RiskStatus": 0,
              "RiskAuditIntro": "",
              "RiskAuditMan": 0,
              "RiskAuditManName": "",
              "RiskAuditDate": "1900-01-01T00:00:00"
            }
        }
    },
    mounted(){
      this.deleteRiskList();
      this.saveDefaultData({pageIndex:1,pageSize:10,RiskStatus:-1});
      this.getRisk();
      console.log('我是路由');
      console.log(this.$router);
    },
    watch:{
      '$route' (to, from) {

        alert(`${to}***${from}`)

        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length

      }
    },
    computed: {
      ...mapState({
				riskList(state){
					return state.riskList.riskList
				},
        defaultData(state){
          return state.riskList.defaultData
        }
			})
		},
    methods:{
      ...mapMutations([
        'saveDefaultData',
        'deleteRiskList'
      ]),
      ...mapActions([
        'getRisk'
      ]),
      changeTab(status){
        this.deleteRiskList();
        this.saveDefaultData({pageIndex:1,pageSize:10,RiskStatus:status});
        this.getRisk();
      },
      pullDown(){
        this.deleteRiskList();
        this.saveDefaultData({pageIndex:1,pageSize:10});
        this.getRisk();
      },
      pullUp(){
        this.saveDefaultData({pageIndex:this.defaultData.pageIndex+=1,pageSize:10});
        this.getRisk();
      },
      goRiskInfo(item){
        this.$router.push({name:'riskInfo',params:{id:item.ID,add:1,editStatus:1}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .vux-tab .vux-tab-item.vux-tab-selected { color: #33CC99 !important; }
  .vux-tab-ink-bar { background-color: #33CC99 !important; }
  #audit{height: 100%;display: flex;flex-direction: column;}
  #audit .header {height: 45px;width: 100%;text-align: center;border-bottom: 2px solid #33CC99; }
    #audit .header p {color: #333;line-height: 45px;font-size: 18px; }
  .riskList:first-child{
    padding-top: 0px;
  }
  .riskList{
    padding-top: 10px;
  }
  #audit .content { margin: 16px 15px 16px 15px; display: flex; align-items: center; }
    .content img { width: 24px; height: 24px; margin-right: 6px; }
    .content span { font-size: 16px; display:inline-block; margin-left: 5px; }
    .content p { font-size: 16px; display:inline-block; margin-left: 5px;  overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1;
      -webkit-box-orient: vertical; }

  #but { text-align: center; }
    #but button.weui-btn { margin: 10px 20px 30px 20px !important; }
    #but .weui-btn + .weui-btn { background: #33CC99; }
</style>
