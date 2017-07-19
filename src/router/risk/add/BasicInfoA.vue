<template>
    <div class="basicInfoA">

        <x-input 
            title="险源名称" 
            placeholder="请输入"
            @on-change="(e)=>{upRiskAdd({RiskName:e})}"
            :value="postRiskAdd.RiskName"
            :required="true"
        ></x-input>

        <selector 
            title="风险类别"
            placeholder="请选择"
            :options="riskType"
            :value="riskTypeVal"
            @on-change="riskTypeChoose"
        ></selector>

        <x-input 
            title="类别名称" 
            placeholder="请输入"  
            :required="true" 
            @on-change="(e)=>{upRiskAdd({RiskCategoryName:e})}" 
            :value="postRiskAdd.RiskCategoryName"
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
            title="子类型" 
            placeholder="请选择"
            :options="riskObjectTypeChild"
            :value="riskObjectTypeChildVal"
            @on-change="riskObjectTypeChildChoose"
        ></selector>

        <x-address 
            :title="'省市区'" 
            raw-value
            v-model="addressValue"
            :list="addressData" 
            value-text-align="left"
        ></x-address>

        <x-input
            :title="'详细地址'" 
            placeholder="请输入"
            :required="true" 
            @on-change="(e)=>{upRiskAdd({RiskAddress:e})}"
            :value="postRiskAdd.RiskAddress"
        ></x-input>

        <x-input :disabled="true" :value="latAndLon" title="经度/纬度" placeholder="经度/纬度">
            <x-button :style="{'display':'none'}" slot="right" mini plain>地图</x-button>
        </x-input>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
    </div>
</template>
<script>
    import {mapMutations,mapState} from 'vuex'
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton, Value2nameFilter as value2name, Selector } from 'vux'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            Selector
        },
        data(){
            return {
                addressValue: [],
                addressData: ChinaAddressV3Data,
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
                console.log(addres);
                this.upRiskAdd({RiskArea1: addres[0],RiskArea2: addres[1],RiskArea3:addres[2]});
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

                    console.log(riskData);

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
                this.$router.push({name:'basicInfoB'})
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
                        this.riskObjectTypeChildVal = '';
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
    .basicInfoA{
        height:100%;
        background:#fff;
        .next{
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding:3rem 15px 0;
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