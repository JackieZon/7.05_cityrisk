<template>
  <div class="addrisk">
    <tab :line-width=2 active-color='#33CC99' v-model="index">
      <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click="status = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false">
      <transition v-bind:enter-active-class="'fadeIn animated'">
        <router-view></router-view>
      </transition>
    </swiper>
  </div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from "vux"
const list = () => ['风险预警', '风险告警'];
export default {
    components:{
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    watch:{
      index(val,old){
        this.$router.push({name:this.routerName[val]})
      },
      '$route' (to, from) {
        if(this.routerName.indexOf(to.name)!=-1){
          this.index = this.routerName.indexOf(to.name);
        }
      }
    },
    created (){
      this.$router.push({name:'warning'})
    },
    data (){
        return {
          lists: list(),
          index: 0,
          status:'风险预警',
          routerName: ['warning','alarm']
        }
    }
}

</script>
<style lang="less">
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
