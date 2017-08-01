import { getRiskAssess } from "./../../servers/api"
const state = {

    assessAuditList: [],
    defaultData: {
        // RiskName: "",
        RiskAssessStatus: 1,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
    }

}

const actions = {
    getAssessAuditList({ commit, dispatch, getters, state }) {

        console.log(JSON.stringify(state.defaultData));

        getRiskAssess(state.defaultData).then((data) => {

            // console.log(JSON.stringify(data.info));
            commit('saveDefaultDatas', { total: data.all.total })
            commit('saveAssessAuditList', data.info);

        });
    }
}

const mutations = {

    saveAssessAuditList(state, payload) {
        state.assessAuditList.push(...payload) ;
    },


    saveDefaultDatas(state, payload) {
        // alert(JSON.stringify(state.defaultData))
        state.defaultData = { ...state.defaultData, ...payload }
    },


    deleteAssessAuditList(state, payload) {
        state.assessAuditList = [];
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
