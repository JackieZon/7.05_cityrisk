<template>
    <div class="addrisk">
        <Heads :back="false" :title="'新增风险源'" :isMap="true"></Heads>
        <tab :line-width=2 active-color='#33CC99' v-model="index">
            <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click="status = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" :show-dots="false" :height="'100%'">
            <transition v-bind:enter-active-class="'fadeIn animated'">
                <router-view></router-view>
            </transition>
        </swiper>
    </div>
</template>
<script>
    import Heads from './../../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    const list = () => ['基本信息', '责任主体', '监管机构', '评估信息']

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
        watch:{
            index(val,old){
                this.$router.push({name:this.routerName[val]})
            },
            '$route' (to, from) {
                if(this.routerName.indexOf(to.name)!=-1){
                    this.index = this.routerName.indexOf(to.name);
                }
            }
        },
        created(){
            this.$router.push({name:'basicInfoA'})
        },
        data(){
            return{
                lists: list(),
                index: 0,
                status:'基本信息',
                routerName: ['basicInfoA','basicInfoC','basicInfoD','basicInfoB']
            }
        }
    }
</script>
<style lang="less" scoped>
    .addrisk{
        display: flex;
        flex-direction: column;
        height: 100%;
        .vux-slider{
            height: 100%;
            .vux-swiper{
                height: 100%!important;
            }
        }
    }
    .weui-label{
        width: 5em!important;
    }
</style>