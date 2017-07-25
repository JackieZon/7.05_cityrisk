<template>
    <div class="addEvaluation">
        <div class="enterInfo">
            <Heads :title="'新增评估'" :isEvaluationList="false"></Heads>

            <!--<x-input title="评估人" :disabled="true" value="JackieZon（系统默认值）" placeholder="评估人"></x-input>
            <x-input title="联系电话" :disabled="true" value="15070713710（系统默认值）" placeholder="联系电话"></x-input>
            <x-input title="评估时间" :disabled="true" :value="nuwData" placeholder="评估时间"></x-input>-->

            <x-input title="等级/分值" :disabled="true" value="(待设置) / (待设置)" placeholder="风险等级"></x-input>

            <x-textarea title="风险描述" placeholder="风险描述" :show-counter="false" :value="riskIntro" @on-change="changeRiskIntro"></x-textarea>

            <group>
                <swipeout>
                    <swipeout-item transition-mode="follow">
                        <div slot="right-menu">
                            <swipeout-button @click.native="oepnListRiskAssess('edit')" type="primary">{{'编辑'}}</swipeout-button>
                            <swipeout-button @click.native="oepnListRiskAssess('delete')" type="warn">{{'删除'}}</swipeout-button>
                        </div>
                        <div slot="content" class="demo-content vux-1px-t">
                            <cell :title="'我是风险类型'" :inline-desc="'风险等级：高 ， 风险分值：200'">
                                <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../assets/icon/assess-icon.svg">
                            </cell>
                        </div>
                    </swipeout-item>
                </swipeout>
            </group>

            <div class="next">
                <x-button @click.native="evaluation = true">增加</x-button>
                <x-button @click.native="next">提交</x-button>
            </div>

            <popup v-model="evaluation" :hide-on-blur="false">
                <div class="evaluation">
                    <selector title="风险类型" :options="riskType" @on-change="riskTypeValue"></selector>
                    <selector title="频繁程度" :options="ExposedDegree" @on-change="ExposedDegreeValue"></selector>
                    <selector title="事故后果" :options="AccidentConsequence" @on-change="AccidentConsequenceValue"></selector>
                    <selector title="可能性" :options="AccidentPossibility" @on-change="AccidentPossibilityValue"></selector>
                    <x-input title="风险等级" :disabled="true" value="高" placeholder="等级"></x-input>
                    <x-input title="风险分值" :disabled="true" value="200" placeholder="分值"></x-input>
                    <div class="next1">
                        <x-button @click.native="evaluation = false">确定</x-button>
                        <x-button @click.native="evaluation = false">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>
    </div>
</template>
<script>
    import { XInput, Group, Cell, XAddress, ChinaAddressV3Data, XButton, Selector, Value2nameFilter as value2name, XTextarea, Popup, Confirm, XSwitch, TransferDomDirective as TransferDom, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapMutations, mapState } from 'vuex'
    import Heads from './../../components/Heads.vue'
    export default {
        components: {
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            Selector,
            XTextarea,
            Popup,
            Confirm,
            XSwitch,
            GroupTitle,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
            Heads
        },
        data() {
            return {
                evaluation: false,
                riskIntro: '',
                riskData: {
                    "ID": 0,
                    "RiskID": 0,
                    "RiskAssessID": 0,
                    "RiskAssessTypeID": 0,
                    "RiskAssessTypeName": "string",
                    "RiskAssessLID": 0,
                    "RiskAssessLName": "string",
                    "RiskAssessLScore": 0,
                    "RiskAssessEID": 0,
                    "RiskAssessEName": "string",
                    "RiskAssessEScore": 0,
                    "RiskAssessCID": 0,
                    "RiskAssessCName": "string",
                    "RiskAssessCScore": 0,
                    "RiskAssessDetailLv": 0,
                    "RiskAssessDetailScore": 0
                }
            }
        },
        methods: {
            ...mapMutations([
                'upRiskAdd'
            ]),
            changeRiskIntro(e) {

            },
            next() {
                this.$router.push({ name: 'basicInfoC' });
            },
            enter() {
                this.$router.push({ name: 'BasicInfoB_Evaluation' });
            },

            riskTypeValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.RiskType[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.RiskType[0].detail_BaseDataList[i].ID == data) {
                        this.riskData.RiskAssessTypeID = data;
                        this.riskData.RiskAssessTypeName = this.$store.state.evaluation.RiskType[0].detail_BaseDataList[i].BaseName
                    }
                }
            },
            AccidentConsequenceValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList[i].ID == data) {
                        alert(this.$store.state.evaluation.AccidentConsequence[0].detail_BaseDataList[i].BaseName)
                    }
                }
            },

            AccidentPossibilityValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList[i].ID == data) {
                        alert(this.$store.state.evaluation.AccidentPossibility[0].detail_BaseDataList[i].BaseName)
                    }
                }


            },
            ExposedDegreeValue(data) {
                for (let i = 0; i < this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList.length; i++) {
                    if (this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList[i].ID == data) {
                        alert(this.$store.state.evaluation.ExposedDegree[0].detail_BaseDataList[i].BaseName)
                    }
                }
            },
        },

        mounted() {
            const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
            this.riskIntro = postRiskAdd.RiskIntro
        },

        created() {
            this.$store.dispatch("getRiskBaseType")
        },

        computed: {

            nuwData() {
                let now = new Date();
                return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
            },

            ...mapState({
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
<style lang="less">
    .addEvaluation {
        height: 100%;
        background: #fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .enterInfo {
            margin-top: 10px;
            background: #fff;
        }
        .next {
            box-sizing: border-box;
            padding: 2rem 15px 15px;
            background: #fbf9fe;
        }
        .next1 {
            box-sizing: border-box;
            padding: 2rem 15px 15px;
        }
        .weui-label {
            width: 5em!important;
        }
        .evaluation {
            width: 100%;
            background: #fff;
            box-sizing: border-box;
        }
        .box1 {
            width: 600px;
            .vux-table {
                width: 600px;
            }
        }
        .vux-table td,
        .vux-table th {
            border-bottom: 1px solid #e0e0e0!important;
            border-right: 1px solid #e0e0e0!important;
            text-align: center!important;
        }
    }
</style>