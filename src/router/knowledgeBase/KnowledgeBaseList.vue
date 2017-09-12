<template>
    <div id="knowHow">
        <div class="upper">
            <Heads :title="'知识库'"></Heads>
            <div class="select">
                <selector class="selects" placeholder="知识库类型" v-model="know" title="知识库类型" name="district" :options="knowLedgesType" @on-change="typeChoose"></selector>
            </div>
        </div>
        <div class="lower">
            <PullUpRefresh
                :pullDown="pullDown"
                :pullUp="pullUp"
                :item="list"
                :default="defaultData"
            >
                <div class="list" v-for="item in list" :key="item.ID">
                    <KnowList :item="item" @click.native="openInfo(item)"></KnowList>
                </div>
            </PullUpRefresh>
        </div>
    </div>
</template>
<script>
    import Heads from './../../components/Heads.vue'
    import KnowList from './../../components/common/KnowListIItem.vue'
    import PullUpRefresh from './../../components/common/PullUpRefresh.vue'
    import {mapMutations, mapState, mapActions} from 'vuex'
    import { Selector } from 'vux'
    export default{
        components:{
            Heads,
            KnowList,
            Selector,
            PullUpRefresh,
        },
        data(){
            return {
                know:1,
                type:[
                    
                ],
            };
        },
        mounted(){
            // this.pullDown();
        },
        computed:{
            ...mapState({
				list(state){
					return state.knowledgeBase.knowledgeList;
				},
                defaultData(state){
                    return state.knowledgeBase.knowDefault;
                },
                knowLedgesType(state){
                    
                    const typeList = state.tiskAdd.riskBaseType.KnowLedgesType;
                    let list = [];

                    if(typeList.length!==0){

                        for(var item in typeList){
                            list.push({
                                key: typeList[item].ID,
                                value: typeList[item].BaseName,
                            })
                        }
                        list.push({
                            key: 0,
                            value: '查看全部'
                        });
                        this.know=0;

                    }else{
                        list = [];
                    }

                    console.log(list);
                    return list;
                    
                }
            })
        },
        watch:{
            know(){
                // console.log(`我的状态改变了${this.know}`);
                this.saveKnowDefault({KnowLedgeTypeId: this.know});
            }
        },
        methods:{
            ...mapMutations([
                'saveKnowDefault',
                'getKnowledgeList',
                'claerKnowList',
            ]),
            ...mapActions([
                'getKnowledgeList',
            ]),
            pullDown(){
                this.claerKnowList();
                this.saveKnowDefault({pageIndex:1,pageSize:10,RiskStatus:3});
                this.getKnowledgeList();
            },
            pullUp(){
                this.saveKnowDefault({pageIndex:this.defaultData.pageIndex+=1,pageSize:10});
                this.getKnowledgeList();
            },
            typeChoose(val){
                console.log(val)
                this.saveKnowDefault({KnowLedgeTypeId: val});
                this.pullDown();
            },
            openInfo(item){
                console.log(item);
                this.$router.push({name:'knowledgeBaseInfo',params:{knowId: item.ID}});
            }
        }
    }
</script>
<style lang="less">
    #knowHow{
        display: flex;
        flex-direction: column;
        height: 100%;
        .weui-cell_select-after .weui-select{
            line-height: initial;
        }
        .select{
            padding-top: 10px;
            .selects{
                background:#fff;
            }
        }
        .lower{
            display:flex;
            height: 100%;
            .list{
                padding-top: 10px;
            }
            
        }
    }
</style>