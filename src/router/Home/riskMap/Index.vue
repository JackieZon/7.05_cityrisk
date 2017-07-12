<template>
    <div class="amap">
        <Heads :title="'风险地图'"></Heads>
        <search
            @result-click="resultClick"
            @on-change="getResult"
            :results="results"
            :autoFixed="false"
            v-model="value"
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search"
        ></search>
        <!-- 查看 vux 文档 搜索方法 -->
        <div class="msg">
            <MsgToast></MsgToast>
            <!--<div class="msgInfo">
                <img src="./../../../assets/icon/msg-icon.svg" width="25" alt="">
                <div class="msgs">您收到一条福田区雷电预警，点击查看详情</div>
            </div>-->
            <div class="riskBtn" @click="goBack">
                <x-button mini plain>新增风险源</x-button>
            </div>
        </div>
        <div class="amap-wrapper">
            <el-amap :vid="'amap-vue'"></el-amap>
        </div>
    </div>
</template>
<script>
    import Heads from './../../../components/Heads.vue'
    import MsgToast from './../../../components/common/MsgToast.vue'
    import { Search, Group, Cell, XButton } from 'vux'
    export default {
        components:{
            Heads,
            Search,
            Group,
            Cell,
            XButton,
            MsgToast
        },
        data(){
            return {}
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="less">
    .amap{
        width: 100%;
        height: 100%;
        background: #fff;
        .msg{
            border-bottom: 1px solid #eee;
            background:#fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
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
            .riskBtn{
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    .amap-wrapper{
        width: 100%;
        height: 100%;
    }
    .weui-search-bar__cancel-btn{
        color: #33CC99!important;
    }
    .weui-btn_mini{
        line-height: 1.8!important;
        padding: 0 0.5em!important;
    }
</style>