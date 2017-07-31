<template>
    <div id="myAssessAuditLIst">
         <div class="upper">
            <Heads :title="'风险评估审核'"></Heads>
            <tab :line-width=2 active-color='#33CC99'>
                <tab-item selected @on-item-click="">待审核</tab-item>
                <tab-item  @on-item-click="">已审核</tab-item>
                <tab-item @on-item-click="">已退回</tab-item>
            </tab>
    </div>

    <div class="myAssessAuditLIst">
                <div class="evaluationList" v-on:click="">
                    <div style="font-size: 14px;">
                        <div style="position: absolute; right: 10px; top: 10px;width: 80px;">
                            <p class="p_center" :style=""><Icon slot="icon" class="icon" :name="'level'" />{{  }}</p>
                            <p class="p_center"><Icon slot="icon" class="icon" :name="'trend-icon'" style="color:#33CC99" />{{  }}</p>
                        </div>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'riskType'" style="color:#33CC99" />类型: {{  }}</p>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />评估人: {{  }}</p>
                        <p class="p_center"><Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />时间: {{  }}</p>
                        <p class="p_center"><span class="displayFlex"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /></span><span><p class="assessInfo">描述: {{  }}</p></span></p>
                        <p class="p_center" ><Icon slot="icon" class="icon" :name="'auditor'" style="color:#33CC99" />审核人: {{  }}</p>
                        <p style="float: right; margin-top: -31px;">审核状态: {{  }}</p>

                    </div>
                </div>
            </div>
    </div>

</template>
<script>
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem, Popup, Selector, Radio, XTextarea } from "vux"
  import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
  import { mapMutations, mapState, mapActions } from 'vuex'
  export default {
    components: {
      Group,
      XButton,
      Tab,
      TabItem,
      Heads,
      Popup,
      Selector,
      Radio,
      XTextarea,
      PullUpRefresh
    }
  }

</script>
<style lang="">
    .myAssessAuditLIst {
            width: 100%;
            margin-top: 10px;
            background: #fbf9fe;
        }
        
        .myAssessAuditLIst {
            position: relative;
            background: #fff;
        }
        
        .myAssessAuditLIst p {
            line-height: 30px;
        }
        
        .myAssessAuditLIst img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        
        .p_center {
            display: flex;
            align-items: center;
            padding-left: 15px;
        }
        
        .auditStatus {
            float: right;
            margin-top: -31px;
        }
        
        [v-cloak] {
            display: none
        }
</style>