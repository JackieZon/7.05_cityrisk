<template>
    <div id="myAssessAuditLIst">
        <!-- <div class="upper">
            <Heads :title="'风险评估审核'"></Heads>
            <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="changeTab(1)">待审核</tab-item>
                <tab-item @on-item-click="changeTab(3)">已审核</tab-item>
                <tab-item @on-item-click="changeTab(2)">已退回</tab-item>
            </tab>
        </div> -->

        <div class="upper">
            <Heads :title="'风险评估审核'"></Heads>
              <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="changeTab(1)">待审核</tab-item>
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
            <div class="myAssessAuditLIst" v-for="item in evaluationList">
                <div class="evaluationList" v-on:click="openEvaluationInfo(item.ID,item)">
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
                        <p style="float: right; margin-top: -31px;">审核状态: {{RiskAssessStatusName[item.RiskAssessStatus]}}&nbsp;&nbsp;&nbsp;</p>

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
                tabStatus: 1,
                userId: 0,
            }
        },
        mounted() {
            this.userId = this.$route.params.userId;
            this.clearEvaluationLists();
            this.saveDefaultEvaluationListDatas({
                // RiskID:0,
                RiskAssessStatus:this.tabStatus,
                RiskAssessAuditMan:this.userId,
                pageIndex:1,   //必填参数
                pageSize:10,   //必填参数
            });

            this.getRiskAssessList();
        },
        computed: {
            ...mapState({
                defaultDangerListData(state) {
                    return state.myAssessAuditList.defaultEvaluationListData;
                },
                evaluationList(state) {
                    return state.myAssessAuditList.evaluationList;
                }
            })
        },
        methods: {
            ...mapMutations([
                "saveDefaultEvaluationListDatas",
                "saveEvaluationLists",
                "clearEvaluationLists"
            ]),
            ...mapActions([
                "getRiskAssessList",
            ]),
            openEvaluationInfo(Id, item) {
                //  if(item.RiskAssessStatus == 0){
                //    this.$router.push({ name: 'addEvaluation',params:item })
                // }else{
                this.$router.push({ name: 'myAssessAuditInfo', params:{ id: item.ID, riskId: item.RiskID } })
                // }
                // this.$router.push({ name: 'evaluationInfo' });
            },
            changeTab(val) {
                this.tabStatus = val;
                this.clearEvaluationLists();
                this.saveDefaultEvaluationListDatas({
                    // RiskID:-1,
                    RiskAssessStatus:this.tabStatus,
                    pageIndex:1,   //必填参数
                    pageSize:10,   //必填参数
                });
                this.getRiskAssessList();
            },
            pullDown() {
                this.clearEvaluationLists();
                this.saveDefaultEvaluationListDatas({
                    // RiskID:0,
                    RiskAssessStatus:this.tabStatus,
                    pageIndex:1,//必填参数
                    pageSize:10,//必填参数
                });
                this.getRiskAssessList();
            },
            pullUp() {
                this.saveDefaultEvaluationListDatas({

                    // RiskID: 0,
                    RiskAssessStatus:this.tabStatus,
                    pageIndex:this.defaultDangerListData.pageIndex+=1,
                    pageSize:10,
                });
                this.getRiskAssessList();
            },

        }
    }

</script>
<style lang="less">
                /* this.$router.push({ name: name, params: { id: item.ID, riskId: item.RiskID } }); */
    
    #myAssessAuditLIst {
        display: flex;
        flex-direction: column;
        height: 100%;
        .displayFlex {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .evaluationList {
        position: relative;
        background: #fff;
        margin-top: 15px;
    }

    .myAssessAuditLIst p {
        line-height: 30px;
    }

    .myAssessAuditLIst img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .p_center {
        display: flex;
        align-items: center;
        padding-left: 15px;
        white-space: nowrap;
    }

    .auditStatus {
        float: right;
        margin-top: -31px;
    }

    [v-cloak] {
        display: none
    }
</style>