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
            <div class="msgInfo">您收到一条福田区雷电预警，点击查看详情</div>
            <div class="riskBtn">
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
    import { Search, Group, Cell, XButton } from 'vux'
    export default {
        components:{
            Heads,
            Search,
            Group,
            Cell,
            XButton
        },
        data(){
            return {}
        }
    }
</script>
<style lang="less">
    .amap{
        width: 100%;
        height: 100%;
        background: #fff;
        .msg{
            background:#EFEFF4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
            .msgInfo{
                overflow:hidden;
                word-break:keep-all;
                white-space:nowrap;
                text-overflow:ellipsis;
                font-size: 16px;
                width: 75%;
            }
            .riskBtn{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25%;
            }
        }
    }
    .amap-wrapper{
        // width: 100%;
        // height: 100%;
    }
    .weui-search-bar__cancel-btn{
        color: #33CC99!important;
    }
    .weui-btn_mini{
        line-height: 1.8!important;
        padding: 0 0.5em!important;
    }
</style>