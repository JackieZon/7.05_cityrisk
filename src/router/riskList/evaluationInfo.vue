<template>
    <div class="evaluationInfo">
        <Heads :title="'评估详情'"></Heads>
        <div class="BasicInfoA" v-for="item in evaluationInfo[0].ListRiskAssessDetail">
            <x-input title="风险类型" :disabled="true" :value="item.RiskAssessTypeName" placeholder=""></x-input>
            <x-input title="后果严重性C" :disabled="true" :value="item.RiskAssessCName" placeholder="暂无"></x-input>
            <x-input title="可能性分析L" :disabled="true" :value="item.RiskAssessLName" placeholder="暂无"></x-input>
            <x-input title="频繁程度E" :disabled="true" :value="item.RiskAssessEName" placeholder="暂无"></x-input>
            <x-input title="风险等级" :disabled="true" :value="evaluationInfo[0].RiskAssessLvName" placeholder="暂无"></x-input>
            <x-input title="风险分值" :disabled="true" :value="item.RiskAssessDetailScore" placeholder="暂无"></x-input>
            <!--<x-input title="评估描述" :disabled="true" value="" placeholder="暂无"></x-input>-->
            <x-input title="评估人" :disabled="true" :value="evaluationInfo[0].RiskAssessManName" placeholder="暂无"></x-input>
        </div>

        <div class="BasicInfoA" style="margin-bottom: 20px;">
            <group>
                <x-input title="描述"></x-input>
                <x-textarea readonly :height="200" v-model="evaluationInfo[0].RiskAssessIntro"></x-textarea>
            </group>
        </div>
    </div>
</template>

<script>
    import Heads from "./../../components/Heads.vue"
    import { XInput, XTextarea, Group } from "vux"
    import { mapState, mapActions, mapMutations } from "vuex"
    export default {

        components: {
            Heads,
            XInput,
            XTextarea,
            Group
        },

        data() {

            return {
                // evaluationInfo: [],
                riskID:""
            }

        },

        created() {
            this.$store.commit("saveEvaluationInfoId",this.$route.params.infoId);
            // console.log("我是详情" + JSON.stringify(this.riskInfo.ListRiskAssess))
        console.log('我是列表' + JSON.stringify(this.evaluationInfo))
            // alert(this.$route.params.infoId)
        },
        computed: {
            ...mapState({
                riskInfo(state) {
                    return state.riskInfo.riskInfo;
                }
            }),
            evaluationInfo () {
                return this.$store.getters.evaluationInfo
            }

        },

        methods: {

        }


    }

</script>
<style>
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
</style>