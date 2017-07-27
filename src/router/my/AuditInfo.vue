<template>
    <div id="AuditInfo">
        <Heads :title="'风险详情'"></Heads>
        <!--审核通过-->
        <div id="see" style="display: none">
            <div class="BasicInfoA">
                <div class="title">基本信息</div>
                <x-input title="险源名称" :disabled="true" value="热带强台风" placeholder=""></x-input>
                <!--<x-input title="风险类别" :disabled="true" value="台风" placeholder="暂无"></x-input>-->
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

            <div class="BasicInfoB">
                <div class="title">风险评估</div>
                <x-input title="评估类型" :disabled="true" value="管理员" placeholder="暂无"></x-input>
                <x-input title="频繁程度" :disabled="true" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="事故后果" :disabled="true" value="默认" placeholder="暂无"></x-input>
                <x-input title="可能性" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <x-input title="风险等级" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <x-input id="Score" title="分值" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <div>
                    <x-input title="风险描述" style="width: 90px; float: left; border-top: 0;"></x-input>
                </div>
                <div id="describe">
                    <x-textarea class="x_textarea" readonly></x-textarea>
                </div>
            </div>
        </div>



        <!--审核未通过或待审核-->
        <div id="edit" style="display: block">
            <div class="BasicInfoA">
                <div class="title">基本信息</div>
                <x-input title="险源名称" value="热带强台风" placeholder=""></x-input>
                <!--<x-input title="风险类别" value="台风" placeholder="暂无"></x-input>-->
                <selector title="对象类型" placeholder="请选择" :options="riskObjectType"></selector>
                <x-input title="风险地址" value="广东省深圳南山西丽" placeholder="暂无"></x-input>
                <x-input title="经度/纬度" value="10/20.0" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoC">
                <div class="title">责任主体</div>
                <x-input title="单位名称" value="巡查员" placeholder="暂无"></x-input>
                <x-input title="单位地址" value="南山西丽珠光" placeholder="暂无"></x-input>
                <x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" value="15070713712" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoD">
                <div class="title">监管机构</div>
                <x-input title="单位名称" value="管理员" placeholder="暂无"></x-input>
                <x-input title="单位地址" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" value="15070713710" placeholder="暂无"></x-input>
            </div>

            <div class="BasicInfoB">
                <div class="title">风险评估</div>
                <selector title="评估类型" :options="RiskAssessType" v-model="defalutAssess.RiskAssessTypeID" @on-change="RiskAssessTypeChoose"></selector>
                <selector title="频繁程度" :options="RiskAssessE" v-model="defalutAssess.RiskAssessEScore" @on-change="RiskAssessEChoose"></selector>
                <selector title="事故后果" :options="RiskAssessC" v-model="defalutAssess.RiskAssessCScore" @on-change="RiskAssessCChoose"></selector>
                <selector title="可能性" :options="RiskAssessL" v-model="defalutAssess.RiskAssessLScore" @on-change="RiskAssessLChoose"></selector>
                <x-input title="风险等级" :disabled="true" :value="RiskAssessDetailLv" placeholder="等级"></x-input>
                <x-input title="风险分值" :value="countScore" :disabled="true" placeholder="分值"></x-input>
                <div>
                    <x-input title="风险描述" style="width: 90px; float: left; border-top: 0;"></x-input>
                </div>
                <div id="describe">
                    <x-textarea class="x_textarea" placeholder="请输入描述"></x-textarea>
                </div>
            </div>
            <flexbox>
                <flexbox-item>
                    <x-button type="primary">提交</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type="warn">撤销</x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { mapState } from 'vuex'
    import { XInput, XTextarea, XButton, Flexbox, FlexboxItem, Selector } from 'vux'
    export default {

        data() {
            return {
                status: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessDetailLv: '',
                defalutAssess: {

                    "ID": 1025,
                    "RiskID": 1022,

                    "RiskAssessTypeID": '',     //** 评估类型ID /火灾ID */
                    "RiskAssessTypeName": "",   //** 类型的名称 /火灾 */

                    "RiskAssessLID": '',        //** ID */
                    "RiskAssessLName": '',      //** 名称 */
                    "RiskAssessLScore": '',     //** 分值 */

                    "RiskAssessEID": '',        //** ID */
                    "RiskAssessEName": "",      //** 名称 */
                    "RiskAssessEScore": '',     //** 分值 */

                    "RiskAssessCID": '',        //** ID */
                    "RiskAssessCName": "",      //** 名称 */
                    "RiskAssessCScore": '',     //** 分值 */

                    "RiskAssessDetailLv": '',   //** 4(可忽略)，3(低)，2(中等)，1(高)，0(极高) 风险等级 */
                    "RiskAssessDetailScore": '' //** 分值 10000 */
                }
            }
        },

        components: {
            XInput,
            Heads,
            XTextarea,
            XButton,
            Flexbox,
            FlexboxItem,
            Selector
        },
        computed: {
            ...mapState({
                RiskAssessType: state => {
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
                RiskAssessC: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentConsequence.length != 0) {
                        for (let item in state.evaluation.AccidentConsequence[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },

                RiskAssessE: state => {
                    let riskData = [];

                    if (state.evaluation.ExposedDegree.length != 0) {
                        for (let item in state.evaluation.ExposedDegree[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },
                RiskAssessL: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentPossibility.length != 0) {
                        for (let item in state.evaluation.AccidentPossibility[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },

                riskObjectType: state => { //获取对象类型
                    let riskObjectType = [];

                    if (state.tiskAdd.riskObjectType.length != 0) {
                        for (let item in state.tiskAdd.riskObjectType) {
                            riskObjectType.push({
                                key: state.tiskAdd.riskObjectType[item].ID,
                                value: state.tiskAdd.riskObjectType[item].ObjectTypeName
                            });
                        }
                    }

                    return riskObjectType;
                },
                riskObjectTypeChildChoose(val) {
                    for (let items in this.riskObjectTypeChild) {

                        if (this.riskObjectTypeChild[items].key == val) {
                            this.upRiskAdd({ RiskObjectTypeID2: this.riskObjectTypeChild[items].key })
                            this.upRiskAdd({ riskObjectTypeChildChoose: this.riskObjectTypeChild[items].value })
                        }

                    }
                },
            }),

            countScore() {
                this.defalutAssess.RiskAssessDetailScore = this.defalutAssess.RiskAssessLScore * this.defalutAssess.RiskAssessEScore * this.defalutAssess.RiskAssessCScore;
                let countVal = this.defalutAssess.RiskAssessDetailScore;

                let status = ['极高', '高', '中等', '低', '可忽略'];
                let state;
                if (countVal <= 70) {
                    state = 4;
                } else if (countVal >= 70 && countVal < 150) {
                    state = 3;
                } else if (countVal >= 150 && countVal < 240) {
                    state = 2;
                } else if (countVal >= 240 && countVal < 720) {
                    state = 1;
                } else if (countVal >= 720) {
                    state = 0;
                }

                this.RiskAssessDetailLv = status[state];
                this.defalutAssess.RiskAssessDetailLv = state;

                return this.defalutAssess.RiskAssessLScore * this.defalutAssess.RiskAssessEScore * this.defalutAssess.RiskAssessCScore;
            }
        },

        methods: {

            RiskAssessTypeChoose(val) {
                for (let key in this.RiskAssessType) {
                    if (this.RiskAssessType[key].key == this.defalutAssess.RiskAssessTypeID) {
                        this.defalutAssess.RiskAssessTypeName = this.RiskAssessType[key].value;
                        break;
                    }
                }
            },
            RiskAssessCChoose(data) {
                for (let key in this.RiskAssessC) {
                    if (this.RiskAssessC[key].key == this.defalutAssess.RiskAssessCScore) {
                        this.defalutAssess.RiskAssessCID = this.RiskAssessC[key].id;
                        this.defalutAssess.RiskAssessCName = this.RiskAssessC[key].value;
                        break;
                    }
                }
            },

            RiskAssessLChoose(data) {
                for (let key in this.RiskAssessL) {
                    if (this.RiskAssessL[key].key == this.defalutAssess.RiskAssessLScore) {
                        this.defalutAssess.RiskAssessLID = this.RiskAssessL[key].id;
                        this.defalutAssess.RiskAssessLName = this.RiskAssessL[key].value;
                        break;
                    }
                }
            },
            RiskAssessEChoose(data) {
                for (let key in this.RiskAssessE) {
                    if (this.RiskAssessE[key].key == this.defalutAssess.RiskAssessEScore) {
                        // console.log(`${this.RiskAssessE[key].value}||${this.RiskAssessE[key].key}||${this.RiskAssessE[key].id}`);
                        this.defalutAssess.RiskAssessEID = this.RiskAssessE[key].id;
                        this.defalutAssess.RiskAssessEName = this.RiskAssessE[key].value;
                        break;
                    }
                }

            }
        }
    }

</script>
<style lang="less">
    #AuditInfo {
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
    
    .popup0 .weui-cell {
        font-size: 17px;
    }
    
    [v-cloak] {
        display: none;
    }
    
    #describe .weui-cell__bd {
        height: 180px;
        margin-bottom: 20px;
    }
    
    #describe {
        border-top: 1px solid #D9D9D9;
        margin: 0 0 0 15px;
    }
    
    textarea {
        height: 150px;
    }
    
    .x_textarea {
        width: 220px;
        padding: 15px 0 0 0 !important;
        font-size: 16px;
    }
    
    #describe .weui-cell:before {
        border-top: 0 solid white !important;
        color: white;
    }
    
    .vux-flexbox {
        position: fixed;
        bottom: 0;
        z-index: 99;
    }
    
    .weui-btn_primary {
        background-color: #33CC99 !important;
    }
    
    .vux-flexbox-item {
        margin: 0px !important;
    }
    
    .weui-btn {
        border-radius: 0 !important;
    }
</style>