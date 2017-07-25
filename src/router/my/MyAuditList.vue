<template>
  <div id="myAudit">
    <Heads :title="'审核'"></Heads>
    <tab :line-width=2 active-color='#33CC99'>
        <tab-item selected>已审核</tab-item>
        <tab-item>待审核</tab-item>
    </tab>
    <!--<group v-for="item in searchList">
        <div class="content title">
            <span>{{ item.title }}</span>
        </div>
        <div class="content">
            <img src="../../assets/icon/number.svg" alt="">审核编号&nbsp;:
            <span>{{ item.number }}</span>
        </div>
        <div class="content">
            <img src="../../assets/icon/company.svg" alt="">单位名称&nbsp;:
            <p>{{ item.company }}</p>
        </div>

        <div class="content">
            <img src="../../assets/icon/time.svg" alt="">发起时间&nbsp;:
            <span>{{ item.date }}</span>
        </div>

        <div class="content">
            <img src="../../assets/icon/state.svg" alt="">目前状态&nbsp;:
            <span style="color: #8B8AEE;" v-if="item.state === 1">待审核</span>
            <span style="color: #ffef7d;" v-if="item.state === 2">审核中</span>
            <span style="color: #ff3b3b;" v-if="item.state === 3">审核失败</span>
            <span style="color: #33CC99;" v-if="item.state === 4">审核通过</span>
        </div>
        <div class="next">
            <x-button @click.native="auditState = !auditState">审核</x-button>
        </div>
    </group>-->
    <popup v-model="auditState" :hide-on-blur="false">
        <div class="auditState">
            <radio v-model="pass" :options="radio001" @on-change="change"></radio>
            <x-textarea :title="'原因'" :max="200" :placeholder="'暂无'" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
            <div class="next">
                <x-button @click.native="auditState = !auditState">提交审核</x-button>
            </div>
        </div>
    </popup>
  </div>
</template>
<script>
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem,Popup, Selector,Radio,XTextarea } from "vux"
  export default {
    components:{
      Group,
      XButton,
      Tab,
      TabItem,
      Heads,
      Popup,
      Selector,
      Radio,
      XTextarea
    },
      data(){
          return {
              radio001: [ '通过', '不通过' ],
              pass:'通过',
              auditState: false,
              searchList:[],
              resList:[
                  {
                    title:"南山区某工厂燃料堆积",
                    number:"FX43221105",
                    company:"深圳市南山风险监控局",
                    date:"2017-7-14",
                    state:1
                  },
                  {
                    title:"龙华新区雷电预警",
                    number:"FX48342105",
                    company:"深圳市龙华新风险监控局",
                    date:"2017-6-23",
                    state:2
                  },
                  {
                    title:"福田区热带强台风",
                    number:"FX53228223",
                    company:"深圳市福田风险监控局",
                    date:"2017-6-28",
                    state:3
                  },
                  {
                    title:"宝安区西乡街道1124号危房",
                    number:"FX43232145",
                    company:"深圳市宝安风险监控局",
                    date:"2017-6-28",
                    state:4
                  }
              ]
          }
      },
    created (){
      this.searchList = this.resList
    },
    methods:{
          tab (state,state1){

            var t_data = this;
            this.searchList = [];

            for(var i = 0; i < this.resList.length; i++){

              if(t_data.resList[i].state === state || t_data.resList[i].state === state1){

                  t_data.searchList.push(t_data.resList[i]);

              }else if(state === 5){

                t_data.searchList.push(t_data.resList[i]);

              }

            }

          },
          change(val){
            console.log(val);
          }
    }
  }
</script>

<style scoped>
  .vux-tab .vux-tab-item.vux-tab-selected { color: #33CC99 !important; }
  .vux-tab-ink-bar { background-color: #33CC99 !important; }
  #myAudit .header { height: 35px; width: 100%; text-align: center; background-color:#33CC99; }
    #myAudit .header p { color: white; line-height: 35px; font-size: 18px; }

  #myAudit .content { padding:10px 15px; display: flex; align-items: center; }
    .content img { width: 24px; height: 24px; margin-right: 6px; }
    .content span { font-size: 16px; display:inline-block; margin-left: 5px; }
    .content p { font-size: 16px; display:inline-block; margin-left: 5px;  overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1;
      -webkit-box-orient: vertical; }
    .content.title{display:flex; justify-content: center; border-bottom:2px solid #33CC99;}
    .next{
        border-top: 1px solid #f1f1f1;
        box-sizing: border-box;
        padding:15px;
    }
    .auditState{width: 100%;height: 100%;background:#fff;}
</style>
