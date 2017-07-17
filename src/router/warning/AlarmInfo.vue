<template>
    <div id="main">
        <Heads :title="'风险告警详细'"></Heads>
        <group id="header">
            <p>深圳市福田区</p>
        </group>

        <div id="inp">
            <group>
                <cell title="发布时间" :value="'2017-07-14'"></cell>
                <cell title="发布人" :value="'黄小明'"></cell>
                <cell title="联系电话" :value="'13612349786'"></cell>
            </group>
        </div>

        <group>
            <x-input title="直接原因" readonly></x-input>
            <x-textarea name="description" value="由于福田区某某路一处危房外墙瓷砖脱落。" readonly></x-textarea>
        </group>

        <group>
            <x-input title="人员伤亡" readonly></x-input>
            <x-textarea name="description" value="4人受伤，无人员死亡！" readonly></x-textarea>
        </group>

        <group>
            <x-input title="财产损失" readonly></x-input>
            <x-textarea name="description" value="造成楼下停车场2辆汽车后置玻璃被砸坏，初步预计损失财产约为12000元人民币！" readonly></x-textarea>
        </group>

        <group>
            <x-input title="事故描述" readonly></x-input>
            <x-textarea name="description" value="2017-07-14 上午8:03 李小姐和同事给人在上班的路上路过这栋楼，据当事人描述，当时只刮了一阵小风......." readonly></x-textarea>
        </group>

        <group class="mar-bot">
            <x-input title="事故照片" readonly></x-input>
            <flexbox :gutter="0">
                <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img" /></flexbox-item>
            </flexbox>
        </group>

        <x-button class="button" type="primary">事故文档.doc</x-button>
    </div>
</template>
<script>
    import { Group, XInput, XTextarea, Cell, XButton, Flexbox, FlexboxItem } from "vux"
    import Heads from './../../../components/Heads.vue'
    export default {

        components: {
            Group,
            XInput,
            XTextarea,
            Cell,
            XButton,
            FlexboxItem,
            Flexbox,
            Heads
        },

        data() {
            return {
                images: [
                    'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                    'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
                ]
            }
        }

    }

</script>
<style lang="less">
    #header .weui-cells { height: 45px !important; text-align: center; line-height: 45px; }

    #header .weui-cells:before {  border-top: 0 !important; }
    
    #header .weui-cells:after { border-bottom: 5px solid #33CC99 !important; }

    #main .weui-cells { margin-top: 10px !important; }
    
    #inp .weui-cells { margin-top: 0 !important; border-top: 0 !important; }

    
    #main .button { position: fixed; bottom: 0px; left: 0px; border-radius: 0px; background-color: #33CC99; }
    
    #main .mar-bot { margin-bottom: 60px; }
    
    .vux-flexbox-item { padding: 5px 10px 5px 10px; }

    .weui-textarea { border:0px !important; }
</style>