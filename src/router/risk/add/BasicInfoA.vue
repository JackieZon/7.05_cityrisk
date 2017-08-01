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
                :list="areaData" 
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

            <x-input :disabled="true" :value="`${(postRiskAdd.RiskLng?postRiskAdd.RiskLng+' / '+postRiskAdd.RiskLat:'请选择经纬度')}`" title="经度/纬度" placeholder="经度/纬度">
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
                latAndLon:'已设置默认值',
                riskTypeVal:'',
                riskObjectTypeVal: '',
                riskObjectTypeChildVal:'',
                riskObjectTypeChild:[],
            }
        },
        watch:{
            addressValue(val){
                
                console.log(`我的地址改变了${typeof(val[0])}`);

                let addres = value2name(val, this.areaData).split(' ');

                console.log(addres);

                this.upRiskAdd({

                    RiskArea1: val[0],
                    RiskArea2: val[1],
                    RiskArea3: val[2],
                    RiskArea4: val[3],
                    RiskArea5: val[4],

                    RiskAreaIDsArray: val,
                    RiskAreaName1: addres[0],
                    RiskAreaName2: addres[1],
                    RiskAreaName3: addres[2],
                    RiskAreaName4: addres[3],
                    RiskAreaName5: addres[4],

                });

            },
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
            let addressValues = postRiskAdd.RiskAreaIDsArray.map((val)=>{
                return String(val);
            });
            this.addressValue = addressValues;
        },
        computed: {
            ...mapState({
                areaData: state => {
                    return state.areaData;
                },
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
                this.upRiskAdd({RiskLng:res.location.lng,RiskLat:res.location.lat});
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