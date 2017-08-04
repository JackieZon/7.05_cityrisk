<template>
  <div class="addrisk">
    <Heads :title="'预警列表'"></Heads>
    <tab :line-width=2 active-color='#33CC99' v-model="index">
      <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click="status = item" :key="index">{{item}}</tab-item>
    </tab>
    <div class="warn">

        <!--<PullUpRefresh
            :pullDown="pullDownWarn"
            :pullUp="pullUpWarn"
            :item="warnList"
            :default="default.warn"
        >
          <Warn></Warn>
        </PullUpRefresh>-->
        <Warn></Warn>
    </div>
  </div>
</template>
<script>

  import Heads from './../../components/Heads.vue'
  import Warn from './Warning'
  import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
  import {mapMutations, mapState, mapActions} from 'vuex'

  import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from "vux"
  const list = () => ['风险预警', '风险事故'];
  export default {
      components:{
        Tab,
        TabItem,
        Sticky,
        Divider,
        XButton,
        Swiper,
        SwiperItem,
        Heads,
        Warn,
      },
      watch:{},
      created (){
        this.getRiskWarn(this.default.warn);
      },
      data (){
          return {
            lists: list(),
            index: 0,
            status:'风险预警',
            routerName: ['warning','alarm'],
            default:{
              warn:{
                pageIndex:1,
                pageSize:10,
                RiskWarnStatus:3,
              }
            },
          }
      },
      methods:{
        ...mapActions([
          'getRiskWarn',
        ]),
        ...mapMutations([
          'clearWarnList',
        ]),
      },
  }

</script>
<style lang="less" scoped>
  .addrisk{
    height: 100%;
    .vux-slider{
      height: 100%;
      .vux-swiper{
        height: 100%!important;
      }
    }
  }
</style>
