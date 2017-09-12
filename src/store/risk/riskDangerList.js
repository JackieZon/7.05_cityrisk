import { getRiskHidden, getRiskHiddenChanged, getRiskHiddenInfo, postRiskHiddenAdd, postRiskHiddenDelete, postUpdateRiskHiddenStatus_Recall,postUpdateRiskHiddenStatus_Audit, postUpdateRiskHiddenChangedStatus_Recall, postUpdateRiskHiddenChangedStatus_Audit, getRiskBaseType} from './../../servers/api'
import Vue from 'vue';
const state = {
    defaultDangerListData:{
        RiskID:0,
        RiskChangedStatus:'',
        RiskHiddenStatus:'',
        RiskChangedMan:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    dangerList:[],
    dangerInfo:{},
    editRiskHiddenAdd:{},
    hiddenDangerType:[],
}

const mutations = {
    saveDefaultDangerListData(state,payload){
        state.defaultDangerListData = { ...state.defaultDangerListData, ...payload}
    },
    saveDangerList(state, payload){
        state.dangerList = state.dangerList.concat(payload);
    },
    saveDangerInfo(state, payload){
        state.dangerInfo = payload;
    },
    clearDangerList(state, payload){
        state.dangerList = [];
    },
    editRiskHidden(state, payload){
        console.log(`我是编辑的ID${payload.ID}`);
        state.editRiskHiddenAdd = payload;
    },
    saveHiddenDangerType(state, payload){
        state.hiddenDangerType = payload
    }
}

const actions = {
    getRiskHidden({commit,dispatch,getters,state}){
        // console.log('我是你要的'+JSON.stringify(state.defaultDangerListData))
        // return;
        getRiskHidden(state.defaultDangerListData).then((res)=>{
            commit('saveDefaultDangerListData',{total: res.all.total});
            commit('saveDangerList',res.info);
        });
    },
    getRiskHiddenChanged({commit,dispatch,getters,state}){
        console.log(`我是获取风险整改的参数${JSON.stringify(state.defaultDangerListData)}`);
        getRiskHiddenChanged(state.defaultDangerListData).then((res)=>{
            commit('saveDefaultDangerListData',{total: res.all.total});
            commit('saveDangerList',res.info);
        });
    },
    getRiskHiddenInfo({commit,dispatch,getters,state},payload){
        console.log(payload.ID);
        getRiskHiddenInfo({ID:payload.ID }).then((res)=>{
            commit('saveDangerInfo',res.info);
        })
    },
    postRiskHiddenAdd({commit,dispatch,getters,state},payload){
        // console.log(payload);

        // console.log(JSON.stringify(payload.param))
        // return;

        const $router = payload.$router;
        postRiskHiddenAdd(payload.param).then((res)=>{
            console.log(res);

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: (payload.param.RiskHiddenStatus==0?'保存成功':'提交成功'),
                    type: 'success',
                    onHide(){
                        $router.replace({ name: 'riskDangerList' })
                        // $router.go(-2);
                        
                    }
                });
            }
            
        });
    },
    postRiskHiddenDelete({commit,dispatch,getters,state},payload){

        console.log(`我是删除的ID${payload.id}`);

        const $router = payload.$router;
        
        postRiskHiddenDelete(payload.id).then((res)=>{

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: '删除成功',
                    type: 'success',
                    onHide(){
                        $router.back();
                    }
                });
            }

        })
    },
    postUpdateRiskHiddenStatus_Recall({commit,dispatch,getters,state},payload){

        console.log(`我是撤回的ID${payload.id}`);

        const $router = payload.$router;
        
        postUpdateRiskHiddenStatus_Recall(payload.id).then((res)=>{

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: '撤回成功',
                    type: 'success',
                    onHide(){
                        $router.back();
                    }
                });
            }

        })
    },
    postUpdateRiskHiddenStatus_Audit({commit,dispatch,getters,state},payload){

        const $router = payload.$router;
        postUpdateRiskHiddenStatus_Audit(payload.default).then((res)=>{

            console.log(`审核返回数据${JSON.stringify(res)}`);

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: '审核完成',
                    type: 'success',
                    onHide(){
                        $router.back();
                    }
                });
            }
        })
    },
    postUpdateRiskHiddenChangedStatus_Audit({commit,dispatch,getters,state},payload){

        const $router = payload.$router;
        postUpdateRiskHiddenChangedStatus_Audit(payload.default).then((res)=>{

            console.log(`审核返回数据${JSON.stringify(res)}`);

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: '审核完成',
                    type: 'success',
                    onHide(){
                        $router.back();
                    }
                });
            }
        })
    },
    postUpdateRiskHiddenChangedStatus_Recall({commit,dispatch,getters,state},payload){

        console.log(`我是撤回的ID${payload.id}`);

        const $router = payload.$router;
        
        postUpdateRiskHiddenChangedStatus_Recall(payload.id).then((res)=>{

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: '撤回成功',
                    type: 'success',
                    onHide(){
                        $router.back();
                    }
                });
            }

        })

    },

    getHiddenDangerType ({commit,state,dispatch,getter}){
        getRiskBaseType().then((res) => {
            let hiddenDangerType = [];
            for(let i = 0; i < res.info.length; i++){
                if(res.info[i].ID == 6){
                    for(let m = 0; m < res.info[i].detail_BaseDataList.length; m++){
                        hiddenDangerType.push({'key':res.info[i].detail_BaseDataList[m].ID,'value':res.info[i].detail_BaseDataList[m].BaseName})
                    }
                }
            }

            commit('saveHiddenDangerType',hiddenDangerType)
            // console.log('我是你要的数据啊啊啊啊啊啊=============================='+JSON.stringify(hiddenDangerType))
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}