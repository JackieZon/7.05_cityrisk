import { getKnowledgeInfo, getKnowledgeList} from './../../servers/api.js'
const state = {
    knowledgeList:[],
    knowledgeInfo:{},
    knowDefault:{
        KnowLedgeTypeId:'',
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
}

const mutations = {
    creanKnowledgeInfo(state){
        state.knowledgeInfo = {}
    },

    saveknowledgeInfo(state,payload){
        state.knowledgeInfo = payload
    },
    saveKnowDefault(state, payload){
        state.knowDefault = {...state.knowDefault, ...payload};
    },
    saveKnowList(state, payload){
        state.knowledgeList = state.knowledgeList.concat(payload);
    },
    claerKnowList(state){
        state.knowledgeList = [];
    }
}

const getters = {

}

const actions = {
    getKnowledgeInfo({state,commit},payload){
        getKnowledgeInfo(payload).then((res)=>{
            if(res.all.status){
                commit('saveknowledgeInfo',res.info)
            }
        })
    },
    getKnowledgeList({state,commit},payload){

        getKnowledgeList(state.knowDefault).then((res)=>{

            commit('saveKnowDefault',{total: res.all.total});
            commit('saveKnowList',res.info);

            console.log(`知识库列表数据共有${res.all.total}条`);

        })

    }
}

export default{
    state,
    mutations,
    getters,
    actions
}