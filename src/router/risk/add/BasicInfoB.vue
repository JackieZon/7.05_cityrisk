<template>
    <div id="basicInfoB">
        <div class="enter">
            <div class="enterInfo">
                <x-input title="等级分值:" :disabled="true" :value="scoreData.RiskAssessScore?`( ${scoreData.RiskAssessLvName} ) / ( ${scoreData.RiskAssessScore} )`:'请先添加评估'" placeholder="风险等级"></x-input>
                
                <!--<selector title="风险类型" placeholder="请选择" :options="RiskIntro" v-model="ListRiskAssess.RiskAssessIntroID" @on-change="RiskIntroChange"></selector>-->
                
                <div class="riskIntro">
                    <x-textarea title="评估描述" placeholder="评估描述" :show-counter="false" :value="riskIntro" @on-change="changeRiskIntro"></x-textarea>
                    <div class="msg-icon" @click="introMsg=!introMsg"><Icon :name="'msg-icon-intro'"/></div>
                </div>

                <group class="group">
                    <swipeout>
                        <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskAssessDetail" :key="index">
                            <div slot="right-menu">
                                <swipeout-button @click.native="oepnAssess('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                                <swipeout-button @click.native="oepnAssess('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content vux-1px-t">
                                <cell :title="item.RiskAssessTypeName" :inline-desc="`等级:${status[item.RiskAssessDetailLv]}  分值:${item.RiskAssessDetailScore}`">
                                    <Icon slot="icon" class="flexBox" :name="'assess-icon'" :width="'40'" :height="'40'" style="color:#33CC99" />
                                </cell>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </group>
                <div class="add">
                    <load-more v-if="JSON.stringify(ListRiskAssessDetail)=='[]'" :show-loading="false" :tip="'暂无评估'" background-color="#fbf9fe"></load-more>
                    <x-button class="add_button" @click.native="assess = true">添加</x-button>
                </div>
            </div>
            <!-- <load-more v-if="JSON.stringify(ListRiskAssessDetail)=='[]'" :show-loading="false" :tip="'暂无评估'" background-color="#fbf9fe"></load-more> -->
        </div>

        <div class="next">
            <!-- <x-button @click.native="assess = true">增加</x-button> -->
            <div class="updata">
                <x-button @click.native="upDataRiskAdd(0)">保存</x-button>
                <x-button @click.native="upDataRiskAdd(1)">提交</x-button>
            </div>
        </div>
        <popup v-model="assess" :hide-on-blur="false">
            <div class="evaluation">

                <selector title="风险类型" placeholder="请选择" :options="RiskAssessType" v-model="defalutAssess.RiskAssessTypeID" @on-change="RiskAssessTypeChoose"></selector>

                <selector title="频繁程度" placeholder="请选择" name="district" :options="RiskAssessE" v-model="defalutAssess.RiskAssessEScore" @on-change="RiskAssessEChoose"></selector>

                <selector title="事故后果" placeholder="请选择" :options="RiskAssessC" v-model="defalutAssess.RiskAssessCScore" @on-change="RiskAssessCChoose"></selector>

                <selector title="可能性" placeholder="请选择" :options="RiskAssessL" v-model="defalutAssess.RiskAssessLScore" @on-change="RiskAssessLChoose"></selector>

                <x-input title="风险等级" :disabled="true" :value="RiskAssessDetailLv" placeholder="等级"></x-input>

                <x-input title="风险分值" :disabled="true" :value="countScore" placeholder="分值"></x-input>

                <div class="next">
                    <x-button @click.native="addAssess">确定</x-button>
                    <x-button @click.native="oepnAssess('close')">关闭</x-button>
                </div>
            </div>
        </popup>

        <popup v-model="introMsg" :hide-on-blur="true">
            <div class="evaluation">
                <div class="mainIntro">
                    <p>填写要求：建构筑物的层数、高度、特征人群、安全出口、周边环境、主要风险特征等基本情况；风险源的具体参数，如危险化学品种类、数量，是否构成重大危险源，建设、运行、管理是否符合国家有关法律法规标准等。</p>
                    <p>实例</p>
                    <p>高层建筑：建筑高度**米。建筑现有疏散楼梯**部，电梯**部，设有**个安全出口，周边环境（东面为**，西面为**，南面为**，北面为**），高层建筑发生重、特大火灾，扑救难度较大，易造成较大的人员伤亡和财产损失，易造成较大社会影响。</p>
                    <p>城中村：某出租屋**层，建筑高度**米，内有租户**户。建筑现有疏散楼梯**部，电梯**部，设有**个安全出口，设有电动自行车充电插座**个，平时堆放电动自行车**辆。由于城中村自身基础设施条件较差，乱拉电线现象严重，极易导致火灾。</p>
                </div>
                <div class="next">
                    <x-button @click.native="introMsg=!introMsg">关闭</x-button>
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
    import { LoadMore, XInput, Group, Cell, XAddress, ChinaAddressV3Data, XButton, Selector, Value2nameFilter as value2name, XTextarea, Popup, Confirm, XSwitch, TransferDomDirective as TransferDom, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'
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
            LoadMore,
        },
        watch: {},
        data() {
            return {
                assess: false,
                introMsg: false,
                assessType: '',
                assessIndex: '',
                riskIntro: '',
                scoreData: {},
                status: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessDetailLv: '',
                RiskAssessIntroID:'',
                defalutAssess: {

                    "RiskAssessTypeID": '',     //** 风险类型ID /火灾ID */
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

        // RiskAssessL
        // RiskAssessE
        // RiskAssessC
        // RiskAssessType

        watch: {
            // countTotal(val){
            //     this.upRiskAdd({RiskLv:val.RiskLv, RiskScore:val.score });
            // }
        },
        methods: {
            ...mapMutations([
                'openConfirm',
                'upRiskAdd',
                'pushAssessDetail',
                'deleteAssessDetail',
                'editAssessDetail',
                'saveAssess',
                'updateLoadingStatus',
                'upAssessData'
            ]),

            ...mapActions([
                'showToast',
                'postRiskAdd'
            ]),

            getScore() {

                if(JSON.stringify(this.ListRiskAssessDetail)!=='[]'){
                    let list = this.ListRiskAssessDetail;
                    let scoreArr = [];
                    for (let val in this.ListRiskAssessDetail) {
                        scoreArr.push(this.ListRiskAssessDetail[val].RiskAssessDetailScore)
                    }
                    const countVal = scoreArr.sort(function (a, b) { return a < b ? 1 : -1 })[0];

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

                    
                    const highestAssess = this.ListRiskAssessDetail.filter(item=>item.RiskAssessDetailScore == countVal);

                    console.log(`我是最高的一条隐患`);
                    console.log(highestAssess);
                    
                    this.upRiskAdd({
                        RiskTypeID: highestAssess[0].RiskAssessTypeID,
                        RiskTypeName: highestAssess[0].RiskAssessTypeName
                    });

                    return { RiskAssessLv: state, RiskAssessScore: countVal, RiskAssessLvName: status[state] }

                }else{
                    
                    return { RiskAssessLv: 4, RiskAssessScore: 0, RiskAssessLvName: status[4] }
                }

            },


            RiskAssessTypeChoose(val) {
                for (let key in this.RiskAssessType) {
                    if (this.RiskAssessType[key].key == this.defalutAssess.RiskAssessTypeID) {
                        this.defalutAssess.RiskAssessTypeName = this.RiskAssessType[key].value;
                        break;
                    }
                }
            },

            RiskAssessEChoose(val) {

                for (let key in this.RiskAssessE) {
                    if (this.RiskAssessE[key].key == this.defalutAssess.RiskAssessEScore) {
                        console.log(`${this.RiskAssessE[key].value}||${this.RiskAssessE[key].key}||${this.RiskAssessE[key].id}`);
                        this.defalutAssess.RiskAssessEID = this.RiskAssessE[key].id;
                        this.defalutAssess.RiskAssessEName = this.RiskAssessE[key].value;
                        break;
                    }
                }

            },
            RiskAssessCChoose(val) {

                for (let key in this.RiskAssessC) {
                    if (this.RiskAssessC[key].key == this.defalutAssess.RiskAssessCScore) {
                        this.defalutAssess.RiskAssessCID = this.RiskAssessC[key].id;
                        this.defalutAssess.RiskAssessCName = this.RiskAssessC[key].value;
                        break;
                    }
                }

            },
            RiskAssessLChoose(val) {

                for (let key in this.RiskAssessL) {
                    if (this.RiskAssessL[key].key == this.defalutAssess.RiskAssessLScore) {
                        this.defalutAssess.RiskAssessLID = this.RiskAssessL[key].id;
                        this.defalutAssess.RiskAssessLName = this.RiskAssessL[key].value;
                        break;
                    }
                }

            },
            changeRiskIntro(e) {
                this.saveAssess({ RiskAssessIntro: e });
            },
            next() {
                // this.$router.push({name:'basicInfoC'});
            },
            RiskIntroChange(e){

                for(var item in this.RiskIntro){
                    if(this.RiskIntro[item].key == e){
                        
                        console.log(`${e}||${this.RiskIntro[item].value}`);
                        this.saveAssess({ RiskAssessIntroID: e, RiskAssessRemark: this.RiskIntro[item].value});

                    }
                }

            },
            upDataRiskAdd(type) {

                console.log(this.$store.state.tiskAdd.postRiskAdd);

                this.upRiskAdd({ RiskStatus: type });

                const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
                const ListRiskDuty = this.$store.state.tiskAdd.postRiskAdd.ListRiskDuty; //责任主体
                const ListRiskRegulatory = this.$store.state.tiskAdd.postRiskAdd.ListRiskRegulatory; //监管机构
                const ListRiskAssess = this.$store.state.tiskAdd.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail; //风险评估

                if (!postRiskAdd.RiskName) {
                    this.showToast({ toastState: true, toastValue: '请填写险源名称！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }
                if (!postRiskAdd.RiskObjectTypeID1) {
                    this.showToast({ toastState: true, toastValue: '请选择对象类型！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }
                if (!postRiskAdd.RiskObjectTypeID2) {
                    this.showToast({ toastState: true, toastValue: '请选择对象类型！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }
                
                if (!postRiskAdd.RiskArea5) {
                    this.showToast({ toastState: true, toastValue: '请选择社区！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }

                // if(!postRiskAdd.RiskArea2){
                //     this.showToast({toastState:true,toastValue:'请选择省市区！'});
                //     this.$router.replace({name:'basicInfoA'});
                //     return;
                // }
                // if(!postRiskAdd.RiskArea3){
                //     this.showToast({toastState:true,toastValue:'请选择省市区！'});
                //     this.$router.replace({name:'basicInfoA'});
                //     return;
                // }
                if (!postRiskAdd.RiskAddress) {
                    this.showToast({ toastState: true, toastValue: '请填写详细地址！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }

                if (!postRiskAdd.RiskLng) {
                    this.showToast({ toastState: true, toastValue: '请填选择经纬度！' });
                    this.$router.replace({ name: 'basicInfoA' });
                    return;
                }

                if (ListRiskDuty.length == 0) {
                    this.showToast({ toastState: true, toastValue: '您至少添加一个责任主体！' });
                    this.$router.replace({ name: 'basicInfoC' });
                    return;
                }

                if (ListRiskRegulatory.length == 0) {
                    this.showToast({ toastState: true, toastValue: '您至少添加一个监管机构！' });
                    this.$router.replace({ name: 'basicInfoD' });
                    return;
                }

                if (ListRiskAssess.length == 0) {
                    this.showToast({ toastState: true, toastValue: '您至少添加一个风险评估！' });
                    return;
                }

                if (!this.$store.state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessIntro) {
                    this.showToast({ toastState: true, toastValue: '请填写评估描述！' });
                    return;
                }

                this.updateLoadingStatus({ isLoading: true })

                this.postRiskAdd({ $router: this.$router });

            },
            clearData() {
                this.defalutAssess.RiskAssessTypeID = '';
                this.defalutAssess.RiskAssessTypeName = '';
                this.defalutAssess.RiskAssessLID = '';
                this.defalutAssess.RiskAssessLName = '';
                this.defalutAssess.RiskAssessLScore = '';
                this.defalutAssess.RiskAssessEID = '';
                this.defalutAssess.RiskAssessEName = '';
                this.defalutAssess.RiskAssessEScore = '';
                this.defalutAssess.RiskAssessCID = '';
                this.defalutAssess.RiskAssessCName = '';
                this.defalutAssess.RiskAssessCScore = '';
                this.defalutAssess.RiskAssessDetailLv = '';
                this.defalutAssess.RiskAssessDetailScore = '';
            },
            oepnAssess(type, index) {

                this.assessType = type;
                this.assessIndex = index;

                if (type == 'open') {
                    this.assess = true;
                } else if (type == 'edit') {
                    console.log(this.ListRiskAssessDetail[index]);

                    this.defalutAssess.RiskAssessTypeID = this.ListRiskAssessDetail[index].RiskAssessTypeID;
                    this.defalutAssess.RiskAssessTypeName = this.ListRiskAssessDetail[index].RiskAssessTypeName;
                    this.defalutAssess.RiskAssessLID = this.ListRiskAssessDetail[index].RiskAssessLID;
                    this.defalutAssess.RiskAssessLName = this.ListRiskAssessDetail[index].RiskAssessLName;
                    this.defalutAssess.RiskAssessLScore = this.ListRiskAssessDetail[index].RiskAssessLScore;
                    this.defalutAssess.RiskAssessEID = this.ListRiskAssessDetail[index].RiskAssessEID;
                    this.defalutAssess.RiskAssessEName = this.ListRiskAssessDetail[index].RiskAssessEName;
                    this.defalutAssess.RiskAssessEScore = this.ListRiskAssessDetail[index].RiskAssessEScore;
                    this.defalutAssess.RiskAssessCID = this.ListRiskAssessDetail[index].RiskAssessCID;
                    this.defalutAssess.RiskAssessCName = this.ListRiskAssessDetail[index].RiskAssessCName;
                    this.defalutAssess.RiskAssessCScore = this.ListRiskAssessDetail[index].RiskAssessCScore;
                    this.defalutAssess.RiskAssessDetailLv = this.ListRiskAssessDetail[index].RiskAssessDetailLv;
                    this.defalutAssess.RiskAssessDetailScore = this.ListRiskAssessDetail[index].RiskAssessDetailScore;

                    this.assess = true;

                } else if (type == 'close') {
                    this.clearData();
                    this.assess = false;
                } else if (type == 'delete') {

                    this.openConfirm({
                        state: true, msg: '确定要删除吗？', control: () => {
                            this.deleteAssessDetail({ index: index });
                        }
                    });

                }

            },
            addAssess() {
                const defaultData = this.defalutAssess;

                if (!defaultData.RiskAssessTypeID) {
                    this.showToast({ toastState: true, toastValue: '请选择风险类型' })
                    return;
                }

                if (!defaultData.RiskAssessEID) {
                    this.showToast({ toastState: true, toastValue: '请选择频繁程度' })
                    return;
                }

                if (!defaultData.RiskAssessCID) {
                    this.showToast({ toastState: true, toastValue: '请选择事故后果' })
                    return;
                }

                if (!defaultData.RiskAssessLID) {
                    this.showToast({ toastState: true, toastValue: '请选择可能性' })
                    return;
                }

                const assessUpData = {
                    RiskAssessTypeID: this.defalutAssess.RiskAssessTypeID,
                    RiskAssessTypeName: this.defalutAssess.RiskAssessTypeName,
                    RiskAssessLID: this.defalutAssess.RiskAssessLID,
                    RiskAssessLName: this.defalutAssess.RiskAssessLName,
                    RiskAssessLScore: this.defalutAssess.RiskAssessLScore,
                    RiskAssessEID: this.defalutAssess.RiskAssessEID,
                    RiskAssessEName: this.defalutAssess.RiskAssessEName,
                    RiskAssessEScore: this.defalutAssess.RiskAssessEScore,
                    RiskAssessCID: this.defalutAssess.RiskAssessCID,
                    RiskAssessCName: this.defalutAssess.RiskAssessCName,
                    RiskAssessCScore: this.defalutAssess.RiskAssessCScore,
                    RiskAssessDetailLv: this.defalutAssess.RiskAssessDetailLv,
                    RiskAssessDetailScore: this.defalutAssess.RiskAssessDetailScore
                }
                console.log(assessUpData);

                if (this.assessType == 'edit') {

                    this.editAssessDetail({
                        index: this.assessIndex,
                        list: assessUpData
                    });
                    this.clearData();
                    this.assess = false;

                } else {
                    this.pushAssessDetail(assessUpData);
                    this.clearData();
                    this.assess = false;
                }

                const score = this.getScore();
                this.scoreData = score;

                console.log(`这是我提交的最高分值和等级||${JSON.stringify(score)}`);
                this.upRiskAdd({ RiskLvName: score.RiskAssessLvName, RiskLv: score.RiskAssessLv, RiskScore: score.RiskAssessScore, });
                this.upAssessData({ RiskAssessLv: score.RiskAssessLv, RiskAssessScore: score.RiskAssessScore, RiskAssessLvName: score.RiskAssessLvName });

            },
        },
        mounted() {


            const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
            this.riskIntro = postRiskAdd.ListRiskAssess[0].RiskAssessIntro;
            this.RiskAssessIntroID = postRiskAdd.RiskAssessIntroID || '';
            
            console.log(`我是评估描述的ID||${postRiskAdd.ListRiskAssess[0].RiskAssessIntroID}`);

            // console.log(JSON.stringify(postRiskAdd));

            const score = this.getScore();
            this.scoreData = score;
            this.upAssessData({ RiskAssessLv: score.RiskAssessLv, RiskAssessScore: score.RiskAssessScore, RiskAssessLvName: score.RiskAssessLvName });

        },
        computed: {
            ...mapState({
                ListRiskAssess(state){
                    return state.tiskAdd.postRiskAdd.ListRiskAssess[0];
                },
                
                RiskAssessType(state) {

                    let RiskAssessType = [];
                    const RiskAssessTypeItem = state.tiskAdd.riskBaseType.RiskAssessType;

                    if (JSON.stringify(RiskAssessTypeItem) !== '[]') {
                        for (let item in RiskAssessTypeItem) {
                            RiskAssessType.push({
                                key: RiskAssessTypeItem[item].ID,
                                value: RiskAssessTypeItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessType;

                },
                RiskAssessE: state => {
                    let RiskAssessE = [];
                    const RiskAssessEItem = state.tiskAdd.riskBaseType.RiskAssessE;

                    if (JSON.stringify(RiskAssessEItem) !== '[]') {
                        for (let item in RiskAssessEItem) {
                            RiskAssessE.push({
                                id: RiskAssessEItem[item].ID,
                                key: RiskAssessEItem[item].BaseScore,
                                value: RiskAssessEItem[item].BaseName
                            });
                        }
                    }

                    return RiskAssessE;
                },
                RiskAssessC(state) {

                    let RiskAssessC = [];
                    const RiskAssessCItem = state.tiskAdd.riskBaseType.RiskAssessC;

                    if (JSON.stringify(RiskAssessCItem) !== '[]') {
                        for (let item in RiskAssessCItem) {
                            RiskAssessC.push({
                                id: RiskAssessCItem[item].ID,
                                key: RiskAssessCItem[item].BaseScore,
                                value: RiskAssessCItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessC;
                },
                RiskAssessL(state) {
                    let RiskAssessL = [];
                    const RiskAssessLItem = state.tiskAdd.riskBaseType.RiskAssessL;

                    if (JSON.stringify(RiskAssessLItem) !== '[]') {
                        for (let item in RiskAssessLItem) {
                            RiskAssessL.push({
                                id: RiskAssessLItem[item].ID,
                                key: RiskAssessLItem[item].BaseScore,
                                value: RiskAssessLItem[item].BaseName
                            });
                        }
                    }
                    return RiskAssessL;
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
                ListRiskAssessDetail(state) {
                    const ListRiskAssessDetail = state.tiskAdd.postRiskAdd.ListRiskAssess[0].ListRiskAssessDetail;
                    return ListRiskAssessDetail;
                },
                getListRiskAssess(state) {
                    const getListRiskAssess = state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessLvName;
                    const RiskAssessLv = state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessLv;
                    const RiskAssessScore = state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessScore;
                    return { getListRiskAssess, RiskAssessLv, RiskAssessScore }
                },
                RiskAssessLv(state) {
                    return state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessLv;
                },
                RiskAssessScore(state) {
                    return state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessScore;
                },
                RiskAssessLvName(state) {
                    return state.tiskAdd.postRiskAdd.ListRiskAssess[0].RiskAssessLvName;
                },
                riskAddData: state => {
                    return state.tiskAdd.postRiskAdd
                },
            }),
            nuwData() {
                let now = new Date();
                return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
            },
            countScore() {
                this.defalutAssess.RiskAssessDetailScore = this.defalutAssess.RiskAssessLScore * this.defalutAssess.RiskAssessEScore * this.defalutAssess.RiskAssessCScore;
                let countVal = this.defalutAssess.RiskAssessDetailScore;

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
                this.defalutAssess.RiskAssessDetailLv = state;

                return this.defalutAssess.RiskAssessLScore * this.defalutAssess.RiskAssessEScore * this.defalutAssess.RiskAssessCScore;
            },
            countTotal() {
                if (JSON.stringify(this.ListRiskAssessDetail) !== '[]') {
                    let assessLength = this.ListRiskAssessDetail.length;
                    let list = this.ListRiskAssessDetail;
                    let scoreArr = [];
                    for (let val in this.ListRiskAssessDetail) {
                        scoreArr.push(this.ListRiskAssessDetail[val].RiskAssessDetailScore)
                    }
                    console.log(scoreArr)

                    const countVal = scoreArr.sort(function (a, b) { return a < b ? 1 : -1 })[0];

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
                    this.upAssessData({ RiskAssessLv: state, RiskAssessScore: countVal, RiskAssessLvName: status[state] });


                    return { RiskAssessLvName: status[state], RiskAssessLv: state, RiskAssessScore: countVal };
                } else {
                    return { RiskAssessLvName: '', RiskAssessLv: 4, RiskAssessScore: 0, }
                }


            }
        },
    }

</script>
<style lang="less">
    #basicInfoB {
        width: 100%;
        height: 100%;
        background: #fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;

        .updata {
            display: flex;
            flex-direction: row;
            margin-top: 15px;
            .weui-btn+.weui-btn {
                margin: 0!important;
            }
        }
        
        .group {
            padding-top: 10px!important;
            margin: 0;
            background: #fbf9fe;
            .weui-cells.vux-no-group-title {
                margin-top: 0px!important;
            }
        }
        .enterInfo {
            margin-top: 10px;
            background: #fff;
            .riskIntro{
                border-top: 1px solid #D9D9D9;
                position: relative;
                .msg-icon{
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    line-height: 36px;
                    margin-top: -12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .next {
            box-sizing: border-box;
            padding:15px 15px;
        }
        .weui-label {
            width: 5em!important;
        }
        .evaluation {
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            .mainIntro{
                box-sizing: border-box;
                padding: 10px 15px;
                p{
                    text-indent:2em;
                    padding-bottom: 10px!important;
                }
            }
        }
        .box1 {
            width: 600px;
            .vux-table {
                width: 600px;
            }
        }
        .add {
            background: #fbf9fe;
            padding: 15px 15px;
            .weui-btn {
                background: #33CC99 !important;
                color: white;
            }
        }
        .add_button {
            color: white;
            background: #33CC99;
        }
        .vux-table td,
        .vux-table th {
            border-bottom: 1px solid #e0e0e0!important;
            border-right: 1px solid #e0e0e0!important;
            text-align: center!important;
        }
        .weui-cell__bd.weui-cell__primary {
            line-height: initial;
        }
        .weui-cell_select-after .weui-select {
            line-height: normal;
        }
    }
    #basicInfoB .vux-x-textarea{
        padding-right: 50px;
    }
</style>