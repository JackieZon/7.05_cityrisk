<template>
    <div class="home">
        <Heads :back="false" :title="'首页'" :isRiskAdd="true"></Heads>
        <swiper 
            loop 
            auto 
            :show-desc-mask="false" 
            :list="swiperList" 
            :index="swiperIndex" 
            @on-index-change="swiperChange"
            :interval="5000"
        ></swiper>
        <load-more :show-loading="false" :tip="'暂无已审核风险'" background-color="#fbf9fe"></load-more>
    </div>
</template>
<script>
    import { Swiper, LoadMore } from 'vux'
    import Heads from './../../components/Heads.vue'
    export default {
        components: {
            Heads,
            Swiper,
            LoadMore
        },
        data(){
            return {
                swiperIndex: 1,
                swiperList:[{
                    url: 'javascript:',
                    img: 'http://wx-cityrisk.subei88.com/Upload/banner.jpg',
                    title: '送你一朵fua'
                    }, 
                    // {
                    // url: 'javascript:',
                    // img: 'http://seopic.699pic.com/photo/50039/4298.jpg_wh1200.jpg',
                    // title: '送你一辆车'
                    // },
                     {
                    url: 'javascript:',
                    img: 'http://wx-cityrisk.subei88.com/Assets/img/login-bgNew.jpg',
                    title: '送你一次旅行'
                }]
            }
        },
        methods:{
            swiperChange(val){
                console.log(val);
            }
        }
    }
</script>
<style lang="less" scoped>
    .home{

    }
</style>