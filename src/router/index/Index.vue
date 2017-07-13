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
<style lang="less">
    .index{
        widht:100%;
        height: 100%;
    }
</style>