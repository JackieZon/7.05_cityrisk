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

    //     getRisk(state.getAuditListData).then((res) => {
    //         // console.log(JSON.stringify(res))
    //         commit("setAuditList",res)
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

    pendingAudit: state => {
        return state.auditList.filter( res => res.RiskStatus == 1 || res.RiskStatus == 0 )
    },

    Audited: state => {
        return state.auditList.filter( res => res.RiskStatus == 2 || res.RiskStatus == 3 )
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}