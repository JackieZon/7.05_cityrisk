<template>
    <div class="basicInfoB">
        <x-input title="评估人" :disabled="true" value="Jackie" placeholder="名称"></x-input>
        <x-input title="联系电话" :disabled="true" value="火灾" placeholder="联系电话"></x-input>
        <x-input title="评估时间" :disabled="true" value="2017/7/12" placeholder="评估时间"></x-input>
        <x-textarea title="风险描述" placeholder="风险描述" :show-counter="false" :rows="3"></x-textarea>
        <x-input title="风险等级" :disabled="true" value="高" placeholder="名称"></x-input>
        <x-input title="风险分值" :disabled="true" value="200" placeholder="联系电话"></x-input>
        <div class="enter">
            <x-button @click.native="enter">输入评估信息</x-button>
        </div>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton, Value2nameFilter as value2name, XTextarea } from 'vux'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            XTextarea
        },
        methods:{
            next(){
                this.$router.push({name:'basicInfoC'})
            },
            enter(){
                this.$router.push({name:'BasicInfoB_Evaluation'})
            }
        },
    }
</script>
<style lang="less">
    .basicInfoB{
        height:100%;
        background:#fff;
        .next{
            box-sizing: border-box;
            padding:2rem 15px 0;
        }
        .enter{
            border-top: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding: 15px 15px 0;
        }
        .weui-label{
            width: 5em!important;
        }
    }
</style>