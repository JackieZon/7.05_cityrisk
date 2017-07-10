const Home = resolve => require(['./components/HelloFromVux'], resolve)
const Login = resolve => require(['./router/login/Login.vue'], resolve)
const AddRisk = resolve => require(['./router/login/addRisk/AddRisk.vue'], resolve)
export default {
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path:'/login/AddRisk',
      name:'addRisk',
      component: AddRisk
    },
  ]
}
