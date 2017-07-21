<template>
    <div class="basicInfoD">
        <group>
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskRegulatory">
                    <div slot="right-menu">
                        <swipeout-button @click.native="oepnRiskDuty('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                        <swipeout-button @click.native="oepnRiskDuty('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <cell :title="item.RiskRegulatoryName" :inline-desc="item.RiskRegulatoryArea1+item.RiskRegulatoryArea2+item.RiskRegulatoryArea3+item.RiskRegulatoryAddress">
                            <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../../assets/icon/trust-icon.svg">
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
        </group>

        <popup v-model="basicInfoDPopup" :hide-on-blur="false">
            <div class="basicInfoDPopup">
                <x-input title="联系人" placeholder="联系人" v-model="defaultRegulatory.RiskDutyContactMan"></x-input>
                <x-input title="主体名称" placeholder="主体名称" v-model="defaultRegulatory.RiskDutyName"></x-input>
                <x-input title="联系电话" placeholder="主体联系人电话" v-model="defaultRegulatory.RiskDutyContactTel"></x-input>

                <x-address 
                    :title="'省市区'" 
                    v-model="addressValue" 
                    raw-value 
                    :list="addressData" 
                    value-text-align="left"
                ></x-address>

                <x-input placeholder="详细地址" v-model="defaultRegulatory.RiskDutyAddress"></x-input>
                <div class="next">
                    <x-button @click.native="addListRiskDuty">确认</x-button>
                    <x-button @click.native="oepnRiskDuty('close')">关闭</x-button>
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
    import { XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton,Popup, Value2nameFilter as value2name, Confirm, XSwitch, TransferDomDirective as TransferDom,GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import {mapMutations, mapActions, mapState} from 'vuex'

    export default {
        components:{
            XInput,
            Group,
            Cell,
            XAddress,
            ChinaAddressV3Data,
            XButton,
            Popup,
            Confirm,
            XSwitch,
            GroupTitle,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
        },
        data(){
            return {
                addressValue: ['广东省', '深圳市', '南山区'],
                addressData: ChinaAddressV3Data,
                basicInfoDPopup: false,
                confirmShow: false,
                defaultDutyIndex:'',
                defaultRegulatory:{
                    "RiskRegulatoryContactMan":"",
                    "RiskRegulatoryName":"",
                    "RiskRegulatoryContactTel":"",
                    "RiskRegulatoryArea1":"",
                    "RiskRegulatoryArea2":"",
                    "RiskRegulatoryArea3":"",
                    "RiskRegulatoryAddress":"",
                }
            }
        },
        computed:{
            ...mapState({
                ListRiskRegulatory: state => state.tiskAdd.postRiskAdd.ListRiskRegulatory
            })
        },
        methods:{
            next(){
                // this.$router.push({name:'basicInfoD'})
            }
        },
    }
</script>
<style lang="less">
    .basicInfoD{
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