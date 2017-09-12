<template>
    <div id="riskWarningInfo">
        <Heads :title="'事故详情'"></Heads>
        <div class="BasicInfoC">
            <div class="title">
                <Icon :name="'location1'" style="color:#33CC99;" />福田区</div>
            <x-input title="预警人" :disabled="true" placeholder="暂无" :value="warningInfoData.RiskAccidentAddManName"></x-input>
            <x-input title="联系电话" :disabled="true" placeholder="暂无" :value="warningInfoData.RiskAccidentAddManTel"></x-input>
            <x-textarea :title="'直接原因'" :max="200" :show-counter="false" :rows="8" :height="70" :cols="30" readonly :value="warningInfoData.RiskAccidentReason"></x-textarea>
            <div id="content">
                <x-textarea :title="'人员伤亡'" :max="200" :show-counter="false" :rows="8" :height="70" :cols="30" readonly :value="warningInfoData.RiskAccidentCasualties"></x-textarea>
                <x-textarea :title="'财产损失'" :max="200" :show-counter="false" :rows="8" :height="70" :cols="30" readonly :value="warningInfoData.RiskAccidentLoss"></x-textarea>
                <x-textarea :title="'事故描述'" :max="200" :show-counter="false" :rows="8" :height="70" :cols="30" readonly :value="warningInfoData.RiskAccidentIntro"></x-textarea>
                <x-input title="事故图片" :disabled="true"></x-input>
            </div>
            <div class="photo">
                <div class="photo-img">
                    <div class="images" v-for="item in warningInfoData.RiskAccidentPhotosPath">
                        <img :src="(item.url.indexOf('http://')>0?item.url:`${param_baseUrls}${item.url}`)" alt="">
                    </div>
                </div>
            </div>

             <!-- <div class="accident-button">
                 <x-button :text="'事故文档.doc'"  @click.native="" type="primary"></x-button>
             </div> -->
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { XInput, XTextarea, Group, XButton } from 'vux'
    import { mapActions, mapState } from 'vuex'
    // import { param_baseUrls } from './../../utils/subei_config'
    export default {
        data() {
            return {
                param_baseUrls: 'http://wx-cityrisk.subei88.com'
            }
        },
        components: {
            Heads,
            XInput,
            XTextarea,
            Group,
            XButton
        },
        created() {
            this.getRiskAccidentInfo(this.$route.params.Id);
            setTimeout(() => {
                console.log(JSON.stringify(this.warningInfoData.RiskAccidentPhotosPath[0].url))
                // alert(this.warningInfoData)
            }, 1000)
        },
        computed: {
            ...mapState({
                warningInfoData(state) {
                    return this.$store.state.riskWarningInfo.warningInfoData
                }
            })
        },
        methods: {
            ...mapActions([
                'getRiskAccidentInfo'
            ])
        }
    }

</script>
<style lang="less">
    #riskWarningInfo {
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
        .photo {
            background: #fff;
            // height: 110px;
            padding: 15px;
            display: flex;
            // flex-direction: row-reverse;
            .photo-img {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .images {
                    width: 100px;
                    height: 100px;
                    img {
                        box-sizing: border-box;
                        padding: 1px;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
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

        .accident-button {
            width: 100%;
            background: #fff;
            button {
                background: #33CC99;
            }
        }
    }
</style>