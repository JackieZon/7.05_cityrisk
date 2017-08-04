<template>
  <div id="myAudit">
    <div class="upper">
      <Heads :title="'审核'"></Heads>
      <tab :line-width=2 active-color='#33CC99'>
        <tab-item selected @on-item-click="changeTab(1)">待审核</tab-item>
        <tab-item  @on-item-click="changeTab(3)">已审核</tab-item>
        <tab-item @on-item-click="changeTab(2)">已退回</tab-item>
      </tab>
    </div>
    <PullUpRefresh 
      :pullDown="pullDown" 
      :pullUp="pullUp" 
      :item="searchList" 
      :default="defaultData"
    >
      <div v-for="(item,index) in searchList" class="padd-top" :key="index" v-on:click=" goPage('riskInfo', item, 0)">
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

    </PullUpRefresh>
  </div>
</template>
<script>
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem, Popup, Selector, Radio, XTextarea } from "vux"
  import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
  import { mapMutations, mapState, mapActions } from 'vuex'
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
      XTextarea,
      PullUpRefresh
    },
    data() {
      return {
        riskStatus: [
          { "state": 0, "value": "暂存", 'style': { 'color': "#c468f8" } },
          { "state": 1, "value": "待审核", 'style': { 'color': "#8B8AEE" } },
          { "state": 2, "value": "审核退回", 'style': { 'color': "#ff3b3b" } },
          { "state": 3, "value": "审核通过", 'style': { 'color': "#33CC99" } }
        ],
        // searchList: []
      }
    },
    mounted() {

      // console.log(JSON.stringify(`我是数据呀${this.searchList}`))
      this.deleteAuditList();
      this.saveMyAuditListDefaultData({ pageIndex: 1, pageSize: 10, RiskStatus: -1 });
      // this.getRisks();
      this.changeTab(1)
    },

    //created() {

    //this.$store.commit("saveMyAuditListDefaultData", { pageIndex: 1, pageSize: 1000, });

    //      this.$store.dispatch("getRisks");

    // alert(JSON.stringify(this.searchList))

    //  },
    watch: {
      searchList(val, oldVal) {

        // console.log(`我改变了${JSON.stringify(val)}`)
        // this.Audited();

      },
      defaultData() {
        // console.log(`我是默认数据${JSON.stringify(this.defaultData)}`)
      }
    },
    computed: {
      ...mapState({
        searchList(state) {
          return state.myAuditList.auditList;
        },
        defaultData(state) {
          return state.myAuditList.defaultData
        }
      })
    },
    methods: {
      ...mapMutations([
        'saveMyAuditListDefaultData',
        'deleteAuditList'
      ]),
      ...mapActions([
        'getRisks'
      ]),

      changeTab(status) {
        this.deleteAuditList();
        this.saveMyAuditListDefaultData({ pageIndex: 1, pageSize: 10, RiskStatus: status });
        this.getRisks();
      },
      pullDown() {
        this.deleteAuditList();
        this.saveMyAuditListDefaultData({ pageIndex: 1, pageSize: 10 });
        this.getRisks();
      },
      pullUp() {
        this.saveMyAuditListDefaultData({ pageIndex: this.defaultData.pageIndex += 1, pageSize: 10 });
        this.getRisks();
      },


      goPage(name, item, addOperation) {
        console.log(name);
        this.$router.push({ name: name, params: { riskId: item.ID, add: addOperation, editStatus: 2 } });
      }

    }

  }

</script>

<style lang="less" scoped>
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: #33CC99 !important;
  }

  .vux-tab-ink-bar {
    background-color: #33CC99 !important;
  }

  #myAudit {
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
      height: 35px;
      width: 100%;
      text-align: center;
      background-color: #33CC99;
    }

    .padd-top {
      background: #fff;
      margin-top: 15px;
    }
  }

  .weui-cells {
    margin: 0!important;
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