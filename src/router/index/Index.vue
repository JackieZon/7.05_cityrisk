<template>
    <div class="index">
        <transition v-bind:enter-active-class="'fadeIn animated'">
            <router-view></router-view>
        </transition>
        <Footers></Footers>
    </div>
</template>
<script>
    import Footers from './../../components/Footers.vue'

    export default {
        components:{
            Footers
        },
        data(){
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    .index{
        width:100%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 45px;
        overflow-y: auto;
    }
</style>