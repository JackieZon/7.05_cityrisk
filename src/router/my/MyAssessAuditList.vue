<template>
    <div id="myAssessAuditLIst">
        <div class="upper">
            <Heads :title="'风险评估审核'"></Heads>
            <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="changeTab(1)">待审核</tab-item>
                <tab-item @on-item-click="changeTab(3)">已审核</tab-item>
                <tab-item @on-item-click="changeTab(2)">已退回</tab-item>
            </tab>
        </div>
        <PullUpRefresh :pullDown="pullDown" :pullUp="pullUp" :item="assessAuditList" :default="defaultData">
            <div class="myAssessAuditLIst">
                <div class="evaluationList" v-for="(item,index) in assessAuditList" :key="index" v-on:click="goPage('myAssessAuditInfo,assessAuditList')">
                    <div style="font-size: 14px;">
                        <div style="position: absolute; right: 10px; top: 10px;width: 80px;">
                            <p class="p_center" :style="">
                                <Icon slot="icon" class="icon" :name="'level'" />{{ item.RiskAssessLvName | s_toStr }}</p>
                            <p class="p_center">
                                <Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{ item.RiskAssessScore }}</p>
                        </div>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'riskType'" style="color:#33CC99" />类型: {{ item.RiskAssessTypeNames | s_toStr }}</span>
                        </p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />评估人: {{ item.RiskAssessManName | s_toStr }}</p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间: {{ item.RiskAssessDate | s_toDate }}</p>
                        <p class="p_center"><span class="displayFlex"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /></span><span><p class="assessInfo">描述: {{ item.RiskAssessIntro | s_toStr }}</p></span></p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'auditor'" style="color:#33CC99" />审核人: {{ item.RiskAssessAuditManName | s_toStr }}</p>
                        <p style="float: right; margin-top: -31px;">审核状态: {{ riskAssessStatus[item.RiskAssessStatus] | s_toStr }} &nbsp; &nbsp;</p>

                    </div>
                </div>
            </div>
        </PullUpRefresh>
    </div>

</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { Group, XButton, Tab, TabItem, Popup, Selector, Radio, XTextarea } from "vux"
    import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
    import { mapMutations, mapState, mapActions } from 'vuex'
    export default {
        components: {
            Group,
            XButton,
            Tab,
            TabItem,
            Heads,
            Popup,
            Selector,
            Radio,
            XTextarea,
            PullUpRefresh
        },

        data() {
            return {
                searchList: [],
                riskAssessStatus: ["暂存", "待审核", "审核退回", "已审核"]
            }
        },

        mounted() {
            this.getAssessAuditList();
            this.changeTab(1)
            // this.$store.dispatch("getAssessAuditList")
        },


        watch: {
            assessAuditList() {
                console.log(`我是数据${JSON.stringify(this.assessAuditList)}`)
            }
        },

        computed: {

            ...mapState({
                assessAuditList(state) {
                    return this.$store.state.myAssessAuditList.assessAuditList
                },
                defaultData(state) {
                    return this.$store.state.myAssessAuditList.defaultData
                }
            })
        },

        methods: {
            ...mapMutations([
                'saveDefaultDatas',
                'deleteAssessAuditList'
            ]),
            ...mapActions([
                'getAssessAuditList'
            ]),
            changeTab(status) {
                // alert(JSON.stringify(this.saveDefaultData))
                this.deleteAssessAuditList();
                this.saveDefaultDatas({ pageIndex: 1, pageSize: 10, RiskAssessStatus: status });
                this.getAssessAuditList();
            },
            pullDown() {
                this.deleteAssessAuditList();
                this.saveDefaultDatas({ pageIndex: 1, pageSize: 10 });
                this.getAssessAuditList();
            },
            pullUp() {
                this.saveDefaultDatas({ pageIndex: this.defaultData.pageIndex += 1, pageSize: 10 });
                this.getAssessAuditList();
            },
            goPage(name, item,) {
                console.log(name);
                this.$router.push({ name: name, params: { id: item.ID } });
            }
        }
    }

</script>
<style lang="less">
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

    .myAssessAuditLIst {
        padding-bottom: 35px;
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
    }

    .auditStatus {
        float: right;
        margin-top: -31px;
    }

    [v-cloak] {
        display: none
    }
</style>