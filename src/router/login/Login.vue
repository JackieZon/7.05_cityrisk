<template>
    <div id="login">
        <div class="main">
            <div class="logo">
                <img src="./../../assets/logo/risk_logo.png" alt="logo">
            </div>
            <div class="account">
                <x-input title="账号" :is-type="regExp.typePhone" placeholder="账号">
                    <img slot="label" style="padding-right:10px;display:block;" src="./../../assets/icon/account.svg" width="24" height="24">
                </x-input>
                <x-input title="密码" type="password" placeholder="密码">
                    <img slot="label" style="padding-right:10px;display:block;" src="./../../assets/icon/unlock.svg" width="24" height="24">
                </x-input>
            </div>
            <div class="in">
                <x-button class="loginBtn" @click.native="go" >登录</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
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
        }
    },
    computed: {
        ...mapState({
            'regExp': state => state.regExp,
        })
    },
    created(){
        console.log(this.$store);
    },
    methods:{
        go(){
            this.$router.push({name:'riskAdd'})
        }
    }
}
</script>
<style lang="less" scoped>
    #login{
        background:#fff;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
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