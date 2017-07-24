<template>
    <div class="basicInfoB">
        <div class="enterInfo">

            <x-input title="等级/分值" :disabled="true" value="(待设置) / (待设置)" placeholder="风险等级"></x-input>

            <x-textarea title="风险描述" 
                placeholder="风险描述" 
                :show-counter="false"
                :value="riskIntro"
                @on-change="changeRiskIntro"
            ></x-textarea>

            <group>
                <swipeout>
                    <swipeout-item transition-mode="follow">
                        <div slot="right-menu">
                            <swipeout-button @click.native="oepnAssessDetail('edit')" type="primary">{{'编辑'}}</swipeout-button>
                            <swipeout-button @click.native="oepnAssessDetail('delete')" type="warn">{{'删除'}}</swipeout-button>
                        </div>
                        <div slot="content" class="demo-content vux-1px-t">
                            <cell :title="'我是风险类型'" :inline-desc="'风险等级：高 ， 风险分值：200'">
                                <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../../assets/icon/assess-icon.svg">
                            </cell>
                        </div>
                    </swipeout-item>
                </swipeout>
            </group>

        </div>

        <div class="next">
            <x-button @click.native="evaluation = true">增加</x-button>
            <x-button @click.native="showData">提交风险</x-button>
        </div>
        <popup v-model="evaluation" :hide-on-blur="false">
            <div class="evaluation">

                <selector 
                    title="风险类型" 
                    placeholder="请选择"
                    :options="RiskAssessType" 
                    v-model="defalutAssess.RiskAssessTypeID"
                    @on-change="RiskAssessTypeChoose"
                ></selector>

                <selector 
                    title="频繁程度" 
                    placeholder="请选择"
                    :options="RiskAssessE"
                    v-model="defalutAssess.RiskAssessEScore"
                    @on-change="RiskAssessEChoose"
                ></selector>

                <selector 
                    title="事故后果" 
                    placeholder="请选择"
                    :options="RiskAssessC" 
                    v-model="defalutAssess.RiskAssessCScore"
                    @on-change="RiskAssessCChoose"
                ></selector>

                <selector 
                    title="可能性"
                    placeholder="请选择"
                    :options="RiskAssessL"
                    v-model="defalutAssess.RiskAssessLScore"
                    @on-change="RiskAssessLChoose"
                ></selector>

                <x-input 
                    title="风险等级" 
                    :disabled="true" 
                    value="高" 
                    placeholder="等级"
                ></x-input>

                <x-input 
                    title="风险分值" 
                    :disabled="true" 
                    :value="countScore" 
                    placeholder="分值"
                ></x-input>
                
                <div class="next">
                    <x-button @click.native="evaluation = false">确定</x-button>
                    <x-button @click.native="evaluation = false">关闭</x-button>
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton,Selector, Value2nameFilter as value2name, XTextarea,Popup, Confirm, XSwitch, TransferDomDirective as TransferDom,GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import {mapMutations, mapState} from 'vuex'
    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            Selector,
            XTextarea,
            Popup,
            Confirm,
            XSwitch,
            GroupTitle,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
        },
        watch:{},
        data(){
            return{
                evaluation: false,
                RiskAssessTypeVal:1021,
                riskIntro:'',
                // defalutAssess:{
                //     RiskAssessEVal:0.5,
                //     RiskAssessCVal:'',
                //     RiskAssessLVal:'',
                // },
                defalutAssess:{
                    "ID": 0,
                    "RiskID": 0,
                    "RiskAssessID": 0,

                    "RiskAssessTypeID": 0,      //** 评估类型ID /火灾ID */
                    "RiskAssessTypeName": "",   //** 类型的名称 /火灾 */

                    "RiskAssessLID": 0,         //**ID */
                    "RiskAssessLName": "",      //**名称 */
                    "RiskAssessLScore": 0,      //**分值 */

                    "RiskAssessEID": 0,         //**ID */
                    "RiskAssessEName": "",      //**名称 */
                    "RiskAssessEScore": 0,      //**分值 */

                    "RiskAssessCID": 0,         //**ID */
                    "RiskAssessCName": "",      //**名称 */
                    "RiskAssessCScore": 0,      //**分值 */

                    "RiskAssessDetailLv": 0,    //** 4(可忽略)，3(低)，2(中等)，1(高)，0(极高) 风险等级 */
                    "RiskAssessDetailScore": 0  //**分值 10000 */
                }
            }
        },

        // RiskAssessL
        // RiskAssessE
        // RiskAssessC
        // RiskAssessType

        computed: {
            ...mapState({
                RiskAssessType(state){

                    let RiskAssessType=[];
                    const RiskAssessTypeItem = state.tiskAdd.riskBaseType.RiskAssessType;

                    if(JSON.stringify(RiskAssessTypeItem)!=='[]'){
                        for(let item in RiskAssessTypeItem){
                            RiskAssessType.push({
                                key: RiskAssessTypeItem[item].ID,
                                value: RiskAssessTypeItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessType;

                },
                RiskAssessE: state => {
                    let RiskAssessE=[];
                    const RiskAssessLItem = state.tiskAdd.riskBaseType.RiskAssessE;

                    if(JSON.stringify(RiskAssessLItem)!=='[]'){
                        for(let item in RiskAssessLItem){
                            RiskAssessE.push({
                                key: RiskAssessLItem[item].BaseScore,
                                value: RiskAssessLItem[item].BaseName
                            });
                        }
                    }

                    return RiskAssessE;
                },
                RiskAssessC(state){

                    let RiskAssessC=[];
                    const RiskAssessCItem = state.tiskAdd.riskBaseType.RiskAssessC;

                    if(JSON.stringify(RiskAssessCItem)!=='[]'){
                        for(let item in RiskAssessCItem){
                            RiskAssessC.push({
                                key: RiskAssessCItem[item].BaseScore,
                                value: RiskAssessCItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessC;
                },
                RiskAssessL(state){
                    let RiskAssessL=[];
                    const RiskAssessLItem = state.tiskAdd.riskBaseType.RiskAssessL;

                    if(JSON.stringify(RiskAssessLItem)!=='[]'){
                        for(let item in RiskAssessLItem){
                            RiskAssessL.push({
                                key: RiskAssessLItem[item].BaseScore,
                                value: RiskAssessLItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessL;
                },
            }),
            nuwData(){
                let now = new Date();
                return `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
            },
            countScore(){
                return this.defalutAssess.RiskAssessLScore * this.defalutAssess.RiskAssessEScore * this.defalutAssess.RiskAssessCScore;
            }
        },
        watch:{

        },
        methods:{
            ...mapMutations([
                'upRiskAdd',
                'pushAssessDetail',
                'deleteAssessDetail',
                'editAssessDetail',
            ]),
            RiskAssessTypeChoose(val){
                console.log(val);
            },
            RiskAssessEChoose(val){
                console.log(val);
            },
            RiskAssessCChoose(val){
                console.log(val);
            },
            RiskAssessLChoose(val){
                console.log(val);
            },
            changeRiskIntro(e){
                this.upRiskAdd({RiskIntro:e});
            },
            showData(){
                console.log(this.$store.state.tiskAdd.riskBaseType);
            },
            next(){
                // this.$router.push({name:'basicInfoC'});
            },
            enter(){
                this.$router.push({name:'BasicInfoB_Evaluation'});
            },
            oepnAssessDetail(){
            },
            clearData(){
                this.defaultRegulatory.RiskRegulatoryContactMan = '';
                this.defaultRegulatory.RiskRegulatoryName = '';
                this.defaultRegulatory.RiskRegulatoryContactTel = '';
                // this.defaultRegulatory.RiskRegulatoryArea1 = '';
                // this.defaultRegulatory.RiskRegulatoryArea2 = '';
                // this.defaultRegulatory.RiskRegulatoryArea3 = '';
                this.defaultRegulatory.RiskRegulatoryAddress = '';
                // this.addressValue = [];
            },
            oepnRegulatory(type,index){

                this.defaultRegulatoryType = type;
                this.defaultRegulatoryIndex = index;
                if(type=='open'){
                    this.basicInfoDPopup = true;
                }else if(type=='edit'){

                    this.defaultRegulatory = {
                        "RiskRegulatoryContactMan":this.ListRiskRegulatory[index].RiskRegulatoryContactMan,
                        "RiskRegulatoryName":this.ListRiskRegulatory[index].RiskRegulatoryName,
                        "RiskRegulatoryContactTel":this.ListRiskRegulatory[index].RiskRegulatoryContactTel,
                        "RiskRegulatoryArea1":this.ListRiskRegulatory[index].RiskRegulatoryArea1,
                        "RiskRegulatoryArea2":this.ListRiskRegulatory[index].RiskRegulatoryArea2,
                        "RiskRegulatoryArea3":this.ListRiskRegulatory[index].RiskRegulatoryArea3,
                        "RiskRegulatoryAddress":this.ListRiskRegulatory[index].RiskRegulatoryAddress,
                    };
                    this.addressValue = [this.ListRiskRegulatory[index].RiskRegulatoryArea1, this.ListRiskRegulatory[index].RiskRegulatoryArea2, this.ListRiskRegulatory[index].RiskRegulatoryArea3];
                    this.basicInfoDPopup = true;
                }else if(type=='close'){
                    this.clearData();
                    this.basicInfoDPopup = false;
                }else if(type=='delete'){
                    this.deleteListRegulatory({index: index});
                }
                
            },
        },
        mounted(){
            const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
            this.riskIntro = postRiskAdd.RiskIntro
            // console.log(JSON.stringify(postRiskAdd));
        }
    }
</script>
<style lang="less">
    .basicInfoB{
        height:100%;
        background:#fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .enterInfo{
            margin-top: 10px;
            background:#fff;
        }
        .next{
            box-sizing: border-box;
            padding:2rem 15px 15px;
        }
        .weui-label{
            width: 5em!important;
        }
        .evaluation{
            width:100%;
            background:#fff;
            box-sizing: border-box;
        }
        .box1 {
            width: 600px;
            .vux-table{width:600px;}
        }
        .vux-table td, .vux-table th{
            border-bottom: 1px solid #e0e0e0!important;
            border-right: 1px solid #e0e0e0!important;
            text-align: center!important;
        }
    }
</style>