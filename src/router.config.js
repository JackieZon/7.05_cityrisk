
// const Home = resolve => require(['./router/home/Index.vue'], resolve)

const Login = resolve => require(['./router/login/Login.vue'], resolve)
const Index = resolve => require(['./router/index/Index.vue'], resolve)
const RiskList = resolve => require(['./router/riskList/Index.vue'], resolve)
const RiskInfo = resolve => require(['./router/riskList/RiskInfo.vue'], resolve)
const RiskDanger = resolve => require(['./router/riskList/RiskDanger.vue'], resolve)
const My = resolve => require(['./router/my/Index.vue'], resolve)
const MyInfo =  resolve => require(['./router/my/MyInfo.vue'], resolve)
const AuditList = resolve => require(['./router/my/AuditList.vue'], resolve)
const MyAuditList = resolve => require(['./router/my/MyAuditList.vue'], resolve)
const WarningList = resolve => require(['./router/warning/Index'],resolve)
const Alarm = resolve => require(['./router/warning/Alarm'],resolve)
const Warning = resolve => require(['./router/warning/RiskWarning'], resolve)

const RiskAdd = resolve => require(['./router/risk/add/Index.vue'], resolve)
const RiskMap = resolve => require(['./router/riskMap/Index.vue'], resolve)
const BasicInfoA = resolve => require(['./router/risk/add/BasicInfoA.vue'], resolve)
const BasicInfoB = resolve => require(['./router/risk/add/BasicInfoB.vue'], resolve)
const BasicInfoB_Evaluation = resolve => require(['./router/risk/add/BasicInfoB_Evaluation.vue'], resolve)
const BasicInfoC = resolve => require(['./router/risk/add/BasicInfoC.vue'], resolve)
const BasicInfoD = resolve => require(['./router/risk/add/BasicInfoD.vue'], resolve)


// RiskList
// const 

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
      children:[
        {
          path:'/Index/RiskAdd',
          name:'riskAdd',
          component: RiskAdd,
          children:[
            {
              path:'/Index/RiskAdd/BasicInfoA',
              name: 'basicInfoA',
              component: BasicInfoA,
            },
            {
              path:'/Index/RiskAdd/BasicInfoB',
              name: 'basicInfoB',
              component: BasicInfoB,
            },
            {
              path:'/Index/RiskAdd/BasicInfoC',
              name: 'basicInfoC',
              component: BasicInfoC,
            },
            {
              path:'/Index/RiskAdd/BasicInfoD',
              name: 'basicInfoD',
              component: BasicInfoD,
            },
            {
              path:'/Index/RiskAdd/Evaluation',
              name: 'BasicInfoB_Evaluation',
              component: BasicInfoB_Evaluation,
            },
          ]
        },
        {
          path:'/Index/RiskList',
          name: 'riskList',
          component: RiskList
        },
        {
          path:'/Index/My',
          name: 'my',
          component: My
        }
      ]
    },
    {
      path:'/Index/RiskList/RiskInfo/:id',
      name: 'riskInfo',
      component: RiskInfo
    },
    {
      path:'/Index/RiskList/RiskInfo/RiskDanger/:id',
      name: 'riskDanger',
      component: RiskDanger
    },
    {
      path:'/Login/Risk/RiskMap',
      name:'riskMap',
      component: RiskMap
    },
    // {
    //   path:'/Home',
    //   name:'home',
    //   component: Home
    // },
    {
      path:'/Index/My/MyInfo',
      name: 'myInfo',
      component: MyInfo
    },
    {
      path:'/Index/My/AuditList',
      name: 'auditList',
      component: AuditList
    },
    {
      path:'/Index/My/MyAuditList',
      name: 'myAuditList',
      component: MyAuditList
    },
    {
      path:"/Login/Risk/RiskMap/warningList",
      name:"warningList",
      component: WarningList,
      children:[
        {
          path:'/warningList/warning',
          name: 'warning',
          component: Warning
        },
        {
          path:"/warningList/alarm",
          name: 'alarm',
          component: Alarm
        }
        ]
    }
  ]
}
