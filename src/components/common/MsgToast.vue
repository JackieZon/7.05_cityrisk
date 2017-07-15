<template>
    <div class="msgInfo" @click.native="goPage">
        <img src="./../../assets/icon/msg-icon.svg" width="25" alt="">
        <div class="msgs">您收到一条福田区雷电预警，点击查看详情</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            goPage(){
                console.log(this.$router)
                this.$router.push({name:'warningList'})
            }
        }
    }
</script>
<style lang="less">
.msgInfo{
    width: 75%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .msgs{
        overflow:hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 16px;
        line-height: 100%;
        box-sizing: border-box;
        padding-left:5px;
    }

}
</style>