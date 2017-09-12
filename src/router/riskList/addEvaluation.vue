<template>
    <div id="addEvaluation">
        <div class="enterInfo">
            <Heads :title="'新增评估'" :isEvaluationList="false"></Heads>

            <selector title="风险类型" placeholder="请选择" :options="RiskIntro" v-model="formInfo.RiskAssessIntroID" @on-change="RiskIntroChange"></selector>

            <selector 
                title="指定审核人"
                placeholder="请选择"
                :options="aduitUser"
                :value="RiskAssessAuditMan"
                @on-change="changeRiskAssessAuditMan"
            ></selector>

            <x-input title="等级/分值" :disabled="true" :value="`${status[formInfo.RiskAssessLv]}/${formInfo.RiskAssessScore}`" placeholder="风险等级"></x-input>
            <x-textarea title="评估描述" placeholder="评估描述" :show-counter="false" v-model="formInfo.RiskAssessIntro"></x-textarea>
            <group>
                <swipeout>
                    <swipeout-item transition-mode="follow" v-for="(item,index) in formInfo.ListRiskAssessDetail" :key="index">
                        <div slot="right-menu">
                            <swipeout-button @click.native="oepnAssess('edit',index,item)" type="primary">{{'编辑'}}</swipeout-button>
                            <swipeout-button @click.native="oepnAssess('delete',index,item)" type="warn">{{'删除'}}</swipeout-button>
                        </div>
                        <div slot="content" class="demo-content vux-1px-t">
                            <cell :title="item.RiskAssessTypeName" :inline-desc="`等级:${status[item.RiskAssessDetailLv]}  分值:${item.RiskAssessDetailScore}`">
                                <Icon slot="icon" class="flexBox" :name="'assess-icon'" :width="'40'" :height="'40'" style="color:#33CC99" />
                            </cell>
                        </div>
                    </swipeout-item>
                </swipeout>
            </group>
            <div class="next">
                <load-more v-if="formInfo.ListRiskAssessDetail.length == 0" :show-loading="false" :tip="'暂无评估'" background-color="#fbf9fe"></load-more>
                <x-button class="add" @click.native="oepnAssess('open',-1)">增加</x-button>
            </div>


            <popup v-model="ShowEditDetial" :hide-on-blur="false">
                <div class="evaluation">
                    <selector title="风险类型" :options="RiskAssessType" v-model="TmpRiskAssessDetail.RiskAssessTypeID" @on-change="RiskAssessTypeChoose"></selector>
                    <selector title="频繁程度" :options="RiskAssessE" v-model="TmpRiskAssessDetail.RiskAssessEScore" @on-change="RiskAssessEChoose"></selector>
                    <selector title="事故后果" :options="RiskAssessC" v-model="TmpRiskAssessDetail.RiskAssessCScore" @on-change="RiskAssessCChoose"></selector>
                    <selector title="可能性" :options="RiskAssessL" v-model="TmpRiskAssessDetail.RiskAssessLScore" @on-change="RiskAssessLChoose"></selector>
                    <x-input title="风险等级" :disabled="true" :value="RiskAssessDetailLv" placeholder="等级"></x-input>
                    <x-input title="风险分值" :value="countScore" :disabled="true" placeholder="分值"></x-input>
                    <div class="next1">
                        <x-button @click.native="addAssess">确定</x-button>
                        <x-button @click.native="ShowEditDetial = false">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>
        <div class="lower">

            <div class="next">
            </div>
            <div class="next2">
                <flexbox>
                    <flexbox-item>
                        <x-button v-if="" @click.native="upDataRiskAdd(0)">保存</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button @click.native="upDataRiskAdd(1)">提交审核</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            
        </div>
    </div>
