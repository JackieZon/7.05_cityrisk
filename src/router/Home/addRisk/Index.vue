<template>
    <div>
        <Heads :back="false" :title="'新增风险源'" :isMap="true"></Heads>
        <div>
            <tab :line-width=2 active-color='#33CC99' v-model="index">
                <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click="status = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" height="100px" :show-dots="false">
                <swiper-item v-for="(item, index) in lists" :key="index">
                    <router-view></router-view>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>
<script>
    import Heads from './../../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    const list = () => ['基本信息', '评估信息', '责任主体', '监管机构']

    export default{
        components:{
            Heads,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
        },
        data(){
            return{
                lists: list(),
                index: 0,
                status:'基本信息',
            }
        },
    }
</script>
<style lang="less">
    
</style>