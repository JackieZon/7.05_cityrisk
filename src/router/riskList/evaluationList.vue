<template>
    <div id="riskInfo" v-cloak>
        <Heads :title="'评估列表'" :isEvaluationList="true"></Heads>
        
        <PullUpRefresh 
            :pullDown="pullDown"
            :pullUp="pullUp"
        >
        
            <div class="evaluation" v-for="item in riskAssessList">
                <div class="evaluationList" v-on:click="openEvaluationInfo">
                    <div style="font-size: 14px;">
                        <div style="position: absolute; right: 10px; top: 10px;width: 80px;">
                            <p class="p_center" :style="{'color':fontColor[0]}"><Icon slot="icon" class="icon" :name="'level'" />{{riskStatus[item.RiskAssessLv] }}</p>
                            <p class="p_center"><Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{ item.RiskAssessScore }}</p>
                        </div>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'riskType'" style="color:#33CC99" />类型: {{ item.RiskAssessTypeNames | s_toStr}}</p>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />评估人: {{ item.RiskAssessManName | s_toStr}}</p>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间: {{ item.RiskAssessDate | s_toDate }}</p>
                        <p class="p_center"><span class="displayFlex"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /></span><span><p class="assessInfo">描述: {{ item.RiskAssessIntro | s_toStr}}</p></span></p>
                        <p class="p_center" ><Icon slot="icon" class="icon" :name="'auditor'" style="color:#33CC99" />审核人: {{ item.RiskAssessAuditManName | s_toStr}}</p>
                        <p style="float: right; margin-top: -31px;">审核状态: {{RiskAssessStatusName[item.RiskAssessStatus]}}</p>

                    </div>
                </div>
            </div>

        </PullUpRefresh>
    </div>
</template>
<script>
    import { XInput, Popup, Radio, XTextarea, XButton, Group, XSwitch, Selector } from "vux"
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
            PullUpRefresh
        },


        data() {
            return {
                show: false,
                showToast: true,
                searchList: [1, 2, 3, 4, 5, 6],
                riskStatus:['极高','高','中等','低','可忽略'],
                RiskAssessStatusName:['暂存','待审核','审核退回','审核通过'],
                fontColor:['#FF0000','#FF8C00','#FFD700','#1E90FF'],
                pageIndex:0,
            }
        },

        mounted() {
            this.saveDefaultRiskAssess({RiskID:this.$route.params.id });
            // type等于0时重新更新数据
            this.getRiskAssess({type:0});
        },
        watch:{
            riskAssessList(){
                console.log('改变数据');
            }
        },
        computed: {
            ...mapState({
                riskAssessList(state){
                    return state.evaluation.riskAssessList;
                }
            })
        },
        methods: {
            ...mapMutations([
                'saveDefaultRiskAssess',
                'deleteRiskAssessList'
            ]),
			...mapActions([
				'getRiskAssess'
            ]),
            openEvaluationInfo() {
                this.$router.push({ name: 'evaluationInfo' });
            },
            pullDown(){
                // type等于0时重新更新数据
                this.getRiskAssess({type:0});
            },
            pullUp(){
                this.pageIndex += 1;
                console.log(this.pageIndex);
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

        .displayFlex{
            display:flex;
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