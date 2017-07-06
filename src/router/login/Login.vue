<template>
    <div id="login">
        <div class="main">
            <div class="logo">
                <img src="./../../assets/vux_logo.png" alt="logo">
            </div>
            <div class="account">
                <div class="account-nem">我是账号</div>
                <div class="passWord">我是密码</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                logo:''
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
            margin-bottom: 5rem;
            .logo{
                display: flex;
                justify-content: center;
                align-items: center;
                watch:5rem;
                height:5rem;
                
                img{
                    height: 100%;
                }
            }
        }
    }
</style>