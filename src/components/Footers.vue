<template>
  <div class="footers">
    <tabbar>
        <tabbar-item :selected="tabData[0] == tabStatus" @click.native="goPages('home')">
            <Icon slot="icon" :name="'home-icon'" />
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="tabData[1] == tabStatus" @click.native="goPages('homeMap')">
            <Icon slot="icon" :name="'list-icon'" />
            <span slot="label">风险地图</span>
        </tabbar-item>
        <tabbar-item :selected="tabData[2] == tabStatus" @click.native="goPages('my')">
            <Icon slot="icon" :name="'my-icon'" />
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
                tabPath:['Home','RiskMap','My'],
                tabData:[0,1,2],
                tabStatus:0
            }
        },
        watch:{
        '$route' (to, from) {
            const path = this.$route.path.split('/')[3]
            if(this.tabPath.indexOf(path)!=-1){
                this.tabStatus = this.tabPath.indexOf(path);
            }
        }
        },
        mounted(){
            const path = this.$route.path.split('/')[3]
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