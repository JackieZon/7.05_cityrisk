<template>
    <div class="hidDangerList">
        <div style="font-size: 14px;">

            <div class="top_mation">
                <p class="p_center"><Icon slot="icon" class="icon" :name="'appraiser'" style="color:#33CC99" />联系人: {{ item.RiskHiddenAddManName | s_toStr}}</p>
                <p class="p_center">类型:  {{ item.RiskHiddenTypeName | s_toStr }}</p>
            </div>
            <p class="p_center"><Icon slot="icon" class="icon" :name="'phone-icon'" style="color:#33CC99" />联系电话: {{ item.RiskHiddenAddManTel | s_toStr}}</p>
            <p class="p_center"><Icon slot="icon" class="icon" :name="'time2'" style="color:#33CC99" />添加时间: {{ item.RiskHiddenDate | s_toDate}}</p>
            <p class="p_centers"><Icon slot="icon" class="icon" :name="'describe'" style="color:#33CC99;" /><span><p class="assessInfo">描述: {{ item.RiskHiddenIntro | s_toStr}}</p></span></p> 
            <p class="p_center ">
                <span class="status"> 
                    <span class="auditorIcon">
                        <Icon class="icon" :name="'auditor'" style="color:#33CC99" />
                        <span>审核人:{{ item.RiskHiddenAuditManName | s_toStr}}</span>
                    </span> 
                    <span>审核状态: {{ (isModify?item.RiskChangedStatusName:item.RiskHiddenStatusName) }}</span> 
                </span>
            </p>
        
        </div>
    </div>
</template>
<script>
    export default {
        props:['item','isModify'],
        data(){
            return {
                riskStatus: ['极高', '高', '中等', '低', '可忽略'],
                RiskAssessStatusName: ['暂存', '待审核', '审核退回', '审核通过'],
                fontColor: ['#FF0000', '#FF8C00', '#FFD700', '#1E90FF'],
            }
        },
        created (){
            console.log(JSON.stringify(this.item))
        }
    }
</script>
<style lang="less">
    .hidDangerList {
        background:#fff;
        padding: 10px 15px;
        position: relative;
        .top_mation{
            display: flex; 
            align-items: center; 
            justify-content: space-between;
        }
        p {
            line-height: 30px;
        }
         .assessInfo {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            line-height: normal!important;
        }
        .p_centers {
            display: flex;
            align-items: center;
            padding: 6px 0 3px 0;
        }
        .p_center {
            display: flex;
            align-items: center;
            .status{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .auditorIcon{
                    display: flex;
                    align-items: center;
                }
            }
        }
        .icon{
            min-height: 21px;
            min-width: 22px;
        }
    }
</style>