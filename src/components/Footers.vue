<template>
  <div class="footers">
    <tabbar>
        <tabbar-item :selected="tabData[0] == tabStatus" @click.native="goPages('basicInfoA')">
            <img slot="icon" src="./../assets/icon/home-icon.svg">
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="tabData[1] == tabStatus" @click.native="goPages('riskList')">
            <img slot="icon" link="/Index/RiskList" src="./../../src/assets/icon/list-icon.svg">
            <span slot="label">风险列表</span>
        </tabbar-item>
        <tabbar-item :selected="tabData[2] == tabStatus" @click.native="goPages('my')">
            <img slot="icon" src="./../assets/icon/my-icon.svg">
            <span slot="label">个人</span>
        </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
    //  link=""
    import { Tabbar, TabbarItem, Group, Cell } from 'vux'
    export default {
        components:{
            Tabbar,
            TabbarItem,
            Group,
            Cell,
            index:1
        },
        data(){
            return {
                tabPath:['RiskAdd','RiskList','My'],
                tabData:[0,1,2],
                tabStatus:0
            }
        },
        watch:{
        '$route' (to, from) {
            const path = this.$route.path.split('/')[2]
            if(this.tabPath.indexOf(path)!=-1){
                this.tabStatus = this.tabPath.indexOf(path);
            }
        }
        },
        mounted(){
            const path = this.$route.path.split('/')[2]
            if(this.tabPath.indexOf(path)!=-1){
                this.tabStatus = this.tabPath.indexOf(path);
            }
        },
        methods:{
            goPages(name){
                this.$router.push({name:name})
            }
        }
    }
</script>
<style lang="less" scoped>
    .footers{}
</style>