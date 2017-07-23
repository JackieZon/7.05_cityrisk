<template>
  <div id="app" v-cloak>
    <transition v-bind:enter-active-class="animated +' '+'animated'">
      <router-view></router-view>
    </transition>
    <loading v-model="isLoading"></loading>
    <toast v-model="toastState" type="text" :time="1500" is-show-mask :text="toastValue" position="bottom">{{ toastValue }}</toast>     
    <confirm v-model="confirmState"
        :title="'温馨提示'"
        @on-confirm="isConfirm"
        @on-cancel="openConfirm({state: false})">
            <p style="text-align:center;">{{ confirmMsg }}</p>
    </confirm>
  </div>
</template>

<script>
import {Loading,Toast,Confirm} from 'vux'
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'

export default {
  name: 'app',
  data(){
    return {
      animated: 'fadeInRight',
    }
  },
  components:{
    Loading,
    Toast,
    Confirm
  },
  created(){
    // this.getRiskBaseType();
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      toastState: state => state.toast.toastState,
      toastValue: state => state.toast.toastValue,
      confirmState: state => state.confirm.state,
      confirmMsg: state => state.confirm.msg,
      confirmControl: state => state.confirm.control,
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
  },
  methods:{
    ...mapMutations([
      'openConfirm'
    ]),
    ...mapActions([
      'getRiskBaseType',
    ]),
    isConfirm(){
      this.confirmControl();
      this.openConfirm({state: false});
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
.weui-textarea{
  border: 1px solid #dbdbdb!important;
  box-sizing: border-box;
  padding: 0 10px;
}
.weui-search-bar__cancel-btn{
  color:#33CC99!important;
}

</style>
