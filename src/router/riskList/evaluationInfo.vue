<template>
    <div class="evaluationInfo">
        <Heads :title="'评估详情'"></Heads>
        <div class="BasicInfoA">
            <x-input title="风险类型" :disabled="true" value="火灾" placeholder=""></x-input>
            <x-input title="后果严重性C" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="可能性分析L" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="频繁程度E" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="风险等级" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="风险分值" :disabled="true" value="" placeholder="暂无"></x-input>
            <!--<x-input title="评估描述" :disabled="true" value="" placeholder="暂无"></x-input>-->
            <x-input title="评估人" :disabled="true" value="" placeholder="暂无"></x-input>
        </div>

        <div class="BasicInfoA">
            <!--<div class="title"></div>-->
            <x-input title="风险类型" :disabled="true" value="爆炸" placeholder=""></x-input>
            <x-input title="后果严重性C" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="可能性分析L" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="频繁程度E" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="风险等级" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="风险分值" :disabled="true" value="" placeholder="暂无"></x-input>
            <x-input title="评估人" :disabled="true" value="" placeholder="暂无"></x-input>
        </div>

        <div class="BasicInfoA" style="margin-bottom: 20px;">
            <group>
                <x-input title="描述"></x-input>
                <x-textarea readonly :height="200"></x-textarea>
            </group>
        </div>
    </div>
</template>

<script>
    import Heads from "./../../components/Heads.vue"
    import { XInput, XTextarea, Group } from "vux"
    export default {

        components: {
            Heads,
            XInput,
            XTextarea,
            Group
        }

    }

</script>
<style>
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 45px;
        border-bottom: 2px solid #33CC99;
    }
    
    .BasicInfoA {
        margin-top: 15px;
        background: #fff;
    }
</style>