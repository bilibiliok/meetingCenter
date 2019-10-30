import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')
const login = () => import('../pages/login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
