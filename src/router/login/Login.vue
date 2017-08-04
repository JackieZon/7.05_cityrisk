<template>
    <div id="login">
        <div class="main">
            <div class="logo">
                <img src="./../../assets/logo/risk_logo.png" alt="logo">
            </div>
            <div class="account">
                <x-input title="<svg width='24' height='24' ><use xlink:href='#account' /></svg>" :is-type="regExp.typePhone" placeholder="账号"></x-input>
                <x-input title="<svg width='24' height='24' ><use xlink:href='#unlock' /></svg>" type="password" placeholder="密码"></x-input>
            </div>
            <div class="in">
                <x-button class="loginBtn" @click.native="getText" >登录</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {getJackieZon,getRiskObjectType,getMemberLogin} from './../../servers/api.js'
import {mapState, mapGetters, mapActions} from 'vuex'
import { XInput, Group, XButton, Cell } from 'vux'

export default {
    components:{
        XInput,
        Group,
        XButton,
        Cell
    },
    data(){
        return {
            logo:'',
            defalut:{
                "UserName": "admin",
                "UserPwd": "123456"
            }
        }
    },
    computed: {
        ...mapState({
            'regExp': state => state.regExp,
        })
    },
    created(){
    },
    methods:{
        go(){
        },
        getText(){
            getMemberLogin(this.defalut).then((res)=>{
                console.log('我是登录数据');
                console.log(res);
            });
            // getRiskObjectType().then((res)=>{
            //     console.log(res);
            // });
            this.$router.push({name:'home'})
        }
    }
}
</script>
<style lang="less">
    #login{
        background:#fff;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .weui-label{
            width: 3em!important;
            color: #32ac8e;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .main{
            width:100%;
            margin-bottom: 5rem;
            .logo{
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 3.5rem;
                watch:5rem;
                height:5rem;
                img{
                    height: 100%;
                }
            }
            .account{
                width:100%;
                padding: 0 2rem;
                box-sizing: border-box;
            }
        }
        .in{
            padding: 2rem 3rem;
        }
        .loginBtn{
            background: #33CC99;
            color: #fff;
            &:active{
                background:#22bb88;
            }
        }
    }
</style>