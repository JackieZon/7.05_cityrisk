<template>
    <div class="evaluation">
        <selector title="风险类型" :options="riskData" v-model="riskType"></selector>
        <selector title="频繁程度" :options="frequently" v-model="frequentlyVal"></selector>
        <selector title="事故后果" :options="frequently" v-model="frequentlyVal"></selector>
        <selector title="可能性" :options="possibility" v-model="possibilityVal"></selector>
        <x-input title="风险等级" :disabled="true" value="高" placeholder="等级"></x-input>
        <x-input title="风险分值" :disabled="true" value="200" placeholder="分值"></x-input>
        <div class="enter">
            <x-button @click.native="enter">新增</x-button>
        </div>
        <div class="enter">
            <x-button @click.native="next">提交</x-button>
        </div>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton, Value2nameFilter as value2name, XTextarea, Selector} from 'vux'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            XTextarea,
            Selector
        },
        data(){
            return {
                riskData:['火灾','爆炸','中毒','触电'],
                riskType:'火灾',
                frequently:['可能性小','可能性大'],
                frequentlyVal:'可能性小',
                result:['可能性小','可能性大'],
                resultVal:'可能性小',
                possibility:['可能性小','可能性大'],
                possibilityVal:'可能性小'
            }
        },
        methods:{
            next(){
                this.$router.push({name:'basicInfoC'})
            },
            enter(){
                // this.$router.push({name:'evaluation'})
            }
        },
    }
</script>
<style lang="less">
    .evaluation{
        height:100%;
        background:#fff;
        .next{
            box-sizing: border-box;
            
        }
        .enter{
            box-sizing: border-box;
            padding:1rem 15px 0;
        }
    }
</style>