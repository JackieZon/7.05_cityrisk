<template>
    <div class="heads">
        <x-header class="headsTitle" :left-options="{backText: '',showBack:backState}">{{title?title:'头部'}}<div @click="goMap" v-if="isMapState" class="map" slot="right">风险地图</div></x-header>
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
        props:['title','back','isMap'],
        data(){
            return{
                backState:true,
                isMapState:true
            }
        },
        created(){
            this.backState = (this.back==false?false:true)
            this.isMapState = (this.isMap==true?true:false)
        },
        methods:{
            goMap(){
                this.$router.push({name:'riskMap'});
            }
        }
    }
</script>
<style lang="less">
    .heads{
        .headsTitle{
            background:#33CC99;
            color:#fff;
        }
        .map{
            color: #fff;
        }
    }
</style>