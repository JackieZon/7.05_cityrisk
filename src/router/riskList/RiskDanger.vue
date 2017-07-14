<template>
    <div class="riskDanger">
        <Heads :title="'隐患详情'"></Heads>
        <div class="BasicInfoA">
            <div class="title">隐患信息</div>
            <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
            <x-input title="联系电话" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
            <x-input title="提交时间" :disabled="true" value="7/14 16:38" placeholder="暂无"></x-input>
            <x-textarea :title="'隐患描述'" :max="200" :placeholder="'暂无'" :show-counter="false" :height="50" :rows="8" :cols="30"></x-textarea>
            <group :title="'整改前照片'">
                <div class="photo">
                    <div class="imgItem">
                        <img src="./../../assets/img/img1.jpg" alt="">
                    </div>
                    <div class="imgItem">
                        <img src="./../../assets/img/img2.jpg" alt="">
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
                                <img src="./../../assets/img/img2.jpg" alt="">
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
        <div class="next">
            <x-button @click.native="rectification">整改</x-button>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, TransferDom, Popup,Toast } from 'vux'
 
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
            Toast
        },
        watch:{
        },
        created(){
            console.log(this.$route.params)
        },
        data(){
            return{
                transferState:false
            }
        },
        methods:{
            rectification(){
                this.transferState = !this.transferState
            }
        }
    }
</script>
<style lang="less">
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
        background: url('./../../assets/icon/addImg-icon.svg') 50% 50% no-repeat #fff;
    }
</style>