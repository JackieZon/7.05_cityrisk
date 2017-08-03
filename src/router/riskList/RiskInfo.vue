<template>
    <div id="riskInfo" v-cloak>
        <Heads :title="'风险详情'" :isDanger="addOperation"></Heads>
        <div class="main">
        
            <div class="BasicInfoA">
                <div class="title">基本信息</div>
                <x-input title="险源名称" :disabled="true" placeholder="暂无" :value="riskInfo.RiskName"></x-input>
                <x-input title="对象类型" :disabled="true" placeholder="暂无" :value="`${riskInfo.RiskObjectTypeName1} - ${riskInfo.RiskObjectTypeName2}`"></x-input>
                <x-input title="经度/纬度" :disabled="true" placeholder="暂无" :value="`${riskInfo.RiskLat?riskInfo.RiskLat:'无'} / ${riskInfo.RiskLng?riskInfo.RiskLng:'无'}`"></x-input>

                <x-input title="风险地址" :disabled="true" :value="`${riskInfo.RiskAreaName1}-${riskInfo.RiskAreaName2}-${riskInfo.RiskAreaName3}-${riskInfo.RiskAreaName4}-${riskInfo.RiskAreaName5}-${riskInfo.RiskAddress}`"
                    placeholder="暂无"></x-input>

                <x-textarea v-show="false" title="风险地址" placeholder="风险地址" :readonly="true" :show-counter="false" :value="`${riskInfo.RiskAreaName1}-${riskInfo.RiskAreaName2}-${riskInfo.RiskAreaName3}-${riskInfo.RiskAreaName4}-${riskInfo.RiskAreaName5}-${riskInfo.RiskAddress}`"></x-textarea>

            </div>

            <div class="BasicInfoC" v-if="JSON.stringify(riskInfo.ListRiskDuty)!=='[]'" v-for="item in riskInfo.ListRiskDuty">
                <div class="title">责任主体</div>
                <x-input title="单位名称" :disabled="true" placeholder="暂无" :value="item.RiskDutyName"></x-input>
                <x-input title="单位地址" :disabled="true" placeholder="暂无" :value="`${item.RiskDutyAreaName1}-${item.RiskDutyAreaName2}-${item.RiskDutyAreaName3}-${item.RiskDutyAddress}`"></x-input>
                <x-input title="联系人" :disabled="true" placeholder="暂无" :value="item.RiskDutyContactMan"></x-input>
                <x-input title="联系电话" :disabled="true" placeholder="暂无" :value="item.RiskDutyContactTel"></x-input>
            </div>

            <div class="BasicInfoD" v-if="JSON.stringify(riskInfo.ListRiskRegulatory)!=='[]'" v-for="item in riskInfo.ListRiskRegulatory">
                <div class="title">监管机构</div>
                <x-input title="单位名称" :disabled="true" placeholder="暂无" :value="item.RiskRegulatoryName"></x-input>
                <x-input title="单位地址" :disabled="true" placeholder="暂无" :value="item.RiskFullRegulatoryAddress"></x-input>
                <x-input title="联系人" :disabled="true" placeholder="暂无" :value="item.RiskRegulatoryContactMan"></x-input>
                <x-input title="联系电话" :disabled="true" placeholder="暂无" :value="item.RiskRegulatoryContactTel"></x-input>
            </div>

            <div class="evaluation" v-if="JSON.stringify(riskInfo.ListRiskAssess)!=='[]'">
                <div class="title">评估列表<span class="more" v-on:click="openEvaluation">查看全部</span></div>
                <div class="evaluationList" v-on:click="openEvaluationInfo">
                    <div style="font-size: 14px;" v-if="riskInfo.ListRiskAssess">

                        <div style="position: absolute; right: 10px; top: 10px;">
                            <p class="p_center" :style="{'color':fontColor[riskInfo.ListRiskAssess[0].RiskAssessLv]}">
                                <Icon slot="icon" class="icon" :name="'level'" />{{riskStatus[riskInfo.ListRiskAssess[0].RiskAssessLv] }}</p>
                            <p class="p_center">
                                <Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{ riskInfo.ListRiskAssess[0].RiskAssessScore }}</p>
                        </div>

                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'riskType'" style="color:#33CC99" />类型: {{riskInfo.ListRiskAssess[0].RiskAssessTypeNames | s_toStr}}</p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />评估人: {{riskInfo.ListRiskAssess[0].RiskAssessManName | s_toStr}}</p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间: {{riskInfo.ListRiskAssess[0].RiskAssessDate | s_toDate}}</p>
                        <p class="p_center"><span class="displayFlex"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /></span><span><p class="assessInfo">描述: {{riskInfo.ListRiskAssess[0].RiskAssessIntro | s_toStr}}</p></span></p>
                        <p class="p_center">
                            <Icon slot="icon" class="icon" :name="'auditor'" style="color:#33CC99" />审核人: {{riskInfo.ListRiskAssess[0].RiskAssessAuditManName | s_toStr}}</p>
                        <p style="float: right; margin-top: -31px;">审核状态: {{RiskAssessStatusName[riskInfo.ListRiskAssess[0].RiskAssessStatus]}}</p>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>
            
            <div class="evaluation" v-if="JSON.stringify(riskInfo.ListRiskHidden)!=='[]'">
                <div class="title"><span>风险隐患</span> <span class="allHidDan"> <span @click="goPage('riskDangerList',{id:250})">全部隐患</span><span @click="goPage('riskDangerListModify',{id:250})">全部整改</span></span></div>
                
                <HidDanger :item="(riskInfo.ListRiskHidden?riskInfo.ListRiskHidden[0]:[])" />

            </div>

            <div v-if="riskInfo.RiskStatus == 1 || riskInfo.RiskStatus == 0" style="width: 100%;height: 60px;"></div>

            <div v-transfer-dom>
                <!--<popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">-->
                <popup v-model="show">
                    <div class="popup0">
                        <radio :options="menu" @on-change="change" v-model="result"></radio>
                        <x-textarea title="原因" :max="200" placeholder="请输入原因" :show-counter="false" v-model="riskAuditIntro" :height="200" :rows="8"
                            :cols="30"></x-textarea>
                        <div class="btn">
                            <x-button type="primary" style="background: #33CC99;" @click.native="submit">提交审核</x-button>
                        </div>

                    </div>
                </popup>
            </div>

            <!-- v-if="$route.params.editStatus==0?false:(riskInfo.RiskStatus==3?false:true) -->
            <div class="footerBox" v-if="JSON.stringify(menuStatus)!=='[]'">
                <div>
                    <x-button @click.native="editMenuStatus = true;">操作</x-button>
                    <!--<x-button type="primary" @click.native="showAudit" v-if="riskInfo.RiskStatus == 1">审核</x-button>-->
                </div>
                <!--<flexbox-item v-if="riskInfo.RiskStatus == 1">
                    <x-button style="background:red;" type="warn" @click.native="revoke">撤销</x-button>
                </flexbox-item>-->
            </div>

            <div v-transfer-dom>
                <actionsheet :menus="editMenu" v-model="editMenuStatus" show-cancel @on-click-menu="changeEdit"></actionsheet>
            </div>

        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import HidDanger from './../../components/common/HidDanger.vue'
    import { TransferDom,Actionsheet, Tab, TabItem, Sticky, Divider, XButton, Flexbox, FlexboxItem, Radio, Swiper, SwiperItem, XInput, Selector, Group, Popup, XTextarea } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'
    const list = () => ['基本信息', '评估信息', '责任主体', '监管机构']

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
            Selector,
            Popup,
            Group,
            XTextarea,
            Flexbox,
            FlexboxItem,
            Radio,
            Actionsheet,
            HidDanger,
        },
        watch: {
            status(val, oldVal) {
            },

            riskInfo() {
                
                this.addOperation = this.$route.params.add==1;
                this.$store.commit("setRiskId", this.riskInfo.ID)

                // editStatus     0是查看详情  1是用户编辑 或 撤回   2是审核
                // 风险状态    -1(全部)   0(暂存+审核退回)   1(待审核)  3(已审核) 

                const editStatus = this.$route.params.editStatus;
                let menuStatus = [];

                console.log('我是风险状态'+this.riskInfo.RiskStatus);

                if(editStatus == 0){
                    menuStatus = [];
                }else if(editStatus == 1){
                    
                    if(this.riskInfo.RiskStatus==0||this.riskInfo.RiskStatus==2){
                        menuStatus = ['编辑','删除']
                    }else if(this.riskInfo.RiskStatus==1){
                        menuStatus = ['撤回']
                    }

                }else if(editStatus == 2 && this.riskInfo.RiskStatus==1){
                    menuStatus = ['审核'];
                }
                
                // const menu = [[],['编辑','撤销'],(this.riskInfo.RiskStatus==1?['审核']:[])];

                this.menuStatus = menuStatus;
                this.editMenu = menuStatus;

                console.log(`我是风险的状态${this.riskInfo.RiskStatus}***这是我的状态${menuStatus}`);
                

            }
        },
        mounted() {

            this.getRiskInfo(this.$route.params.riskId);
            console.log(this.$route.params);
        },
        data() {
            return {
                editMenuStatus:false,
                editMenu:[],
                lists: list(),
                index: 0,
                status: '基本信息',
                routerName: ['basicInfoA', 'basicInfoB', 'basicInfoC', 'basicInfoD'],
                show: false,
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
                menu: [{ 'key': 3, 'value': '通过' }, { 'key': 2, 'value': '不通过' }],
                menuStatus:[],
                show: false,
                result: "",
                riskAuditIntro: "",
                addOperation: ""
            }
        },
        created() {
            this.addOperation = this.$route.params.add;
        },

        methods: {
            ...mapActions([
                'getRiskInfo',
                'showToast'
            ]),
            ...mapMutations([
                'openConfirm',
                'editRisk'
            ]),
            goPage(name,param){
                console.log(`这是隐患详情的参数${JSON.stringify(this.$route.params)}`);
                
                this.$router.push({name:name, params: this.$route.params});

            },
            openEvaluationInfo(ID) {
                this.$router.push({ name: 'evaluationInfo',params:{infoId:this.riskInfo.ListRiskAssess[0].ID} });
            },

            openEvaluation(item) {
                this.$router.push({ name: "evaluationList", params: this.$route.params });
            },
            addEvaluation() {
                this.show = true
            },
            changeEdit(val){

                console.log(this.menuStatus[0]);
                console.log(val);

                if(val=='cancel'){
                    return;
                }

                if(this.menuStatus[0] == '编辑'){

                    // this.openConfirm({state:true,msg:'确定要编辑吗？',control: ()=>{
                        this.$router.push({name:'riskAdd',params:{id:this.riskInfo.ID}});

                        this.editRisk(this.riskInfo);

                    // }});

                }else if(this.menuStatus[0] == '撤回'){

                    this.openConfirm({state:true,msg:'确定要撤回吗？',control: ()=>{
                        // this.deleteListRiskDuty({index: index});
                    }});

                }else if(this.menuStatus[0] == '审核'){
                    this.showAudit();
                }


            },
            //审核
            showAudit() {

                this.show = true;

            },

            change(data) {

                this.$store.commit("setRiskAuditStatus", data);

            },
            submit() { //提交审核
                var t_data = this;

                if (!this.result) {
                    this.showToast({ toastState: true, toastValue: '请选择结果！' })
                    return;
                }

                if (!this.riskAuditIntro) {
                    this.showToast({ toastState: true, toastValue: '请输入原因' })
                    return;
                }

                this.$store.commit("setRiskAuditIntro", t_data.riskAuditIntro);

                this.$store.dispatch("updateRiskStatusAudit")

                this.showToast({ toastState: true, toastValue: '审核成功' })

                this.show = false;

                setTimeout(() => {
                    this.$router.push({ name: 'myAuditList' });
                }, 2000)
            },

            revoke() {
                this.$store.dispatch("updateRiskStatusRecall")
            }
        },
        computed: {
            ...mapState({
                riskInfo(state) {
                    return state.riskInfo.riskInfo;
                }
            })
        }
    }

