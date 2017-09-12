<template>
    <div id="login">
        <div class="main">
            <div class="logo">
                <img src="./../../assets/logo/risk_logo.png" alt="logo">
            </div>
            <div class="account">
                <x-input 
                    title="<svg width='24' height='24' ><use xlink:href='#account' /></svg>"
                    placeholder="账号"
                    v-model="defalut.UserName"
                ></x-input>
                <x-input 
                    title="<svg width='24' height='24' ><use xlink:href='#unlock' /></svg>" 
                    type="password" 
                    placeholder="密码"
                    v-model="defalut.UserPwd"
                ></x-input>
            </div>
            <div class="in">
                <x-button class="loginBtn" @click.native="getLogin('home')" >登录</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {getJackieZon,getRiskObjectType,getMemberLogin} from './../../servers/api.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import { XInput, Group, XButton, Cell } from 'vux'

import {getStrParam,getCookie,setCookie} from './../../utils/weixin.js'

// :is-type="regExp.typePhone" 

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
                "UserName": "",
                "UserPwd": ""
            }
        }
    },
    watch:{
        defalut(){
            console.log(this.defalut);
        }
    },
    computed: {
        ...mapState({
            'regExp': state => state.regExp,
        })
    },
    mounted(){
        this.defalut.UserName = window.localStorage.getItem('userName') || '';
        this.defalut.UserPwd = window.localStorage.getItem('userPwd') || '';

        // "UserName": "13112340003",
        // "UserPwd": "123456"

        const ASPXAUTH = getCookie('.ASPXAUTH');
        const searchParam = getStrParam(window.location.search,'openType');
        console.log(`我是.ASPXAUTH||${ASPXAUTH}||searchParam=${searchParam}`);

        if(ASPXAUTH && searchParam!==undefined){
            switch (searchParam) {
                case '0':
                    this.openPage('homeMap');
                break;

                case '1':
                    this.openPage('riskAdd');
                break;

                case '2':
                    this.openPage('my');
                break;

                default:
                console.log(`没有openType||${searchParam}`);
            }
        }
        
    },
    methods:{
        ...mapMutations([
            'saveMemberInfo',
        ]),
        ...mapActions([
            'showToast',
            'postMemberAccount'
        ]),
        openPage(name){

            const userId = getCookie('.userId');
            console.log(`从Cookie得到的用户ID${userId}`);
            
            this.$router.push({name:name,params:{userId: (userId?userId:0)}});

        },
        getLogin(name){

            if(!this.defalut.UserName){
                this.showToast({toastState:true,toastValue:'请输入账号'});
                return;
            }

            if(!this.defalut.UserPwd){
                this.showToast({toastState:true,toastValue:'请输入密码'});
                return;
            }

            getMemberLogin(this.defalut).then((res)=>{
                
                window.localStorage.setItem('userName',this.defalut.UserName);
                window.localStorage.setItem('userPwd',this.defalut.UserPwd);

                var t_data = this;
                this.$vux.toast.show({
                    text: '登录成功',
                    type: 'success',
                    onHide(){

                        t_data.saveMemberInfo(res.info);
                        t_data.postMemberAccount({openId: window.sessionStorage.openId, param : res.info });
                        t_data.$router.push({name:name,params:{userId: res.info.ID}});

                    }
                });


            });
            // getRiskObjectType().then((res)=>{
            //     console.log(res);
            // });
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