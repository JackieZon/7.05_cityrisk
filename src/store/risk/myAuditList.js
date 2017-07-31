import { getRisk } from './../../servers/api'
const state = {

    getAuditListData: {
        'userID': 1,
        'RiskStatus': -1
    },
    defaultData:{
        RiskName: "",
        RiskStatus: -1,
        pageIndex: 1 ,
        pageSize: 10,
        total: 0,
    },

    auditList:[]

}

const actions = {

    // getRisk: ({state,commit}) => {

    //     getRisk(state.getAuditListData).then((data) => {
    //         // console.log(JSON.stringify(res))
    //         commit("setAuditList",data.info)
    //         // alert(JSON.stringify(state.auditList))
    //     })

    // }
     getRisks({commit,dispatch,getters,state}){

        // console.log(JSON.stringify(state.defaultData));

        getRisk(state.defaultData).then((data)=>{
            
            // console.log(data.info);
            commit('saveMyAuditListDefaultData',{total: data.all.total})
            commit('setAuditList',data.info);

        });
    }

}

const mutations = {

    setAuditList (state,payload) {
state.auditList.push(...payload);

    },

    saveMyAuditListDefaultData(state, payload){
        state.defaultData = {...state.defaultData,...payload}
    },

    deleteAuditList(state, payload){
        state.auditList = [];
    }

}

const getters = {
}

export default {
    state,
    actions,
    mutations,
    getters
}