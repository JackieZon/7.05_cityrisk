<template>
  <div id="app" v-cloak>
    <transition v-bind:enter-active-class="animated +' '+'animated'">
      <router-view></router-view>
    </transition>
    <loading v-model="isLoadingStatus"></loading>
    <toast v-model="toastStateState" type="text" width="15em" :time="1500" class="toast" is-show-mask :text="toastValue" position="middle">{{ toastValue }}</toast>     
    <confirm v-model="confirmStateState"
        :title="'温馨提示'"
        @on-confirm="isConfirm"
        @on-cancel="openConfirm({state: false})"
    >
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
      isLoadingStatus:false,
      confirmStateState: false,
      toastStateState:false,
    }
  },
  components:{
    Loading,
    Toast,
    Confirm
  },
  mounted(){
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
    },
    isLoading(){
      this.isLoadingStatus = this.isLoading;
    },
    confirmState(){
      this.confirmStateState = this.confirmState;
    },
    toastState(){
      this.toastStateState = this.toastState;
    }
  },
  methods:{
    ...mapMutations([
      'openConfirm',
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
    .toast{
        z-index: 999;
    }
  }
}
body {
  background-color: #fbf9fe;
}
.icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    padding-right: 10px;
}
.flexBox{
  display:flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}
.flexLeft{
  display:flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
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
  padding: 5px 10px;
}
.weui-search-bar__cancel-btn{
  color:#33CC99!important;
}
.footerBox{
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
    background: #fff;
}
</style>
