import { getRiskWarn, riskAccident, getShufflingRiskWarn} from './../../servers/api'

const state = {
    defaultData:{
        RiskID:0,
        RiskWarnStatus:-1,
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0,       //必填参数
    },
    defaultAccidentData:{
        RiskID:0,
        RiskAccidentStatus:-1,
        pageIndex: 1,   //必填参数
        pageSize: 10,   //必填参数
        total: 0       //必填参数
    },
    warnList:[],
    shufflingRiskWarn:[],
    riskAccidentList: [],
}

const actions = {

    getRiskWarn({commit,dispatch,getters,state}){
        getRiskWarn(state.defaultData).then((res)=>{
            // console.log(JSON.stringify(res))
            commit('saveDefaultDatas',{total: res.all.total});
            commit('saveWarnList',res.info);
            // console.log(`我是你要的数据啊================================================${JSON.stringify(res.info)}`)
        });
    },

    getShufflingRiskWarn({commit,dispatch,getters,state}){
        getShufflingRiskWarn(state.defaultData).then((data)=>{

            var countWarn = [];
            var dataArr = [...data.info];
            if(JSON.stringify(data.info)!=='[]'){

                for(let i=1; i < data.info.length; i++){
                    if(data.info[i].RiskWarnDate==data.info[i-1].RiskWarnDate||data.info[i].RiskWarnContent==data.info[i-1].RiskWarnContent){
                        for(var j=0; j<dataArr.length; j++){
                            if(dataArr[j].ID==data.info[i].ID){
                                dataArr.splice(j,1);
                            }
                        }
                    }
                }
            }
            
            commit('saveShufflingRiskWarn',dataArr);

        });
    },

    getriskAccident({commit,dispatch,getters,state}){
        riskAccident(state.defaultAccidentData).then((res) => {
            // console.log(`我是数据啊========================${JSON.stringify(res)}`)
            commit('saveRiskAccident',res.info);
            commit('saveDefaultAccidentData',{total: res.all.total});
        });
    }
}
const getters = {}

const mutations = {
    saveWarnList(state,payload){
        state.warnList = payload;
    },
    saveShufflingRiskWarn(state,payload){
        state.shufflingRiskWarn = payload;
    },
    clearWarnList(state,payload){
        state.warnList = [];
        state.riskAccidentList = [];
    },
    saveDefaultDatas(state,payload){
        state.defaultData = {...state.defaultData,...payload};
    },

    saveRiskAccident (state,payload){
        state.riskAccidentList = state.riskAccidentList.concat(payload)
    },

    saveDefaultAccidentData(state,payload){
        state.defaultAccidentData = {...state.defaultAccidentData,...payload};
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}