<template>
    <div id="RiskDangerAdd_Modify">

        <div class="upper">
            <Heads :title="'整改'"></Heads>
            <div class="BasicInfoA">
                <div class="title">整改前</div>
                <div class="edit">
                    <x-textarea v-model="defaultRiskHiddenAdd.RiskHiddenIntro" :readonly="true" :title="'隐患描述'" :placeholder="'暂无'" :show-counter="false" autosize></x-textarea>
                    <x-textarea v-model="defaultRiskHiddenAdd.RiskHiddenAuditIntro" :readonly="true" :title="'审核原因'" :placeholder="'暂无'" :show-counter="false" autosize></x-textarea>
                    <group :title="'整改前图片'">
                        <div class="photo">
                            <div class="imgItem" v-for="(item,index) in defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath">
                                <img :src="(item.url.indexOf('http://')>-1?item.url:`${param_baseUrls}${item.url}`)" alt="">
                                <!--<div class="delete" @click="deletePhoto(index)"><Icon slot="icon" :name="'delete-icon'" /></div>-->
                            </div>

                            <!--<div class="imgItem" v-if="defaultRiskHiddenAdd.RiskHiddenBeforePhotosPath.length<2&&defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.length<2">
                                <div class="fileBox">
                                    <div class="fileBoxs">
                                        <input class="fileBtn" @change="changeFile" type="file" accept="image/*" ref="fileBtn" >
                                    </div>
                                </div>
                            </div>-->
                        </div>
                    </group>
                </div>
                <div class="modify">
                    <div class="title">整改</div>
                    <x-input title="责任主体" v-model="defaultRiskHiddenAdd.RiskChangedDuty" placeholder="请输入责任主体"></x-input>
                    <datetime v-model="defaultRiskHiddenAdd.RiskChangedStratDate" value-text-align="left" @on-change="RiskChangedStratDate" :title="'<div class=time >整改起期</div>'"></datetime>
                    <datetime v-model="defaultRiskHiddenAdd.RiskChangedEndDate" value-text-align="left" @on-change="RiskChangedEndDate" :title="'<div class=time >整改止期</div>'"></datetime>
                    <x-textarea v-model="defaultRiskHiddenAdd.RiskChangedIntro" :title="'整改措施'" :max="200" :placeholder="'请填写整改措施'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
                    <group :title="'整改后图片'">
                        <div class="photo">
                            <div class="imgItem" v-for="(item,index) in defaultRiskHiddenAdd.RiskChangedAfterPhotosPath">
                                <img :src="(item.url.indexOf('http://')>-1?item.url:`${param_baseUrls}${item.url}`)" alt="">
                                <div class="delete" @click="deletePhoto(index)"><Icon slot="icon" :name="'delete-icon'" /></div>
                            </div>

                            <div class="imgItem" v-if="defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.length<2&&defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.length<2">
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
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, TransferDom, Popup, Toast, Datetime} from 'vux'
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
            Datetime,
        },
        watch:{},
        created(){

            console.log(`我是隐患${JSON.stringify(this.$route.params)}`);

            if( typeof(this.$route.params.item) == 'object'){

                this.$route.params.item.RiskChangedStratDate = '请选择';
                this.$route.params.item.RiskChangedEndDate = '请选择';
                this.defaultRiskHiddenAdd = this.$route.params.item;
                console.log(this.defaultRiskHiddenAdd);
            }
            // this.getRiskHiddenInfo({ID: this.$route.params.dangerModifyId});
            
        },
        data(){
            return{
                value1: '',
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
                defaultRiskHiddenAdd:{
                    "RiskHiddenBeforePhotosPath": [],
                    "RiskChangedAfterPhotosPath": [],
                    "RiskHiddenStatusName": "",
                    "ID": 0,
                    "RiskID": 0,
                    "RiskAgencyID": 0,
                    "RiskHiddenNo": "",
                    "RiskHiddenIntro": "",
                    "RiskHiddenAddMan": 0,
                    "RiskHiddenAddManName": "",
                    "RiskHiddenAddManTel": "",
                    "RiskHiddenDate": "",
                    "RiskHiddenBeforePhotos": "",
                    "RiskHiddenStatus": 0,
                    "RiskHiddenAuditIntro": "",
                    "RiskHiddenAuditMan": 0,
                    "RiskHiddenAuditManName": "",
                    "RiskHiddenAuditDate": "",
                    "RiskChangedDuty": "",
                    "RiskChangedIntro": "",
                    "RiskChangedAfterPhotos": "",
                    "RiskChangedStratDate": "请选择",
                    "RiskChangedEndDate": "请选择",
                    "RiskChangedMan": 0,
                    "RiskChangedAddManName": "",
                    "RiskChangedAddManTel": "",
                    "RiskChangedDate": "",
                    "RiskChangedStatus": 0,
                    "RiskChangedAuditIntro": "",
                    "RiskChangedAuditMan": 0,
                    "RiskChangedAuditManName": "",
                    "RiskChangedAuditDate": ""
                }
            }
        },
        computed:{
            ...mapState({
                dangerInfo(state){
                    return state.riskDangerList.dangerInfo;
                }
            }),
            RiskChangedAfterPhotos(){
                const photoList = this.defaultRiskHiddenAdd.RiskChangedAfterPhotosPath;
                let photoName = [];
                for(let item in photoList){
                    photoName.push(photoList[item].name)
                }
                console.log(photoName);
                return photoName;
            }
        },
        watch:{
            defaultRiskHiddenAdd(val){
            }
        },
        methods:{
            ...mapActions([
                'getRiskHiddenInfo',
                'postUploadPhoto',
                'showToast',
                'postRiskHiddenAdd',
            ]),
            ...mapMutations([
                'updateLoadingStatus',
                'openConfirm'
            ]),

            RiskChangedStratDate (val) {
                this.defaultRiskHiddenAdd.RiskChangedStratDate = val;
                console.log(val);
            },

            RiskChangedEndDate(val){
                this.defaultRiskHiddenAdd.RiskChangedEndDate = val;
                console.log(val);
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
                        this.defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.push({
                            name:res.info.name,
                            url:res.info.path,
                        });

                        this.updateLoadingStatus({isLoading: false})
                        
                    });
                }
            },
            deletePhoto(index){

                this.openConfirm({state:true,msg:'确定要删除吗',control:()=>{
                    this.defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.splice(index,1);
                    console.log(this.RiskChangedAfterPhotos);
                }});

            },
            addHidDanger(status){

                this.defaultRiskHiddenAdd.RiskChangedStatus = status;
                this.defaultRiskHiddenAdd.RiskID = this.$route.params.riskId;
                this.defaultRiskHiddenAdd.RiskChangedAfterPhotos = this.RiskChangedAfterPhotos.join(',');

                if(!this.defaultRiskHiddenAdd.RiskChangedDuty){
                    this.showToast({toastState:true,toastValue:'请填写责任主体'});
                    return;
                }

                if(this.defaultRiskHiddenAdd.RiskChangedStratDate=='请选择'){
                    this.showToast({toastState:true,toastValue:'请选择起期'});
                    return;
                }   

                if(this.defaultRiskHiddenAdd.RiskChangedEndDate=='请选择'){
                    this.showToast({toastState:true,toastValue:'请选择止期'});
                    return;
                }
                if(!this.defaultRiskHiddenAdd.RiskChangedIntro){
                    this.showToast({toastState:true,toastValue:'请填写整改措施'});
                    return;
                }
                
                if(this.defaultRiskHiddenAdd.RiskChangedAfterPhotosPath.length==0){
                    this.showToast({toastState:true,toastValue:'请上传整改图片'});
                    return;
                }

                console.log(this.defaultRiskHiddenAdd);

                console.log(`我是计算后的数据 图片名${this.RiskChangedAfterPhotos}`);
                
                console.log('这是提交的数据***************')
                console.log(JSON.stringify(this.defaultRiskHiddenAdd));

                this.postRiskHiddenAdd({param: this.defaultRiskHiddenAdd, $router: this.$router});
            }
        }
    }
</script>
<style lang="less">
    #RiskDangerAdd_Modify{

        background: #f1f1f1;
        box-sizing: border-box;
        height: 100%;

        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .upper{
            
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
            justify-content: flex-start;
            align-items: center;
            line-height: 45px;
            border-bottom:2px solid #33CC99;
            padding: 0 15px;
            background: #fff;
        }
        .BasicInfoA{margin-top:15px;}
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
        .modify{
            margin-top: 15px;
            background: #fff;
            .weui-label{
                width: 6em!important;
            }
        }
        .time{
             width: 6em!important;
        }
        .weui-cell__ft{
            color:#333;
        }
    }
</style>