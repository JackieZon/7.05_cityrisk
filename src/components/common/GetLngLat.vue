<template>
    <div id="amap">
        <div class="map-heads">
            <Heads :back="false" :title="'选择经纬度'"></Heads>
        </div>
        <div class="msg">
            <div class="info" v-if="JSON.stringify(nowLngLat)!=='{}'">
                &nbsp;{{msg}}&nbsp;
            </div>
            <div class="info" v-else>
                请移动地图获取经纬度
            </div>
        </div>
        <div class="map" ref="getLngLatBox" :style="{height: `${mapSize.heights}px`}">
            <baidu-map class="bm-view" :zoom="zoom" :center="center" @ready="readyMap">
            
                <!--<bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>

                <bm-marker @click="markerIn" :position="{lng: 116.404, lat: 39.915}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label content="标题" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                </bm-marker>-->

                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <!--<bm-marker @click="markerIn" :position="{lng: 116.4017, lat: 40.225964}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label content="标题" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                </bm-marker>-->

                <div class="isContent">
                    <Icon slot="icon" :name="'map-point02'" :width="'40px'" :height="'40px'" />
                </div>

            </baidu-map>
        </div>
        <div class="enter">
            <x-button @click.native="confirm">确定{{(JSON.stringify(nowLngLat)!=='{}'?`(${nowLngLat.lng}/${nowLngLat.lat})`:'')}}</x-button>
        </div>
    </div>
</template>
<script>
    import { addRiskDefault } from './../../utils/defaultData.js'
    import Heads from './../../components/Heads.vue'
    import MsgToast from './../../components/common/MsgToast.vue'
    import { Search, Group, Cell, XButton } from 'vux'
    import {mapMutations, mapActions, mapState} from 'vuex'

    export default {
        components:{
            Heads,
            Search,
            Group,
            Cell,
            XButton,
            MsgToast,
            XButton,
        },
        props:['callback','pageState','defaultAddres'],
        watch:{
            pageState(val){
                const ofHeight = this.$refs.getLngLatBox.offsetHeight;
                this.mapSize.heights = ofHeight;
                console.log(`我改变了${val}次${JSON.stringify(this.center)}||我是地址${this.defaultAddres}`);
                console.log(this.BMap);
                	// 创建地址解析器实例
	            let myGeo = new BMap.Geocoder();
                myGeo.getPoint((this.defaultAddres?this.defaultAddres:'深圳'), (point) => {

                    console.log(point);

                    if (point) {
                        this.center = point
                    }else{
                        console.log("您选择地址没有解析到结果!");
                    }
                });
            }
        },
        data(){
            return {
                mapSize:{
                    heights: 0,
                },
                zoom: 18,
                center: {lng: 114.024773, lat: 22.546698},
                mapShow:false,
                nowLngLat:{},
                msg:'',
                BMap:{},
                map:{},
            }
        },
        mounted(){
        },
        methods:{
            ...mapMutations([
                'editRisk'
            ]),
            ...mapActions({
                actionToast: 'showToast'
            }),
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

                this.BMap = BMap;
                this.map = map;
                map.addEventListener("moveend", (e)=>{

                    this.nowLngLat = {lng:map.getCenter().lng, lat:map.getCenter().lat};
                    this.center = this.nowLngLat;

                    const point = new BMap.Point(map.getCenter().lng,map.getCenter().lat);

                    const geocoder = new BMap.Geocoder();
                    geocoder.getLocation(point,(data)=>{

                        this.msg=data.address;
                        // console.log(`我是详细地址${this.msg}`);

                    });

                });

            },
            confirm(){
                
                if(JSON.stringify(this.nowLngLat)=='{}'){
                    this.actionToast({toastState:true,toastValue:'请移动地图获取地址'});
                    return;
                }
                if(typeof(this.callback)=='function'){
                    this.callback({location:this.nowLngLat,address:this.msg});
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    #amap{
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        .map{
            display: flex;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            position: relative;
            .isContent{
                position: absolute;
                top: 50%;
                line-height: 24px;
                left: 50%;
                width: 40px;
                height: 40px;
                text-align: center;
                margin-top: -40px;
                margin-left: -20px;
            }
        }
        .msg{
            box-sizing: border-box;
            padding: 0 15px;
            line-height: 32px;
            .info{
                white-space:nowrap; 
                text-overflow:ellipsis; 
                -o-text-overflow:ellipsis; 
                overflow:hidden;
                text-align: center;
            }
        }
    }
    .enter{
        box-sizing: border-box;
        padding: 10px 15px;
        button{
            background: #33CC99;
            color: #fff;
            font-size: 16px;
            &:active{
                background: #22bb88!important;
                color:#fff;
                line-height: 2.33333333!important;
            }
        }
    }
    .bm-view {
        width: 100%;
        height: 100%;
    }
</style>