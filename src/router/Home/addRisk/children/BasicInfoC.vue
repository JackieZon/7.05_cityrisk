<template>
    <div class="basicInfoC">
        <x-input title="联系人" placeholder="联系人"></x-input>
        <x-input title="单位名称" placeholder="单位名称"></x-input>
        <x-input title="联系电话" placeholder="联系电话"></x-input>
        <x-address :title="'省市区'" v-model="addressValue" raw-value :list="addressData" value-text-align="right"></x-address>
        <x-input placeholder="详细地址"></x-input>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton } from 'vux'
    
    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton
        },
        data(){
            return {
                addressValue: ['广东省', '深圳市', '南山区'],
                addressData: ChinaAddressV3Data,
            }
        },
        methods:{
            next(){
                this.$router.push({name:'basicInfoD'})
            }
        },
    }
</script>
<style lang="less">
    .basicInfoC{
        height:100%;
        background:#fff;
        .next{
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding:3rem 15px 0;
        }
    }
</style>