<template>
    <div class="riskInfo" v-cloak>
        <Heads :title="'评估列表'" :isEvaluationList="true"></Heads>
        <div class="evaluation" v-for="item in searchList">
            <div class="evaluationList" v-on:click="openEvaluationInfo">
                <div style="font-size: 14px;">
                    <p class="p_center" style="position: absolute; right: 10px;"><!--<img src="./../../assets/icon/level.svg" alt="">-->{{ '蓝色' }}</p>
                    <p class="p_center" style="position: absolute; right: 10px; top: 40px;"><!--<img src="./../../assets/icon/windPower.svg" alt="">-->{{ '18级' }}</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/riskType.svg" alt="">-->风险类型: 火灾、爆炸</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/appraiser.svg" alt="">-->评估人:李四</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/time2.svg" alt="">-->评估时间: 2017-07-24 16:39</p>
                    <!--<img style="position: absolute; top: 105px;" src="./../../assets/icon/describe.svg" alt="">-->
                    <p style="margin-left: 30px; overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical;">描述: 这个风险源涉及的风险较多，需要着重重视，存在很多爆炸性物品随意堆放！</p>
                    <p class="p_center" style=" margin-top: 4px;"><!--<img src="./../../assets/icon/auditor.svg" alt="">-->审核人: 张三</p>
                    <p class="auditStatus">审核状态: 未审核</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { TransferDom, XInput, Popup, Radio, XTextarea, XButton, Group, XSwitch, Selector } from "vux"
    import Heads from './../../components/Heads.vue'
    import { mapState } from 'vuex'

    export default {


        directives: {

            TransferDom

        },

        components: {

            XInput,
            Heads,
            Popup,
            Radio,
            XTextarea,
            XButton,
            Group,
            XSwitch,
            Selector

        },


        data() {
            return {
                show: false,
                showToast: true,
                searchList: [1, 2, 3, 4, 5, 6]
            }
        },

        created() {

        },

        methods: {
            openEvaluationInfo() {
                this.$router.push({ name: 'evaluationInfo' });
            }


        },

        computed: {

            ...mapState({

            })

        }

    }

</script>
<style>
    .riskInfo {
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
    }
    
    .vux-swiper {
        height: 100%!important;
    }
    
    .weui-label {
        width: 6em!important;
    }
    
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 45px;
        border-bottom: 2px solid #33CC99;
    }
    
    .BasicInfoB {
        margin-top: 15px;
        background: #fff;
    }
    
    .next {
        border-top: 1px solid #f1f1f1;
        box-sizing: border-box;
        padding: 15px;
        background: #f1f1f1;
    }
    
    .popup0 .weui-cell {
        font-size: 17px;
    }
    
    .evaluation {
        width: 100%;
        margin: 15px 0 10px 0;
        background: white;
    }
    
    .evaluationList {
        padding: 10px 15px;
        position: relative;
    }
    
    .evaluationList p {
        line-height: 30px;
    }
    
    .evaluationList img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    
    .p_center {
        display: flex;
        align-items: center;
    }
    
    .auditStatus {
        float: right;
        margin-top: -31px;
    }
    
    [v-cloak] {
        display: none
    }
</style>