<template>
    <div class="amap">
        <div class="map-heads">
            <Heads :back="false" :title="'风险地图'" :isRiskList="true"></Heads>
            <search
                v-model="searchText"
                :autoFixed="false"
                ref="search"
                @on-submit="searchRisk"
                @on-cancel="searchCancel"
            ></search>
            <div class="msg">
                <MsgToast :notice="shufflingRiskWarn"></MsgToast>
                <div class="riskBtn" @click="goRiskAdd">
                    <x-button mini plain>新增风险源</x-button>
                </div>
            </div>
            <div v-transfer-dom>
                <alert v-model="show" :title="'搜索成功'" @on-hide="onSuccess"> {{ `共找到${riskList.length}条风险` }}</alert>
            </div>
        </div>
        <div class="map" ref="mapBox" :style="{height: `${mapSize.heights}px`}">
            <baidu-map class="bm-view" :zoom="zoom" :center="center" @ready="readyMap">

                <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <bm-marker v-for="(item, index) in riskList" :key="index" @click="openRisk(item)" :position="{lng: item.RiskLng || 0, lat: item.RiskLat || 0}"
                    :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: `http://wx-cityrisk.subei88.com/Uploads/Wx_map_icon/map${item.RiskLv+1}.png`, 
                    size: {width: 34, height: 34}}">
                </bm-marker>

            </baidu-map>

            <popup v-model="riskItemStatus" :hide-on-blur="true">
                <div class="riskItem">
                    <RiskList :item="riskItem" @click.native="goRiskInfo()"></RiskList>
                </div>
            </popup>

        </div>
    </div>
</template>
<script>
    // @
    // ="resultClick"
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
    import { Search, Group, Cell, XButton, Popup, Alert, XSwitch, TransferDomDirective as TransferDom } from 'vux'
    import {mapMutations, mapState, mapActions} from 'vuex'
    import RiskList from './../../components/common/RiskList.vue'

    export default {
        directives: {
            TransferDom
        },
        components:{
            Heads,
            Search,
            Group,
            Cell,
            XButton,
            MsgToast,
            Popup,
            RiskList,
            Alert,
            XSwitch,
        },
        data() {
            return {
                mapSize: {
                    heights: 0,
                },
                riskItemStatus: false,
                availHeight: window.screen.availHeight,
                zoom: 18,
                center: {lng:114.024773,lat:22.546698},
                mapShow:false,
                riskItem:{},
                BMap:{},
                map:{},
                searchText:'',
                show: false,
            }
        },
        watch:{
            riskList(val,vals){
                console.log(`我是风险数据，共${val.length}`);
                if(val.length>0){
                    this.center = {lng: val[0].RiskLng, lat: val[0].RiskLat};
                }
            },
        },
        mounted(){
            this.deleteRiskList();
            this.saveDefaultData({pageIndex:1,pageSize:1000,RiskStatus:3,listType: 'Map'});
            this.getRisk();
            this.saveDefaultDatas({pageIndex:1,pageSize:1000})

            // this.saveDefaultDatas({
            //     // RiskID: this.$route.params.id,
            //     RiskWarnStatus: -1,
            //     pageIndex: 1,
            //     pageSize: 10
            // });

            // this.getRiskWarn();
            this.getShufflingRiskWarn();

            // 设置百度地图容器的高度
            const ofHeight = this.$refs.mapBox.offsetHeight;
            this.mapSize.heights = ofHeight;
            
        },
        computed:{
            ...mapState({
				riskList(state){
                    console.log(`我是风险列表`);
                    console.log(state.riskList.riskList);
					return state.riskList.riskList;
				},
                shufflingRiskWarn(state) {
                    return state.warnAndAccident.shufflingRiskWarn;
                },
            })
        },
        methods:{
            ...mapMutations([
                'editRisk',
                'saveDefaultData',
                'deleteRiskList',
                'saveDefaultDatas'
            ]),
            ...mapActions([
                'getRisk',
                'getRiskWarn',
                'getShufflingRiskWarn',
            ]),
            goRiskAdd(){
                this.editRisk(addRiskDefault);
                this.$router.push({name:'riskAdd'});
            },
            openRisk(item){
                this.riskItemStatus = !this.riskItemStatus;
                this.riskItem = item;
                console.log(`我是风险的ID||${item.ID}`);
            },
            goPage(name) {
                this.$router.push({ name: name, params: { id: 0 } })
                // this.$router.push({ name: "warningList", params:{id:this.$route.params.riskId } });
            },
            readyMap({ BMap, map }) {

                this.BMap = BMap;
                this.map = map;

                console.log(BMap);
                console.log(map);

                map.addEventListener("moveend", function(e){
                    console.log(e);
                    console.log(`${map.getCenter().lng}***${map.getCenter().lat}`);
                });

            },
            goRiskInfo(){
                this.$router.push({name:'riskInfo',params:{riskId:this.riskItem.ID,add:1,editStatus:1}})
            },
            searchRisk(){
                this.$refs.search.setBlur();

                this.deleteRiskList();
                this.saveDefaultData({pageIndex:1,pageSize:1000,RiskStatus:3,RiskName: this.searchText});
                this.getRisk();

                console.log(this.searchText);
            },
            searchCancel(){

                this.searchText = '';
                this.deleteRiskList();
                this.saveDefaultData({pageIndex:1,pageSize:1000,RiskStatus:3,RiskName: this.searchText});
                this.getRisk();

            },
            onSuccess(){
                if(JSON.stringify(this.riskList)!=="[]" && this.riskList[0].RiskLng && this.riskList[0].RiskLat){
                    this.center = {lng: this.riskList[0].RiskLng, lat: this.riskList[0].RiskLat}
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    .amap {
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        .msg {
			border-bottom: 1px solid #eee;
			background: #fff;
			display: flex;
			align-items: center;

			justify-content: space-between;
			padding: 8px;
			.msgInfo {
				width: 70%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.msgs {
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 16px;
                    line-height: 100%;
                    box-sizing: border-box;
                    padding-left: 5px;
				}
			}
			.riskBtn {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

        .map {
            display: flex;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }
    }

    .anchorBL{
        display: none;
    }
    .weui-search-bar__cancel-btn {
        color: #33CC99!important;
    }

    .weui-btn_mini {
        line-height: 1.8!important;
        padding: 0 0.5em!important;
    }

    .bm-view {
        width: 100%;
        height: 100%;
    }
</style>