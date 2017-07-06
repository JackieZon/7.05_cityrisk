const Home = resolve => require(['./../src/components/HelloFromVux'], resolve)
const Login = resolve => require(['./../src/router/login/Login.vue'], resolve)

export default {
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
}
