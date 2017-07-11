<template>
    <div class="heads">
        <x-header class="headsTitle" :left-options="{backText: '',showBack:backState}">{{title?title:'头部'}}</x-header>
    </div>
</template>
<script>
    import { XHeader, Actionsheet, TransferDom} from 'vux'
    export default{
        components:{
            XHeader,
            Actionsheet,
            TransferDom
        },
        props:['title','back'],
        data(){
            return{
                backState:true
            }
        },
        created(){
            this.backState = (this.back==false?false:true)
        }
    }
</script>
<style lang="less">
    .heads{
        .headsTitle{
            background:#33CC99;
            color:#fff;
        }
    }
</style>