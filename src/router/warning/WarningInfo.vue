<template>
    <div id="warningInfo">
        <Heads :title="'预警详情'"></Heads>
        <div class="BasicInfoC">
            <div class="title">
                <Icon :name="'location1'" style="color:#33CC99;" />福田区</div>
            <x-input title="预警人" :disabled="true" placeholder="暂无" :value="warningInfo.warningInfo.RiskWarnAddManName"></x-input>
            <x-input title="联系电话" :disabled="true" placeholder="暂无" :value="warningInfo.warningInfo.RiskWarnAddManTel"></x-input>
            <x-textarea :title="'预警因由'" :max="200" :show-counter="false" :rows="8" :height="100" :cols="30" readonly :value="warningInfo.warningInfo.RiskWarnReason"></x-textarea>
            <div id="content">
                <x-textarea :title="'预警内容'" :max="200" :show-counter="false" :rows="8" :height="100" :cols="30" readonly :value="warningInfo.warningInfo.RiskWarnContent"></x-textarea>
                <x-textarea :title="'预警要求'" :max="200" :show-counter="false" :rows="8" :height="100" :cols="30" readonly :value="warningInfo.warningInfo.RiskWarnRequire"></x-textarea>
            </div>
            <div class="bottom">
                <p class="bottom-p">开始时间:&nbsp;&nbsp;{{ warningInfo.warningInfo.RiskWarnStartDate|s_toDate }}</p>
                <p class="bottom-p">结束时间:&nbsp;&nbsp;{{ warningInfo.warningInfo.RiskWarnEndDate|s_toDate }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { XInput, Group, XTextarea } from 'vux'
    import { mapActions, mapState, mapMutations } from 'vuex'
    import Heads from './../../components/Heads.vue'
    export default {
        data() {
            return {
            }
        },
        created() {
            this.getRiskWarnInfo(this.$route.params.Id)
            // console.log(JSON.stringify(this.$store.state.warningInfo.warningInfo))
            // alert(JSON.stringify(this.$route.params))
            setTimeout(() => {
                console.log(JSON.stringify(this.warningInfo))
            }, 2000)
        },
        components: {
            XInput,
            Heads,
            Group,
            XTextarea
        },
        computed: {
            ...mapState([
                'warningInfo'
            ])
        },
        methods: {
            ...mapActions([
                'getRiskWarnInfo'
            ])
        }
    }

</script>
<style lang="less">
    #warningInfo {
        height: 90%;
        .BasicInfoC {
            margin-top: 15px;
            background: #fff;
            height: 100%;
        }
        .weui-label {
            width: 75px !important;
            text-align: center;
            margin-right: 10px;
        }
        #content .weui-cell:before {
            display: none;
        }
        .weui-textarea {
            font-size: 15px;
            font-family: -apple-system-font, "Helvetica Neue", sans-serif;
        }
        .title {
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 45px;
            border-bottom: 2px solid #33CC99;
            padding: 0 15px;
            .allHidDan {
                span {
                    margin-left: 15px;
                }
            }
        }
        .bottom {
            padding: 10px;
            .bottom-p {
                display: flex;
                flex-direction: row-reverse;
                box-sizing: border-box;
                padding: 5px;
            }
        }
    }
</style>