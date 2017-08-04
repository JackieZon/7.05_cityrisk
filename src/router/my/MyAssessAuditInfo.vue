<template>
    <div id="assessRiskList">
        <Heads :title="'风险评估详情'" style="z-index:99;"></Heads>
        <div class="evaluation">
            <div class="evaluationList" v-on:click="openInfo">
                <div style="font-size: 14px;">
                    <div style="position: absolute; right: 10px; top: 10px;width: 80px;">
                        <p class="p_center" :style="{'color':fontColor[riskStatus.indexOf(RiskInfo.RiskLvName)]}">
                            <Icon slot="icon" class="icon" :name="'level'" />{{ RiskInfo.RiskLvName | s_toStr }}
                        </p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{ RiskInfo.RiskScore | s_toStr }}
                        </p>
                    </div>
                    <p class="p_center">
                        <Icon slot="icon" class="icon" :name="'riskName'" style="color:#33CC99" />险源名称: &nbsp;<span>{{ RiskInfo.RiskName | s_toStr }}</span></p>
                    <p class="p_center">
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间:&nbsp;<span>{{ RiskInfo.RiskAddDate | s_toDate }}</span> </p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'address'" style="color:#33CC99" />地址: &nbsp;<span>{{  (RiskInfo.RiskAreaName1?RiskInfo.RiskAreaName1:'-') + (RiskInfo.RiskAreaName2?RiskInfo.RiskAreaName2:'-') + (RiskInfo.RiskAreaName3?RiskInfo.RiskAreaName3:'-') + (RiskInfo.RiskAreaName4?RiskInfo.RiskAreaName4:'-') + (RiskInfo.RiskAreaName5?RiskInfo.RiskAreaName5:'-')  }}</span></p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'longitude'" style="color:#33CC99" />经纬度:&nbsp;<span> {{ RiskInfo.RiskLng | s_toStr }}/{{ RiskInfo.RiskLat | s_toStr }}</span></p>
                </div>
            </div>
        </div>

        <div class="BasicInfoA" v-for="item in assessAuditInfo.ListRiskAssessDetail">
            <x-input title="风险类型" :disabled="true" :value="item.RiskAssessTypeName" placeholder=""></x-input>
            <x-input title="后果严重性" :disabled="true" :value="item.RiskAssessCName" placeholder="暂无"></x-input>
            <x-input title="可能性分析" :disabled="true" :value="item.RiskAssessLName" placeholder="暂无"></x-input>
            <x-input title="频繁程度" :disabled="true" :value="item.RiskAssessEName" placeholder="暂无"></x-input>
            <x-input title="风险等级" :disabled="true" :value="riskStatus[item.RiskAssessDetailLv]" placeholder="暂无"></x-input>
            <x-input title="风险分值" :disabled="true" :value="item.RiskAssessDetailScore" placeholder="暂无"></x-input>
        </div>

        <div style="margin-bottom: 20px;">
            <group>
                <x-input title="评估人" :disabled="true" :value="assessAuditInfo.RiskAssessManName" placeholder="暂无"></x-input>
                <x-input title="描述"></x-input>
                <x-textarea readonly :height="200" v-model="assessAuditInfo.RiskAssessIntro"></x-textarea>
            </group>
            <div v-if="assessAuditInfo.RiskAssessStatus == 1" style="width: 100%; height:30px;"></div>
        </div>


        <div class="buttons" v-if="assessAuditInfo.RiskAssessStatus == 1">
            <flexbox-item>
                <x-button type="primary" @click.native="operation = true">审核</x-button>
            </flexbox-item>
        </div>

        <div v-transfer-dom>
            <popup v-model="operation">
                <div class="popup0">
                    <group>
                        <radio :options="choiceList" @on-change="changeChoice" v-model="result"></radio>
                        <x-textarea title="审核描述" :max="200" placeholder="请输入审核描述" :show-counter="false" v-model="auditDtat.RiskAssessAuditIntro" :height="200"
                            :rows="8" :cols="30"></x-textarea>
                        <x-button type="primary" style="width: 92%; margin: 10px 4% 20px 4%; background: #33CC99;" @click.native="submit">提交</x-button>
                    </group>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import RiskList from './../../components/common/RiskList.vue'
    import { XInput, Group, XTextarea, Actionsheet, FlexboxItem, XButton, TransferDom, Cell, Popup, Radio } from 'vux'
    import { mapActions } from 'vuex'
    import { getRiskInfo, updateRiskAssessStatusAudit } from './../../servers/api'
    export default {
        directives: {
            TransferDom
        },
        data() {
            return {
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
                assessAuditInfo: {},
                RiskInfo: {},
                operation: false,
                choiceList: [{ 'key': 3, 'value': '通过' }, { 'key': 2, 'value': '不通过' }],
                result: 3,
                auditDtat: {
                    "ListRiskAssessDetail": [
                    ],
                    "ID": 0,
                    "RiskAssessStatus": 0,
                    "RiskAssessAuditIntro": ""
                }

            }
        },
        mounted() {
            // alert(this.$route.params.id)
            // alert(this.$route.params.riskId)
            if (this.$route.params.riskId) {
                getRiskInfo(this.$route.params.riskId).then((ret) => {
                    if (ret.all.status) {
                        this.RiskInfo = ret.info;
                    } else {
                        this.showToast({ toastState: true, toastValue: ret.info });
                        return;
                    }
                });
            }

            if (this.$route.params.id) {
                this.auditDtat.ID = this.$route.params.id;

                this.$store.dispatch("getRiskAssessInfo", {
                    data: { ID: this.$route.params.id }, callback: (ret) => {
                        if (ret.status) {
                            this.assessAuditInfo = ret.info
                        }
                        else {
                            this.showToast({ toastState: true, toastValue: ret.info });
                            return;
                        }
                    }
                })

            }

        },
        components: {
            Heads,
            RiskList,
            XInput,
            Group,
            XTextarea,
            Actionsheet,
            FlexboxItem,
            XButton,
            Cell,
            Popup,
            Radio
        },
        methods: {
            ...mapActions([
                'updateRiskAssessStatusRecalls',
                'showToast',
                'submitAudit',
            ]),
            changeChoice(val) {
                this.auditDtat.RiskAssessStatus = val;
            },
            submit() {

                var t_data = this;

                if (!this.auditDtat.RiskAssessStatus) {
                    this.showToast({ toastState: true, toastValue: "请选择结果！" });
                    return;
                }
                if (!this.auditDtat.RiskAssessAuditIntro) {
                    this.showToast({ toastState: true, toastValue: "请输入原因！" });
                    return;
                }

                updateRiskAssessStatusAudit(t_data.auditDtat).then((ret) => {
                    if (ret.all.status) {
                        this.operation = false
                        this.$router.push({ name: "myAssessAuditList" });
                    } else {
                        this.showToast({ toastState: true, toastValue: ret.all.info });
                        return;
                    }
                })

            },

            openInfo() {
                this.$router.push({ name: "riskInfo", params: { id: this.$route.params.riskId } });
            }
        },

        watch: {

        }

    }

</script>
<style lang="less">

    #assessRiskList {
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
            background: #fbf9fe;
            z-index: 1;
        }

        .evaluationList {
            padding: 10px 15px 10px 15px;
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
            white-space: nowrap;
            font-size: 14px;
        }

        .auditStatus {
            float: right;
            margin-top: -31px;
        }

        [v-cloak] {
            display: none
        }

        .BasicInfoA {
            margin-top: 15px;
            background: #fff;
        }

        .buttons {
            position: fixed;
            bottom: 0px;
            width: 100%;
            .weui-btn {
                background: #33CC99;
            }
        }
    }
    .weui-cells {
        margin-top: 0;
    }
</style>