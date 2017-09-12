<template>
  <div id="audit">
    <div class="title">
      <Heads :title="'风险列表'" :isRiskAdd="true"></Heads>
      <tab :line-width=2 active-color='#33CC99'>
        <tab-item :selected="defaultData.RiskStatus==-1" @on-item-click="changeTab(-1)">全部审核</tab-item>
        <tab-item :selected="defaultData.RiskStatus==0" @on-item-click="changeTab(0)">未提交</tab-item>
        <tab-item :selected="defaultData.RiskStatus==1" @on-item-click="changeTab(1)">待审核</tab-item>
        <tab-item :selected="defaultData.RiskStatus==3" @on-item-click="changeTab(3)">已审核</tab-item>
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
        }
    },
    mounted(){
      this.deleteRiskList();
      this.saveDefaultData({RiskStatus: 0,pageIndex:1,pageSize:10,listType: 'My'});
      this.getRisk();
    },
    watch:{},
    computed: {
      ...mapState({
				riskList(state){
					return state.riskList.riskList;
				},
        defaultData(state){
          return state.riskList.defaultData;
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
        this.$router.push({name:'riskInfo',params:{riskId:item.ID,add:1,editStatus:1}})
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
