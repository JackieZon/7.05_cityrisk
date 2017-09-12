<template>
    <div id="riskDangerList">
        <div class="upper">
            <Heads :title="'整治列表'"></Heads>
            <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="changeTab(0)">暂存</tab-item>
                <tab-item @on-item-click="changeTab(1)">待审核</tab-item>
                <tab-item @on-item-click="changeTab(3)">已审核</tab-item>
                <tab-item @on-item-click="changeTab(2)">已退回</tab-item>
            </tab>
        </div>
        <PullUpRefresh
            :pullDown="pullDown"
            :pullUp="pullUp"
            :item="dangerList"
            :default="defaultDangerListData"
        >
            <div class="hidDanger" v-for="(item,index) in dangerList" :key="index">
                <HidDanger :item="item" @click.native="goInfo(item)" :isModify="true"></HidDanger>
            </div>
        </PullUpRefresh>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
    import HidDanger from './../../components/common/HidDanger.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XInput, XTextarea, Group, TransferDom, Popup,Toast } from 'vux'
    import {mapMutations, mapState, mapActions} from 'vuex'
 
    export default{
        components:{
            Heads,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            XInput,
            XTextarea,
            Group,
            TransferDom,
            Popup,
            Toast,
            PullUpRefresh,
            HidDanger,
        },
        watch:{
        },
        mounted(){

            this.riskId = this.$route.params.riskId; 
            
            //用于过滤整改列表 从个人中心进入 this.userId = 用户Id,从风险详情进入 this.userId = 0
            this.userId = (this.riskId == 0 ? this.$route.params.userId : 0 )
            
            this.clearDangerList();
            // console.warn(this.$route.params);
            this.saveDefaultDangerListData({
                RiskID: this.riskId,
                RiskChangedStatus: this.tabStatus,
                RiskChangedMan: this.userId,
                pageIndex: 1,   //必填参数
                pageSize: 10,   //必填参数
            });

            this.getRiskHiddenChanged();
        },
        data(){
            return{
                transferState:false,
                tabStatus: 0,
                userId: 0,
                riskId: 0
            }
        },
        computed:{
            ...mapState({
                defaultDangerListData(state){
                    return state.riskDangerList.defaultDangerListData;
                },
                dangerList(state){
                    return state.riskDangerList.dangerList;
                }
            })
        },
        methods:{
            ...mapActions([
				'getRiskHiddenChanged',
                'getRiskHiddenInfo'
            ]),
            ...mapMutations([
                'saveDefaultDangerListData',
                'saveDangerList',
                'clearDangerList'
            ]),
            pullDown(){
                this.clearDangerList();
                this.saveDefaultDangerListData({
                    RiskChangedStatus: this.tabStatus,
                    pageIndex: 1,   //必填参数
                    pageSize: 10,   //必填参数
                });
                this.getRiskHiddenChanged();
            },
            pullUp(){

                this.saveDefaultDangerListData({
                    RiskChangedStatus: this.tabStatus,
                    pageIndex: this.defaultDangerListData.pageIndex += 1,
                    pageSize: 10,
                });
                this.getRiskHiddenChanged();

            },
            changeTab(val){
                this.tabStatus = val;
                this.clearDangerList();
                this.saveDefaultDangerListData({
                    // RiskHiddenStatus: this.tabStatus,
                    RiskChangedStatus: this.tabStatus,
                    pageIndex: 1,   //必填参数/必填参数
                    pageSize: 10,   //必填参数
                });
                this.getRiskHiddenChanged();
            },
            goInfo(item){
                console.log(this.$route.params);
                this.$router.push({ name: 'riskDangerModify',params:{dangerModifyId: item.ID} });
            }
        }
    }
</script>
<style lang="less" scoped>
    #riskDangerList{
        display: flex;
        flex-direction: column;
        height: 100%;
        .hidDanger{
            box-sizing: border-box;
            padding-top: 10px;
        }
    }
</style>