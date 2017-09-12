
const Home = resolve => require(['./router/home/Index.vue'], resolve)
const TextMap = resolve => require(['./components/common/TextMap.vue'], resolve)

const Login = resolve => require(['./router/login/Login.vue'], resolve)
const Index = resolve => require(['./router/index/Index.vue'], resolve)
const RiskList = resolve => require(['./router/riskList/Index.vue'], resolve)
const RiskInfo = resolve => require(['./router/riskList/RiskInfo.vue'], resolve)
const RiskDanger = resolve => require(['./router/riskList/RiskDanger.vue'], resolve)
const RiskDangerList = resolve => require(['./router/riskList/RiskDangerList.vue'], resolve)
const RiskDangerAdd = resolve => require(['./router/riskList/RiskDangerAdd.vue'], resolve)
const RiskDanger_Modify = resolve => require(['./router/riskList/RiskDanger_Modify.vue'], resolve)
const RiskDangerList_Modify = resolve => require(['./router/riskList/RiskDangerList_Modify.vue'], resolve)
const RiskDangerAdd_Modify = resolve => require(['./router/riskList/RiskDangerAdd_Modify.vue'], resolve)
// 隐患审核列表和详情
const RiskDangerReviewList = resolve => require(['./router/my/MyRiskDangerReviewList.vue'], resolve)
const RiskDangerReviewInfo = resolve => require(['./router/my/MyRiskDangerReviewInfo.vue'], resolve)
const MyRiskDangerReviewListModify = resolve => require(['./router/my/MyRiskDangerReviewListModify.vue'], resolve)
const MyRiskDangerReviewInfoModify = resolve => require(['./router/my/MyRiskDangerReviewInfoModify.vue'], resolve)

const My = resolve => require(['./router/my/Index.vue'], resolve)
const MyInfo = resolve => require(['./router/my/MyInfo.vue'], resolve)
const AuditList = resolve => require(['./router/my/AuditList.vue'], resolve)
const MyAuditList = resolve => require(['./router/my/MyAuditList.vue'], resolve)
const MyAuditInfo = resolve => require(['./router/my/MyAuditInfo.vue'], resolve)
const AuditInfo = resolve => require(['./router/my/AuditInfo.vue'], resolve)
const WarningList = resolve => require(['./router/warning/Index'], resolve)
const Alarm = resolve => require(['./router/warning/Alarm'], resolve)
const Warning = resolve => require(['./router/warning/RiskWarning'], resolve)
const WarningInfo = resolve => require(['./router/warning/WarningInfo'], resolve)
const RiskWarningInfo = resolve => require(['./router/warning/RiskWarningInfo'], resolve)

const RiskAdd = resolve => require(['./router/risk/add/Index.vue'], resolve)
const RiskMap = resolve => require(['./router/riskMap/Index.vue'], resolve)
const BasicInfoA = resolve => require(['./router/risk/add/BasicInfoA.vue'], resolve)
const BasicInfoB = resolve => require(['./router/risk/add/BasicInfoB.vue'], resolve)
const BasicInfoC = resolve => require(['./router/risk/add/BasicInfoC.vue'], resolve)
const BasicInfoD = resolve => require(['./router/risk/add/BasicInfoD.vue'], resolve)
const EvaluationList = resolve => require(['./router/riskList/evaluationList.vue'], resolve)
const EvaluationInfo = resolve => require(['./router/riskList/evaluationInfo.vue'], resolve)
const AddEvaluation = resolve => require(['./router/riskList/addEvaluation.vue'], resolve)
const GetLngLat = resolve => require(['./components/common/GetLngLat.vue'], resolve)
const MyAssessAuditList = resolve => require(['./router/my/MyAssessAuditList.vue'], resolve)
const MyAssessAuditInfo = resolve => require(['./router/my/MyAssessAuditInfo.vue'], resolve)
const KnowledgeBaseInfo = resolve => require(['./router/knowledgeBase/KnowledgeBaseInfo.vue'], resolve)
const KnowledgeBaseList = resolve => require(['./router/knowledgeBase/KnowledgeBaseList.vue'], resolve)

