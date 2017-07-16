<template>
    <div class="riskInfo">
        <Heads :title="'风险详情'" :isDanger="true"></Heads>
        <div class="BasicInfoA">
            <div class="title">基本信息</div>
            <x-input title="险源名称" :disabled="true" value="热带强台风" placeholder=""></x-input>
            <x-input title="风险类别" :disabled="true" value="台风" placeholder="暂无"></x-input>
            <x-input title="类别名称" :disabled="true" value="类别名称" placeholder="暂无"></x-input>
            <x-input title="对象类型" :disabled="true" value="自然危险源" placeholder="暂无"></x-input>
            <x-input title="风险地址" :disabled="true" value="广东省深圳南山西丽" placeholder="暂无"></x-input>
            <x-input title="经度/纬度" :disabled="true" value="10/20.0" placeholder="暂无"></x-input>
        </div>
        <div class="BasicInfoB">
            <div class="title">评估信息</div>
            <x-input title="可能性分析L" :disabled="true" value="可能性小，完全意外" placeholder="暂无"></x-input>
            <x-input title="露频繁程度E" :disabled="true" value="连续暴露" placeholder="暂无"></x-input>
            <x-input title="后果严重性C" :disabled="true" value="10人以上死亡" placeholder="暂无"></x-input>
            <x-input title="等级" :disabled="true" value="红色" placeholder="暂无"></x-input>
            <x-input title="风值" :disabled="true" value="200" placeholder="暂无"></x-input>
        </div>
        <div class="BasicInfoC">
            <div class="title">责任主体</div>
            <x-input title="单位名称" :disabled="true" value="巡查员" placeholder="暂无"></x-input>
            <x-input title="单位地址" :disabled="true" value="南山西丽珠光" placeholder="暂无"></x-input>
            <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" value="15070713712" placeholder="暂无"></x-input>
        </div>
        <div class="BasicInfoD">
            <div class="title">监管机构</div>
            <x-input title="单位名称" :disabled="true" value="管理员" placeholder="暂无"></x-input>
            <x-input title="单位地址" :disabled="true" value="南山西丽茶光" placeholder="暂无"></x-input>
            <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
        </div>
        <!--<tab :line-width=2 active-color='#33CC99' v-model="index">
            <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click.native="status = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" :show-dots="true">
            <transition v-bind:enter-active-class="'fadeIn animated'">
                <div class="BasicInfoA" v-if="lists[0] == status">
                    <x-input title="险源名称" :disabled="true" value="热带强台风" placeholder=""></x-input>
                    <x-input title="风险类别" :disabled="true" value="台风" placeholder="暂无"></x-input>
                    <x-input title="类别名称" :disabled="true" value="类别名称" placeholder="暂无"></x-input>
                    <x-input title="对象类型" :disabled="true" value="自然危险源" placeholder="暂无"></x-input>
                    <x-input title="风险地址" :disabled="true" value="广东省深圳南山西丽" placeholder="暂无"></x-input>
                    <x-input title="经度/纬度" :disabled="true" value="10/20.0" placeholder="暂无"></x-input>
                </div>
                <div class="BasicInfoB" v-if="lists[1] == status">
                    <x-input title="可能性分析L" :disabled="true" value="可能性小，完全意外" placeholder="暂无"></x-input>
                    <x-input title="露频繁程度E" :disabled="true" value="连续暴露" placeholder="暂无"></x-input>
                    <x-input title="后果严重性C" :disabled="true" value="10人以上死亡" placeholder="暂无"></x-input>
                    <x-input title="等级" :disabled="true" value="红色" placeholder="暂无"></x-input>
                    <x-input title="风值" :disabled="true" value="200" placeholder="暂无"></x-input>
                </div>
                <div class="BasicInfoC" v-if="lists[2] == status">
                    <x-input title="单位名称" :disabled="true" value="高" placeholder="暂无"></x-input>
                    <x-input title="单位地址" :disabled="true" value="200" placeholder="暂无"></x-input>
                    <x-input title="联系人" :disabled="true" value="高" placeholder="暂无"></x-input>
                    <x-input title="联系电话" :disabled="true" value="高" placeholder="暂无"></x-input>
                </div>
                <div class="BasicInfoD" v-if="lists[3] == status">
                    <x-input title="单位名称" :disabled="true" value="高" placeholder="暂无"></x-input>
                    <x-input title="单位地址" :disabled="true" value="200" placeholder="暂无"></x-input>
                    <x-input title="联系人" :disabled="true" value="高" placeholder="暂无"></x-input>
                    <x-input title="联系电话" :disabled="true" value="高" placeholder="暂无"></x-input>
                </div>
            </transition>
        </swiper>-->
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XInput } from 'vux'
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
            XInput
        },
        watch:{
            index(val,old){
            }
        },
        created(){
            console.log(this.$route.params)
        },
        data(){
            return{
                lists: list(),
                index: 0,
                status:'基本信息',
                routerName: ['basicInfoA','basicInfoB','basicInfoC','basicInfoD']
            }
        },
        watch:{
            status(val,oldVal){
            }
        }
    }
</script>
<style lang="less" scoped>
    .riskInfo{
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
    }
    .vux-swiper{
        height:100%!important;
    }
    .weui-label{
        width: 6em!important;
    }
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 45px;
        border-bottom:2px solid #33CC99;
    }
    .BasicInfoA{margin-top:15px;background:#fff;}
    .BasicInfoB{margin-top:15px;background:#fff;}
    .BasicInfoC{margin-top:15px;background:#fff;}
    .BasicInfoD{margin-top:15px;background:#fff;}
</style>