<template>
    <div id="basicInfoA">
        <div class="enterInfo">
            <x-input 
                title="险源名称" 
                placeholder="请输入"
                @on-change="(e)=>{upRiskAdd({RiskName:e})}"
                :value="postRiskAdd.RiskName"
            ></x-input>

            <selector 
                title="对象类型"
                placeholder="请选择"
                :options="riskObjectType"
                :value="riskObjectTypeVal"
                @on-change="riskObjectTypeChoose"
            ></selector>

            <selector
                v-if="JSON.stringify(riskObjectTypeChild)!=='[]'"
                title="" 
                placeholder="请选择"
                :options="riskObjectTypeChild"
                :value="riskObjectTypeChildVal"
                @on-change="riskObjectTypeChildChoose"
            ></selector>

            <x-address 
                :title="'省市区'" 
                raw-value
                v-model="addressValue"
                :list="addressDatas" 
                value-text-align="left"
            ></x-address>

            <x-input
                :title="'详细地址'" 
                placeholder="请输入"
                @on-change="(e)=>{upRiskAdd({RiskAddress:e})}"
                :value="postRiskAdd.RiskAddress"
            ></x-input>

            <popup v-model="getLngLatState" :hide-on-blur="false" :height="'100%'">
                <div class="getLngLat">
                    <GetLngLat 
                        :callback="getLngLat"
                    ></GetLngLat>
                </div>
            </popup>

            <x-input :disabled="true" :value="latAndLon" title="经度/纬度" placeholder="经度/纬度">
                <Icon slot="right" class="flexLeft" :name="'map-icon'" @click.native="getLngLatState=true"/>
            </x-input>
        </div>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
    </div>
