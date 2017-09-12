<template>
    <div id="riskDangerAdd">

        <div class="upper">
            <Heads :noBack="false" :goBack="goBack" :title="'隐患'"></Heads>
            <div class="BasicInfoA">
                <div class="edit">
                    <!--<x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                    <x-input title="联系电话" value="15070713710" placeholder="暂无"></x-input>
                    <x-input title="提交时间" value="7/14 16:38" placeholder="暂无"></x-input>-->
                            
                    <selector 
                        title="指定审核人"
                        placeholder="请选择"
                        :options="aduitUser"
                        :value="defaultRiskHiddenAdd.RiskHiddenAuditMan"
                        @on-change="changeRiskHiddenAuditMan"
                    ></selector>

                    <selector 
                        title="隐患类型"
                        placeholder="请选择"
                        :options="hiddenDangerType"
                        :value="defaultRiskHiddenAdd.RiskHiddenType"
                        @on-change="changeHiddenDangerType"
                    ></selector>

                    <x-textarea v-model="defaultRiskHiddenAdd.RiskHiddenIntro" :title="'隐患描述'" :max="200" :placeholder="'请填写描述'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
                    <group :title="'隐患图片'">
                        <div class="photo">
                            <div class="imgItem" v-for="(item,index) in defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath">
                                <img :src="(item.url.indexOf('http://')>-1?item.url:`${param_baseUrls}${item.url}`)" alt="">
                                <div class="delete" @click="deletePhoto(index)"><Icon slot="icon" :name="'delete-icon'" /></div>
                            </div>

                             <div class="imgItem" v-if="defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath.length<6&&defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.length<6">
                                <div class="fileBox">
                                    <div class="fileBoxs">
                                        <input class="fileBtn" @change="changeFile" type="file" accept="image/*" ref="fileBtn" >
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </group>
                </div>
            </div>
        </div>
        <div class="lower">
            <div class="footer">
                <x-button @click.native="addHidDanger(0)">保存</x-button>
                <x-button @click.native="addHidDanger(1)">提交</x-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { param_baseUrls } from './../../utils/subei_config.js'
    import Heads from './../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, TransferDom, Popup, Toast, Selector } from 'vux'
    import { mapMutations, mapState, mapActions } from 'vuex'

    export default{
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
            TransferDom,
            Popup,
            Toast,
            Selector,
        },
        watch:{},
        created(){

            console.log(`我是隐患${JSON.stringify(this.$route.params)}`);

            if( typeof(this.$route.params.item) == 'object'){
                this.defaultRiskHiddenAdd = { ...this.defaultRiskHiddenAdd, ...this.$route.params.item };
                console.log('我是替换后的数据');
                console.log(this.defaultRiskHiddenAdd);
            }
            // this.getRiskHiddenInfo({ID: this.$route.params.id});
            
        },
        data(){
            return{
                transferState:false,
                RiskChangePhotosPath:[],
                files:[],
                param_baseUrls:param_baseUrls,
                currentPhoto:[
                    {
                        name:'',
                        path:'',
                    }
                ],
                hiddenDangerTypeData:'',
                defaultRiskHiddenAdd:{
                    RiskHiddenBeforePhotosPath: [],
                    RiskChangedAfterPhotosPath: [],
                    RiskHiddenStatusName: "",
                    ID: 0,
                    RiskID: 0,
                    RiskAgencyID: 0,
                    RiskHiddenType:0,
                    RiskHiddenTypeName:'',
                    RiskHiddenNo: "",
                    RiskHiddenIntro: "",
                    RiskHiddenAddMan: 0,
                    RiskHiddenAddManName: "",
                    RiskHiddenAddManTel: "",
                    RiskHiddenDate: "",
                    RiskHiddenBeforePhotos: "",
                    RiskHiddenStatus: 0,
                    RiskHiddenAuditIntro: "",
                    RiskHiddenAuditMan: '',
                    RiskHiddenAuditManName: "",
                    RiskHiddenAuditDate: "",
                    RiskChangedDuty: "",
                    RiskChangedIntro: "",
                    RiskChangedAfterPhotos: "",
                    RiskChangedStratDate: "",
                    RiskChangedEndDate: "",
                    RiskChangedMan: 0,
                    RiskChangedAddManName: "",
                    RiskChangedAddManTel: "",
                    RiskChangedDate: "",
                    RiskChangedStatus: 0,
                    RiskChangedAuditIntro: "",
                    RiskChangedAuditMan: 0,
                    RiskChangedAuditManName: "",
                    RiskChangedAuditDate: ""
                }
            }
        },
        mounted (){
            this.defaultRiskHiddenAdd.RiskHiddenAddMan = this.$route.params.userId;

            this.getHiddenDangerType()

        },
        computed:{
            ...mapState({
                dangerInfo(state){
                    return state.riskDangerList.dangerInfo;
                },
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

                    // console.log(`**************************************************`);
                    // console.log(aduitUser);

                    return aduitUser;

                },
                hiddenDangerType(state){
                    return state.riskDangerList.hiddenDangerType
                }
            }),
            RiskHiddenBeforePhotos(){
                const photoList = this.defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath;
                let photoName = [];
                for(let item in photoList){
                    photoName.push(photoList[item].name)
                }
                console.log(photoName);
                return photoName;
            }
        },
        watch:{
            dangerInfo(val){

                console.log(`我是整改状态${val.RiskChangedStatus}`);
                console.log(val.RiskChangedStatus>0)

                if(val.RiskChangedStatus==0){

                    if(JSON.stringify(val.RiskChangedAfterPhotosPath)!=='[]'){

                        let url = val.RiskChangedAfterPhotosPath[0].url
                        
                        if(url.indexOf(',')>-1){

                            console.log(url.indexOf(','));
                            this.RiskChangePhotosPath = url.split(',');

                        }else{
                            this.RiskChangePhotosPath[0] = url;
                        }
                    }
                    

                }else{

                    if(JSON.stringify(val.RiskHiddenBeforePhotosPath)!=='[]'){

                        let url = val.RiskHiddenBeforePhotosPath[0].url
                        
                        console.log(url);

                        if(url.indexOf(',')>-1){

                            console.log(url.indexOf(','));
                            this.RiskChangePhotosPath = url.split(',');
                            
                        }else{
                            this.RiskChangePhotosPath[0] = url;
                        }
                    }
                }
                this.RiskChangePhotosPath = this.RiskChangePhotosPath.map((items)=>{
                    if(items.indexOf('http://')>-1){
                        return items;
                    }else{
                        return `http://wx-cityrisk.subei88.com${items}`
                    }
                })
                console.log(`我是处理后的数据${JSON.stringify(this.RiskChangePhotosPath)}`);
            }
        },
        methods:{
            ...mapActions([
                'getRiskHiddenInfo',
                'postUploadPhoto',
                'showToast',
                'postRiskHiddenAdd',
                'getHiddenDangerType',
            ]),
            ...mapMutations([
                'updateLoadingStatus',
                'openConfirm'
            ]),
            goBack(){
                console.log(`我是router Params${this.$router.params}`);

                // this.$router.replace({path:'riskDanger',params:{id:this.$route.params.riskId}});
                this.$router.back();
            },
            rectification(){
                this.transferState = !this.transferState
            },
            changeFile(){
                
                var t_data = this;
                this.files = this.$refs.fileBtn.files[0];

                if(this.files){
                    var formData = new FormData();
                    formData.append("file", this.files);

                    this.updateLoadingStatus({isLoading: true})

                    this.postUploadPhoto({type:'RiskHidden',formData: formData}).then((res)=>{
                        
                        res.info.path = (res.info.path.indexOf('https://')>0?res.info.path:`${param_baseUrls}${res.info.path}`);
                        console.log(res.info.path);
                        this.defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath.push({
                            name:res.info.name,
                            url:res.info.path,
                        });

                        this.updateLoadingStatus({isLoading: false})
                        
                    });
                }
                console.log(`我是选择图片处理后的数据`);
                console.log(this.defaultRiskHiddenAdd);
            },
            changeHiddenDangerType(val){
                
                for(let i = 0; i < this.hiddenDangerType.length; i++){
                    if( this.hiddenDangerType[i].key == val ){
                        this.hiddenDangerTypeData = this.hiddenDangerType[i].value;
                    }
                }
                this.defaultRiskHiddenAdd.RiskHiddenType = val;
                this.defaultRiskHiddenAdd.RiskHiddenTypeName = this.hiddenDangerTypeData;
                
            },
            deletePhoto(index){

                this.openConfirm({state:true,msg:'确定要删除吗',control:()=>{
                    this.defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath.splice(index,1);
                    console.log(this.RiskHiddenBeforePhotos);
                }});

            },
            addHidDanger(status){

                // console.log(JSON.stringify(this.defaultRiskHiddenAdd))
                // return;

                this.defaultRiskHiddenAdd.RiskHiddenStatus = status;
                    this.defaultRiskHiddenAdd.RiskID = (this.$route.params.riskId == 0 ? this.defaultRiskHiddenAdd.RiskID : this.$route.params.riskId);
                this.defaultRiskHiddenAdd.RiskHiddenBeforePhotos = this.RiskHiddenBeforePhotos.join(',');
                // this.defaultRiskHiddenAdd.RiskChangedMan = this.$route.params.userId
                // this.defaultRiskHiddenAdd.RiskChangedAuditMan = this.defaultRiskHiddenAdd.RiskHiddenAuditMan
                    // RiskChangedAddManName: "",
                // console.log(this.$route.params.userId)
                // console.log(JSON.stringify(this.defaultRiskHiddenAdd))
                // return

                // console.log(JSON.stringify(this.defaultRiskHiddenAdd));
                // return

                if(!this.defaultRiskHiddenAdd.RiskHiddenAuditMan){
                    this.showToast({toastState:true,toastValue:'请指定审核人'});
                    return;
                }

                if(!this.defaultRiskHiddenAdd.RiskHiddenType){
                    this.showToast({toastState:true,toastValue:'请选择隐患类型'});
                    return;
                }

                if(!this.defaultRiskHiddenAdd.RiskHiddenIntro){
                    this.showToast({toastState:true,toastValue:'请选择事故后果'});
                    return;
                }

                if(this.defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath.length==0){
                    this.showToast({toastState:true,toastValue:'请上传隐患图片'});
                    return;
                }

                console.log(this.defaultRiskHiddenAdd);

                console.log(`我是计算后的数据 图片名${this.RiskHiddenBeforePhotos}`);
                console.log('这是提交的数据');
                console.log(JSON.stringify(this.defaultRiskHiddenAdd));
    
                this.postRiskHiddenAdd({param: this.defaultRiskHiddenAdd, $router: this.$router});
            },
            changeRiskHiddenAuditMan(val){
                if(val){

                    for(let item in this.aduitUser){
                        
                        if(this.aduitUser[item].key==val){

                            this.defaultRiskHiddenAdd.RiskHiddenAuditMan = val;
                            this.defaultRiskHiddenAdd.RiskHiddenAuditManName = this.aduitUser[item].value;

                        }
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    #riskDangerAdd{

        background: #f1f1f1;
        box-sizing: border-box;
        height: 100%;

        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .upper{
            background: #fff;
        }
        .vux-swiper{
            height:100%!important;
        }

        .edit {
            .weui-label{
                width: 6em!important;
            }
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
                position: relative;
                .delete{
                    position: absolute;
                    top: 5px;
                    right: 5px;
                }
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
            background: url('./../../assets/img/add-icon.png') 50% 50% no-repeat #fff;
        }
        .footer{
            box-sizing: border-box;
            padding: 50px 15px 15px;
        }

        .fileBox{
            watch:100%;
            height: 100%;
            display:flex;
            justify-content: center;
            align-items: center;
            .fileBoxs{
                watch:100%;
                height: 100%;
                display: flex;
                input{
                    box-sizing: border-box;
                }
            }
        }
        .fileBtn{
            background: url('./../../assets/img/add-icon.png') 50% 50% no-repeat #fff;
            background-size:60%;
            width:100%;
            height:100%;
            border: 1px solid #a0b3d6;
            color: #34538b;
        }
        ::-webkit-file-upload-button {
            display:none;
            padding: .4em;
            line-height: 30px;
            border: 1px solid #a0b3d6;
            background: #f0f3f9;
            color: #34538b;
        }

    }
</style>