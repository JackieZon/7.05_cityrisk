const Home = resolve => require(['./router/Home/Home.vue'], resolve)
const AddRisk = resolve => require(['./router/Home/addRisk/Index.vue'], resolve)
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
      // children:[
      //   {
      //     path:''
      //   },
      // ]
    },
  ]
}
