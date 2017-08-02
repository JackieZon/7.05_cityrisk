<template>
    <div id="evaluationInfo">
        <Heads :title="'评估详情'"></Heads>
        <div class="BasicInfoA" v-for="item in formInfo.ListRiskAssessDetail">
            <x-input title="风险类型" :disabled="true" :value="item.RiskAssessTypeName" placeholder=""></x-input>
            <x-input title="后果严重性C" :disabled="true" :value="item.RiskAssessCName" placeholder="暂无"></x-input>
            <x-input title="可能性分析L" :disabled="true" :value="item.RiskAssessLName" placeholder="暂无"></x-input>
            <x-input title="频繁程度E" :disabled="true" :value="item.RiskAssessEName" placeholder="暂无"></x-input>
            <x-input title="风险等级" :disabled="true" :value="item.RiskAssessDetailLvName" placeholder="暂无"></x-input>
            <x-input title="风险分值" :disabled="true" :value="item.RiskAssessDetailScore" placeholder="暂无"></x-input>
            <x-input title="评估人" :disabled="true" :value="formInfo.RiskAssessManName" placeholder="暂无"></x-input>
        </div>

        <div class="BasicInfoA" style="margin-bottom: 20px;">
            <group>
                <x-input title="描述"></x-input>
                <x-textarea readonly :height="200" v-model="formInfo.RiskAssessIntro"></x-textarea>
            </group>
        </div>
        <div>
            <div class="bottoms" v-if="formInfo.RiskAssessStatus == 1 || formInfo.RiskAssessStatus == 0"></div>
            <div class="buttons">
                <flexbox-item v-if="formInfo.RiskAssessStatus == 10">
                    <x-button type="primary" @click.native="confirmSubmission">提交审核</x-button>
                </flexbox-item>

                <flexbox-item>
                    <x-button v-if="formInfo.RiskAssessStatus == 0" type="primary" @click.native="operation = true">操作</x-button>
                </flexbox-item>

                <flexbox-item v-if="formInfo.RiskAssessStatus == 1">
                    <x-button type="warn" @click.native="auditWithdrawal">审核撤回</x-button>
                </flexbox-item>
            </div>
        </div>

        <actionsheet v-model="operation" :menus="operationList" theme="android" @on-click-menu="openOperation"></actionsheet>

    </div>
</template>

<script>
    import Heads from "./../../components/Heads.vue"
    import { XInput, XTextarea, Group, XButton, Flexbox, FlexboxItem, XSwitch, Actionsheet } from "vux"
    import { mapState, mapActions, mapMutations } from "vuex"
    import { api } from './../../servers/api'
    export default {

        components: {
            Heads,
            XInput,
            XTextarea,
            Group,
            XButton,
            Flexbox,
            FlexboxItem,
            XSwitch,
            Actionsheet
        },

        data() {

            return {
                // evaluationInfo: [],
                riskID: "",
                operation: false,
                operationList: {
                    submit: '提交审核',
                    edit: '编辑评估',
                    delete: '删除'
                },
                formInfo: {

                    ListRiskAssessDetail: []

                },
            }

        },

        created() {
            if (this.$route.params.ID) {
                this.$store.dispatch("getRiskAssessInfo", {
                    data: { ID: this.$route.params.ID }, callback: (ret) => {
                        if (ret.status) {
                            this.formInfo = ret.info
                        }
                        else {
                            this.showToast({ toastState: true, toastValue: ret.info });
                            return;
                        }
                    }
                })

            }

        },
        computed: {
            ...mapState({
                riskInfo(state) {
                    return state.riskInfo.riskInfo;
                }
            }),
            evaluationInfo() {
                return this.$store.getters.evaluationInfo
            }

        },

        watch: {
            /* evaluationInfo (){
                 // console.log(`我是数据-------------------------------${JSON.stringify(this.evaluationInfo)}`)
             }*/
        },

        methods: {
            ...mapMutations([
                'changeAssessmentId'
            ]),
            ...mapActions([
                'updateRiskAssessStatusRecalls',
                'showToast',
                'submitAudit',
            ]),
            auditWithdrawal() {

                api.updateRiskAssessStatusRecall(this.$route.params.ID).then((data) => {

                    const ret = data.all
                    if (ret.status) {
                        this.$router.push({ name: 'evaluationList', params: { id: this.$route.params.RiskID } });
                    }
                    else {
                        this.showToast({ toastState: true, toastValue: ret.info });
                        return;
                    }
                })


            },
            riskAssessDelete() {

                api.riskAssessDelete(this.$route.params.ID).then((data) => {

                    const ret = data.all
                    if (ret.status) {
                        this.$router.push({ name: 'evaluationList', params: { id: this.$route.params.RiskID } });
                    }
                    else {
                        this.showToast({ toastState: true, toastValue: ret.info });
                        return;
                    }
                })
            },
            confirmSubmission() {
                this.submitAudit()
            },
            openOperation(key) {
                if (key == 'submit') {
                    this.formInfo.RiskAssessStatus = 1;
                    this.formPost()
                }
                if (key == 'edit') {
                    this.$router.push({ name: 'addEvaluation', params: { ...{ id: this.$route.params.RiskID }, ...this.$route.params } })
                }
                if (key == 'delete') {
                    this.riskAssessDelete()
                }
                console.log(key)
            },
            formPost() {
                const params = { ...{}, ...this.formInfo }
                api.postRiskAssessAdd(params).then((data) => {
                    const ret = data.all
                    if (ret.status) {
                        this.$router.push({ name: 'evaluationList', params: { id: this.$route.params.RiskID } });
                    }
                    else {
                        this.showToast({ toastState: true, toastValue: ret.info });
                        return;
                    }
                })
            },
        }


    }

</script>
<style lang="less">
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 45px;
        border-bottom: 2px solid #33CC99;
    }

    .BasicInfoA {
        margin-top: 15px;
        background: #fff;
    }

    #evaluationInfo {
        .bottoms {
            width: 100%;
            height: 40px;
        }
        .buttons {
            position: fixed;
            bottom: 0px;
            width: 100%;
        }
    }

    .weui-btn_primary {
        background-color: #33CC99;
    }
</style>