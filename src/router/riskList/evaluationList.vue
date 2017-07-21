<template>
    <div class="riskInfo" v-cloak>
        <Heads :title="'评估列表'" :isEvaluationList="true" v-on:addEvaluation="addEvaluation"></Heads>
        <div class="BasicInfoB" v-for="item in evaluatioList">
            <div class="title">评估信息</div>
            <x-input title="风险类型" :disabled="true" :value="item.RiskAssessTypeName" placeholder="暂无"></x-input>
            <x-input title="可能性分析L" :disabled="true" :value="item.RiskAssessLName" placeholder="暂无"></x-input>
            <x-input title="后果严重性C" :disabled="true" :value="item.RiskAssessCName" placeholder="暂无"></x-input>
            <x-input title="频繁程度E" :disabled="true" :value="item.RiskAssessEName" placeholder="暂无"></x-input>
            <x-input title="等级" :disabled="true" :value="item.RiskAssessDetailLv" placeholder="暂无"></x-input>
            <x-input title="分值" :disabled="true" :value="item.RiskAssessDetailScore" placeholder="暂无"></x-input>
        </div>
        <div v-transfer-dom>
            <popup v-model="show">
                <div class="popup0">
                    <group>
                        <div class="title">新增评估信息</div>
                        <selector title="风险类别" :options="riskType" v-model="riskTypeAdd" @on-change="evaluationAdd"></selector>
                        <selector title="后果严重性C" :options="AccidentConsequence"></selector>
                        <selector title="可能性分析L" :options="AccidentPossibility"></selector>
                        <selector title="频繁程度E" :options="ExposedDegree"></selector>
                        <x-input title="等级" placeholder="请输入等级"></x-input>
                        <x-input title="风值" placeholder="请输入风值"></x-input>

                        <div class="next" v-on:click="submitEvaluation">
                            <x-button>提交</x-button>
                        </div>
                    </group>
                </div>
            </popup>
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

        created() {
            this.$store.dispatch("getEvaluatioList")

            // console.log(JSON.stringify(this.$store.state.evaluation.evaluatioList))

        },

        data() {
            return {
                show: false,
                showToast: true,
                riskTypeAdd:'asd'
            }
        },
        methods: {
            addEvaluation(data) {
                this.show = data
            },
            submitEvaluation() {
                this.show = false
            },
            evaluationAdd(e){
                alert(e)
            }
        },

        computed: {

            ...mapState({
                //获取state内的列表数据
                evaluatioList: state => state.evaluation.evaluatioList,
                riskType: state => {
                    let riskData = [];

                    if (state.evaluation.RiskType.length != 0) {
                        for (let item in state.evaluation.RiskType[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.RiskType[0].detail_BaseDataList[item].BaseName.ID,
                                value: state.evaluation.RiskType[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },

                AccidentConsequence: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentConsequence.length != 0) {
                        for (let item in state.evaluation.AccidentConsequence[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseName.ID,
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
                                key: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseName.ID,
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
                                key: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseName.ID,
                                value: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                }

            }),

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
    
    button.weui-btn,
    input.weui-btn {
        color: white;
        background: #33CC99;
    }
    
    .popup0 .weui-cell {
        font-size: 17px;
    }
    
    [v-cloak] {
        display: none
    }
</style>