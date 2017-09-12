<template>
    <div id="home">
        <div class="upper">
            <Heads :back="false" :title="'首页'" :isRiskAdd="true"></Heads>
        </div>

        <PullUpRefresh
            :pullDown="pullDown"
            :pullUp="pullUp"
            :item="riskList"
            :default="defaultData"
        >
            <swiper 
                loop 
                auto 
                :show-desc-mask="false" 
                :list="swiperList" 
                :index="swiperIndex" 
                @on-index-change="swiperChange"
                :interval="5000"
            ></swiper>
            <RiskList v-for="(item,index) in riskList" class="riskList" :item="item" :key="index" @click.native="goRiskInfo(item)"></RiskList>
        </PullUpRefresh>
        
    </div>
</template>
<script>
    import RiskList from './../../components/common/RiskList.vue'
    import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
    import { Swiper, LoadMore } from 'vux'
    import Heads from './../../components/Heads.vue'
    import {mapMutations, mapState, mapActions} from 'vuex'

    export default {
        components: {
            Heads,
            Swiper,
            LoadMore,
            PullUpRefresh,
            RiskList,
        },
        data(){
            return {
                swiperIndex: 1,
                riskLists:[],
                swiperList:[{
                    url: 'javascript:',
                    img: 'http://wx-cityrisk.subei88.com/Upload/banner.jpg',
                    title: '送你一朵fua'
                    }, 
                    // {
                    // url: 'javascript:',
                    // img: 'http://seopic.699pic.com/photo/50039/4298.jpg_wh1200.jpg',
                    // title: '送你一辆车'
                    // },
                     {
                    url: 'javascript:',
                    img: 'http://wx-cityrisk.subei88.com/Assets/img/login-bgNew.jpg',
                    title: '送你一次旅行'
                }]
            }
        },
        mounted(){
            this.deleteRiskList();
            
            this.saveDefaultData({pageIndex:1,pageSize:10,RiskStatus:3,listType: 'Map'});
            this.getRisk();
        },
        computed:{
            ...mapState({
				riskList(state){
					return state.riskList.riskList
				},
                defaultData(state){
                    return state.riskList.defaultData
                }
            })
        },
        methods:{
            ...mapMutations([
                'saveDefaultData',
                'deleteRiskList'
            ]),
            ...mapActions([
                'getRisk',
            ]),
            swiperChange(val){
                // console.log(val);
            },
            pullDown(){
                this.deleteRiskList();
                this.saveDefaultData({pageIndex:1,pageSize:10,RiskStatus:3});
                this.getRisk();
            },
            pullUp(){
                this.saveDefaultData({pageIndex:this.defaultData.pageIndex+=1,pageSize:10});
                this.getRisk();
            },
            goRiskInfo(item){
                this.$router.push({name:'riskInfo',params:{riskId:item.ID,add:1,editStatus:1}})
            }
        }
    }
</script>
<style lang="less" scoped>
    #home{
        height: 100%;
        display: flex;
        flex-direction: column;
        .riskList:first-child{
            padding-top: 0px;
        }
        .riskList{
            padding-top: 10px;
        }
    }
</style>