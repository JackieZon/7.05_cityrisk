<template>
    <div class="my">
        <Heads :back="false" :title="'个人'" :isRightTitle="true" :rightTitle="'权限：管理员'"></Heads>
        <HeadImg></HeadImg>
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-l vux-1px-r">
                    <span>10</span>
                    <br/>
                    风险点
                </div>
                <div class="vux-1px-r">
                    <span>15</span>
                    <br/>
                    预警
                </div>
                <div class="vux-1px-r">
                    <span>5</span>
                    <br/>
                    事故
                </div>
            </div>
        </card>
        <group>
            <cell is-link title="我的资料" @click.native="goPages('myInfo')"></cell>
            <cell is-link title="风险列表" @click.native="goPages('auditList')"></cell>
            <!--<cell is-link title="隐患列表" @click.native="goPages('riskDangerList')"></cell>
            <cell is-link title="隐患整改列表" @click.native="goPages('auditList')"></cell>-->
        </group>
        <group>
            <cell is-link title="风险审核" @click.native="goPages('myAuditList')"></cell>
            <cell is-link title="评估审核" @click.native="goPages('myAssessAuditList')"></cell>
            <cell is-link title="隐患审核" @click.native="goPages('myAuditList')"></cell>
        </group>
    </div>
</template>
<script>
//  link=""
    import Heads from './../../components/Heads.vue'
    import HeadImg from './../../components/common/HeadImg.vue'
    import {Tabbar, TabbarItem, Group, Cell, Divider, Card } from 'vux'
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
        methods:{
            goPages(name){
                this.$router.push({name:name});
            }
        }
    }
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
    .my{
        height:100%;
        background: #fbf9fe;   
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