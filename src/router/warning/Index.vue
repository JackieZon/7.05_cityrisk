<template>
  <div class="addrisk">
    <div class="upper">
      <Heads :title="'预警列表'"></Heads>
      <!-- <tab :line-width=2 active-color='#33CC99' v-model="index">
        <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @on-item-click="tabSwitch (item)"
          :key="index">{{item}}</tab-item>
      </tab> -->
    </div>
    <PullUpRefresh 
    :pullDown="pullDown" 
    :pullUp="pullUp" 
    :item="status == '风险预警' ? warnList : riskAccidentList" 
    :default="status == '风险预警' ? defaultData : defaultAccidentData"
    >

      <div class="warn">
        <Warn v-if="status == '风险预警'" v-for="(item,index) in warnList" :item="item" :key="index" @click.native="openWarningInfo(item)"></Warn>
        <!-- <Risk-warning v-if="status == '风险事故'" v-for=" (item,index) in riskAccidentList" :item="item" :key="index" @click.native="openRiskWarningInfo(item)"></Risk-warning> -->
      </div>
      <div style="height:40px; width:100%;"></div>
    </PullUpRefresh>
  </div>
</template>
<script>
  import Heads from './../../components/Heads.vue'
  import Warn from './Warning'
  import RiskWarning from './RiskWarning'
  import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import { api } from './../../servers/api'

  import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from "vux"
  const list = () => ['风险预警', '风险事故'];
  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      Heads,
      Warn,
      RiskWarning,
      PullUpRefresh
    },
    mounted (){
      // setTimeout(()=>{
      //   console.log('这是风险预警的数据啊========================================================'+JSON.stringify(this.warnList))
      // },1000)
     
    },

    data() {
      return {
        lists: list(),
        index: 0,
        status: '风险预警',
        routerName: ['warning', 'alarm'],
        warList: [],
      }
    },
    created() {
      // alert(this.$route.params.id)

      this.clearWarnList();

      this.saveDefaultDatas({
        RiskID: this.$route.params.id,
        RiskWarnStatus: -1,
        pageIndex: 1,
        pageSize: 10
      });

      this.getRiskWarn();

    },
    computed: {
      ...mapState({
        warnList(state) {
          return state.warnAndAccident.warnList;
        },
        defaultData(state) {
          return state.warnAndAccident.defaultData;
        },

        riskAccidentList(state) {
          return state.warnAndAccident.riskAccidentList;
        },

        defaultAccidentData(state) {
          return state.warnAndAccident.defaultAccidentData
        }

      }),

    },
    methods: {
      ...mapMutations([
        'clearWarnList',
        'saveDefaultDatas',
        'saveDefaultAccidentData'
      ]),
      ...mapActions([
        'getRiskWarn',
        'getriskAccident'
      ]),

      tabSwitch(item) {

        this.status = item

        if (this.status == "风险预警") {

          this.clearWarnList();

          this.saveDefaultDatas({
            RiskID: this.$route.params.id,
            RiskWarnStatus: -1,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
          })

          this.getRiskWarn();

        }

        if (this.status == "风险事故") {
          this.clearWarnList();

          this.saveDefaultAccidentData({
            RiskID: this.$route.params.id,
            RiskAccidentStatus: -1,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
          })

          this.getriskAccident();

            // setTimeout(()=>{
            //   console.log('这是风险事故的数据啊========================================================'+JSON.stringify(this.riskAccidentList))
            // },1000)

        }

      },

      pullDown() {

        if (this.status == '风险预警') {

          this.clearWarnList();

          this.saveDefaultDatas({
            RiskWarnStatus: -1,
            pageIndex: 1,   //必填参数
            pageSize: 10,   //必填参数
          });

          this.getRiskWarn();

        }

        if (this.status == '风险事故') {

          this.clearWarnList();

          this.saveDefaultAccidentData({
            RiskAccidentStatus: -1,
            pageIndex: 1,   //必填参数
            pageSize: 10,   //必填参数
          });

          this.getriskAccident();

        }


      },
      pullUp() {

        if (this.status == '风险预警') {
          this.saveDefaultDatas({
            RiskID: this.$route.params.id,
            RiskWarnStatus: -1,
            pageIndex: this.defaultData.pageIndex += 1,
            pageSize: 10,
          });
          this.getRiskWarn();
        }


        if (this.status == '风险事故') {
          this.saveDefaultAccidentData({
            RiskID: this.$route.params.id,
            RiskAccidentStatus: -1,
            pageIndex: this.defaultAccidentData.pageIndex += 1,
            pageSize: 10,
          });
          this.getriskAccident();
        }


      },

      openWarningInfo(item) {
        this.$router.push({ name: 'warningInfo', params: { Id: item.ID } });
      },

      openRiskWarningInfo(item) {
        this.$router.push({ name: 'riskWarningInfo', params: { Id: item.ID } });
      }

    }

  }

</script>
<style lang="less" scoped>
  .addrisk {
    height: 100%;
    display: flex;
    flex-direction: column;
    .vux-slider {
      height: 100%;
      .vux-swiper {
        height: 100%!important;
      }
    }
  }
</style>