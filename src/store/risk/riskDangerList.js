import { getRiskHidden, getRiskHiddenChanged, getRiskHiddenInfo, postRiskHiddenAdd, postRiskHiddenDelete, postUpdateRiskHiddenStatus_Recall,postUpdateRiskHiddenStatus_Audit, postUpdateRiskHiddenChangedStatus_Recall, postUpdateRiskHiddenChangedStatus_Audit} from './../../servers/api'
import Vue from 'vue';
const state = {
    defaultDangerListData:{
        RiskID:0,
        RiskChangedStatus:'',
        RiskHiddenStatus:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    dangerList:[],
    dangerInfo:{},
    editRiskHiddenAdd:{},
}

const mutations = {
    saveDefaultDangerListData(state,payload){
        state.defaultDangerListData = { ...state.defaultDangerListData, ...payload}
    },
    saveDangerList(state, payload){
        state.dangerList = state.dangerList.concat(payload);
        console.log(state.dangerList);
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
    }
}

const actions = {
    getRiskHidden({commit,dispatch,getters,state}){
        getRiskHidden(state.defaultDangerListData).then((res)=>{
            console.log(res);
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
        console.log(payload);
        const $router = payload.$router;
        postRiskHiddenAdd(payload.param).then((res)=>{
            console.log(res);

            if(res.all.status){
                Vue.$vux.toast.show({
                    text: (payload.param.RiskHiddenStatus==0?'保存成功':'提交成功'),
                    type: 'success',
                    onHide(){

                        $router.go(-2);
                        
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
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}