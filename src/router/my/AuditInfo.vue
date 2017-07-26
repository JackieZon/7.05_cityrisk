<template>
    <div id="AuditInfo">
        <Heads :title="'风险详情'"></Heads>
        <!--审核通过-->
        <div id="see" style="display: none">
            <div class="BasicInfoA">
                <div class="title">基本信息</div>
                <x-input title="险源名称" :disabled="true" value="热带强台风" placeholder=""></x-input>
                <x-input title="风险类别" :disabled="true" value="台风" placeholder="暂无"></x-input>
                <x-input title="类别名称" :disabled="true" value="类别名称" placeholder="暂无"></x-input>
                <x-input title="对象类型" :disabled="true" value="自然危险源" placeholder="暂无"></x-input>
                <x-input title="风险地址" :disabled="true" value="广东省深圳南山西丽" placeholder="暂无"></x-input>
                <x-input title="经度/纬度" :disabled="true" value="10/20.0" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoC">
                <div class="title">责任主体</div>
                <x-input title="单位名称" :disabled="true" value="巡查员" placeholder="暂无"></x-input>
                <x-input title="单位地址" :disabled="true" value="南山西丽珠光" placeholder="暂无"></x-input>
                <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" :disabled="true" value="15070713712" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoD">
                <div class="title">监管机构</div>
                <x-input title="单位名称" :disabled="true" value="管理员" placeholder="暂无"></x-input>
                <x-input title="单位地址" :disabled="true" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="联系人" :disabled="true" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
            </div>

            <div class="BasicInfoB">
                <div class="title">风险评估</div>
                <x-input title="评估类型" :disabled="true" value="管理员" placeholder="暂无"></x-input>
                <x-input title="频繁程度" :disabled="true" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="事故后果" :disabled="true" value="默认" placeholder="暂无"></x-input>
                <x-input title="可能性" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <x-input title="风险等级" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <x-input id="Score" title="分值" :disabled="true" value="15070713710" placeholder="暂无"></x-input>
                <div>
                    <x-input title="风险描述" style="width: 90px; float: left; border-top: 0;"></x-input>
                </div>
                <div id="describe">
                    <x-textarea class="x_textarea" readonly></x-textarea>
                </div>
            </div>
        </div>



        <!--审核未通过或待审核-->
        <div id="edit" style="display: block">
            <div class="BasicInfoA">
                <div class="title">基本信息</div>
                <x-input title="险源名称" value="热带强台风" placeholder=""></x-input>
                <x-input title="风险类别" value="台风" placeholder="暂无"></x-input>
                <x-input title="类别名称" value="类别名称" placeholder="暂无"></x-input>
                <x-input title="对象类型" value="自然危险源" placeholder="暂无"></x-input>
                <x-input title="风险地址" value="广东省深圳南山西丽" placeholder="暂无"></x-input>
                <x-input title="经度/纬度" value="10/20.0" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoC">
                <div class="title">责任主体</div>
                <x-input title="单位名称" value="巡查员" placeholder="暂无"></x-input>
                <x-input title="单位地址" value="南山西丽珠光" placeholder="暂无"></x-input>
                <x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" value="15070713712" placeholder="暂无"></x-input>
            </div>
            <div class="BasicInfoD">
                <div class="title">监管机构</div>
                <x-input title="单位名称" value="管理员" placeholder="暂无"></x-input>
                <x-input title="单位地址" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="联系人" value="默认" placeholder="暂无"></x-input>
                <x-input title="联系电话" value="15070713710" placeholder="暂无"></x-input>
            </div>

            <div class="BasicInfoB">
                <div class="title">风险评估</div>
                <x-input title="评估类型" value="管理员" placeholder="暂无"></x-input>
                <x-input title="频繁程度" value="南山西丽茶光" placeholder="暂无"></x-input>
                <x-input title="事故后果" value="默认" placeholder="暂无"></x-input>
                <x-input title="可能性" value="15070713710" placeholder="暂无"></x-input>
                <x-input title="风险等级" value="15070713710" placeholder="暂无"></x-input>
                <x-input id="Score" title="分值" value="15070713710" placeholder="暂无"></x-input>
                <div>
                    <x-input title="风险描述" style="width: 90px; float: left; border-top: 0;"></x-input>
                </div>
                <div id="describe">
                    <x-textarea class="x_textarea" readonly></x-textarea>
                </div>
            </div>
            <flexbox>
                <flexbox-item>
                    <x-button type="primary">提交</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type="warn">撤销</x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import { XInput, XTextarea, XButton, Flexbox, FlexboxItem } from 'vux'
    export default {
        components: {
            XInput,
            Heads,
            XTextarea,
            XButton,
            Flexbox,
            FlexboxItem
        }
    }

</script>
<style>
    #AuditInfo {
        background: #f1f1f1;
        box-sizing: border-box;
        padding-bottom: 15px;
    }
    
    .vux-swiper {
        height: 100%!important;
    }
    
    .weui-label {
        width: 6em!important;
    }
    
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 45px;
        border-bottom: 2px solid #33CC99;
    }
    
    .more {
        position: absolute;
        right: 15px;
        font-size: 14px;
        color: #A9A9A9;
    }
    
    .BasicInfoA {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoB {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoC {
        margin-top: 15px;
        background: #fff;
    }
    
    .BasicInfoD {
        margin-top: 15px;
        background: #fff;
    }
    
    .next {
        border-top: 1px solid #f1f1f1;
        box-sizing: border-box;
        padding: 15px;
        background: #f1f1f1;
    }
    
    .popup0 .weui-cell {
        font-size: 17px;
    }
    
    [v-cloak] {
        display: none;
    }
    
    #describe .weui-cell__bd {
        height: 180px;
        margin-bottom: 20px;
    }
    
    #describe {
        border-top: 1px solid #D9D9D9;
        margin: 0 0 0 15px;
    }
    
    textarea {
        height: 150px;
    }
    
    .x_textarea {
        width: 220px;
        padding: 15px 0 0 0 !important;
    }
    
    #describe .weui-cell:before {
        border-top: 0 solid white !important;
        color: white;
    }
    
    .vux-flexbox {
        position: fixed;
        bottom: 0;
        z-index: 99;
    }
    
    .weui-btn_primary {
        background-color: #33CC99 !important;
    }
    
    .vux-flexbox-item {
        margin: 0px !important;
    }
    
    .weui-btn {
        border-radius: 0 !important;
    }
</style>