<template>
  <div id="app">
    <router-view></router-view>
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
    }
  },
  components:{
    Loading
  },
  created(){
    console.log(this.$store)
  },
  computed: {
    ...mapState({
      isLoading: state => state.main.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
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
</style>
