<template>
  <div id="audit">
    <Heads :title="'审核列表'"></Heads>
    <tab :line-width=2 active-color='#33CC99'>
      <tab-item selected @on-item-click="tab(5)">全部审核</tab-item>
      <tab-item  @on-item-click="tab(1)">待审核</tab-item>
      <tab-item @on-item-click="tab(2)">审核中</tab-item>
      <tab-item @on-item-click="tab(3,4)">已审核</tab-item>
    </tab>
    <group v-for="item in searchList">
      <div class="header">
        <p>{{ item.title }}</p>
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

      <div id="but">
        <x-button mini type="warn">撤销</x-button>
        <x-button mini type="primary">修改</x-button>
      </div>
    </group>
  </div>
</template>
<script>
  import Heads from './../../components/Heads.vue'
  import { Group, XButton, Tab, TabItem } from "vux"
  export default {
    components:{
      Group,
      XButton,
      Tab,
      TabItem,
      Heads
    },
      data(){
          return {
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

          }
    }
  }
</script>

<style scoped>
  .vux-tab .vux-tab-item.vux-tab-selected { color: #33CC99 !important; }
  .vux-tab-ink-bar { background-color: #33CC99 !important; }
  #audit .header {height: 45px;width: 100%;text-align: center;border-bottom: 2px solid #33CC99; }
    #audit .header p {color: #333;line-height: 45px;font-size: 18px; }

  #audit .content { margin: 16px 15px 16px 15px; display: flex; align-items: center; }
    .content img { width: 24px; height: 24px; margin-right: 6px; }
    .content span { font-size: 16px; display:inline-block; margin-left: 5px; }
    .content p { font-size: 16px; display:inline-block; margin-left: 5px;  overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:1;
      -webkit-box-orient: vertical; }

  #but { text-align: center; }
    #but button.weui-btn { margin: 10px 20px 30px 20px !important; }
    #but .weui-btn + .weui-btn { background: #33CC99; }
</style>
