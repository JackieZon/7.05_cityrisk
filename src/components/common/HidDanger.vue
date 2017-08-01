<template>
    <div class="hidDangerList">
        <div style="font-size: 14px;">

            <p class="p_center"><Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />联系人: {{ item.RiskChangedAddManName | s_toStr}}</p>
            <p class="p_center"><Icon slot="icon" class="icon" :name="'phone-icon'" style="color:#33CC99" />联系电话: {{ item.RiskChangedAddManTel | s_toStr}}</p>
            <p class="p_center"><Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />添加时间: {{ item.RiskHiddenDate | s_toDate}}</p>

            <p class="p_center "><span class="status"> <span class="auditorIcon"><Icon class="icon" :name="'auditor'" style="color:#33CC99" /><span>审核人:{{ item.RiskHiddenAuditManName | s_toStr}}</span></span> <span>审核状态: {{ item.RiskHiddenStatusName | s_toStr}}</span> </span></p>
        
        </div>
    </div>
</template>
<script>
    export default {
        props:['item'],
        data(){
            return {
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
            }
        }
    }
</script>
<style lang="less">
    .hidDangerList {
        background:#fff;
        padding: 10px 15px;
        position: relative;
        p {
            line-height: 30px;
        }
        .p_center {
            .status{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .auditorIcon{
                    display: flex;
                    align-items: center;
                }
            }
        }
        .icon{}
    }
</style>