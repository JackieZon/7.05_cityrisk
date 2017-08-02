<template>
    <div id="riskInfo" v-cloak>
        <div class="upper">
            <Heads :title="'评估列表'" :isEvaluationList="true"></Heads>
            <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="changeTab(0)">暂存</tab-item>
                <tab-item @on-item-click="changeTab(1)">待审核</tab-item>
                <tab-item @on-item-click="changeTab(3)">已审核</tab-item>
                <tab-item @on-item-click="changeTab(2)">已退回</tab-item>
            </tab>
        </div>

        <PullUpRefresh 
            :pullDown="pullDown" 
            :pullUp="pullUp" 
            :item="evaluationList" 
            :default="defaultDangerListData"
        >

            <div class="evaluation" v-for="item in evaluationList">
                <div class="evaluationList" v-on:click="openEvaluationInfo(item.ID,item)">
                    <!-- <div class="evaluationList" v-on:click="openEvaluationInfo(item.ID,item)"> -->
                    <div style="font-size: 14px;">
                        <div style="position: absolute; right: 10px; top: 10px;width: 80px;">
                            <p class="p_center" :style="{'color':fontColor[0]}">
                                <Icon slot="icon" class="icon" :name="'level'" />{{riskStatus[item.RiskAssessLv] }}</p>
                            <p class="p_center">
                                <Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{ item.RiskAssessScore }}</p>
                        </div>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'riskType'" style="color:#33CC99" />类型: {{ item.RiskAssessTypeNames | s_toStr}}</p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />评估人: {{ item.RiskAssessManName | s_toStr}}</p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间: {{ item.RiskAssessDate | s_toDate }}</p>
                        <p class="p_center"><span class="displayFlex"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /></span><span><p class="assessInfo">描述: {{ item.RiskAssessIntro | s_toStr}}</p></span></p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'auditor'" style="color:#33CC99" />审核人: {{ item.RiskAssessAuditManName | s_toStr}}</p>
                        <p style="float: right; margin-top: -31px;">审核状态: {{RiskAssessStatusName[item.RiskAssessStatus]}}</p>

                    </div>
                </div>
            </div>

        </PullUpRefresh>
    </div>
</template>
<script>
    import { XInput, Popup, Radio, XTextarea, XButton, Group, XSwitch, Selector, Tab, TabItem, } from "vux"
    import Heads from './../../components/Heads.vue'
    import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
    import { mapState, mapActions, mapMutations } from 'vuex'

    export default {

        components: {
            XInput,
            Heads,
            Popup,
            Radio,
            XTextarea,
            XButton,
            Group,
            XSwitch,
            Selector,
            PullUpRefresh,
            Tab,
            TabItem,
        },
        data() {
            return {
                show: false,
                showToast: true,
                searchList: [1, 2, 3, 4, 5, 6],
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
                pageIndex: 0,
                tabStatus: 0
            }
        },
        mounted() {
            this.clearEvaluationList();
            this.saveDefaultEvaluationListData({
                RiskID: this.$route.params.id,
                RiskAssessStatus: this.tabStatus,
                pageIndex: 1,   //必填参数
                pageSize: 10,   //必填参数
            });

            this.getRiskAssess();
        },
        computed: {
            ...mapState({
                defaultDangerListData(state) {
                    return state.evaluationList.defaultEvaluationListData;
                },
                evaluationList(state) {
                    return state.evaluationList.evaluationList;
                }
            })
        },
        methods: {
            ...mapMutations([
                "saveDefaultEvaluationListData",
                "saveEvaluationList",
                "clearEvaluationList"
            ]),
            ...mapActions([
                "getRiskAssess",
            ]),
            openEvaluationInfo(Id, item) {
                //  if(item.RiskAssessStatus == 0){
                //    this.$router.push({ name: 'addEvaluation',params:item })
                // }else{
                this.$router.push({ name: 'evaluationInfo', params: item })
                // }
                // this.$router.push({ name: 'evaluationInfo' });
            },
            changeTab(val) {
                this.tabStatus = val;
                this.clearEvaluationList();
                this.saveDefaultEvaluationListData({

                RiskID: this.$route.params.id,
                    RiskAssessStatus: this.tabStatus,
                    pageIndex: 1,   //必填参数
                    pageSize: 10,   //必填参数
                });
                this.getRiskAssess();
            },
            pullDown() {
                this.clearEvaluationList();
                this.saveDefaultEvaluationListData({
                    RiskAssessStatus: this.tabStatus,
                    pageIndex: 1,   //必填参数
                    pageSize: 10,   //必填参数
                });
                this.getRiskAssess();
            },
            pullUp() {
                this.saveDefaultEvaluationListData({

                RiskID: this.$route.params.id,
                    RiskAssessStatus: this.tabStatus,
                    pageIndex: this.defaultDangerListData.pageIndex += 1,
                    pageSize: 10,
                });
                this.getRiskAssess();
            },

        }
    }

</script>
<style lang="less">
    #riskInfo {
        background: #fbf9fe;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction: column;

        .displayFlex {
            display: flex;
            justify-content: center;
            align-items: center;
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
            margin-top: 10px;
            background: #fbf9fe;
        }

        .evaluationList {
            padding: 10px 15px;
            position: relative;
            background: #fff;
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
    }
</style>