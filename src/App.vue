<template>
  <div id="app" v-cloak>
    <transition v-bind:enter-active-class="animated +' '+'animated'">
      <router-view></router-view>
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import {Loading} from 'vux'
import {mapState} from 'vuex'
export default {
  name: 'app',
  data(){
    return {
      animated: 'fadeInRight'
    }
  },
  components:{
    Loading
  },
  created(){
  },
  computed: {
    ...mapState({
      isLoading: state => state.main.isLoading
    })
  },
  watch:{
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if(toDepth==fromDepth){
        this.animated = 'fadeIn'
      }else{
        this.animated = toDepth < fromDepth ? 'fadeInLeft' : 'fadeInRight';
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
[v-cloak]{ display: none;}
html,body{
  width:100%;
  height:100%;
  #app{
    width:100%;
    height:100%;
  }
}
body {
  background-color: #fbf9fe;
}
.icon {
    width: 1em;
     height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.vux-header .vux-header-left .left-arrow:before{
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-left: 1px solid #fff!important;
    border-top: 1px solid #fff!important;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 8px;
    left: 7px;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #33CC99!important;
}
</style>
