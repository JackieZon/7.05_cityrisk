<template>
    <div class="index">
        <transition v-bind:enter-active-class="'fadeIn animated'">
            <router-view></router-view>
        </transition>
        <Footers></Footers>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import Footers from './../../components/Footers.vue'

    export default {
        components:{
            Footers
        },
        data(){
            return {

            }
        },
        created(){
            // this.getRiskBaseType();
            // this.postRiskAdd();
        },
        methods:{}
    }
</script>
<style lang="less" scoped>
    .index{
        width:100%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 50px;
        overflow-y: auto;
    }
</style>