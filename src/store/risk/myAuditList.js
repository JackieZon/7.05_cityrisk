import { getRisk } from './../../servers/api'
const state = {

    getAuditListData: {
        'userID': 1,
        'RiskStatus': -1
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

}

const mutations = {

    setAuditList (state,payload) {

        state.auditList = payload

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