<template>
    <div class="my">
        <Heads :back="false" :title="'个人'" :isRightTitle="true" :rightTitle="`权限：${(memberInfo.UserIsAudit==1?'审核人员':'普通用户')}`"></Heads>
        <HeadImg :item="memberInfo"></HeadImg>
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-l vux-1px-r">
                    <span>{{memberInfo.RiskCount}}</span>
                    <br/>
                    风险点
                </div>
                <div class="vux-1px-r">
                    <span style="display:none">{{memberInfo.RiskWarnCount}}</span>
                    <br/>
                </div>
                <!--<div class="vux-1px-r">
                    <span style="display:none">{{memberInfo.RiskAccidentCount}}</span>
                    <br/>
                    事故
                </div>-->
            </div>
        </card>
        <group>
            <cell is-link title="我的资料" @click.native="goPages('myInfo')"></cell>
        </group>
        <group>
            <cell is-link title="待审核风险源" @click.native="goPages('auditList')"></cell>
            <cell is-link title="待审核风险评估" @click.native="goEvaluationInfo()"></cell>
            <cell is-link title="待审核风险隐患" @click.native="goPages('riskDangerList',{riskId:0,add:1,editStatus:1,riskDangerAdd: 0})"></cell>
            <cell is-link title="待审核隐患整治" @click.native="goPages('riskDangerListModify',{riskId:0,add:1,editStatus:1})"></cell>
        </group>
        <group v-if="memberInfo.UserIsAudit">
            <cell is-link title="风险源审核" @click.native="goPages('myAuditList')"></cell>
            <cell is-link title="风险评估审核" @click.native="goPages('myAssessAuditList')"></cell>
            <cell is-link title="风险隐患审核" @click.native="goPages('riskDangerReviewList')"></cell>
            <cell is-link title="隐患整治审核" @click.native="goPages('myRiskDangerReviewListModify')"></cell>
        </group>
        
        <group>
            <cell is-link title="知识库" @click.native="goPages('knowledgeBaseList')"></cell>
        </group>

    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import HeadImg from './../../components/common/HeadImg.vue'
    import {Tabbar, TabbarItem, Group, Cell, Divider, Card } from 'vux'
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

    export default{
        components:{
            Heads,
            HeadImg,
            Divider,
            Card,
            Tabbar,
            TabbarItem,
            Group,
            Cell
        },
        data (){
            return {

            }
        },
        watch:{
            // memberInfo(){
            //     console.log(`我是会员信息${JSON.stringify(this.memberInfo)}`);
            // }
        },
        computed:{
            ...mapState({
                memberInfo: (state) => {
                    return state.memberInfo;
                }
            }),
        },
        mounted(){
            console.log(this.$route.params.userId);
            this.getMemberInfo(this.$route.params.userId);
        },
        methods:{

            ...mapActions([
                'getMemberInfo',
            ]),
            
            goPages(name,params){
                params = (JSON.stringify(params)=="{}"?{}:params);
                // alert(JSON.stringify(params))
                // return
                this.$router.push({name:name,params:params});
            },

            goEvaluationInfo(){
                // console.log(JSON.stringify(this.$route.params));
                // return;
                this.$router.push({name: "evaluationList",params:{ riskId:0,add:0,editStatus:0,addEvaluationList:0,status:0 }});
            }
        },
    }
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
    .my{
        background: #fbf9fe;
        box-sizing: border-box;
        padding-bottom: 30px;
    }
    .card-demo-flex {
        display: flex;
    }
    .card-demo-content01 {
        padding: 10px 0;
    }
    .card-padding {
        padding: 15px;
    }
    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .card-demo-flex span {
        color: #f74c31;
    }
</style>