<template>
    <div class="home">
        <Heads :back="false" :title="'首页'" :isRiskAdd="true"></Heads>
        我是首页
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    export default {
        components: {
            Heads,
        }
    }
</script>
<style lang="less" scoped>
    .home{

    }
</style>