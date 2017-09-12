<template>
    <div id="riskDanger">
        <Heads :title="'隐患详情'"></Heads>

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

        <div class="BasicInfoA">
            <div class="title">隐患信息</div>
            <x-input title="联系人" :disabled="true" :value="dangerInfo.RiskHiddenAddManName" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" :value="dangerInfo.RiskHiddenAddManTel" placeholder="暂无"></x-input>
            <x-input title="提交时间" :disabled="true" :value="`${dangerInfo.RiskHiddenDate.split('T')[0]} ${dangerInfo.RiskHiddenDate.split('T')[1]}`"
                v-if="dangerInfo.RiskHiddenDate" placeholder="暂无"></x-input>
            <x-textarea :title="'隐患描述'" :readonly="true" :max="200" :value="dangerInfo.RiskHiddenIntro" :placeholder="'暂无'" :show-counter="false"></x-textarea>
            <div v-if="dangerInfo.RiskHiddenStatus==3||dangerInfo.RiskHiddenStatus==2" style="border-top: 1px solid #eee;">

                <x-input title="审核状态" :disabled="true" :value="dangerInfo.RiskHiddenStatus==3?'审核通过':'审核退回'" placeholder="暂无"></x-input>
                <x-textarea :title="'审核原因'" :readonly="true" :max="200" :value="dangerInfo.RiskHiddenAuditIntro" :placeholder="'暂无'" :show-counter="false"></x-textarea>

            </div>
            <group :title="'隐患照片'">
                <div class="photo">
                    <div class="imgItem" v-for="item in dangerInfo.RiskHiddenBeforePhotosPath">
                        <img :src="(item.url.indexOf('http://')>0?item.url:`${param_baseUrls}${item.url}`)" alt="">
                    </div>
                    <div class="imgItem" v-if="JSON.stringify(dangerInfo.RiskHiddenBeforePhotosPath)=='[]'">
                        暂无图片
                    </div>
                </div>
            </group>
            <popup v-model="reviewPageStatus">
                <div class="review">
                    <div class="popup0">
                        <radio :options="menu" @on-change="changeRadio" v-model="updateRiskHiddenStatus_Audit_data.default.RiskHiddenStatus"></radio>
                        <selector v-if="auditStatus == 3" title="整治督促人" placeholder="请选择" :options="SupervisorList" :value="Supervisor" @on-change="SupervisorChange" ></selector>
                        <x-textarea title="原因" :max="200" placeholder="请输入原因" :show-counter="false" v-model="updateRiskHiddenStatus_Audit_data.default.RiskHiddenAuditIntro"
                            :height="200" :rows="8" :cols="30"></x-textarea>
                        <div class="btn">
                            <x-button type="primary" style="background: #33CC99;" @click.native="submitAudit">提交审核</x-button>
                        </div>

                    </div>
                </div>
            </popup>
        </div>
        <div class="bottom_box" v-if="dangerInfo.RiskHiddenStatus==1"></div>
        <div class="footerBox" ref="revise" v-if="dangerInfo.RiskHiddenStatus==1">
            <x-button @click.native="reviewPageStatus = true">审核</x-button>
        </div>

    </div>
