<template>
    <div class="myInfo">
        <Heads :title="'我的资料'" :isRightTitle="true"></Heads>
        <HeadImg></HeadImg>
        <div class="info">
            <group>
                <x-input title="所属机构" placeholder="所属机构"></x-input>
                <x-input title="账号" placeholder="账号"></x-input>
                <x-input title="姓名" placeholder="姓名"></x-input>
                <x-input title="电话" placeholder="电话"></x-input>
            </group>
        </div>
        <div class="next">
            <x-button @click.native="esc" >退出</x-button>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import HeadImg from './../../components/common/HeadImg.vue'
    import {XInput,Group,XButton} from 'vux'
    export default {
        components:{
            Heads,
            HeadImg,
            XInput,
            Group,
            XButton
        },
        data(){
            return{

            }
        },
        methods:{
            esc(){
                this.$router.go(history.length * -1 + 1);
            }
        }
    }
</script>
<style lang="less">
    .myInfo{
        height: 100%;
        background: #fbf9fe;
        .weui-label{
            width: 5em!important;
        }
        .next{
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding:3rem 15px 0;
        }
    }
</style>