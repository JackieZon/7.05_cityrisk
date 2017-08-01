<template>
    <div class="basicInfoC">
        <group v-if="JSON.stringify(ListRiskDuty)!=='[]'">
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(item,index) in ListRiskDuty" :key="index">
                    <div slot="right-menu">
                        <swipeout-button @click.native="oepnRiskDuty('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                        <swipeout-button @click.native="oepnRiskDuty('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <cell :title="item.RiskDutyName" :inline-desc="`${item.RiskDutyAreaName1} ${item.RiskDutyAreaName2} ${item.RiskDutyAreaName3} ${item.RiskDutyAreaName4} ${item.RiskDutyAreaName5}`">
                            <Icon slot="icon" class="flexBox" :name="'trust-icon'" :width="'40'" :height="'40'" style="color:#33CC99"/>
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
        </group>
        <load-more v-if="JSON.stringify(ListRiskDuty)=='[]'" :show-loading="false" :tip="'暂无责任主体'" background-color="#fbf9fe"></load-more>
        <popup v-model="basicInfoCPopup" :hide-on-blur="false">
            <div class="basicInfoCPopup">
                <x-input title="联系人" placeholder="联系人" v-model="defaultDuty.RiskDutyContactMan"></x-input>
                <x-input title="主体名称" placeholder="主体名称" v-model="defaultDuty.RiskDutyName"></x-input>
                <x-input title="联系电话" placeholder="主体联系人电话" v-model="defaultDuty.RiskDutyContactTel"></x-input>

                <x-address 
                    :title="'省市区'" 
                    v-model="addressValue" 
                    raw-value 
                    :list="areaData" 
                    value-text-align="left"
                ></x-address>

                <x-input placeholder="详细地址" v-model="defaultDuty.RiskDutyAddress"></x-input>
                <div class="next">
                    <x-button @click.native="addListRiskDuty">确认</x-button>
                    <x-button @click.native="oepnRiskDuty('close')">关闭</x-button>
                </div>
            </div>
        </popup>

        <div class="next">
            <x-button @click.native="oepnRiskDuty('open')">添加</x-button>
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
                addressValue: [],
                basicInfoCPopup: false,
                confirmShow: false,
                defaultDutyIndex:'',
                defaultDuty:{
                    "RiskDutyName":'',        // 责任主体名称
                    "RiskDutyContactMan":'',  // 责任主体联系人
                    "RiskDutyContactTel":'',  // 责任主体电话
                    'RiskDutyAreaName1':'',
                    'RiskDutyAreaName2':'',
                    'RiskDutyAreaName3':'',
                    'RiskDutyAreaName4':'',
                    'RiskDutyAreaName5':'',
                    "RiskDutyArea1":'',
                    "RiskDutyArea2":'',
                    "RiskDutyArea3":'',
                    'RiskDutyArea4':'',
                    'RiskDutyArea5':'',
                    "RiskDutyAddress":'',
                },
            }
        },
        watch:{
            addressValue(val){

                console.log(val);

                let addres = value2name(val, this.areaData).split(' ');
                let defaults = this.defaultDuty;

                defaults.RiskDutyAreaName1 = addres[0];
                defaults.RiskDutyAreaName2 = addres[1];
                defaults.RiskDutyAreaName3 = addres[2];
                defaults.RiskDutyAreaName4 = addres[3];
                defaults.RiskDutyAreaName5 = addres[4];
                
                defaults.RiskDutyArea1 = val[0];
                defaults.RiskDutyArea2 = val[1];
                defaults.RiskDutyArea3 = val[2];
                defaults.RiskDutyArea4 = val[3];
                defaults.RiskDutyArea5 = val[4];

            }
        },
        computed:{
            ...mapState({
                ListRiskDuty: state => state.tiskAdd.postRiskAdd.ListRiskDuty,
                areaData: state => state.areaData
            })
        },
        methods:{
            ...mapMutations([
                'upToastMag',
                'pushListRiskDuty',
                'editListRiskDuty',
                'deleteListRiskDuty',
                'openConfirm'
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

                    console.log(this.ListRiskDuty[index]);

                    this.defaultDutyIndex = index;
                    this.defaultDuty = {
                        "RiskDutyName":this.ListRiskDuty[index].RiskDutyName,
                        "RiskDutyContactMan":this.ListRiskDuty[index].RiskDutyContactMan,
                        "RiskDutyContactTel":this.ListRiskDuty[index].RiskDutyContactTel,
                        "RiskDutyArea1":this.ListRiskDuty[index].RiskDutyArea1,
                        "RiskDutyArea2":this.ListRiskDuty[index].RiskDutyArea2,
                        "RiskDutyArea3":this.ListRiskDuty[index].RiskDutyArea3,
                        "RiskDutyArea4":this.ListRiskDuty[index].RiskDutyArea4,
                        "RiskDutyArea5":this.ListRiskDuty[index].RiskDutyArea5,
                        "RiskDutyAddress":this.ListRiskDuty[index].RiskDutyAddress,
                    };

                    let allAreas = [this.defaultDuty.RiskDutyArea1, this.defaultDuty.RiskDutyArea2, this.defaultDuty.RiskDutyArea3,this.defaultDuty.RiskDutyArea4,this.defaultDuty.RiskDutyArea5];
                    let addressValues;
                    if(typeof(this.defaultDuty.RiskDutyArea1)=='number'){
                        addressValues = allAreas.map((val)=>{
                            return String(val);
                        })
                    }else{
                        addressValues = allAreas;
                    }

                    this.addressValue = addressValues;
                    this.basicInfoCPopup = true;

                }else if(type=='close'){
                    this.clearData();
                    this.basicInfoCPopup = false;
                }else if(type=='delete'){
                    this.openConfirm({state:true,msg:'确定要删除吗？',control: ()=>{
                        this.deleteListRiskDuty({index: index});
                    }});
                    
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
                    this.actionToast({toastState:true,toastValue:'请选择省市区'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyArea2){
                    this.actionToast({toastState:true,toastValue:'请选择省市区'})
                    return;
                }
                if(!this.defaultDuty.RiskDutyAddress){
                    this.actionToast({toastState:true,toastValue:'请输入详细地址'})
                    return;
                }

                const defaultDutyUpData = {
                    "RiskDutyName":this.defaultDuty.RiskDutyName,
                    "RiskDutyContactMan":this.defaultDuty.RiskDutyContactMan,
                    "RiskDutyContactTel":this.defaultDuty.RiskDutyContactTel,
                    "RiskDutyArea1":this.defaultDuty.RiskDutyArea1,
                    "RiskDutyArea2":this.defaultDuty.RiskDutyArea2,
                    "RiskDutyArea3":this.defaultDuty.RiskDutyArea3,
                    "RiskDutyArea4":this.defaultDuty.RiskDutyArea4,
                    "RiskDutyArea5":this.defaultDuty.RiskDutyArea5,

                    "RiskDutyAreaName1":this.defaultDuty.RiskDutyAreaName1,
                    "RiskDutyAreaName2":this.defaultDuty.RiskDutyAreaName2,
                    "RiskDutyAreaName3":this.defaultDuty.RiskDutyAreaName3,
                    "RiskDutyAreaName4":this.defaultDuty.RiskDutyAreaName4,
                    "RiskDutyAreaName5":this.defaultDuty.RiskDutyAreaName5,

                    "RiskDutyAddress":this.defaultDuty.RiskDutyAddress,
                }

                if(this.defaultDutyIndex!==''){
                    this.editListRiskDuty({
                        index:this.defaultDutyIndex,
                        list:defaultDutyUpData
                    });
                    this.basicInfoCPopup = false;
                }else{

                    this.pushListRiskDuty(defaultDutyUpData);
                    this.clearData();
                    this.basicInfoCPopup = false;

                }

            },
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