</script>
<style lang="less">
    #riskInfo {
        background: #f1f1f1;
        box-sizing: border-box;
        height: 100%;
        .review{
            padding: 10px;
            background:#fff;
        }
        .displayFlex {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .assessInfo {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            line-height: normal!important;
        }
        .icon {
            padding-right: 10px;
        }
        .weui-label {
            width: 5em!important;
        }
        .vux-swiper {
            height: 100%!important;
        }
        .title {
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 45px;
            border-bottom: 2px solid #33CC99;
            padding: 0 15px;
            .allHidDan{
                span{
                    margin-left:15px;
                }
            }
        }
        .more {
            position: absolute;
            right: 15px;
            font-size: 14px;
            color: #666;
        }
        .BasicInfoA {
            margin-top: 15px;
            background: #fff;
        }
        .BasicInfoB {
            margin-top: 15px;
            background: #fff;
        }
        .BasicInfoC {
            margin-top: 15px;
            background: #fff;
        }
        .BasicInfoD {
            margin-top: 15px;
            background: #fff;
        }
        .next {
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding: 15px;
            background: #f1f1f1;
        }
        button.weui-btn,
        input.weui-btn {
            color: white;
            background: #33CC99;
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
        .evaluation {
            width: 100%;
            margin: 15px 0 0px 0;
            background: white;
        }
        .evaluationList {
            padding: 10px 15px;
            position: relative;
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
        [v-cloak] {
            display: none;
        }
        /*审核*/
        .vux-flexbox {
            position: fixed;
            bottom: 0;
            z-index: 99;
        }
        .vux-flexbox-item {
            padding: 10px;
            background: #fff;
        }
        .weui-btn {
            // border-radius: 0 !important;
        }
        .weui-btn_primary {
            background-color: #33CC99 !important;
        }
        .popup0 .weui-cell__hd {
            width: 50px;
        }

    }
</style>