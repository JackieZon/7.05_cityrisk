<template>
    <div class="basicInfoD">
        <group v-if="JSON.stringify(ListRiskRegulatory)!=='[]'">
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskRegulatory" :key="index">
                    <div slot="right-menu">
                        <swipeout-button @click.native="oepnRegulatory('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                        <swipeout-button @click.native="oepnRegulatory('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <cell :title="item.RiskRegulatoryName" :inline-desc="item.RiskRegulatoryArea1+item.RiskRegulatoryArea2+item.RiskRegulatoryArea3+item.RiskRegulatoryAddress">
                            <img slot="icon" width="35" style="display:block;margin-right:10px;" src="./../../../assets/icon/my-team.svg">
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
        </group>
        <load-more v-if="JSON.stringify(ListRiskRegulatory)=='[]'" :show-loading="false" :tip="'暂无监管机构'" background-color="#fbf9fe"></load-more>
        <popup v-model="basicInfoDPopup" :hide-on-blur="false">
            <div class="basicInfoDPopup">
                <x-input title="机构名称" placeholder="机构名称" v-model="defaultRegulatory.RiskRegulatoryName"></x-input>
                <x-input title="联系人" placeholder="联系人" v-model="defaultRegulatory.RiskRegulatoryContactMan"></x-input>
                <x-input title="联系电话" placeholder="联系电话" v-model="defaultRegulatory.RiskRegulatoryContactTel"></x-input>
                <x-address 
                    :title="'省市区'" 
                    v-model="addressValue" 
                    raw-value 
                    :list="addressData" 
                    value-text-align="left"
                ></x-address>

                <x-input placeholder="详细地址" v-model="defaultRegulatory.RiskRegulatoryAddress"></x-input>
                <div class="next">
                    <x-button @click.native="addListRegulatory">确认</x-button>
                    <x-button @click.native="oepnRegulatory('close')">关闭</x-button>
                </div>
            </div>
        </popup>
        
        <div class="next">
            <x-button @click.native="oepnRegulatory('open')">添加</x-button>
            <x-button @click.native="next">下一步</x-button>
        </div>

    </div>
</template>
<script>
    import { LoadMore, XInput, Group, Cell,XAddress, ChinaAddressV3Data, XButton,Popup, Value2nameFilter as value2name, Confirm, XSwitch, TransferDomDirective as TransferDom,GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
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
            LoadMore
        },
        data(){
            return {
                addressValue: ['广东省', '深圳市', '南山区'],
                addressData: ChinaAddressV3Data,
                basicInfoDPopup: false,
                confirmShow: false,
                defaultRegulatoryType:'',
                defaultRegulatoryIndex:'',
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
        watch:{
            addressValue(val){
                let addres = value2name(val, ChinaAddressV3Data).split(' ');
                
                console.log(addres);

                this.defaultRegulatory.RiskRegulatoryArea1 = addres[0];
                this.defaultRegulatory.RiskRegulatoryArea2 = addres[1];
                this.defaultRegulatory.RiskRegulatoryArea3 = addres[2];
            }
        },
        methods:{
            ...mapMutations({
                openConfirmAction:'openConfirm',
                upToastMag:'upToastMag',
                pushListRegulatory:'pushListRegulatory',
                deleteListRegulatory:'deleteListRegulatory',
                editListRegulatory:'editListRegulatory',
            }),
            ...mapActions([
                'showToast'
            ]),
            next(){
                this.$router.push({name:'basicInfoB'})
            },
            clearData(){
                this.defaultRegulatory.RiskRegulatoryContactMan = '';
                this.defaultRegulatory.RiskRegulatoryName = '';
                this.defaultRegulatory.RiskRegulatoryContactTel = '';
                // this.defaultRegulatory.RiskRegulatoryArea1 = '';
                // this.defaultRegulatory.RiskRegulatoryArea2 = '';
                // this.defaultRegulatory.RiskRegulatoryArea3 = '';
                this.defaultRegulatory.RiskRegulatoryAddress = '';
                // this.addressValue = [];
            },
            oepnRegulatory(type,index){

                this.defaultRegulatoryType = type;
                this.defaultRegulatoryIndex = index;
                if(type=='open'){
                    this.basicInfoDPopup = true;
                }else if(type=='edit'){

                    this.defaultRegulatory = {
                        "RiskRegulatoryContactMan":this.ListRiskRegulatory[index].RiskRegulatoryContactMan,
                        "RiskRegulatoryName":this.ListRiskRegulatory[index].RiskRegulatoryName,
                        "RiskRegulatoryContactTel":this.ListRiskRegulatory[index].RiskRegulatoryContactTel,
                        "RiskRegulatoryArea1":this.ListRiskRegulatory[index].RiskRegulatoryArea1,
                        "RiskRegulatoryArea2":this.ListRiskRegulatory[index].RiskRegulatoryArea2,
                        "RiskRegulatoryArea3":this.ListRiskRegulatory[index].RiskRegulatoryArea3,
                        "RiskRegulatoryAddress":this.ListRiskRegulatory[index].RiskRegulatoryAddress,
                    };
                    this.addressValue = [this.ListRiskRegulatory[index].RiskRegulatoryArea1, this.ListRiskRegulatory[index].RiskRegulatoryArea2, this.ListRiskRegulatory[index].RiskRegulatoryArea3];
                    this.basicInfoDPopup = true;
                }else if(type=='close'){
                    this.clearData();
                    this.basicInfoDPopup = false;
                }else if(type=='delete'){
                    this.deleteListRegulatory({index: index});
                }
                
            },
            addListRegulatory(){
                const regulatory = this.defaultRegulatory;
                if(!regulatory.RiskRegulatoryName){
                    this.showToast({toastState:true,toastValue:'请输入机构名称'})
                    return;
                }
                if(!regulatory.RiskRegulatoryContactMan){
                    this.showToast({toastState:true,toastValue:'请输入联系人'})
                    return;
                }
                if(!regulatory.RiskRegulatoryContactTel){
                    this.showToast({toastState:true,toastValue:'请输入联系电话'})
                    return;
                }
                if(!regulatory.RiskRegulatoryArea1){
                    this.showToast({toastState:true,toastValue:'请选择省市区'})
                    return;
                }
                if(!regulatory.RiskRegulatoryArea2){
                    this.showToast({toastState:true,toastValue:'请选择省市区'})
                    return;
                }
                if(!regulatory.RiskRegulatoryAddress){
                    this.showToast({toastState:true,toastValue:'请输入详细地址'})
                    return;
                }

                const regulatoryUpData = {
                    "RiskRegulatoryContactMan":regulatory.RiskRegulatoryContactMan,
                    "RiskRegulatoryName":regulatory.RiskRegulatoryName,
                    "RiskRegulatoryContactTel":regulatory.RiskRegulatoryContactTel,
                    "RiskRegulatoryArea1":regulatory.RiskRegulatoryArea1,
                    "RiskRegulatoryArea2":regulatory.RiskRegulatoryArea2,
                    "RiskRegulatoryArea3":regulatory.RiskRegulatoryArea3,
                    "RiskRegulatoryAddress":regulatory.RiskRegulatoryAddress,
                }

                if(this.defaultRegulatoryType=='edit'){
                    this.editListRegulatory({
                        index:this.defaultRegulatoryIndex,
                        list:regulatoryUpData
                    });
                    this.basicInfoDPopup = false;
                }else{
                    this.openConfirmAction({state:true,msg:'您确定要新增吗？',control: ()=>{
                        console.log('你点击了确定');
                        this.pushListRegulatory(regulatoryUpData);
                        this.clearData();
                        this.basicInfoDPopup = false;
                    }})
                }

            },
        },
    }
</script>
<style lang="less">
    .basicInfoD{
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
        .basicInfoDPopup{
            width:100%;
            height:100%;
            background:#fff;
            overflow: hidden;
        }
    }
</style>