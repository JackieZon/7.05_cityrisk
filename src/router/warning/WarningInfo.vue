<template>
    <div id="main">
        <Heads :title="'风险预警详情'"></Heads>
        <group id="header">
            <p>深圳市福田区</p>
        </group>

        <div id="inp">
            <group>
                <cell title="预警人" :value="'黄小明'"></cell>
                <cell title="预警人电话" :value="'13612349874'"></cell>

            </group>
            <group style="margin-top: 10px;">
                <cell title="开始时间" :value="'2017-06-04'"></cell>
                <cell title="结束时间" :value="'2017-06-05'"></cell>
            </group>
        </div>

        <group>
            <x-input title="预警因由" readonly></x-input>
            <x-textarea name="description" value="由于雷电区域比较广阔，持续时间比较长" readonly></x-textarea>
        </group>

        <group>
            <x-input title="预警内容" readonly></x-input>
            <x-textarea name="description" value="2017-06-04 至 2017-06-05 在深圳市福田区有红色预警级雷电，请市民做好防御措施，以免发生不必的灾害！" readonly></x-textarea>
        </group>

        <group>
            <x-input title="预警要求" readonly></x-input>
            <x-textarea name="description" value="避免高空作业、不要在广场、山林等空阔地区且无建筑物遮蔽的地方逗留" readonly></x-textarea>
        </group>


    </div>
</template>
<script>
    import { Group, XInput, XTextarea, Cell } from "vux"
    import Heads from './../../../components/Heads.vue'
    export default {

        components: {
            Group,
            XInput,
            XTextarea,
            Cell,
            Heads
        }

    }

</script>
<style lang="less">
    #header .weui-cells { height: 45px !important; text-align: center; line-height: 45px; }
 
    #header .weui-cells:before { border-top: 0 !important; }
    
    #header .weui-cells:after { border-bottom: 5px solid #33CC99 !important; }
    
    #inp .weui-cells { margin-top: 0 !important; border-top: 0 !important; }

    .weui-textarea { border:0px !important; }
</style>