</template>
<script>
    import { LoadMore, XInput, Group, Cell, XAddress, ChinaAddressV3Data, Flexbox, FlexboxItem, XButton, Selector, Value2nameFilter as value2name, XTextarea, Popup, Confirm, XSwitch, TransferDomDirective as TransferDom, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
    import { api } from './../../servers/api'
    import Heads from './../../components/Heads.vue'
    export default {
        components: {
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
            Heads,
            LoadMore,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                ShowEditDetial: false,
                riskIntro: '',
                assessType: '',
                assessIndex: '',
                status: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessDetailLv: '',
                RiskAssessAuditMan:'',
                formInfo: {
                    ListRiskAssessDetail: [],
                    RiskAssessLv: 4,
                    RiskAssessScore: 0,
                    RiskAssessStatus: 0,
                    RiskAssessTypeNames: "",
                    RiskAssessAuditMan:"",
                    RiskAssessAuditManName:"",
                    RiskAssessIntroID: '',
                    RiskAssessRemark:'',
                },
                TmpRiskAssessDetail: {

                    "ID": 1025,
                    "RiskID": 1022,

                    "RiskAssessTypeID": '',     //** 评估类型ID /火灾ID */
                    "RiskAssessTypeName": "",   //** 类型的名称 /火灾 */

                    "RiskAssessLID": '',        //** ID */
                    "RiskAssessLName": '',      //** 名称 */
                    "RiskAssessLScore": '',     //** 分值 */

                    "RiskAssessEID": '',        //** ID */
                    "RiskAssessEName": "",      //** 名称 */
                    "RiskAssessEScore": '',     //** 分值 */

                    "RiskAssessCID": '',        //** ID */
                    "RiskAssessCName": "",      //** 名称 */
                    "RiskAssessCScore": '',     //** 分值 */

                    "RiskAssessDetailLv": '',   //** 4(可忽略)，3(低)，2(中等)，1(高)，0(极高) 风险等级 */
                    "RiskAssessDetailScore": '' //** 分值 10000 */
                }
            }
        },
        methods: {

            ...mapMutations([
                'openConfirm',
                'upRiskAdd',
                'pushAssessDetails',
                'deleteAssessDetails',
                'editAssessDetails',
                'initData',
                'saveAssesss',
                'saveInfoId'
            ]),
            ...mapActions([
                'showToast',
                // 'postRiskAdds',
                'reloadRiskAssess'
            ]),
            changeRiskAssessAuditMan(val){
                if(val){

                    for(let item in this.aduitUser){
                        
                        if(this.aduitUser[item].key==val){

                            console.log(`我是ID和名字${val}${this.aduitUser[item].value}`);
                            this.formInfo.RiskAssessAuditMan = val;
                            this.formInfo.RiskAssessAuditManName = this.aduitUser[item].value;

                        }
                    }
                }
            },
            changeRiskIntro(e) {
                this.saveAssesss({ RiskAssessIntro: e });
            },
            next() {
                this.$router.push({ name: 'basicInfoC' });
            },
            enter() {
                this.$router.push({ name: 'BasicInfoB_Evaluation' });
            },

            RiskAssessTypeChoose(val) {
                for (let key in this.RiskAssessType) {
                    if (this.RiskAssessType[key].key == this.TmpRiskAssessDetail.RiskAssessTypeID) {
                        this.TmpRiskAssessDetail.RiskAssessTypeName = this.RiskAssessType[key].value;
                        break;
                    }
                }
            },
            RiskAssessCChoose(data) {
                for (let key in this.RiskAssessC) {
                    if (this.RiskAssessC[key].key == this.TmpRiskAssessDetail.RiskAssessCScore) {
                        this.TmpRiskAssessDetail.RiskAssessCID = this.RiskAssessC[key].id;
                        this.TmpRiskAssessDetail.RiskAssessCName = this.RiskAssessC[key].value;
                        break;
                    }
                }
            },

            RiskAssessLChoose(data) {
                for (let key in this.RiskAssessL) {
                    if (this.RiskAssessL[key].key == this.TmpRiskAssessDetail.RiskAssessLScore) {
                        this.TmpRiskAssessDetail.RiskAssessLID = this.RiskAssessL[key].id;
                        this.TmpRiskAssessDetail.RiskAssessLName = this.RiskAssessL[key].value;
                        break;
                    }
                }
            },
            RiskAssessEChoose(data) {
                for (let key in this.RiskAssessE) {
                    if (this.RiskAssessE[key].key == this.TmpRiskAssessDetail.RiskAssessEScore) {
                        console.log(`${this.RiskAssessE[key].value}||${this.RiskAssessE[key].key}||${this.RiskAssessE[key].id}`);
                        this.TmpRiskAssessDetail.RiskAssessEID = this.RiskAssessE[key].id;
                        this.TmpRiskAssessDetail.RiskAssessEName = this.RiskAssessE[key].value;
                        break;
                    }
                }
            },
            RiskIntroChange(e){

                for(var item in this.RiskIntro){
                    if(this.RiskIntro[item].key == e){
                        
                        console.log(`${e}||${this.RiskIntro[item].value}`);
                        this.formInfo = {...this.formInfo, RiskAssessIntroID: e, RiskAssessRemark: this.RiskIntro[item].value }

                    }
                }

            },
            clearData() {
                for (let key in this.TmpRiskAssessDetail) {
                    this.TmpRiskAssessDetail[key] = '';
                }
            },
            calcScore() {
                this.formInfo.RiskAssessScore = 0;
                this.formInfo.RiskAssessLv = 4;
                this.formInfo.ListRiskAssessDetail.forEach((item) => {
                    if (item.RiskAssessDetailScore > this.formInfo.RiskAssessScore) {
                        this.formInfo.RiskAssessScore = item.RiskAssessDetailScore;
                        this.formInfo.RiskAssessLv = item.RiskAssessDetailLv
                    }
                })
            },
            addAssess() {
                const tmpdata = { ...{}, ...this.TmpRiskAssessDetail };

                if (!tmpdata.RiskAssessTypeID) {
                    this.showToast({ toastState: true, toastValue: '请选择评估类型' })
                    return;
                }

                if (!tmpdata.RiskAssessEID) {
                    this.showToast({ toastState: true, toastValue: '请选择频繁程度' })
                    return;
                }

                if (!tmpdata.RiskAssessCID) {
                    this.showToast({ toastState: true, toastValue: '请选择事故后果' })
                    return;
                }

                if (!tmpdata.RiskAssessLID) {
                    this.showToast({ toastState: true, toastValue: '请选择可能性' })
                    return;
                }

                if (this.assessType == 'edit') {
                    this.formInfo.ListRiskAssessDetail[this.assessIndex] = tmpdata;
                    // console.log(this.formInfo.RiskAssessTypeNames)
                } else {
                    this.formInfo.ListRiskAssessDetail.push(tmpdata);
                }
                this.calcScore()
                this.ShowEditDetial = false;
            },

            oepnAssess(type, index, item) {

                this.assessType = type;
                this.assessIndex = index;
                //先清空
                this.clearData();
                if (type == 'open') {
                    this.ShowEditDetial = true;
                } else if (type == 'edit') {
                    this.TmpRiskAssessDetail = { ...{}, ...item }
                    this.ShowEditDetial = true;
                } else if (type == 'delete') {
                    this.formInfo.ListRiskAssessDetail.splice(index, 1);
                    this.calcScore()
                }
            },
            formPost(){
                const params= {...{},...this.formInfo}
                
                        api.postRiskAssessAdd(params).then((data) => {

                          const  ret=data.all
                             if (ret.status) {
                                    // this.$router.push({ name: 'evaluationList' });
                                    this.$router.go(-1)
                                }
                                else {
                                    this.showToast({ toastState: true, toastValue: ret.info });
                                    return;
                                }
                 })
            },
            upDataRiskAdd(state) {
                
                // console.log('我是要提交的数据********');
                // console.log(JSON.stringify(this.formInfo));
                this.formInfo.RiskAssessStatus = state;

                if (!this.formInfo.RiskAssessAuditMan) {
                    this.showToast({ toastState: true, toastValue: '请指定审核人' });
                    return;
                }

                if (this.formInfo.ListRiskAssessDetail.length == 0) {
                    this.showToast({ toastState: true, toastValue: '您至少添加一个风险评估！' });
                    return;
                }
                
                if (!this.formInfo.RiskAssessIntroID) {
                    this.showToast({ toastState: true, toastValue: '请选择描述选项！' });
                    return;
                }

                if (!this.formInfo.RiskAssessIntro) {
                    this.showToast({ toastState: true, toastValue: '请填写评估描述！' });
                    return;
                }

                if(this.formInfo.RiskAssessTypeNames.length > 0){
                    this.formInfo.RiskAssessTypeNames = ''
                }

                    for( let item in this.formInfo.ListRiskAssessDetail ){
                            this.formInfo.RiskAssessTypeNames += `${this.formInfo.ListRiskAssessDetail[item].RiskAssessTypeName} `;
                    }
                
              
                 this.openConfirm({
                    state: true, msg: `您确定要${state == 0 ? "保存" : "提交"}吗？`, control: () => { 
                        this.formInfo.RiskAssessStatus =   this.formInfo.RiskAssessStatus == 2   ?  2 :  state;
                        this.formPost()
                    }
                })
            }
        },

        mounted() {
            const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
            this.riskIntro = postRiskAdd.RiskIntro
            this.formInfo.RiskAssessTypeNames = "";

            console.log('我数新增评估**************************');
            console.log(this.$route.params);

            if (typeof(this.$route.params.item)=='object') {
                
                this.formInfo = this.$route.params.item;
                this.RiskAssessAuditMan = this.formInfo.RiskAssessAuditMan || '';
                
                // let tmpinfo = this.riskAssessList.filter(res => res.ID == this.$route.params.evaluationInfoId)[0];

                // this.riskIntro = tmpinfo.RiskAssessIntro;
                // tmpinfo.ListRiskAssessDetail.forEach((item) => {
                //     this.pushAssessDetails(item)
                // });

            }
        },

        created() {

            this.formInfo.RiskID = this.$route.params.riskId;

            // this.formInfo.RiskID=this.$route.params.id;

            // if (this.$route.params.ID){
            //     this.$store.dispatch("getRiskAssessInfo", {
            //                 data: {ID:this.$route.params.ID}, callback: (ret) => {
            //                     if (ret.status) {
            //                          this.formInfo =  ret.info
            //                     }
            //                     else {
            //                         this.showToast({ toastState: true, toastValue: ret.info });
            //                         return;
            //                     }
            //                 }
            //             })
                
            // }
        },

        computed: {

            nuwData() {
                let now = new Date();
                return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
            },
            ...mapState({
                aduitUser(state){

                    let aduitUser=[];
                    console.log(state);
                    const aduitUserItem = state.riskSelectAduitUser;

                    if(JSON.stringify(aduitUserItem)!=='[]'){
                        for(let item in aduitUserItem){
                            aduitUser.push({
                                key: aduitUserItem[item].ID,
                                value: aduitUserItem[item].UserNickName
                            });
                        }
                    };

                    console.log(`**************************************************`);
                    console.log(aduitUser);

                    return aduitUser;

                },
                RiskAssessType: state => {
                    let riskData = [];
                    let t_data = this;

                    if (state.evaluation.RiskType.length != 0) {
                        for (let item in state.evaluation.RiskType[0].detail_BaseDataList) {
                            riskData.push({
                                key: state.evaluation.RiskType[0].detail_BaseDataList[item].ID,
                                value: state.evaluation.RiskType[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }
                    return riskData;
                },
                RiskAssessC: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentConsequence.length != 0) {
                        for (let item in state.evaluation.AccidentConsequence[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.AccidentConsequence[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },

                RiskAssessE: state => {
                    let riskData = [];

                    if (state.evaluation.ExposedDegree.length != 0) {
                        for (let item in state.evaluation.ExposedDegree[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.ExposedDegree[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },
                RiskAssessL: state => {
                    let riskData = [];

                    if (state.evaluation.AccidentPossibility.length != 0) {
                        for (let item in state.evaluation.AccidentPossibility[0].detail_BaseDataList) {
                            riskData.push({
                                id: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].ID,
                                key: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseScore,
                                value: state.evaluation.AccidentPossibility[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },
                // ListRiskAssessDetail(state) {
                //     const ListRiskAssessDetail = state.evaluation.riskAssessData.ListRiskAssessDetail;
                //     return ListRiskAssessDetail;
                // },
                riskAssessList(state) {
                    return state.evaluation.riskAssessList;
                },
                RiskIntro(state){
                    let RiskIntro = [];
                    const RiskIntroItem = state.tiskAdd.riskBaseType.RiskIntro;

                    if (JSON.stringify(RiskIntroItem) !== '[]') {
                        for (let item in RiskIntroItem) {
                            RiskIntro.push({
                                key: RiskIntroItem[item].ID,
                                value: RiskIntroItem[item].BaseName
                            });
                        }
                    }
                    return RiskIntro;
                },
            }),

            countScore() {
                this.TmpRiskAssessDetail.RiskAssessDetailScore = this.TmpRiskAssessDetail.RiskAssessLScore * this.TmpRiskAssessDetail.RiskAssessEScore * this.TmpRiskAssessDetail.RiskAssessCScore;
                let countVal = this.TmpRiskAssessDetail.RiskAssessDetailScore;

                let status = ['极高', '高', '中等', '低', '可忽略'];
                let state;
                if (countVal <= 70) {
                    state = 4;
                } else if (countVal >= 70 && countVal < 150) {
                    state = 3;
                } else if (countVal >= 150 && countVal < 240) {
                    state = 2;
                } else if (countVal >= 240 && countVal < 720) {
                    state = 1;
                } else if (countVal >= 720) {
                    state = 0;
                }

                this.RiskAssessDetailLv = status[state];
                this.TmpRiskAssessDetail.RiskAssessDetailLv = state;

                return this.TmpRiskAssessDetail.RiskAssessLScore * this.TmpRiskAssessDetail.RiskAssessEScore * this.TmpRiskAssessDetail.RiskAssessCScore;
            }

        }
    }

</script>
<style lang="less">
    #addEvaluation {
        height: 100%;
        background: #fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .enterInfo {
            background: #fff;
        }
        .next {
            box-sizing: border-box;
            padding: 2rem 15px 15px;
            background: #fbf9fe;
        }

        .next1 {
            box-sizing: border-box;
            padding: 2rem 15px 15px;
        }
        .next2 {
            box-sizing: border-box;
            padding: 0 15px 15px 15px;
            background: #fbf9fe;
        }
        .weui-label {
            line-height: 100%;
            width: 5.5em!important;
        }
        .evaluation {
            width: 100%;
            background: #fff;
            box-sizing: border-box;
        }
        .box1 {
            width: 600px;
            .vux-table {
                width: 600px;
            }
        }
        .vux-table td,
        .vux-table th {
            border-bottom: 1px solid #e0e0e0!important;
            border-right: 1px solid #e0e0e0!important;
            text-align: center!important;
        }
        .weui-cell_select-after .weui-select{
            line-height: inherit;
            color: #333!important;
        }
        .add{
            background-color: #33CC99;
            color:#fff;
        }
    }
</style>