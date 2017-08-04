<template>
    <div id="RiskDanger_Modify">
        <Heads :title="'整改详情'"></Heads>
        <div class="BasicInfoA">
            <div class="title">隐患信息</div>
            <x-input title="联系人" :disabled="true" :value="dangerInfo.RiskChangedAddManName" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" :value="dangerInfo.RiskChangedAddManTel" placeholder="暂无"></x-input>
            <x-input title="提交时间" :disabled="true" :value="`${dangerInfo.RiskHiddenDate.split('T')[0]} ${dangerInfo.RiskHiddenDate.split('T')[1]}`" placeholder="暂无"></x-input>
            <x-textarea :title="'隐患描述'" :readonly="true" :value="dangerInfo.RiskHiddenIntro" :placeholder="'暂无'" :show-counter="false" autosize></x-textarea>
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
        </div>
        <div class="BasicInfoA" v-if="dangerInfo.RiskChangedStatus==1">
            <div class="title">整改信息</div>
            <x-input title="责任主体" :disabled="true" :value="dangerInfo.RiskChangedDuty" placeholder="暂无"></x-input>
            <x-input title="整改起期" :disabled="true" :value="dangerInfo.RiskChangedStratDate.split('T')[0]" placeholder="暂无"></x-input>
            <x-input title="整改止期" :disabled="true" :value="dangerInfo.RiskChangedEndDate.split('T')[0]" placeholder="暂无"></x-input>
            <x-textarea :title="'整改措施'" :readonly="true" :value="dangerInfo.RiskChangedIntro" :placeholder="'暂无'" :show-counter="false" autosize></x-textarea>
            <group :title="'整改照片'">
                <div class="photo">
                    <div class="imgItem" v-for="item in dangerInfo.RiskChangedAfterPhotosPath">
                        <img :src="(item.url.indexOf('http://')>0?item.url:`${param_baseUrls}${item.url}`)" alt="">
                    </div>
                    <div class="imgItem" v-if="JSON.stringify(dangerInfo.RiskChangedAfterPhotosPath)=='[]'">
                        暂无图片
                    </div>
                </div>
            </group>
        </div>
        
        <div class="footerBox" ref="revise">
            <x-button @click.native="reviseStatus = true">操作</x-button>
        </div>

        <div v-transfer-dom>
            <actionsheet :menus="reviseMenus" v-model="reviseStatus" show-cancel @on-click-menu="changeRevise"></actionsheet>
        </div>

    </div>
</template>
<script>
// RiskChangedStatus
    import Heads from './../../components/Heads.vue'
    import { param_baseUrls } from './../../utils/subei_config.js'
    import { Tab, TabItem, Actionsheet, TransferDom, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, Popup,Toast } from 'vux'
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
        },
        watch:{
        },
        created(){

            console.log(`我是隐患${JSON.stringify(this.$route.params)}`);
            this.getRiskHiddenInfo({ID: this.$route.params.dangerModifyId});
            
        },
        data(){
            return{
                transferState:false,
                reviseStatus: false,
                reviseMenus:[],
                param_baseUrls: param_baseUrls,
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
            dangerInfo(val){
                
                console.log(JSON.stringify(val));

                console.log(`我是整改前状态状态${val.RiskHiddenStatus}`);

                if(val.RiskChangedStatus==0){
                    this.reviseMenus = { edit:'整改'};
                }else if(val.RiskChangedStatus == 1){
                    this.reviseMenus = { retract:'撤回' };
                }else if(val.RiskChangedStatus == 2){
                    this.reviseMenus = { edit:'整改' };
                }else if(val.RiskChangedStatus == 3){
                    this.$refs.revise.style.display = 'none';
                }


                //一下是整改后图片 和整改前
                // console.log(`我是整改后的状态状态${val.RiskChangedStatus}`);
                // console.log(val.RiskChangedStatus>0)

                // if(val.RiskChangedStatus==0){

                //     if(val.RiskChangedAfterPhotosPath.length!==0){

                //         let url = val.RiskChangedAfterPhotosPath[0].url
                        
                //         if(url.indexOf(',')>-1){

                //             console.log(url.indexOf(','));
                //             this.RiskChangePhotosPath = url.split(',');

                //         }else{
                //             this.RiskChangePhotosPath[0] = url;
                //         }
                //     }
                    

                // }else{

                //     if(JSON.stringify(val.RiskHiddenBeforePhotosPath)!=='[]'){

                //         let url = val.RiskHiddenBeforePhotosPath[0].url
                        
                //         console.log(url);

                //         if(url.indexOf(',')>-1){

                //             console.log(url.indexOf(','));
                //             this.RiskChangePhotosPath = url.split(',');
                            
                //         }else{
                //             this.RiskChangePhotosPath[0] = url;
                //         }
                //     }
                // }

                // if(this.RiskChangePhotosPath.length!==0){
                //     this.RiskChangePhotosPath = this.RiskChangePhotosPath.map((items)=>{
                //         if(items.indexOf('http://')>-1){
                //             return items;
                //         }else{
                //             return `http://wx-cityrisk.subei88.com${items}`
                //         }
                //     })
                // }

                // console.log(`我是处理后的数据${JSON.stringify(this.RiskChangePhotosPath)}`);

            }
        },
        methods:{
            ...mapActions([
                'getRiskHiddenInfo',
                'postRiskHiddenDelete',
                'postUpdateRiskHiddenStatus_Recall',
                'postUpdateRiskHiddenChangedStatus_Recall',
            ]),
            ...mapMutations([
                'openConfirm'
            ]),
            rectification(){
                this.transferState = !this.transferState
            },
            changeRevise(name){
                console.log(name);
                
                switch (name) {

                    case 'edit':{
                        this.$router.push({ name:'riskDangerAddModify', params:{item: this.dangerInfo} });
                    }
                    break;

                    case 'delete':{
                        this.openConfirm({state:true,msg:'确认要删除吗？',control: ()=>{
                            this.postRiskHiddenDelete({id:this.dangerInfo.ID,$router: this.$router});
                        }})
                    }
                    break;

                    case 'retract':{
                        this.openConfirm({state:true,msg:'确认要撤回吗？',control: ()=>{
                            this.postUpdateRiskHiddenChangedStatus_Recall({id:this.dangerInfo.ID,$router: this.$router});
                        }})
                    }
                    break;

                    default:{
                        console.log('取消');
                    }
                }


            },
        }
    }
</script>
<style lang="less">
    #RiskDanger_Modify{
        box-sizing: border-box;
        padding-bottom: 60px;
        .vux-swiper{
            height:100%!important;
        }
        .weui-label{
            width: 6em!important;
        }
        .title{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            line-height: 45px;
            border-bottom:2px solid #33CC99;
            padding: 0 15px;
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
    }
</style>