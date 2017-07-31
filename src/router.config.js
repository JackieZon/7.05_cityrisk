
const Home = resolve => require(['./router/home/Index.vue'], resolve)

const Login = resolve => require(['./router/login/Login.vue'], resolve)
const Index = resolve => require(['./router/index/Index.vue'], resolve)
const RiskList = resolve => require(['./router/riskList/Index.vue'], resolve)
const RiskInfo = resolve => require(['./router/riskList/RiskInfo.vue'], resolve)
const RiskDanger = resolve => require(['./router/riskList/RiskDanger.vue'], resolve)
const My = resolve => require(['./router/my/Index.vue'], resolve)
const MyInfo = resolve => require(['./router/my/MyInfo.vue'], resolve)
const AuditList = resolve => require(['./router/my/AuditList.vue'], resolve)
const MyAuditList = resolve => require(['./router/my/MyAuditList.vue'], resolve)
const MyAuditInfo = resolve => require(['./router/my/MyAuditInfo.vue'], resolve)
const AuditInfo = resolve => require(['./router/my/AuditInfo.vue'], resolve)
const WarningList = resolve => require(['./router/warning/Index'], resolve)
const Alarm = resolve => require(['./router/warning/Alarm'], resolve)
const Warning = resolve => require(['./router/warning/RiskWarning'], resolve)

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
    path: '/Index',
    name: 'index',
    component: Index,
    children: [
      {
        path:'/Index/Home',
        name:'home',
        component: Home
      },
      {
        path: '/Index/My',
        name: 'my',
        component: My
      },
      {
        path: '/Index/RiskMap',
        name: 'homeMap',
        component: RiskMap
      },
    ]
  },
  {
    path: '/Index/Home/RiskAdd/',
    name: 'riskAdd',
    component: RiskAdd,
    children: [
      {
        path: '/Index/RiskAdd/BasicInfoA',
        name: 'basicInfoA',
        component: BasicInfoA,
      },
      {
        path: '/Index/RiskAdd/BasicInfoB',
        name: 'basicInfoB',
        component: BasicInfoB,
      },
      {
        path: '/Index/RiskAdd/BasicInfoC',
        name: 'basicInfoC',
        component: BasicInfoC,
      },
      {
        path: '/Index/RiskAdd/BasicInfoD',
        name: 'basicInfoD',
        component: BasicInfoD,
      },
    ]
  },
  {
    path: '/Index/RiskMap/RiskList',
    name: 'riskList',
    component: RiskList
  },
  {
    // editStatus == 0; 0仅查看信息，1带撤销和编辑，2带审核按钮
    // /:add/:editStatus
    path: '/Index/RiskList/RiskInfo/:id',
    name: 'riskInfo',
    component: RiskInfo
  },
  {
    path: '/Index/RiskList/RiskInfo/RiskDanger/:id',
    name: 'riskDanger',
    component: RiskDanger
  },
  {
    path: "/Index/RiskList/RiskInfo/EvaluationList/:id",
    name: "evaluationList",
    component: EvaluationList
  },
  {
    path: "/Index/RiskList/RiskInfo/EvaluationList/evaluationInfo/:infoId",
    name: "evaluationInfo",
    component: EvaluationInfo
  },
  {
    path: "/Index/RiskList/addEvaluation/:id",
    name: "addEvaluation",
    component: AddEvaluation
  },
  {
    path: '/Login/Risk/RiskMap',
    name: 'riskMap',
    component: RiskMap
  },
  {
    path: '/Index/My/MyInfo',
    name: 'myInfo',
    component: MyInfo
  },
  {
    path: '/Index/My/AuditList',
    name: 'auditList',
    component: AuditList
  },
  {
    path: '/Index/My/MyAuditList',
    name: 'myAuditList',
    component: MyAuditList
  },
  {
    path: '/Index/My/MyAuditInfo',
    name: 'myAuditInfo',
    component: MyAuditInfo
  },
   {
    path: '/Index/My/MyAssessAuditList',
    name: 'myAssessAuditList',
    component: MyAssessAuditList
  },
  {
    path: '/Index/My/AuditInfo',
    name: 'auditInfo',
    component: AuditInfo
  },
  {
    path: "/Login/Risk/RiskMap/warningList",
    name: "warningList",
    component: WarningList,
    children: [
      {
        path: '/warningList/warning',
        name: 'warning',
        component: Warning
      },
      {
        path: "/warningList/alarm",
        name: 'alarm',
        component: Alarm
      }
    ]
  },
  {
    path: "/Map/Map/Map/Map",
    name: "getLngLat",
    component: GetLngLat
  }
  ]
}
