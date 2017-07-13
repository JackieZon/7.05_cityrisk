<template>
    <div class="headImg">
        <div class="head">
            <div class="img">
                <img src="./../../assets/icon/head-icon.svg" alt="">
            </div>
            <div class="name">Jack</div>
        </div>
        <!--<div>
            <span>权限：管理员</span>
        </div>-->
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style lang="less">
    .headImg{
        color:#fff;
        box-sizing: border-box;
        padding: 1rem 1.5rem;
        width:100%;
        background: #33CC99;
        display: flex;
        justify-content: space-between;
        .head{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img{
                width: 4rem;
                height: 4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                /* background: #f1f1f1; */
                border-radius: 50%;
                overflow: hidden;
                border: 6px solid rgba(255,255,255,0.35);
                img{
                    background: rgba(255,255,255,0.8);
                }
            }
        }
    }
</style>