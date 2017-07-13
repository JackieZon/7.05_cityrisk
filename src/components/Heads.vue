<template>
    <div class="heads">
        <x-header class="headsTitle" :left-options="{backText: '',showBack:backState}">
            {{title?title:'头部'}}
            <div @click="goPages('riskMap')" v-if="isMapState" class="map" slot="right">风险地图</div>
            <div @click="goPages('index')" v-if="isRiskAddState" class="map" slot="right">新增风险源</div>
            <div v-if="isRightTitleState" class="map" slot="right">{{rightTitle}}</div>
        </x-header>
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
        props:['title','back','isMap','isRiskAdd','isRightTitle','rightTitle'],
        data(){
            return{
                backState:true,
                isMapState:false,
                isRiskAddState:false,
                isRightTitleState: false
            }
        },
        created(){
            this.backState = (this.back==false?false:true)
            this.isMapState = (this.isMap==true?true:false)
            this.isRiskAddState = (this.isRiskAdd==true?true:false)
            this.isRightTitleState = (this.isRightTitle==true?true:false)
        },
        methods:{
            goPages(name){
                this.$router.push({name:name});
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