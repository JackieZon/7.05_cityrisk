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
                    <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskAssessDetail">
                        <div slot="right-menu">
                            <swipeout-button @click.native="oepnAssess('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                            <swipeout-button @click.native="oepnAssess('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                        </div>
                        <div slot="content" class="demo-content vux-1px-t">
                            <cell :title="item.RiskAssessTypeName" :inline-desc="`等级:${status[item.RiskAssessDetailLv]}  分值:${item.RiskAssessDetailScore}`">
                                <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../assets/icon/assess-icon.svg">
                            </cell>
                        </div>
                    </swipeout-item>
                </swipeout>
            </group>
            <!--<group class="group">
                    <swipeout>
                        <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskAssessDetail">
                            <div slot="right-menu">
                                <swipeout-button @click.native="oepnAssess('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                                <swipeout-button @click.native="oepnAssess('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content vux-1px-t">
                                <cell :title="item.RiskAssessTypeName" :inline-desc="`等级:${status[item.RiskAssessDetailLv]}  分值:${item.RiskAssessDetailScore}`">
                                    <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../../assets/icon/assess-icon.svg">
                                </cell>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </group>-->
            <div class="next">
                <load-more v-if="JSON.stringify(ListRiskAssessDetail)=='[]'" :show-loading="false" :tip="'暂无评估'" background-color="#fbf9fe"></load-more>
            </div>

            <div class="next">
                <x-button @click.native="evaluation = true">增加</x-button>
                <x-button @click.native="upDataRiskAdd">提交评估</x-button>
            </div>

            <popup v-model="evaluation" :hide-on-blur="false">
                <div class="evaluation">
                    <selector title="评估类型" :options="RiskAssessType" v-model="defalutAssess.RiskAssessTypeID" @on-change="RiskAssessTypeChoose"></selector>
                    <selector title="频繁程度" :options="RiskAssessE" v-model="defalutAssess.RiskAssessEScore" @on-change="RiskAssessEChoose"></selector>
                    <selector title="事故后果" :options="RiskAssessC" v-model="defalutAssess.RiskAssessCScore" @on-change="RiskAssessCChoose"></selector>
                    <selector title="可能性" :options="RiskAssessL" v-model="defalutAssess.RiskAssessLScore" @on-change="RiskAssessLChoose"></selector>
                    <x-input title="风险等级" :disabled="true" :value="RiskAssessDetailLv" placeholder="等级"></x-input>
                    <x-input title="风险分值" :value="countScore" :disabled="true" placeholder="分值"></x-input>
                    <div class="next1">
                        <x-button @click.native="addAssess">确定</x-button>
                        <x-button @click.native="oepnAssess('close')">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>
    </div>
</template>
<script>
    import { LoadMore, XInput, Group, Cell, XAddress, ChinaAddressV3Data, XButton, Selector, Value2nameFilter as value2name, XTextarea, Popup, Confirm, XSwitch, TransferDomDirective as TransferDom, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'
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
            Heads,
            LoadMore
        },
        data() {
            return {
                evaluation: false,
                riskIntro: '',
                assessType: '',
                assessIndex: '',
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
        methods: {
            ...mapMutations([
                'openConfirm',
                'upRiskAdd',
                'pushAssessDetails',
                'deleteAssessDetails',
                'editAssessDetails',
                'saveAssesss'
            ]),
            ...mapActions([
                'showToast',
                'postRiskAdds'
            ]),
            changeRiskIntro(e) {
                this.saveAssesss({ RiskAssessIntro: e });
            },
            next() {
                this.$router.push({ name: 'basicInfoC' });
            },
            enter() {
                this.$router.push({ name: 'BasicInfoB_Evaluation' });
            },

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
                        console.log(`${this.RiskAssessE[key].value}||${this.RiskAssessE[key].key}||${this.RiskAssessE[key].id}`);
                        this.defalutAssess.RiskAssessEID = this.RiskAssessE[key].id;
                        this.defalutAssess.RiskAssessEName = this.RiskAssessE[key].value;
                        break;
                    }
                }

            },
            clearData() {
                this.defalutAssess.RiskAssessTypeID = '';
                this.defalutAssess.RiskAssessTypeName = '';
                this.defalutAssess.RiskAssessLID = '';
                this.defalutAssess.RiskAssessLName = '';
                this.defalutAssess.RiskAssessLScore = '';
                this.defalutAssess.RiskAssessEID = '';
                this.defalutAssess.RiskAssessEName = '';
                this.defalutAssess.RiskAssessEScore = '';
                this.defalutAssess.RiskAssessCID = '';
                this.defalutAssess.RiskAssessCName = '';
                this.defalutAssess.RiskAssessCScore = '';
                this.defalutAssess.RiskAssessDetailLv = '';
                this.defalutAssess.RiskAssessDetailScore = '';
            },

            addAssess() {
                const defaultData = this.defalutAssess;

                if (!defaultData.RiskAssessTypeID) {
                    this.showToast({ toastState: true, toastValue: '请选择评估类型' })
                    return;
                }

                if (!defaultData.RiskAssessEID) {
                    this.showToast({ toastState: true, toastValue: '请选择频繁程度' })
                    return;
                }

                if (!defaultData.RiskAssessCID) {
                    this.showToast({ toastState: true, toastValue: '请选择事故后果' })
                    return;
                }

                if (!defaultData.RiskAssessLID) {
                    this.showToast({ toastState: true, toastValue: '请选择可能性' })
                    return;
                }

                const assessUpData = {
                    RiskAssessTypeID: this.defalutAssess.RiskAssessTypeID,
                    RiskAssessTypeName: this.defalutAssess.RiskAssessTypeName,
                    RiskAssessLID: this.defalutAssess.RiskAssessLID,
                    RiskAssessLName: this.defalutAssess.RiskAssessLName,
                    RiskAssessLScore: this.defalutAssess.RiskAssessLScore,
                    RiskAssessEID: this.defalutAssess.RiskAssessEID,
                    RiskAssessEName: this.defalutAssess.RiskAssessEName,
                    RiskAssessEScore: this.defalutAssess.RiskAssessEScore,
                    RiskAssessCID: this.defalutAssess.RiskAssessCID,
                    RiskAssessCName: this.defalutAssess.RiskAssessCName,
                    RiskAssessCScore: this.defalutAssess.RiskAssessCScore,
                    RiskAssessDetailLv: this.defalutAssess.RiskAssessDetailLv,
                    RiskAssessDetailScore: this.defalutAssess.RiskAssessDetailScore
                }
                console.log(assessUpData);
                if (this.assessType == 'edit') {
                    this.editAssessDetails({
                        index: this.assessIndex,
                        list: assessUpData
                    });
                    this.clearData();
                    this.evaluation = false;
                } else {
                    this.openConfirm({
                        state: true, msg: '您确定要新增吗？', control: () => {
                            this.pushAssessDetails(assessUpData);
                            this.clearData();
                            this.evaluation = false;
                        }
                    })
                }


            },

            oepnAssess(type, index) {

                this.assessType = type;
                this.assessIndex = index;

                if (type == 'open') {
                    this.evaluation = true;
                } else if (type == 'edit') {

                    this.defalutAssess.RiskAssessTypeID = this.ListRiskAssessDetail[index].RiskAssessTypeID;
                    this.defalutAssess.RiskAssessTypeName = this.ListRiskAssessDetail[index].RiskAssessTypeName;
                    this.defalutAssess.RiskAssessLID = this.ListRiskAssessDetail[index].RiskAssessLID;
                    this.defalutAssess.RiskAssessLName = this.ListRiskAssessDetail[index].RiskAssessLName;
                    this.defalutAssess.RiskAssessLScore = this.ListRiskAssessDetail[index].RiskAssessLScore;
                    this.defalutAssess.RiskAssessEID = this.ListRiskAssessDetail[index].RiskAssessEID;
                    this.defalutAssess.RiskAssessEName = this.ListRiskAssessDetail[index].RiskAssessEName;
                    this.defalutAssess.RiskAssessEScore = this.ListRiskAssessDetail[index].RiskAssessEScore;
                    this.defalutAssess.RiskAssessCID = this.ListRiskAssessDetail[index].RiskAssessCID;
                    this.defalutAssess.RiskAssessCName = this.ListRiskAssessDetail[index].RiskAssessCName;
                    this.defalutAssess.RiskAssessCScore = this.ListRiskAssessDetail[index].RiskAssessCScore;
                    this.defalutAssess.RiskAssessDetailLv = this.ListRiskAssessDetail[index].RiskAssessDetailLv;
                    this.defalutAssess.RiskAssessDetailScore = this.ListRiskAssessDetail[index].RiskAssessDetailScore;

                    this.evaluation = true;

                } else if (type == 'close') {
                    this.clearData();
                    this.evaluation = false;
                } else if (type == 'delete') {
                    this.deleteAssessDetails({ index: index });
                }

            },
            upDataRiskAdd() {

                // const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
                const ListRiskAssess = this.$store.state.evaluation.riskAssessData.ListRiskAssessDetail; //风险评估


                if (ListRiskAssess.length == 0) {
                    this.showToast({ toastState: true, toastValue: '您至少添加一个风险评估！' });
                    return;
                }

                if (!this.$store.state.evaluation.riskAssessData.RiskAssessIntro) {
                    this.showToast({ toastState: true, toastValue: '请填写评估描述！' });
                    return;
                }
                this.postRiskAdds();
            }
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
                ListRiskAssessDetail(state) {
                    const ListRiskAssessDetail = state.evaluation.riskAssessData.ListRiskAssessDetail;
                    return ListRiskAssessDetail;
                }
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