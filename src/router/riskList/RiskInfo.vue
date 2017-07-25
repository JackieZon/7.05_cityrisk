<template>
    <div class="riskInfo" v-cloak>
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
        <!--<div v-transfer-dom>
            <popup v-model="show">
                <div class="popup0">
                    <group>
                        <div class="title">新增评估信息</div>
                        <selector title="风险类别" :options="riskType" @on-change="riskTypeValue"></selector>
                        <selector title="后果严重性C" :options="AccidentConsequence" @on-change="AccidentConsequenceValue"></selector>
                        <selector title="可能性分析L" :options="AccidentPossibility" @on-change="AccidentPossibilityValue"></selector>
                        <selector title="频繁程度E" :options="ExposedDegree" @on-change="ExposedDegreeValue"></selector>
                        <x-input title="等级" placeholder="请输入等级"></x-input>
                        <x-input title="风值" placeholder="请输入风值"></x-input>

                        <div class="next" v-on:click="postRiskAssessAdd">
                            <x-button>提交</x-button>
                        </div>
                    </group>
                </div>
            </popup>
        </div>-->
        <div class="evaluation">
            <div class="title">评估列表<span class="more" v-on:click="openEvaluation">查看全部</span></div>
            <div class="evaluationList" v-on:click="openEvaluationInfo">
                <div style="font-size: 14px;">
                    <p class="p_center" style="position: absolute; right: 10px;"><img src="./../../assets/icon/level.svg" alt="">{{ '蓝色' }}</p>
                    <p class="p_center" style="position: absolute; right: 10px; top: 40px;"><img src="./../../assets/icon/windPower.svg" alt="">{{ '18级' }}</p>
                    <p class="p_center"><img src="./../../assets/icon/riskType.svg" alt="">风险类型: 火灾、爆炸</p>
                    <p class="p_center"><img src="./../../assets/icon/appraiser.svg" alt="">评估人:李四</p>
                    <p class="p_center"><img src="./../../assets/icon/time2.svg" alt="">评估时间: 2017-07-24 16:39</p>
                    <img style="position: absolute; top: 105px;" src="./../../assets/icon/describe.svg" alt="">
                    <p style="margin-left: 30px; overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1; -webkit-box-orient: vertical;">描述: 这个风险源涉及的风险较多，需要着重重视，存在很多爆炸性物品随意堆放！</p>
                    <p class="p_center" style=" margin-top: 4px;"><img src="./../../assets/icon/auditor.svg" alt="">审核人: 张三</p>
                    <p style="float: right; margin-top: -31px;">审核状态: 未审核</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { TransferDom, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, Selector, Group, Popup } from 'vux'
    import { mapState } from "vuex"
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
            Group
        },
        watch: {
            status(val, oldVal) {
            }
        },
        methods: {
            openEvaluationInfo (){
                this.$router.push({ name: 'evaluationInfo' });
            },

            openEvaluation() {
                this.$router.push({ name: "evaluationList" });
            },
            addEvaluation() {
                this.show = true
            },
            riskTypeValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.RiskType[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.RiskType[0].detail_BaseDataList[i].ID == data) {
                        this.$store.commit("riskTypeValue", { "key": data, "value": this.$store.state.evaluation.RiskType[0].detail_BaseDataList[i].BaseName })
                    }
                }
            },
            AccidentConsequenceValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList[i].ID == data) {
                        this.$store.commit("AccidentConsequenceValue", { "key": data, "value": this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList[i].BaseName })
                    }
                }
            },

            AccidentPossibilityValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList[i].ID == data) {
                        this.$store.commit("AccidentPossibilityValue", { "key": data, "value": this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList[i].BaseName })
                    }
                }
                // alert(data)
                // console.log(JSON.stringify(this.$store.state.evaluation))

            },
            ExposedDegreeValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList[i].ID == data) {
                        this.$store.commit("ExposedDegreeValue", { "key": data, "value": this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList[i].BaseName })
                    }
                }
            },

            postRiskAssessAdd() {
                this.show = false
                this.$store.dispatch("postRiskAssessAdd")
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
                //获取state内的列表数据
                evaluatioList: state => state.evaluation.evaluatioList,
                // riskTypeValue: state => state.evaluation.riskTypeValue,

                riskType: state => {
                    let riskData = [];
                    let t_data = this;

                    if (state.evaluation.RiskType.length != 0) {
                        for (let item in state.evaluation.RiskType[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.RiskType[0].detail_BaseDataList[item].ID,
                                value: state.evaluation.RiskType[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    // alert(JSON.stringify(riskData))
                    return riskData;
                },

                AccidentConsequence: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentConsequence.length != 0) {
                        for (let item in state.evaluation.AccidentConsequence[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].ID,
                                value: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },

                ExposedDegree: state => {
                    let riskData = [];

                    if (state.evaluation.ExposedDegree.length != 0) {
                        for (let item in state.evaluation.ExposedDegree[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].ID,
                                value: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },
                AccidentPossibility: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentPossibility.length != 0) {
                        for (let item in state.evaluation.AccidentPossibility[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].ID,
                                value: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
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