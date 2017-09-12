<template>
    <div id="addrisk">
        <div class="risk-upper" ref="riskUpper">
            <Heads :title="'风险源'"></Heads>
            <tab :line-width=2 active-color='#33CC99' v-model="index">
                <tab-item class="vux-center" :selected="status === item" v-for="(item, index) in lists" @click="status = item" :key="index">{{item}}</tab-item>
            </tab>
        </div>
        <div class="risk-lower">
            <transition v-bind:enter-active-class="'fadeIn animated'">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import Heads from './../../../components/Heads.vue'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    import {mapActions,} from 'vuex'
    const list = () => ['基本信息', '责任主体', '监管机构', '评估信息']

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
        },
        watch:{
            index(val,old){
                this.$router.replace({name:this.routerName[val]})
            },
            '$route' (to, from) {
                if(this.routerName.indexOf(to.name)!=-1){
                    this.index = this.routerName.indexOf(to.name);
                }
            }
        },
        created(){
            this.$router.replace({name:'basicInfoA'});
        },
        mounted(){
            
            // 获取对象类型
            this.getRiskObjectType();
            // 获取审核人员
            this.getRiskSelectAduitUser();
            // 获取用户地址选项
            this.getArea();
            // 获取所属机构的地址
            this.getAreaByAgencyId();
            
        },
        data(){
            return{
                lists: list(),
                index: 0,
                status:'基本信息',
                routerName: ['basicInfoA','basicInfoC','basicInfoD','basicInfoB']
            }
        },
        methods:{
            ...mapActions([
                'getRiskObjectType',
                'getRiskSelectAduitUser',
                'getArea',
                'getAreaByAgencyId',
            ]),
        }
    }
</script>
<style lang="less" scoped>
    #addrisk{
        display: flex;
        flex-direction: column;
        height: 100%;
        .vux-slider{
            height: 100%;
            .vux-swiper{
                height: 100%!important;
            }
        }
        .vux-center{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .risk-lower{
            flex-grow:1;
            flex-shrink:1;
            flex-basis:0;
        }
    }
    .weui-label{
        width: 5em!important;
    }
</style>