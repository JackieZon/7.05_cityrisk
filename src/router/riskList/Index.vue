<template>
    <div class="riskList">
        <Heads :back="false" :title="'风险列表'" :isMap="true"></Heads>
        我是风险列表
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    export default{
        components:{
            Heads,
        },
        data(){
            return {

            }
        }
    }

</script>
<style lang="less">
    .riskList{
        height: 100%;
        width: 100%;
        background: #fff;
    }
</style>