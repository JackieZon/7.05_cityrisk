<template>
  <div id="app">
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
html,body{
  width:100%;
  height:100%;
  #app{
    overflow: hidden;
    width:100%;
    height:100%;
  }
}
body {
  background-color: #fbf9fe;
}
</style>