</template>
<script>
    import { getRiskInfo,getRiskSelectAduitUser } from './../../servers/api'
    import Heads from './../../components/Heads.vue'
    import { param_baseUrls } from './../../utils/subei_config.js'
    import { Tab, TabItem, Actionsheet, TransferDom, Selector, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, Popup, Toast, Radio } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'

    export default {
        directives: {
            TransferDom
        },
        components: {
            Heads,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            XInput,
            XTextarea,
            Group,
            Popup,
            Toast,
            Actionsheet,
            Radio,
            Selector
        },
        watch: {
        },
        created() {
            console.warn(`我是隐患审核${JSON.stringify(this.$route.params)}`);
            this.getRiskHiddenInfo({ ID: this.$route.params.dangerId });

            this.updateRiskHiddenStatus_Audit_data.default.ID = this.$route.params.dangerId;
            this.getRiskSelectAduitUsers()

        },
        data() {
            return {
                transferState: false,
                param_baseUrls: param_baseUrls,
                reviewPageStatus: false,
                menu: [{ 'key': 3, 'value': '通过' }, { 'key': 2, 'value': '不通过' }],
                changeRadioVal: 3,
                riskAuditIntro: '',
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
                RiskInfo: {},
                updateRiskHiddenStatus_Audit_data: {
                    default: {
                        "ID": 0,
                        "RiskHiddenStatus": 3,
                        "RiskHiddenAuditIntro": "",
                        "RiskHiddenChargeMan": 0, //隐患负责人Id
                        "RiskHiddenChargeManName":''//隐患负责人姓名
                    },
                    "$router": this.$router
                },
                auditStatus: 3,
                Supervisor:'',
                SupervisorList:[
                    // {
                    //     'key': 0,
                    //     'value': '张三' 
                    // },
                    // {
                    //     'key': 1,
                    //     'value': '张四'
                    // },
                    // {
                    //     'key': 2,
                    //     'value': '李黑'
                    // },
                    // {
                    //     'key': 3,
                    //     'value': '李白'
                    // }
                ]
            }
        },
        computed: {
            ...mapState({
                dangerInfo(state) {
                    return state.riskDangerList.dangerInfo;
                }
            }),
        },
        watch: {

            dangerInfo() {
                getRiskInfo(this.dangerInfo.RiskID).then((ret) => {
                    if (ret.all.status) {
                        this.RiskInfo = ret.info;
                    } else {
                        this.showToast({ toastState: true, toastValue: ret.info });
                        return;
                    }
                });
            }



            // dangerInfo(val){

            // }
        },
        methods: {
            ...mapActions([
                'getRiskHiddenInfo',
                'postRiskHiddenDelete',
                'postUpdateRiskHiddenStatus_Recall',
                'postUpdateRiskHiddenStatus_Audit',
                'showToast'
            ]),
            ...mapMutations([
                'openConfirm',
            ]),
            rectification() {
                this.transferState = !this.transferState
            },
            changeRadio(val) {
                this.auditStatus = val;
                // console.log('我是数据'+this.auditStatus)
            },
            submitAudit() {
                if (!this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenAuditIntro) {
                    this.showToast({ toastValue: '请填原因！', toastState: true });
                    return;
                }
                 if (!this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenChargeMan && this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenStatus == 3) {
                    this.showToast({ toastValue: '请选择隐患督促人！', toastState: true });
                    return;
                }
                this.postUpdateRiskHiddenStatus_Audit(this.updateRiskHiddenStatus_Audit_data);
            },
            openInfo() {
                // alert(this.dangerInfo.RiskID )
                // return
                this.$router.push({ name: "riskInfo", params: { riskId: this.dangerInfo.RiskID, editStatus: 0, add: 0 } });
            },
            SupervisorChange(val) {
                this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenChargeMan = val
                for(let i = 0; i < this.SupervisorList.length; i++){
                    if(this.SupervisorList[i].key == val){
                        this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenChargeManName = this.SupervisorList[i].value;
                    }
                }
            },
            getRiskSelectAduitUsers(){
                getRiskSelectAduitUser().then((res) => {
                    if(res.all.status){
                        for(let i = 0; i < res.info.length; i++){
                            this.SupervisorList.push({'key':res.info[i].ID,'value':res.info[i].UserNickName})
                        }
                    }else{
                        this.showToast({ toastValue: '加载监督人列表出错！', toastState: true });
                        return;
                    }
                    
                })
            }
        }
       
    }

</script>
<style lang="less">
    #riskDanger {
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
        height: 100%;

        .evaluation {
            width: 100%;
            background: #fbf9fe;
            z-index: 1;
            .evaluationList {
                padding: 10px 15px 10px 15px;
                position: relative;
                background: #fff;
                p {
                    line-height: 30px;
                }

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }

            .p_center {
                display: flex;
                align-items: center;
                white-space: nowrap;
                font-size: 14px;
            }
        }

        .vux-swiper {
            height: 100%!important;
        }
        .weui-label {
            width: 6em!important;
        }
        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            line-height: 45px;
            border-bottom: 2px solid #33CC99;
            padding: 0 15px;
        }
        .BasicInfoA {
            margin-top: 15px;
            background: #fff;
        }
        .weui-textarea {
            /* border: 0 !important; */
            font-family: -apple-system-font, "Helvetica Neue", sans-serif;
            font-size: 15px;
            padding: 0;
        }
        .photo {
            box-sizing: border-box;
            padding: 5px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .imgItem {
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center; 
                 margin: 10px; 
                 box-sizing: border-box; 
                /* padding: 5px; */
                img {
                    height: 100%;
                }
            }
        }
        .next {
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding: 15px;
        }
        .edit {
            background: #fff;
            height: 100%;
        }
        .addImg {
            width: 100%;
            height: 100%;
            border: 1px solid #33CC99;
            padding: 10px;
            box-sizing: border-box; // background: url('./../../assets/icon/addImg-icon.svg') 50% 50% no-repeat #fff;
        }
        .review {
            height: 100%;
            background: #fff;
        }
        .popup0 {
            background: #fff;
            .btn {
                box-sizing: border-box;
                padding: 15px;
            }
        }
        .popup0 .weui-cell {
            font-size: 17px;
        }

        .bottom_box {
            width: 100%;
            height: 70px;
        }
    }
</style>