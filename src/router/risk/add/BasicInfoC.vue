<template>
    <div class="basicInfoC">
        <group>
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskDuty">
                    <div slot="right-menu">
                        <swipeout-button @click.native="oepnRiskDuty('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                        <swipeout-button @click.native="oepnRiskDuty('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <cell :title="item.RiskDutyName" :inline-desc="item.RiskDutyArea1+item.RiskDutyArea2+item.RiskDutyArea3+item.RiskDutyAddress">
                            <img slot="icon" width="40" style="display:block;margin-right:10px;" src="./../../../assets/icon/trust-icon.svg">
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
        </group>

        <popup v-model="basicInfoCPopup" :hide-on-blur="false">
            <div class="basicInfoCPopup">
                <x-input title="联系人" placeholder="联系人" v-model="defaultDuty.RiskDutyContactMan"></x-input>
                <x-input title="主体名称" placeholder="主体名称" v-model="defaultDuty.RiskDutyName"></x-input>
                <x-input title="联系电话" placeholder="主体联系人电话" v-model="defaultDuty.RiskDutyContactTel"></x-input>

                <x-address 
                    :title="'省市区'" 
                    v-model="addressValue" 
                    raw-value 
                    :list="addressData" 
                    value-text-align="left"
                ></x-address>

                <x-input placeholder="详细地址" v-model="defaultDuty.RiskDutyAddress"></x-input>
                <div class="next">
                    <x-button @click.native="addListRiskDuty">确认</x-button>
                    <x-button @click.native="oepnRiskDuty('close')">关闭</x-button>
                </div>
            </div>
            
            <confirm v-model="confirmShow"
                :title="'温馨提示'"
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
                    <p style="text-align:center;">{{ '您确认添加吗' }}</p>
            </confirm>
            
        </popup>

        <div class="next">
            <x-button @click.native="oepnRiskDuty('open')">添加</x-button>
            <x-button @click.native="next">下一步</x-button>
        </div>
        
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
                addressValue: ['广东省', '深圳市', '福田区'],
                addressData: ChinaAddressV3Data,
                basicInfoCPopup: false,
                confirmShow: false,
                defaultDutyIndex:'',
                defaultDuty:{
                    "RiskDutyName":'',        // 责任主体名称
                    "RiskDutyContactMan":'',  // 责任主体联系人
                    "RiskDutyContactTel":'',  // 责任主体电话
                    "RiskDutyArea1":'',
                    "RiskDutyArea2":'',
                    "RiskDutyArea3":'',
                    "RiskDutyAddress":''
                },
            }
        },
        watch:{
            addressValue(val){
                let addres = value2name(val, ChinaAddressV3Data).split(' ');
                console.log(addres);
                this.defaultDuty.RiskDutyArea1 = addres[0];
                this.defaultDuty.RiskDutyArea2 = addres[1];
                this.defaultDuty.RiskDutyArea3 = addres[2];
            }
        },
        computed:{
            ...mapState({
                ListRiskDuty: state => state.tiskAdd.postRiskAdd.ListRiskDuty
            })
        },
        methods:{
            ...mapMutations([
                'upToastMag',
                'pushListRiskDuty',
                'editListRiskDuty',
                'deleteListRiskDuty'
            ]),
            ...mapActions({
                actionToast: 'showToast'
            }),
            next(){
                this.$router.push({name:'basicInfoD'})
            },
            clearData(){
                this.defaultDuty.RiskDutyName = '';
                this.defaultDuty.RiskDutyContactMan = '';
                this.defaultDuty.RiskDutyContactTel = '';
                // this.defaultDuty.RiskDutyArea1 = '';
                // this.defaultDuty.RiskDutyArea2 = '';
                // this.defaultDuty.RiskDutyArea3 = '';
                this.defaultDuty.RiskDutyAddress = '';
                // this.addressValue = [];
            },
            oepnRiskDuty(type,index){

                if(type=='open'){
                    this.defaultDutyIndex = '';
                    this.basicInfoCPopup = true;
                }else if(type=='edit'){

                    this.defaultDutyIndex = index;
                    this.defaultDuty = {
                        "RiskDutyName":this.ListRiskDuty[index].RiskDutyName,
                        "RiskDutyContactMan":this.ListRiskDuty[index].RiskDutyContactMan,
                        "RiskDutyContactTel":this.ListRiskDuty[index].RiskDutyContactTel,
                        "RiskDutyArea1":this.ListRiskDuty[index].RiskDutyArea1,
                        "RiskDutyArea2":this.ListRiskDuty[index].RiskDutyArea2,
                        "RiskDutyArea3":this.ListRiskDuty[index].RiskDutyArea3,
                        "RiskDutyAddress":this.ListRiskDuty[index].RiskDutyAddress,
                    };
                    this.addressValue = [this.defaultDuty.RiskDutyArea1, this.defaultDuty.RiskDutyArea2, this.defaultDuty.RiskDutyArea3];
                    this.basicInfoCPopup = true;
                }else if(type=='close'){
                    this.clearData();
                    this.basicInfoCPopup = false;
                }else if(type=='delete'){
                    this.deleteListRiskDuty({index: index});
                }
                
            },
            addListRiskDuty(){

                if(!this.defaultDuty.RiskDutyContactMan){
                    this.actionToast({toastState:true,toastValue:'请输入联系人'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyName){
                    this.actionToast({toastState:true,toastValue:'请输入主体名称'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyContactTel){
                    this.actionToast({toastState:true,toastValue:'请输入主体联系人电话'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyArea1){
                    this.actionToast({toastState:true,toastValue:'请输选择省市区'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyArea2){
                    this.actionToast({toastState:true,toastValue:'请输选择省市区'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyAddress){
                    this.actionToast({toastState:true,toastValue:'请输输入详细地址'})
                    return;
                }
                console.log(this.defaultDutyIndex!=='')

                if(this.defaultDutyIndex!==''){

                    console.log('进了1');
                    const defaultDuty = {
                        "RiskDutyName":this.defaultDuty.RiskDutyName,
                        "RiskDutyContactMan":this.defaultDuty.RiskDutyContactMan,
                        "RiskDutyContactTel":this.defaultDuty.RiskDutyContactTel,
                        "RiskDutyArea1":this.defaultDuty.RiskDutyArea1,
                        "RiskDutyArea2":this.defaultDuty.RiskDutyArea2,
                        "RiskDutyArea3":this.defaultDuty.RiskDutyArea3,
                        "RiskDutyAddress":this.defaultDuty.RiskDutyAddress,
                    }
                    this.editListRiskDuty({
                        index:this.defaultDutyIndex,
                        list:defaultDuty
                    });
                    this.basicInfoCPopup = false;

                }else{
                    console.log('进了2')
                    this.confirmShow = true;
                }

            },
            onCancel(){
                this.basicInfoCPopup = false;
                this.clearData();
            },
            onConfirm(){
                const defaultDuty = {
                    "RiskDutyName":this.defaultDuty.RiskDutyName,
                    "RiskDutyContactMan":this.defaultDuty.RiskDutyContactMan,
                    "RiskDutyContactTel":this.defaultDuty.RiskDutyContactTel,
                    "RiskDutyArea1":this.defaultDuty.RiskDutyArea1,
                    "RiskDutyArea2":this.defaultDuty.RiskDutyArea2,
                    "RiskDutyArea3":this.defaultDuty.RiskDutyArea3,
                    "RiskDutyAddress":this.defaultDuty.RiskDutyAddress,
                }
                this.pushListRiskDuty(defaultDuty);
                this.clearData();
                this.basicInfoCPopup = false;
            },
            onShow(){},
            onHide(){},
        },
    }
</script>
<style lang="less">
    .basicInfoC{
        height:100%;
        background:#fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .next{
            box-sizing: border-box;
            padding:2rem 15px 15px;
        }
        .weui-label{
            width: 5em!important;
        }
        .basicInfoCPopup{
            width: 100%;
            height:100%;
            background:#fff;
        }
        .vux-cell-primary{
            overflow: hidden;
        }
        .vux-popup-picker-value{
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            display: block;
        }
    }
    .weui-cells{
        margin-top: 10px!important;
    }
    .vux-cell-bd.vux-cell-primary{
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        
    }
</style>