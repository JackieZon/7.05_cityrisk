<template>
    <div class="basicInfoA">
        <x-input @on-change="(e)=>{upRiskAdd({RiskName:e})}" :value="postRiskAdd.RiskName" :required="true" title="险源名称" placeholder="险源名称"></x-input>
        <selector title="风险类别" :options="riskType" v-model="riskTypeChoose"></selector>
        <x-input :required="true" title="类别名称" placeholder="类别名称"></x-input>

        <selector 
            title="对象类型"
            :options="riskObjectType" 
            v-model="riskObjectTypeChoose"
        ></selector>

        <selector 

            title="子类型" 
            v-if="riskObjectTypeChoose" 
            :options="riskObjectTypeChild" 
            v-model="riskObjectTypeChildChoose"

        ></selector>

        <x-address :title="'省市区'" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
        <x-input :required="true" placeholder="详细地址"></x-input>
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
                addressValue: ['广东省', '深圳市', '南山区'],
                addressData: ChinaAddressV3Data,
                latAndLon:'已设置默认',
                riskTypeChoose:'',
                riskObjectTypeChoose: this.$store.state.tiskAdd.RiskObjectTypeID1,
                riskObjectTypeChild:[],
                riskObjectTypeChildChoose:''
            }
        },
        
        computed: {
            ...mapState({
                postRiskAdd: state => {
                    if(state.tiskAdd.postRiskAdd.RiskObjectTypeID1){
                        this.riskObjectTypeChoose = state.tiskAdd.postRiskAdd.RiskObjectTypeID1;
                    }
                    if(state.tiskAdd.postRiskAdd.RiskObjectTypeID2){
                        this.riskObjectTypeChildChoose = state.tiskAdd.postRiskAdd.RiskObjectTypeID2;
                    }
                    return state.tiskAdd.postRiskAdd
                },
                riskType: state => {
                    let riskData=[];

                    if(state.tiskAdd.RiskType.length != 0){
                        for(let item in state.tiskAdd.RiskType[0].detail_BaseDataList){
                            riskData.push({
                                key:state.tiskAdd.RiskType[0].detail_BaseDataList[item].BaseName.ID,
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
        mounted(){
            console.log(this.$store.state.tiskAdd.postRiskAdd.RiskObjectTypeID1);
            if(this.$store.state.tiskAdd.RiskObjectTypeID1){
                this.riskObjectTypeChoose = this.$store.state.tiskAdd.RiskObjectTypeID1;
            }
        },
        watch:{
            RiskType(val,vals){
                console.log(val);
            },
            riskObjectTypeChoose(val,vals){

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
                        this.riskObjectTypeChild = riskObjectTypeChild;
                    }
                }

            },
            riskObjectTypeChildChoose(val, vals){

                console.log(val)
                console.log(this.riskObjectTypeChild)

                for(let items in this.riskObjectTypeChild){
                    
                    if(this.riskObjectTypeChild[items].key == val){
                        this.upRiskAdd({RiskObjectTypeID2:this.riskObjectTypeChild[items].key})
                        this.upRiskAdd({riskObjectTypeChildChoose:this.riskObjectTypeChild[items].value})
                    }
                }

            },
        },
        methods:{
            ...mapMutations([
                'upRiskAdd'
            ]),
            next(){
                this.$router.push({name:'basicInfoB'})
            },
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
    }
</style>