import { updateRiskStatusAudit, updateRiskStatusRecall } from './../../servers/api'

const state = {
    AuditData: {
        "ListRiskDuty": [],
        "ListRiskRegulatory": [
            {
                "RiskFullRegulatoryAddress": "",
                "RiskAgencyAddressList": [],
            }
        ],
        "ListRiskAssess": [
            {
                "ListRiskAssessDetail": []
            }
        ],
        "ListRiskHidden": [
            {
                "RiskHiddenBeforePhotosPath": [],
                "RiskChangedAfterPhotosPath": [],
            }
        ],
        "ListRiskWarn": [],
        "ListRiskAccident": [],
        "RiskFullAddress": "",
        "RiskAreaIDsArray": [],
        "RiskObjectTypeIDsArray": [],
        "ID": 0,
        "RiskStatus": 0,
        "RiskAuditIntro": "string",
        "RiskAuditMan": 0,
        "RiskAuditManName": "Tomy",
        "RiskAuditDate": "2017-07-27T01:21:51.516Z"
    }
}

const mutations = {

    setRiskAuditStatus(state, payload) {

        state.AuditData.RiskStatus = payload;

    },

    setRiskAuditIntro(state, payload) {

        state.AuditData.RiskAuditIntro = payload;

    },

    setRiskId(state, payload) {

        state.AuditData.ID = payload;

    }

}

const actions = {

    updateRiskStatusAudit: ({ state }) => {
        // alert(JSON.stringify(state.AuditData))
        console.log(state.AuditData.ID)
        console.log(state.AuditData.RiskStatus)
        console.log(state.AuditData.RiskAuditIntro)
        // alert(JSON.stringify(state.AuditData))
        updateRiskStatusAudit(state.AuditData).then((data) => {
        })
    },

    updateRiskStatusRecall: ({ state },payload) => {
        console.log(`这是数据中心里${state.AuditData.ID}`);
        updateRiskStatusRecall(state.AuditData.ID).then((data) => {
            console.log(data.info)
        })
    }

}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}