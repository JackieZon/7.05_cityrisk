<template>
    <div class="headMain">
        <div class="heads">
            <x-header class="headsTitle" :left-options="{backText: '',showBack:backState,preventGoBack: noBackState }" @on-click-back="backChange">
                {{title?title:'头部'}}
                <div @click="goPages('riskMap')" v-if="isMapState" class="map" slot="right">风险地图</div>
                <div @click="goPages('riskAdd')" v-if="isRiskAddState" class="map" slot="right">新增风险源</div>
                <div @click="goPages('riskList')" v-if="isRiskListState" class="map" slot="right">风险列表</div>
                <!--<div @click="goPages('riskDanger')" v-if="isDangerState" class="map" slot="right"><span style="font-size: 20px;">+</span></div>-->
                <div v-if="isDangerState" class="map" slot="right" v-on:click="showMenus = true"><span style="font-size: 20px;">+</span></div>
                <!--<div v-if="isDangerState" class="map" slot="right">隐患</div>-->
                <div @click="addEvaluation" v-if="isEvaluationListState" class="map" slot="right">新增</div>
                <!-- <div @click="goPages('riskDangerAdd',{id: $route.params.id})" v-if="isRiskDangerAddState" class="map" slot="right">新增隐患</div> -->
                <div @click="goPages('riskDangerAdd',{id: $route.params.id})" v-if="riskDangerAdd" class="map" slot="right">新增隐患</div>
                <div v-if="isRightTitleState" class="map" slot="right">{{rightTitle}}</div>

                <div v-transfer-dom>
                    <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="openMenu"></actionsheet>
                </div>

            </x-header>
        </div>
        <div class="divHeight"></div>
    </div>
</template>
<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import {mapMutations,mapState} from 'vuex'

    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            Actionsheet,
            TransferDom,
            ButtonTab,
            ButtonTabItem
        },
        props: ['title', 'back', 'noBack', 'goBack', 'isMap', 'isRiskAdd', 'isRightTitle', 'rightTitle', 'isRiskList', 'isDanger', 'isEvaluationList', 'isRiskDangerAdd'],
        data() {
            return {
                menus: {
                    menu1: '新增隐患',
                    menu2: '新增评估'
                },
                showMenus: false,
                riskDangerAdd:false
            }
        },
        computed:{
            backState(){
                return (this.back == false ? false : true);
            },
            isMapState(){
                return (this.isMap == true ? true : false);
            },
            isRiskAddState(){
                return (this.isRiskAdd == true ? true : false);
            },
            isRightTitleState(){
                return (this.isRightTitle == true ? true : false);
            },
            isRiskListState(){
                return (this.isRiskList == true ? true : false);
            },
            isDangerState(){
                return (this.isDanger == true ? true : false);
            },
            isEvaluationListState(){
                return (this.isEvaluationList == true ? true : false);
            },
            noBackState(){
                return (this.noBack == true ? true : false);
            },
            isRiskDangerAddState(){
                return (this.isRiskDangerAdd==true?true:false);
            }
        },
        mounted(){
        },
        created() {
            this.riskDangerAdd = this.$route.params.riskDangerAdd
        },
        methods: {
            ...mapMutations([
                'cleanPostRiskAdd',
            ]),
            backChange(){
                this.$router.push({ name: this.goBack });
            },
            openMenu(data) {
                
                let param = this.$route.params;
                console.log(param);
                
                if(data == "menu1"){
                    this.$router.push({ name: "riskDangerAdd", params:{riskId: param.riskId ,add:param.add ,editStatus: param.editStatus,dangerId:0}});
                }

                if(data == "menu2"){
                   this.$router.push({ name: "addEvaluation" , params:{evaluationInfoId:0}});
                }

            },
            
            goPages(name,param) {
                this.cleanPostRiskAdd();
                this.$router.push({ name: name , params: param });
            },
            goRiskAdd(){
                this.$router.replace({ name: 'riskAdd' , params: {} });
            },
            addEvaluation() {
                this.$router.push({ name: "addEvaluation", params:{evaluationInfoId:0}});
            }
        }
    }

</script>
<style lang="less" scoped>
    .headMain {
        z-index: 99;
        width: 100%;
        .divHeight {
            background: #33CC99;
            height: 45px;
            width: 100%;
        }
    }
    
    .heads {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 45px;
        z-index: 99;
        .headsTitle {
            background: #33CC99;
            // background: rgba(255,255,255,0);
            color: #fff;
            width: 100%;
        }
        .map {
            color: #fff;
        }
    }
</style>