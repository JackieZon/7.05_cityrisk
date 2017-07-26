<template>
    <div class="riskInfo" v-cloak>
        <Heads :title="'风险详情'" :isDanger="true"></Heads>
        <div class="BasicInfoA">
            <div class="title">基本信息</div>
            <x-input title="险源名称" :disabled="true" placeholder="暂无" :value="riskInfo.RiskName"></x-input>
            <x-input title="对象类型" :disabled="true" placeholder="暂无" :value="`${riskInfo.RiskObjectTypeName1} - ${riskInfo.RiskObjectTypeName2}`"></x-input>
            <x-input title="经度/纬度" :disabled="true" value="10/20.0" placeholder="暂无"></x-input>

            <x-input 
                title="风险地址" 
                :disabled="true" 
                :value="`${riskInfo.RiskAreaName1}-${riskInfo.RiskAreaName2}-${riskInfo.RiskAreaName3}-${riskInfo.RiskAreaName4}-${riskInfo.RiskAreaName5}-${riskInfo.RiskAddress}`"
                placeholder="暂无"
             ></x-input>

            <x-textarea 
                v-show="false"
                title="风险地址" 
                placeholder="风险地址" 
                :readonly="true"
                :show-counter="false"
                :value="`${riskInfo.RiskAreaName1}-${riskInfo.RiskAreaName2}-${riskInfo.RiskAreaName3}-${riskInfo.RiskAreaName4}-${riskInfo.RiskAreaName5}-${riskInfo.RiskAddress}`"
            ></x-textarea>
            
        </div>

        <div class="BasicInfoC" v-if="JSON.stringify(riskInfo.ListRiskDuty)!=='[]'" v-for="item in riskInfo.ListRiskDuty">
            <div class="title">责任主体</div>
            <x-input title="单位名称" :disabled="true" placeholder="暂无" :value="item.RiskDutyName" ></x-input>
            <x-input title="单位地址" :disabled="true" placeholder="暂无" :value="`${item.RiskDutyAreaName1}-${item.RiskDutyAreaName2}-${item.RiskDutyAreaName3}-${item.RiskDutyAddress}`"></x-input>
            <x-input title="联系人" :disabled="true" placeholder="暂无" :value="item.RiskDutyContactMan"></x-input>
            <x-input title="联系电话" :disabled="true" placeholder="暂无" :value="item.RiskDutyContactTel"></x-input>
        </div>

        <div class="BasicInfoD">
            <div class="title">监管机构</div>
            <x-input title="单位名称" :disabled="true" value="管理员" placeholder="暂无"></x-input>
            <x-input title="单位地址" :disabled="true" value="南山西丽茶光" placeholder="暂无"></x-input>
            <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
        </div>
        
        <div class="evaluation">
            <div class="title">评估列表<span class="more" v-on:click="openEvaluation">查看全部</span></div>
            <div class="evaluationList" v-on:click="openEvaluationInfo">
                <div style="font-size: 14px;">
                    <p class="p_center" style="position: absolute; right: 10px;"><!--<img src="./../../assets/icon/level.svg" alt="">-->{{ '蓝色' }}</p>
                    <p class="p_center" style="position: absolute; right: 10px; top: 40px;"><!--<img src="./../../assets/icon/windPower.svg" alt="">-->{{ '18级' }}</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/riskType.svg" alt=""-->>风险类型: 火灾、爆炸</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/appraiser.svg" alt="">-->评估人:李四</p>
                    <p class="p_center"><!--<img src="./../../assets/icon/time2.svg" alt="">-->评估时间: 2017-07-24 16:39</p>
                    <!--<img style="position: absolute; top: 105px;" src="./../../assets/icon/describe.svg" alt="">-->
                    <p style="margin-left: 30px; overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical;">描述: 这个风险源涉及的风险较多，需要着重重视，存在很多爆炸性物品随意堆放！</p>
                    <p class="p_center" style=" margin-top: 4px;"><!--<img src="./../../assets/icon/auditor.svg" alt="">-->审核人: 张三</p>
                    <p style="float: right; margin-top: -31px;">审核状态: 未审核</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { TransferDom, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, Selector, Group, Popup, XTextarea } from 'vux'
	import {mapMutations, mapState, mapActions} from 'vuex'
    const list = () => ['基本信息', '评估信息', '责任主体', '监管机构']

    export default {
        directives: {
            TransferDom
        },
        components: {
            Heads,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            XInput,
            Selector,
            Popup,
            Group,
            XTextarea,
        },
        watch: {
            status(val, oldVal) {
            }
        },
        mounted(){
            this.getRiskInfo(this.$route.params.id);
        },
        methods: {
            ...mapMutations([
            ]),
			...mapActions([
				'getRiskInfo'
            ]),
            openEvaluationInfo (){
                this.$router.push({ name: 'evaluationInfo' });
            },

            openEvaluation() {
                this.$router.push({ name: "evaluationList" });
            },
            addEvaluation() {
                this.show = true
            }
        },
        data() {
            return {
                lists: list(),
                index: 0,
                status: '基本信息',
                routerName: ['basicInfoA', 'basicInfoB', 'basicInfoC', 'basicInfoD'],
                show: false,
                showToast: true
            }
        },
        computed: {
            ...mapState({
                riskInfo(state){
                    return state.riskInfo.riskInfo;
                }
            })
        }
    }

</script>
<style lang="less" scoped>
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
    
    .more {
        position: absolute;
        right: 15px;
        font-size: 14px;
        color: #A9A9A9;
    }
    
    .BasicInfoA {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoB {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoC {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoD {
        margin-top: 15px;
        background: #fff;
    }
    
    .next {
        border-top: 1px solid #f1f1f1;
        box-sizing: border-box;
        padding: 15px;
        background: #f1f1f1;
    }
    
    button.weui-btn,
    input.weui-btn {
        color: white;
        background: #33CC99;
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
    
    [v-cloak] {
        display: none;
    }
</style>