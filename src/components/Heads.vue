<template>
    <div class="headMain">
        <div class="heads">
            <x-header class="headsTitle" :left-options="{backText: '',showBack:backState}">
                {{title?title:'头部'}}
                <div @click="goPages('riskMap')" v-if="isMapState" class="map" slot="right">风险地图</div>
                <div @click="goPages('index')" v-if="isRiskAddState" class="map" slot="right">新增风险源</div>
                <div @click="goPages('riskList')" v-if="isRiskListState" class="map" slot="right">风险列表</div>
                <div @click="goPages('riskDanger')" v-if="isDangerState" class="map" slot="right">隐患</div>
                <div v-if="isRightTitleState" class="map" slot="right">{{rightTitle}}</div>
            </x-header>
        </div>
        <div class="divHeight"></div>
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
        props:['title','back','isMap','isRiskAdd','isRightTitle','rightTitle','isRiskList','isDanger'],
        data(){
            return{
                backState:true,
                isMapState:false,
                isRiskAddState:false,
                isRightTitleState: false,
                isRiskListState:false,
                isDangerState:false
            }
        },
        created(){
            this.backState = (this.back==false?false:true)
            this.isMapState = (this.isMap==true?true:false)
            this.isRiskAddState = (this.isRiskAdd==true?true:false)
            this.isRightTitleState = (this.isRightTitle==true?true:false)
            this.isRiskListState = (this.isRiskList==true?true:false)
            this.isDangerState = (this.isDanger==true?true:false)
        },
        methods:{
            goPages(name){
                this.$router.push({name:name});
            }
        }
    }
</script>
<style lang="less">
    .headMain{
        z-index: 99;
        width:100%;
        .divHeight{
            height: 45px;
            width: 100%;
        }
    }
    .heads{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 45px;
        z-index: 99;
        .headsTitle{
            background:#33CC99;
            color:#fff;
            width: 100%;
        }
        .map{
            color: #fff;
        }
    }
</style>