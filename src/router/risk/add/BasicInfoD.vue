<template>
    <div class="basicInfoD">
        <group>
            <swipeout>
                <swipeout-item v-if="JSON.stringify(ListRiskRegulatory)!=='[]'" transition-mode="follow" v-for="(item,index) in ListRiskRegulatory"
                    :key="index">
                    <div slot="right-menu">
                        <swipeout-button @click.native="oepnRegulatory('edit',index)" type="primary">{{'编辑'}}</swipeout-button>
                        <swipeout-button @click.native="oepnRegulatory('delete',index)" type="warn">{{'删除'}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <cell :title="item.RiskRegulatoryName" :inline-desc="  `${item.RiskRegulatoryAreaName1} ${item.RiskRegulatoryAreaName2} ${item.RiskRegulatoryAreaName3} ${item.RiskRegulatoryAreaName4} ${item.RiskRegulatoryAreaName5}`">
                            <Icon slot="icon" class="flexBox" :name="'my-team'" :width="'35'" :height="'35'" style="color:#33CC99" />
                        </cell>
                    </div>
                </swipeout-item>
            </swipeout>
            <div class="add">
                <load-more v-if="JSON.stringify(ListRiskRegulatory)=='[]'" :show-loading="false" :tip="'暂无监管机构'" background-color="#fbf9fe"></load-more>
                <x-button class="add_button" @click.native="oepnRegulatory('open')">添加</x-button>
            </div>
        </group>

        <popup v-model="basicInfoDPopup" :hide-on-blur="false">
            <div class="basicInfoDPopup">
                <x-input title="机构名称" placeholder="机构名称" v-model="defaultRegulatory.RiskRegulatoryName"></x-input>
                <x-input title="联系人" placeholder="联系人" v-model="defaultRegulatory.RiskRegulatoryContactMan"></x-input>
                <x-input title="联系电话" placeholder="联系电话" v-model="defaultRegulatory.RiskRegulatoryContactTel"></x-input>
                <x-address :title="'省市区'" v-model="addressValue" raw-value :list="areaData" value-text-align="left"></x-address>

                <x-input placeholder="详细地址" v-model="defaultRegulatory.RiskRegulatoryAddress"></x-input>
                <div class="next">
                    <x-button @click.native="addListRegulatory">确认</x-button>
                    <x-button @click.native="oepnRegulatory('close')">关闭</x-button>
                </div>
            </div>
        </popup>

        <div class="next">
            <!-- <x-button @click.native="oepnRegulatory('open')">添加</x-button> -->
            <x-button @click.native="next">下一步</x-button>
        </div>

    </div>
</template>
<script>
    import { LoadMore, XInput, Group, Cell, XAddress, ChinaAddressV3Data, XButton, Popup, Value2nameFilter as value2name, Confirm, XSwitch, TransferDomDirective as TransferDom, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { mapMutations, mapActions, mapState } from 'vuex'

    export default {
        components: {
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
        data() {
            return {
                addressValue: [],
                addressData: ChinaAddressV3Data,
                basicInfoDPopup: false,
                confirmShow: false,
                defaultRegulatoryType: '',
                defaultRegulatoryIndex: '',
                defaultRegulatory: {
                    "RiskRegulatoryContactMan": "",
                    "RiskRegulatoryName": "",
                    "RiskRegulatoryContactTel": "",
                    "RiskRegulatoryArea1": "",
                    "RiskRegulatoryArea2": "",
                    "RiskRegulatoryArea3": "",
                    "RiskRegulatoryArea4": "",
                    "RiskRegulatoryArea5": "",
                    "RiskRegulatoryAddress": "",
                }
            }
        },
        computed: {
            ...mapState({
                ListRiskRegulatory: state => state.tiskAdd.postRiskAdd.ListRiskRegulatory,
                areaData: state => state.areaData
            }),
        },
        watch: {
            addressValue(val) {

                let addres = value2name(val, this.areaData).split(' ');

                console.log(addres);

                let defaults = this.defaultRegulatory;

                defaults.RiskRegulatoryAreaName1 = addres[0];
                defaults.RiskRegulatoryAreaName2 = addres[1];
                defaults.RiskRegulatoryAreaName3 = addres[2];
                defaults.RiskRegulatoryAreaName4 = addres[3];
                defaults.RiskRegulatoryAreaName5 = addres[4];

                defaults.RiskRegulatoryArea1 = val[0];
                defaults.RiskRegulatoryArea2 = val[1];
                defaults.RiskRegulatoryArea3 = val[2];
                defaults.RiskRegulatoryArea4 = val[3];
                defaults.RiskRegulatoryArea5 = val[4];

            }
        },
        methods: {
            ...mapMutations({
                openConfirmAction: 'openConfirm',
                upToastMag: 'upToastMag',
                pushListRegulatory: 'pushListRegulatory',
                deleteListRegulatory: 'deleteListRegulatory',
                editListRegulatory: 'editListRegulatory',
            }),
            ...mapActions([
                'showToast'
            ]),
            next() {
                this.$router.replace({ name: 'basicInfoB' })
            },
            clearData() {
                this.defaultRegulatory.RiskRegulatoryContactMan = '';
                this.defaultRegulatory.RiskRegulatoryName = '';
                this.defaultRegulatory.RiskRegulatoryContactTel = '';
                // this.defaultRegulatory.RiskRegulatoryArea1 = '';
                // this.defaultRegulatory.RiskRegulatoryArea2 = '';
                // this.defaultRegulatory.RiskRegulatoryArea3 = '';
                // this.defaultRegulatory.RiskRegulatoryArea4 = '';
                // this.defaultRegulatory.RiskRegulatoryArea5 = '';
                this.defaultRegulatory.RiskRegulatoryAddress = '';
                // this.addressValue = [];
            },
            oepnRegulatory(type, index) {

                this.defaultRegulatoryType = type;
                this.defaultRegulatoryIndex = index;
                if (type == 'open') {
                    this.basicInfoDPopup = true;
                } else if (type == 'edit') {
                    console.log(this.ListRiskRegulatory[index]);
                    this.defaultRegulatory = {
                        "RiskRegulatoryContactMan": this.ListRiskRegulatory[index].RiskRegulatoryContactMan,
                        "RiskRegulatoryName": this.ListRiskRegulatory[index].RiskRegulatoryName,
                        "RiskRegulatoryContactTel": this.ListRiskRegulatory[index].RiskRegulatoryContactTel,
                        "RiskRegulatoryArea1": this.ListRiskRegulatory[index].RiskRegulatoryArea1,
                        "RiskRegulatoryArea2": this.ListRiskRegulatory[index].RiskRegulatoryArea2,
                        "RiskRegulatoryArea3": this.ListRiskRegulatory[index].RiskRegulatoryArea3,
                        "RiskRegulatoryArea4": this.ListRiskRegulatory[index].RiskRegulatoryArea4,
                        "RiskRegulatoryArea5": this.ListRiskRegulatory[index].RiskRegulatoryArea5,
                        "RiskRegulatoryAddress": this.ListRiskRegulatory[index].RiskRegulatoryAddress,
                    };

                    let allAreas = [this.ListRiskRegulatory[index].RiskRegulatoryArea1, this.ListRiskRegulatory[index].RiskRegulatoryArea2, this.ListRiskRegulatory[index].RiskRegulatoryArea3, this.ListRiskRegulatory[index].RiskRegulatoryArea4, , this.ListRiskRegulatory[index].RiskRegulatoryArea5];
                    let addressValues;
                    if (typeof (this.ListRiskRegulatory[index].RiskRegulatoryArea1) == 'number') {
                        addressValues = allAreas.map((val) => {
                            return String(val);
                        })
                    } else {
                        addressValues = allAreas;
                    }

                    this.addressValue = addressValues;



                    this.basicInfoDPopup = true;
                } else if (type == 'close') {
                    this.clearData();
                    this.basicInfoDPopup = false;
                } else if (type == 'delete') {

                    this.openConfirmAction({
                        state: true, msg: '确定要删除吗？', control: () => {
                            this.deleteListRegulatory({ index: index });
                        }
                    });

                }

            },
            addListRegulatory() {
                const regulatory = this.defaultRegulatory;
                const phoneReg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)
                const fixedTelephone = new RegExp(/^((0\d{2,3}))(\d{7,8})(-(\d{3,}))?$/)
                if (!regulatory.RiskRegulatoryName) {
                    this.showToast({ toastState: true, toastValue: '请输入机构名称' })
                    return;
                }
                if (!regulatory.RiskRegulatoryContactMan) {
                    this.showToast({ toastState: true, toastValue: '请输入联系人' })
                    return;
                }
                if (!phoneReg.test(regulatory.RiskRegulatoryContactTel) && !fixedTelephone.test(regulatory.RiskRegulatoryContactTel)) {

                    if (!regulatory.RiskRegulatoryContactTel) {
                        this.showToast({ toastState: true, toastValue: '请输入联系电话' })
                        return;
                    } else {
                        this.showToast({ toastState: true, toastValue: '请输入正确的联系电话' })
                        return;
                    }

                }
                if (!regulatory.RiskRegulatoryArea1) {
                    this.showToast({ toastState: true, toastValue: '请选择省市区' })
                    return;
                }
                if (!regulatory.RiskRegulatoryArea2) {
                    this.showToast({ toastState: true, toastValue: '请选择省市区' })
                    return;
                }
                if (!regulatory.RiskRegulatoryAddress) {
                    this.showToast({ toastState: true, toastValue: '请输入详细地址' })
                    return;
                }

                const regulatoryUpData = {
                    "RiskRegulatoryContactMan": regulatory.RiskRegulatoryContactMan,
                    "RiskRegulatoryName": regulatory.RiskRegulatoryName,
                    "RiskRegulatoryContactTel": regulatory.RiskRegulatoryContactTel,
                    "RiskRegulatoryArea1": regulatory.RiskRegulatoryArea1,
                    "RiskRegulatoryArea2": regulatory.RiskRegulatoryArea2,
                    "RiskRegulatoryArea3": regulatory.RiskRegulatoryArea3,
                    "RiskRegulatoryArea4": regulatory.RiskRegulatoryArea4,
                    "RiskRegulatoryArea5": regulatory.RiskRegulatoryArea5,

                    "RiskRegulatoryAreaName1": regulatory.RiskRegulatoryAreaName1,
                    "RiskRegulatoryAreaName2": regulatory.RiskRegulatoryAreaName2,
                    "RiskRegulatoryAreaName3": regulatory.RiskRegulatoryAreaName3,
                    "RiskRegulatoryAreaName4": regulatory.RiskRegulatoryAreaName4,
                    "RiskRegulatoryAreaName5": regulatory.RiskRegulatoryAreaName5,

                    "RiskRegulatoryAddress": regulatory.RiskRegulatoryAddress,
                }

                if (this.defaultRegulatoryType == 'edit') {
                    this.editListRegulatory({
                        index: this.defaultRegulatoryIndex,
                        list: regulatoryUpData
                    });
                    this.basicInfoDPopup = false;
                } else {
                    this.pushListRegulatory(regulatoryUpData);
                    this.clearData();
                    this.basicInfoDPopup = false;
                }

            },
        },
    }

</script>
<style lang="less">
    .basicInfoD {
        width: 100%;
        height: 100%;
        background: #fbf9fe;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        .next {
            box-sizing: border-box;
            padding: 2rem 15px 15px;
        }
        .weui-label {
            width: 5em!important;
        }
        .basicInfoDPopup {
            width: 100%;
            height: 100%;
            background: #fff;
            overflow: hidden;
        }
        .vux-cell-primary {
            overflow: hidden;
        }
        .weui-cells:before {
            border-top: 0px !important;
        }
        .weui-cells:after {
            border-bottom: 0px !important;
        }
        .add {
            background: #fbf9fe;
            padding: 15px 15px;
            .weui-btn {
                background: #33CC99 !important;
                color: white;
            }
        }
        .add_button {
            color: white;
            background: #33CC99;
        }

        .vux-popup-picker-value {
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            display: block;
        }
    }

    .weui-cells {
        margin-top: 10px!important;
    }

    .vux-cell-bd.vux-cell-primary {
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
    }
</style>