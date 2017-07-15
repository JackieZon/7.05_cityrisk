<template>
    <div class="basicInfoB">
        <x-input title="评估人" :disabled="true" value="Jackie" placeholder="评估人"></x-input>
        <x-input title="联系电话" :disabled="true" value="火灾" placeholder="联系电话"></x-input>
        <x-input title="评估时间" :disabled="true" value="2017/7/12" placeholder="评估时间"></x-input>
        <x-textarea title="风险描述" placeholder="风险描述" :show-counter="false" :rows="3"></x-textarea>
        <x-input title="风险等级" :disabled="true" value="高" placeholder="风险等级"></x-input>
        <x-input title="风险分值" :disabled="true" value="200" placeholder="风险分值"></x-input>
        <div class="enter">
            <x-button @click.native="evaluation = true">输入评估信息</x-button>
        </div>
        <div class="next">
            <x-button @click.native="next">下一步</x-button>
        </div>
        <popup v-model="evaluation" :hide-on-blur="false">
            <div class="evaluation">
                <selector title="风险类型" :options="riskData" v-model="riskType"></selector>
                <selector title="频繁程度" :options="frequently" v-model="frequentlyVal"></selector>
                <selector title="事故后果" :options="frequently" v-model="frequentlyVal"></selector>
                <selector title="可能性" :options="possibility" v-model="possibilityVal"></selector>
                <x-input title="风险等级" :disabled="true" value="高" placeholder="等级"></x-input>
                <x-input title="风险分值" :disabled="true" value="200" placeholder="分值"></x-input>
                <div class="next">
                    <x-button @click.native="evaluation = false">新增</x-button>
                    <x-button @click.native="evaluation = false">提交</x-button>
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton, Value2nameFilter as value2name, XTextarea,Popup, Selector} from 'vux'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            XTextarea,
            Popup,
            Selector
        },
        methods:{
            next(){
                this.$router.push({name:'basicInfoC'});
            },
            enter(){
                this.$router.push({name:'BasicInfoB_Evaluation'});
            }
        },
        data(){
            return{
                evaluation: false,
                riskData:['火灾','爆炸','中毒','触电'],
                riskType:'火灾',
                frequently:['可能性小','可能性大'],
                frequentlyVal:'可能性小',
                result:['可能性小','可能性大'],
                resultVal:'可能性小',
                possibility:['可能性小','可能性大'],
                possibilityVal:'可能性小'
            }
        }
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
        .evaluation{
            width:100%;
            background:#fff;
            padding-bottom: 20px;
            box-sizing: border-box;
        }
    }
</style>