<template>
    <div class="basicInfoA">
        <x-input title="险源名称" placeholder="险源名称"></x-input>
        <selector title="风险类别" :options="riskData" v-model="riskType"></selector>
        <x-input title="类别名称" placeholder="类别名称"></x-input>
        <selector title="对象类型" :options="objData" v-model="objType"></selector>
        <x-address :title="'省市区'" v-model="addressValue" raw-value :list="addressData" value-text-align="right"></x-address>
        <x-input placeholder="详细地址"></x-input>
        <x-input :disabled="true" :value="latAndLon" title="经度/纬度" placeholder="经度/纬度">
            <x-button slot="right" mini plain>地图</x-button>
        </x-input>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
    </div>
</template>
<script>
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
                latAndLon:'0.001/0.002',
                riskData:['火灾','爆炸','中毒','触电'],
                riskType:'火灾',
                objData:['工业危险源', '自然危险源'],
                objType:'工业危险源'
            }
        },
        methods:{
            next(){
                this.$router.push({name:'basicInfoB'})
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
    }
</style>