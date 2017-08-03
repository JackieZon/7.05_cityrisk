<template>
    <div id="riskDanger">
        <Heads :title="'隐患详情'"></Heads>
        <div class="BasicInfoA">
            <div class="title">隐患信息</div>
            <x-input title="联系人" :disabled="true" :value="dangerInfo.RiskChangedAddManName" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" :value="dangerInfo.RiskChangedAddManTel" placeholder="暂无"></x-input>
            <x-input title="提交时间" :disabled="true" :value="`${dangerInfo.RiskHiddenDate.split('T')[0]} ${dangerInfo.RiskHiddenDate.split('T')[1]}`" v-if="dangerInfo.RiskHiddenDate" placeholder="暂无"></x-input>
            <x-textarea :title="'隐患描述'" :readonly="true" :max="200" :value="dangerInfo.RiskHiddenIntro" :placeholder="'暂无'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
            <div v-if="dangerInfo.RiskHiddenStatus==3||dangerInfo.RiskHiddenStatus==2" style="border-top: 1px solid #eee;">
            
                <x-input title="审核状态" :disabled="true" :value="dangerInfo.RiskHiddenStatus==3?'审核通过':'审核退回'" placeholder="暂无"></x-input>
                <x-textarea :title="'审核原因'" :readonly="true" :max="200" :value="dangerInfo.RiskHiddenAuditIntro" :placeholder="'暂无'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
                
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
                        <x-textarea title="原因" :max="200" placeholder="请输入原因" :show-counter="false" v-model="updateRiskHiddenStatus_Audit_data.default.RiskHiddenAuditIntro" :height="200" :rows="8"
                            :cols="30"></x-textarea>
                        <div class="btn">
                            <x-button type="primary" style="background: #33CC99;" @click.native="submitAudit">提交审核</x-button>
                        </div>

                    </div>
                </div>
            </popup>
        </div>
        
        <div class="footerBox" ref="revise" v-if="dangerInfo.RiskHiddenStatus==1">
            <x-button @click.native="reviewPageStatus = true">审核</x-button>
        </div>

    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { param_baseUrls } from './../../utils/subei_config.js'
    import { Tab, TabItem, Actionsheet, TransferDom, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, Popup, Toast, Radio } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'

    export default{
        directives: {
            TransferDom
        },
        components:{
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
        },
        watch:{
        },
        created(){

            console.warn(`我是隐患审核${JSON.stringify(this.$route.params)}`);
            this.getRiskHiddenInfo({ID: this.$route.params.dangerId});

            this.updateRiskHiddenStatus_Audit_data.default.ID = this.$route.params.dangerId;
        },
        data(){
            return{
                transferState:false,
                param_baseUrls: param_baseUrls,
                reviewPageStatus: false,
                menu: [{ 'key': 3, 'value': '通过' }, { 'key': 2, 'value': '不通过' }],
                changeRadioVal:3,
                riskAuditIntro:'',
                
                updateRiskHiddenStatus_Audit_data:{
                    default:{
                        "ID": 0,
                        "RiskHiddenStatus": 3,
                        "RiskHiddenAuditIntro": "",
                        
                    },
                    "$router": this.$router
                }
            }
        },
        computed:{
            ...mapState({
                dangerInfo(state){
                    return state.riskDangerList.dangerInfo;
                }
            }),
        },
        watch:{
            // dangerInfo(val){
                
            // }
        },
        methods:{
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
            rectification(){
                this.transferState = !this.transferState
            },
            changeRadio(val){
                console.log(val);
            },
            submitAudit(){
                if(!this.updateRiskHiddenStatus_Audit_data.default.RiskHiddenAuditIntro){
                    this.showToast({toastValue: '请填原因！',toastState: true});
                    return;
                }
                this.postUpdateRiskHiddenStatus_Audit(this.updateRiskHiddenStatus_Audit_data);
            },
        }
    }
</script>
<style lang="less">
    #riskDanger{
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
        height: 100%;

        .vux-swiper{
            height:100%!important;
        }
        .weui-label{
            width: 6em!important;
        }
        .title{
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 45px;
            border-bottom:2px solid #33CC99;
        }
        .BasicInfoA{margin-top:15px;background:#fff;}
        .photo{
            box-sizing: border-box;
            padding: 5px;
            display: flex;
            flex-wrap: wrap;
            .imgItem{
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                margin:5px;
                box-sizing: border-box;
                img{
                    height:100%;
                }
            }
        }
        .next{
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding:15px;
        }
        .edit{
            background: #fff;
            height:100%;
        }
        .addImg{
            width: 100%;
            height:100%;
            border:1px solid #33CC99;
            padding: 10px;
            box-sizing: border-box;
            // background: url('./../../assets/icon/addImg-icon.svg') 50% 50% no-repeat #fff;
        }
        .review{
            height: 100%;
            background: #fff;
        }
        .popup0{
            background: #fff;
            .btn{
                box-sizing: border-box;
                padding: 15px;
            }
        }
        .popup0 .weui-cell {
            font-size: 17px;
        }
    }
</style>