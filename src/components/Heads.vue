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
                <div @click="goPages('riskDangerAdd',{id: $route.params.id})" v-if="isRiskDangerAddState" class="map" slot="right">新增隐患</div>
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
                backState: true,
                noBackState: false,
                isMapState: false,
                isRiskAddState: false,
                isRightTitleState: false,
                isRiskListState: false,
                isDangerState: false,
                isDangerState: false,
                isEvaluationListState: false,
                isRiskDangerAddState: false,
                menus: {
                    menu1: '新增隐患',
                    menu2: '新增评估'
                },
                showMenus: false
            }
        },
        mounted(){
        },
        created() {
            this.backState = (this.back == false ? false : true)
            this.isMapState = (this.isMap == true ? true : false)
            this.isRiskAddState = (this.isRiskAdd == true ? true : false)
            this.isRightTitleState = (this.isRightTitle == true ? true : false)
            this.isRiskListState = (this.isRiskList == true ? true : false)
            this.isDangerState = (this.isDanger == true ? true : false)
            this.isEvaluationListState = (this.isEvaluationList == true ? true : false)
            this.noBackState = (this.noBack == true ? true : false)
            this.isRiskDangerAddState = (this.isRiskDangerAdd==true?true:false)
        },
        methods: {
            backChange(){
                this.$router.push({ name: this.goBack });
            },
            openMenu(data) {
                console.log(data);
                if(data == "menu1"){

                    this.$router.push({ name: "riskDangerAdd" });
                }

                if(data == "menu2"){

                   this.$router.push({ name: "addEvaluation" });

                }

            },
            
            goPages(name,param) {

                console.log(param);

                this.$router.push({ name: name , params: param });
            },

            addEvaluation() {
                this.$router.push({ name: "addEvaluation" });
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