</template>
<script>
    import GetLngLat from './../../../components/common/GetLngLat.vue'
    import {mapMutations,mapState} from 'vuex'
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton, Value2nameFilter as value2name, Selector,Popup } from 'vux'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            Selector,
            Popup,
            GetLngLat,
        },
        data(){
            return {
                getLngLatState: false,
                addressValue: [],
                addressData: ChinaAddressV3Data,
                addressDatas:[{"name":"广东省","value":"2494","parent":0},{"name":"深圳市","value":"2495","parent":"2494"},{"name":"南山区","value":"2496","parent":"2495"},{"name":"西丽街道","value":"2497","parent":"2496"},{"name":"-","value":"0000","parent":"2497"},{"name":"宝安区","value":"2498","parent":"2495"},{"name":"-","value":"001","parent":"2498"},{"name":"-","value":"0010","parent":"001"},{"name":"福田区","value":"2508","parent":"2495"},{"name":"园岭街道","value":"2509","parent":"2508"},{"name":"园东社区","value":"2518","parent":"2509"},{"name":"红荔社区","value":"2519","parent":"2509"},{"name":"南天社区","value":"2520","parent":"2509"},{"name":"长城社区","value":"2521","parent":"2509"},{"name":"上林社区","value":"2522","parent":"2509"},{"name":"鹏盛社区","value":"2523","parent":"2509"},{"name":"华林社区","value":"2524","parent":"2509"},{"name":" 南园街道","value":"2510","parent":"2508"},{"name":"东园社区","value":"2525","parent":"2510"},{"name":"巴登社区","value":"2526","parent":"2510"},{"name":"滨江社区","value":"2527","parent":"2510"},{"name":"玉田社区","value":"2528","parent":"2510"},{"name":"南园社区","value":"2529","parent":"2510"},{"name":"沙埔头社区","value":"2530","parent":"2510"},{"name":" 园西社区","value":"2531","parent":"2510"},{"name":"锦龙社区","value":"2532","parent":"2510"},{"name":"南华社区","value":"2533","parent":"2510"},{"name":"赤尾社区","value":"2534","parent":"2510"},{"name":"滨河社区","value":"2535","parent":"2510"},{"name":"福田街道","value":"2511","parent":"2508"},{"name":"福田社区","value":"2536","parent":"2511"},{"name":"岗 厦社区","value":"2537","parent":"2511"},{"name":"皇岗社区","value":"2538","parent":"2511"},{"name":"水围社区","value":"2539","parent":"2511"},{"name":"渔农社区","value":"2540","parent":"2511"},{"name":"福华社区","value":"2541","parent":"2511"},{"name":"圩镇社区","value":"2542","parent":"2511"},{"name":"福山社区","value":"2543","parent":"2511"},{"name":"福安 社区","value":"2544","parent":"2511"},{"name":"福民社区","value":"2545","parent":"2511"},{"name":"海滨社区","value":"2546","parent":"2511"},{"name":"口岸社区","value":"2547","parent":"2511"},{"name":"福南社区","value":"2548","parent":"2511"},{"name":"沙头街道","value":"2512","parent":"2508"},{"name":"上沙社区","value":"2549","parent":"2512"},{"name":"下沙社 区","value":"2550","parent":"2512"},{"name":"沙嘴社区","value":"2551","parent":"2512"},{"name":"沙尾社区","value":"2552","parent":"2512"},{"name":"新洲社区","value":"2553","parent":"2512"},{"name":"新沙社区","value":"2554","parent":"2512"},{"name":"天安社区","value":"2555","parent":"2512"},{"name":"金城社区","value":"2556","parent":"2512"},{"name":"金碧社区","value":"2557","parent":"2512"},{"name":"翠湾社区","value":"2558","parent":"2512"},{"name":"金地社区","value":"2559","parent":"2512"},{"name":"新华社区","value":"2560","parent":"2512"},{"name":"梅林街道","value":"2513","parent":"2508"},{"name":"梅林一村社区","value":"2561","parent":"2513"},{"name":"龙尾社区","value":"2562","parent":"2513"},{"name":"上梅社区","value":"2563","parent":"2513"},{"name":"新兴社区","value":"2564","parent":"2513"},{"name":"下梅社区","value":"2565","parent":"2513"},{"name":"梅河社区","value":"2566","parent":"2513"},{"name":"梅都社区","value":"2567","parent":"2513"},{"name":"孖岭社区","value":"2568","parent":"2513"},{"name":"新阁社区","value":"2569","parent":"2513"},{"name":"翰岭社区","value":"2570","parent":"2513"},{"name":"梅亭社区","value":"2571","parent":"2513"},{"name":"梅京社区","value":"2572","parent":"2513"},{"name":"梅丰社区","value":"2573","parent":"2513"},{"name":"华富街道","value":"2514","parent":"2508"},{"name":"梅岗社区","value":"2574","parent":"2514"},{"name":"华山社区","value":"2575","parent":"2514"},{"name":"黄木岗社区","value":"2576","parent":"2514"},{"name":"新田社区","value":"2577","parent":"2514"},{"name":"田面社区","value":"2578","parent":"2514"},{"name":"莲花一村社区","value":"2579","parent":"2514"},{"name":"莲花二村社区","value":"2580","parent":"2514"},{"name":"莲花三村社区","value":"2581","parent":"2514"},{"name":"香蜜湖街道","value":"2515","parent":"2508"},{"name":" 香安社区","value":"2582","parent":"2515"},{"name":"香梅社区","value":"2583","parent":"2515"},{"name":"香岭社区","value":"2584","parent":"2515"},{"name":"竹林社区","value":"2585","parent":"2515"},{"name":"竹园社区","value":"2586","parent":"2515"},{"name":"农园社区","value":"2587","parent":"2515"},{"name":"香蜜社区","value":"2588","parent":"2515"},{"name":"东 海社区","value":"2589","parent":"2515"},{"name":"侨香社区","value":"2590","parent":"2515"},{"name":"华强北街道","value":"2516","parent":"2508"},{"name":"福新社区","value":"2591","parent":"2516"},{"name":"梅富社区","value":"2592","parent":"2516"},{"name":"康欣社区","value":"2593","parent":"2516"},{"name":"狮岭社区","value":"2594","parent":"2516"},{"name":"梅 岭社区","value":"2595","parent":"2516"},{"name":"紫荆社区","value":"2596","parent":"2516"},{"name":"景华社区","value":"2597","parent":"2516"},{"name":"景田社区","value":"2598","parent":"2516"},{"name":"莲花北社区","value":"2599","parent":"2516"},{"name":"彩田社区","value":"2600","parent":"2516"},{"name":"彩虹社区","value":"2601","parent":"2516"},{"name":"福 中社区","value":"2602","parent":"2516"},{"name":"福保街道","value":"2517","parent":"2508"},{"name":"福强社区","value":"2603","parent":"2517"},{"name":"荔村社区","value":"2604","parent":"2517"},{"name":"通新岭社区","value":"2605","parent":"2517"},{"name":"华红社区","value":"2606","parent":"2517"},{"name":"华航社区","value":"2607","parent":"2517"},{"name":"湖 南省","value":"2499","parent":0},{"name":"长沙市","value":"2500","parent":"2499"},{"name":"-","value":"10","parent":"2500"},{"name":"-","value":"100","parent":"10"},{"name":"-","value":"1000","parent":"100"},{"name":"岳阳市","value":"2501","parent":"2499"},{"name":"-","value":"11","parent":"2501"},{"name":"-","value":"110","parent":"11"},{"name":"-","value":"1100","parent":"110"},{"name":"衡阳市","value":"2503","parent":"2499"},{"name":"-","value":"12","parent":"2503"},{"name":"-","value":"120","parent":"12"},{"name":"-","value":"1200","parent":"120"},{"name":"新疆省","value":"2505","parent":0},{"name":"-","value":"2","parent":"2505"},{"name":"-","value":"20","parent":"2"},{"name":"-","value":"200","parent":"20"},{"name":"-","value":"2000","parent":"200"}],
                addressData1:[
                    
                    {name: '中国',value: 'china',parent: 0},
                    {name: '美国',value: 'USA',parent: 0},

                    {name: '广东',value: 'china001',parent: 'china'}, 
                    {name: '广西',value: 'china002',parent: 'china'}, 

                    {name: '美国001',value: 'usa001',parent: 'USA'}, 
                    {name: '美国002',value: 'usa002',parent: 'USA'}, 


                    {name: '广州',value: 'gz',parent: 'china001'}, 
                    {name: '深圳',value: 'sz',parent: 'china001'}, 
                    {name: '广西001',value: 'gx001',parent: 'china002'},
                    {name: '广西002',value: 'gx002',parent: 'china002'}, 


                    {name: '美国001_001',value: '0003',parent: 'usa001'}, 
                    {name: '美国001_002',value: '0004',parent: 'usa001'},

                    {name: '美国002_001',value: '0005',parent: 'usa002'}, 
                    {name: '美国002_002',value: '0006',parent: 'usa002'},

                    
                    {name: '-',value: 'gz01',parent: 'gz'}, 
                    {name: '-',value: 'gz02',parent: 'sz'}, 
                    
                    {name: '-',value: 'gz01',parent: 'gx001'}, 
                    {name: '-',value: 'gz02',parent: 'gx001'}, 
                    
                    {name: '-',value: 'gz01',parent: 'gx002'}, 
                    {name: '-',value: 'gz02',parent: 'gx002'}, 

                ],
                latAndLon:'已设置默认值',
                riskTypeVal:'',
                riskObjectTypeVal: '',
                riskObjectTypeChildVal:'',
                riskObjectTypeChild:[],
            }
        },
        watch:{
            addressValue(val){
                let addres = value2name(val, ChinaAddressV3Data).split(' ');
                this.upRiskAdd({RiskArea1: addres[0],RiskArea2: addres[1],RiskArea3:addres[2]});

                console.log(val);
                
            }
        },
        mounted(){
            const postRiskAdd = this.$store.state.tiskAdd.postRiskAdd;
            if(postRiskAdd.RiskObjectTypeID1){
                this.riskObjectTypeVal = this.$store.state.tiskAdd.postRiskAdd.RiskObjectTypeID1;
            }
            if(postRiskAdd.RiskObjectTypeID1){
                this.riskObjectTypeChildVal = this.$store.state.tiskAdd.postRiskAdd.RiskObjectTypeID2;
            }
            if(postRiskAdd.RiskCategory){
                this.riskTypeVal = this.$store.state.tiskAdd.postRiskAdd.RiskCategory;
            }
            this.addressValue = [postRiskAdd.RiskArea1,postRiskAdd.RiskArea2,postRiskAdd.RiskArea3]
        },
        computed: {
            ...mapState({
                postRiskAdd: state => {
                    if(state.tiskAdd.postRiskAdd.RiskObjectTypeID1){
                        this.riskObjectTypeVal = state.tiskAdd.postRiskAdd.RiskObjectTypeID1;
                    }
                    if(state.tiskAdd.postRiskAdd.RiskObjectTypeID2){
                        this.riskObjectTypeChildVal = state.tiskAdd.postRiskAdd.RiskObjectTypeID2;
                    }
                    return state.tiskAdd.postRiskAdd
                },
                riskType: state => {
                    let riskData=[];

                    if( JSON.stringify(state.tiskAdd.RiskType) != '[]'){
                        for(let item in state.tiskAdd.RiskType[0].detail_BaseDataList){
                            riskData.push({
                                key:state.tiskAdd.RiskType[0].detail_BaseDataList[item].ID,
                                value:state.tiskAdd.RiskType[0].detail_BaseDataList[item].BaseName
                            });
                        }
                    }

                    return riskData;
                },
                riskObjectType: state => {
                    let riskObjectType = [];

                    if(state.tiskAdd.riskObjectType.length != 0){
                        for(let item in state.tiskAdd.riskObjectType){
                            riskObjectType.push({
                                key:state.tiskAdd.riskObjectType[item].ID,
                                value:state.tiskAdd.riskObjectType[item].ObjectTypeName
                            });
                        }
                    }

                    return riskObjectType;
                }
            }),

        },
        methods:{
            ...mapMutations([
                'upRiskAdd'
            ]),
            next(){
                this.$router.push({name:'basicInfoC'})
            },
            getLngLat(res){
                console.log(`获取经纬度回调${JSON.stringify(res)}`);

                this.getLngLatState = false;
            },
            riskObjectTypeChoose(val){
            
                let riskObjectType = this.$store.state.tiskAdd.riskObjectType;
                for(let item in riskObjectType){

                    if(riskObjectType[item].ID == val){

                        this.upRiskAdd({RiskObjectTypeID1:riskObjectType[item].ID})
                        this.upRiskAdd({riskObjectTypeChoose:riskObjectType[item].ObjectTypeName})

                        let riskObjectTypeChild = [];
                        for(let items in riskObjectType[item].riskObjectTypeChildList){
                            
                            riskObjectTypeChild.push({
                                key:riskObjectType[item].riskObjectTypeChildList[items].ID,
                                value:riskObjectType[item].riskObjectTypeChildList[items].ObjectTypeName
                            });
                        }

                        childObj:
                            for(let child=0; child<riskObjectTypeChild.length; child++){
                                if(riskObjectTypeChild[child].key == this.riskObjectTypeChildVal){
                                    break childObj;
                                }else{
                                    if(child+1 == riskObjectTypeChild.length){
                                        this.riskObjectTypeChildVal = '';
                                    }
                                }
                            }

                        this.riskObjectTypeChild = riskObjectTypeChild;
                    }
                }

            },
            riskObjectTypeChildChoose(val){
                for(let items in this.riskObjectTypeChild){

                    if(this.riskObjectTypeChild[items].key == val){
                        this.upRiskAdd({RiskObjectTypeID2:this.riskObjectTypeChild[items].key})
                        this.upRiskAdd({riskObjectTypeChildChoose:this.riskObjectTypeChild[items].value})
                    }

                }
            },
            riskTypeChoose(val){
                this.upRiskAdd({RiskCategory:val})
            },
            changeFun(val){
                console.log(val);
            }
        },
    }
</script>
<style lang="less">
    #basicInfoA{
        height:100%;
        background:#fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .getLngLat{
            height: 100%;
        }
        .vux-cell-primary{
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            .vux-popup-picker-select{
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .enterInfo{
            margin-top: 10px;
            background:#fff;
            overflow: hidden;
        }
        .next{
            box-sizing: border-box;
            padding:2rem 15px 15px;
        }
        .weui-label{
            width: 5em!important;
        }
        .weui-cells{margin: 0!important;}
        .weui-select{
            color:#333!important;
        }
    }
</style>