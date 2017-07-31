<template>
    <div class="amap">
        <div class="map-heads">
            <Heads :back="false" :title="'风险地图'" :isRiskList="true"></Heads>
            <search :autoFixed="false"></search>
            <div class="msg">
                <MsgToast @click.native="goPage('warningList')"></MsgToast>
                <div class="riskBtn" @click="goRiskAdd">
                    <x-button mini plain>新增风险源</x-button>
                </div>
            </div>
        </div>
        <div class="map" style="flex:1">
            <baidu-map class="bm-view" :zoom="zoom" :center="center" @ready="readyMap">
            
                <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

                <bm-marker @click="markerIn" :position="{lng: 116.404, lat: 39.915}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label content="标题" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                </bm-marker>

                <bm-marker @click="markerIn" :position="{lng: 116.4017, lat: 40.225964}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label content="标题" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                </bm-marker>

            </baidu-map>
        </div>
    </div>
</template>
<script>
        // @result-click="resultClick"
        // @on-change="getResult"
        // :results="results"
        // :autoFixed="false"
        // v-model="value"
        // @on-focus="onFocus"
        // @on-cancel="onCancel"
        // @on-submit="onSubmit"
        // ref="search"
    import { addRiskDefault } from './../../utils/defaultData.js'
    import Heads from './../../components/Heads.vue'
    import MsgToast from './../../components/common/MsgToast.vue'
    import { Search, Group, Cell, XButton } from 'vux'
    import {mapMutations, mapState, mapActions} from 'vuex'

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
            return {
                availHeight:window.screen.availHeight,
                zoom: 10,
                center: {lng: 116.4017, lat: 40.225964},
                mapShow:false
            }
        },
        mounted(){
            console.log(this)
        },
        methods:{
            ...mapMutations([
                'editRisk'
            ]),
            goRiskAdd(){

                this.editRisk(addRiskDefault);
                this.$router.push({name:'riskAdd'});
            },
            markerIn(){
                console.log(1)
            },
            goPage(name){
                this.$router.push({name:name})
            },
            readyMap({BMap, map}){
                console.log('百度地图示例数据');
                console.log(BMap);
                console.log(map);

                map.addEventListener("moveend", function(e){
                    console.log(e);
                    console.log(`${map.getCenter().lng}***${map.getCenter().lat}`);
                });

            }
        }
    }
</script>
<style lang="less" scoped>
    .amap{
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        .msg{
            border-bottom: 1px solid #eee;
            background:#fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px;
            .msgInfo{
                width: 70%;
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
    .weui-search-bar__cancel-btn{
        color: #33CC99!important;
    }
    .weui-btn_mini{
        line-height: 1.8!important;
        padding: 0 0.5em!important;
    }
    .bm-view {
        width: 100%;
        height: 100%;
    }
    .map{}
</style>