export default {
  routes: [{
    path: '/',
    component: Login
  },
  {
    path: '/Login',
    name: 'login',
    component: Login,
  },
  {
    path: '/Index/:userId',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/Index/:userId/Home',
        name: 'home',
        component: Home
      },
      {
        path: '/Index/:userId/My',
        name: 'my',
        component: My
      },
      {
        path: '/Index/:userId/RiskMap',
        name: 'homeMap',
        component: RiskMap
      },
    ]
  },
  {
    path: '/Index/:userId/Home/RiskAdd/',
    name: 'riskAdd',
    component: RiskAdd,
    children: [
      {
        path: '/Index/:userId/RiskAdd/BasicInfoA',
        name: 'basicInfoA',
        component: BasicInfoA,
      },
      {
        path: '/Index/:userId/RiskAdd/BasicInfoB',
        name: 'basicInfoB',
        component: BasicInfoB,
      },
      {
        path: '/Index/:userId/RiskAdd/BasicInfoC',
        name: 'basicInfoC',
        component: BasicInfoC,
      },
      {
        path: '/Index/:userId/RiskAdd/BasicInfoD',
        name: 'basicInfoD',
        component: BasicInfoD,
      },
    ]
  },
  {
    path: '/Index/:userId/RiskMap/RiskList',
    name: 'riskList',
    component: RiskList
  },
  {
    // editStatus == 0; 0仅查看信息，1带撤销和编辑，2带审核按钮
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus',
    name: 'riskInfo',
    component: RiskInfo
  },
  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList/RiskDanger/:dangerId',
    name: 'riskDanger',
    component: RiskDanger
  },
  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList/:riskDangerAdd',
    name: 'riskDangerList',
    component: RiskDangerList
  },
  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList/RiskDangerAdd/:dangerId',
    name: 'riskDangerAdd',
    component: RiskDangerAdd
  },

  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList/RiskDanger_Modify/:dangerModifyId',
    name: 'riskDangerModify',
    component: RiskDanger_Modify
  },
  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList_Modify',
    name: 'riskDangerListModify',
    component: RiskDangerList_Modify
  },
  {
    path: '/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/RiskDangerList/RiskDangerAdd_Modify/:dangerModifyId',
    name: 'riskDangerAddModify',
    component: RiskDangerAdd_Modify
  },
  // 审核风险隐患列表
  {
    path: '/Index/:userId/My/RiskDangerReviewList',
    name: 'riskDangerReviewList',
    component: RiskDangerReviewList
  },
  // 隐患审核详情
  {
    path: '/Index/:userId/My/RiskDangerReviewInfo/:dangerId',
    name: 'riskDangerReviewInfo',
    component: RiskDangerReviewInfo
  },
  // 审核风险整改列表
  {
    path: '/Index/:userId/My/MyRiskDangerReviewListModify',
    name: 'myRiskDangerReviewListModify',
    component: MyRiskDangerReviewListModify
  },
  // 隐患审核整改详情
  {
    path: '/Index/:userId/My/MyRiskDangerReviewInfoModify/:dangerId',
    name: 'myRiskDangerReviewInfoModify',
    component: MyRiskDangerReviewInfoModify
  },
  {
    path: "/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/:addEvaluationList/EvaluationList/:status",
    name: "evaluationList",
    component: EvaluationList
  },
  {
    path: "/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/EvaluationList/evaluationInfo/:evaluationInfoId",
    name: "evaluationInfo",
    component: EvaluationInfo
  },
  {
    path: "/Index/:userId/RiskList/RiskInfo/:riskId/:add/:editStatus/addEvaluation/:evaluationInfoId",
    name: "addEvaluation",
    component: AddEvaluation
  },
  {
    path: '/Login/:userId/Risk/RiskMap',
    name: 'riskMap',
    component: RiskMap
  },
  {
    path: '/Index/:userId/My/MyInfo',
    name: 'myInfo',
    component: MyInfo
  },
  {
    path: '/Index/:userId/My/AuditList',
    name: 'auditList',
    component: AuditList
  },
  {
    path: '/Index/:userId/My/MyAuditList',
    name: 'myAuditList',
    component: MyAuditList
  },
  {
    path: '/Index/:userId/My/MyAuditInfo',
    name: 'myAuditInfo',
    component: MyAuditInfo
  },
  {
    path: '/Index/:userId/My/MyAssessAuditList',
    name: 'myAssessAuditList',
    component: MyAssessAuditList
  },
  {
    path: '/Index/:userId/My/MyAssessAuditInfo:id/:riskId',
    name: 'myAssessAuditInfo',
    component: MyAssessAuditInfo
  },
  {
    path: '/Index/:userId/My/AuditInfo',
    name: 'auditInfo',
    component: AuditInfo
  },
  {
    path: "/Index/:userId/My/KnowledgeBaseList",
    name: 'knowledgeBaseList',
    component: KnowledgeBaseList
  },
  {
    path: "/Index/:userId/My/KnowledgeBaseInfo/:knowId",
    name: 'knowledgeBaseInfo',
    component: KnowledgeBaseInfo
  },
  {
    path: "/Login/Risk/RiskMap/warningList/:id",
    name: "warningList",
    component: WarningList
  },
  {
    path: "/Login/Risk/RiskMap/warningInfo/:Id",
    name: 'warningInfo',
    component: WarningInfo
  },
  {
    path: "/Login/Risk/RiskMap/RiskWarningInfo/:Id",
    name: 'riskWarningInfo',
    component: RiskWarningInfo
  },
  {
    path: "/Map/Map/Map/Map",
    name: "getLngLat",
    component: GetLngLat
  },
  {
    path: "/TextMap",
    name:"textMap",
    component: TextMap
  }
]
}
