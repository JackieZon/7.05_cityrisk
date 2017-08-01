<template>
    <div class="riskDanger">
        <Heads :title="'隐患详情'"></Heads>
        <div class="BasicInfoA">
            <div class="title">隐患信息</div>
            <x-input title="联系人" :disabled="true" :value="dangerInfo.RiskChangedAddManName" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" :value="dangerInfo.RiskChangedAddManTel" placeholder="暂无"></x-input>
            <x-input title="提交时间" :disabled="true" :value="dangerInfo.RiskHiddenDate" placeholder="暂无"></x-input>
            <x-textarea :title="'隐患描述'" :max="200" :value="dangerInfo.RiskHiddenIntro" :placeholder="'暂无'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
            <group :title="'整改前照片'">
                <div class="photo">
                    <div class="imgItem" v-for="item in RiskChangePhotosPath">
                        <img :src="item" alt="">
                    </div>
                </div>
            </group>
            <popup v-model="transferState" :hide-on-blur="false">
                <div class="edit">
                    <x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                    <x-input title="联系电话" value="15070713710" placeholder="暂无"></x-input>
                    <x-input title="提交时间" value="7/14 16:38" placeholder="暂无"></x-input>
                    <x-textarea :title="'隐患描述'" :max="200" :placeholder="'暂无'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
                    <group :title="'整改前照片'">
                        <div class="photo">
                            <div class="imgItem">
                                <img src="./../../assets/img/img1.jpg" alt="">
                            </div>
                            <div class="imgItem">
                                <div class="addImg">
                                </div>
                            </div>
                        </div>
                    </group>
                    <div class="next">
                        <x-button @click.native="rectification">提交</x-button>
                    </div>
                </div>
            </popup>
        </div>
        <div class="footer">
            <x-button @click.native="rectification">整改</x-button>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, TransferDom, Popup,Toast } from 'vux'
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
        },
        watch:{
        },
        created(){

            console.log(`我是隐患${JSON.stringify(this.$route.params)}`);
            this.getRiskHiddenInfo({ID: this.$route.params.id});
            
        },
        data(){
            return{
                transferState:false,
                RiskChangePhotosPath:[]
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
            ]),
            rectification(){
                this.transferState = !this.transferState
            },
        }
    }
</script>
<style lang="less" scoped>
    .riskDanger{
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
        height: 100%;
    }
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
    .footer{
        
    }
</style>