const Home = resolve => require(['./router/Home/Home.vue'], resolve)
const AddRisk = resolve => require(['./router/Home/addRisk/Index.vue'], resolve)
const RiskMap = resolve => require(['./router/Home/riskMap/Index.vue'], resolve)
const BasicInfoA = resolve => require(['./router/Home/addRisk/children/BasicInfoA.vue'], resolve)
const BasicInfoB = resolve => require(['./router/Home/addRisk/children/BasicInfoB.vue'], resolve)
const BasicInfoC = resolve => require(['./router/Home/addRisk/children/BasicInfoC.vue'], resolve)
const BasicInfoD = resolve => require(['./router/Home/addRisk/children/BasicInfoD.vue'], resolve)
const Evaluation = resolve => require(['./router/Home/addRisk/children/Evaluation.vue'], resolve)
// const 

export default {
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path:'/Home/AddRisk',
      name:'addRisk',
      component: AddRisk,
      children:[
        {
          path:'/',
          component: BasicInfoA,
        },
        {
          path:'/addRisk/BasicInfoA',
          name: 'basicInfoA',
          component: BasicInfoA,
        },
        {
          path:'/addRisk/BasicInfoB',
          name: 'basicInfoB',
          component: BasicInfoB,
        },
        {
          path:'/addRisk/BasicInfoC',
          name: 'basicInfoC',
          component: BasicInfoC,
        },
        {
          path:'/addRisk/BasicInfoD',
          name: 'basicInfoD',
          component: BasicInfoD,
        },
        {
          path:'/addRisk/Evaluation',
          name: 'evaluation',
          component: Evaluation,
        },
      ]
    },
    {
      path:'/Home/AddRisk/RiskMap',
      name:'riskMap',
      component: RiskMap
    },
  ]
}
