<template>
    <!-- <transition name="fade"> -->
         <div class="img-view" @click="close">
            <div class="img-layer"></div>
            <div class="img">
                <img :src="imgSrc">
            </div>
        </div> 
    <!-- </transition> -->
</template>
</template>
<script>
    export default {
        props:['imgSrc'],
        data (){
            return {
                changeData: false
            }
        },
        methods:{
          close() {
            this.$emit('change-data',this.changeData)
          }
        }
    }
</script>
<style lang="less">
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s linear;
        transform: translate3D(0, 0, 0);
    }

    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }


    /* bigimg */

    .img-view {
         position: absolute; 
         top: -15%; 
        width: 100%;
        height: 100%;
          display: flex;
        align-items: center;  
    }

    .img-view .img-layer {
        position: fixed;
        z-index: 999; 
        top: 0; 
        // left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .img-view .img img {
        max-width: 100%;
        // display: block;
        position: absolute;
        left: 0;
        right: 0;  
        margin: auto;
        z-index: 1000;
    }
</style>