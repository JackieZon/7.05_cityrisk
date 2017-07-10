<template>
    <div id="login">
        <div class="main">
            <div class="logo">
                <img src="./../../assets/logo/risk_logo.png" alt="logo">
            </div>
            <div class="account">
                <x-input title="账号" :is-type="be2333" placeholder="账号">
                    <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                </x-input>
                <x-input title="密码" :is-type="be2333" placeholder="密码">
                    <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                </x-input>
            </div>
        </div>
    </div>
</template>
<script>
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
                logo:''
            }
        },
        created(){
            console.log(this.$router);
        },
        methods:{
            go(){
                this.$router.push({name:'addRisk'})
            }
        }
    }
</script>
<style lang="less" scoped>
    #login{
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
    }
</style>