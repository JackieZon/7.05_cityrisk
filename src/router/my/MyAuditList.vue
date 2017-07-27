<template>
  <div id="myAudit">
    <Heads :title="'审核'"></Heads>
    <tab :line-width=2 active-color='#33CC99'>
      <tab-item selected @on-item-click="Audited">已审核</tab-item>
      <tab-item @on-item-click="pendingAudit">待审核</tab-item>
    </tab>
    <group v-for="(item,index) in searchList" :key="index">
      <div v-on:click=" goPage('riskInfo', item, '')">
        <div class="content title">
          <p>{{ item.RiskAreaName1 + item.RiskAreaName2 + item.RiskAreaName3 + item.RiskAreaName4 + item.RiskName }}</p>
        </div>
        <div class="content">
          <Icon class="Icon" :name="'number'" style="color:#33CC99" />&nbsp;审核编号&nbsp;:
          <p>{{ item.number }}</p>
        </div>
        <div class="content">
          <Icon class="Icon" :name="'company'" style="color:#33CC99" />&nbsp;单位名称&nbsp;:
          <p>{{ item.ListRiskDuty? item.ListRiskDuty : '暂无' }}</p>
        </div>

        <div class="content">
          <Icon class="Icon" :name="'time'" style="color:#33CC99" />&nbsp;发起时间&nbsp;:
          <p>{{ item.RiskAddDate.split("T").join(" ") }}</p>
        </div>

        <div class="content">
          <Icon class="Icon" :name="'state'" style="color:#33CC99" />&nbsp;目前状态&nbsp;:
          <p v-for="items in riskStatus" v-bind:style="items.style" v-if="items.state === item.RiskStatus">{{ items.value }}</p>
        </div>
      </div>
    </group>
  </div>
</template>
<script>
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem, Popup, Selector, Radio, XTextarea } from "vux"
  export default {
    components: {
      Group,
      XButton,
      Tab,
      TabItem,
      Heads,
      Popup,
      Selector,
      Radio,
      XTextarea
    },
    data() {
      return {
        riskStatus: [
          { "state": 0, "value": "暂存", 'style': { 'color': "#c468f8" } },
          { "state": 1, "value": "待审核", 'style': { 'color': "#8B8AEE" } },
          { "state": 2, "value": "审核退回", 'style': { 'color': "#ff3b3b" } },
          { "state": 3, "value": "审核通过", 'style': { 'color': "#33CC99" } }
        ],
        searchList: []
      }
    },
    created() {

      this.$store.dispatch("getRisk");

      this.Audited();

    },
    methods: {

      pendingAudit() { //未审核状态
        this.searchList = [];
        this.searchList = this.$store.getters.pendingAudit
      },

      Audited() { //已审核状态
        this.searchList = [];
        this.searchList = this.$store.getters.Audited
      },


      goPage(name, item, addOperation) {
        this.$router.push({ name: name, params: { id: item.ID, add:addOperation } })
      }

    }

  }

</script>

<style scoped>
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: #33CC99 !important;
  }
  
  .vux-tab-ink-bar {
    background-color: #33CC99 !important;
  }
  
  #myAudit {
    margin-bottom: 30px;
  }
  
  #myAudit .header {
    height: 35px;
    width: 100%;
    text-align: center;
    background-color: #33CC99;
  }
  
  #myAudit .header p {
    color: white;
    line-height: 35px;
    font-size: 18px;
  }
  
  #myAudit .content {
    padding: 10px 15px;
    display: flex;
    align-items: center;
  }
  
  .content img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  
  .content span {
    font-size: 16px;
    display: inline-block;
    margin-left: 5px;
  }
  
  .content p {
    font-size: 16px;
    display: inline-block;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  
  .content.title {
    display: flex;
    justify-content: center;
    border-bottom: 2px solid #33CC99;
  }
</style>