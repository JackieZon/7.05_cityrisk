<template>
    <div class="headImg">
        <div class="head">
            <div class="img">
                <Icon :name="'head-icon'" :width="'100%'" :height="'100%'" style="background: rgba(255,255,255,0.85);" />
            </div>
            <div class="name">Jack</div>
        </div>
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
<style lang="less" scoped>
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
                color: #33CC99;
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