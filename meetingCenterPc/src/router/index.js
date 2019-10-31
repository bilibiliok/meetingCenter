import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')
const login = () => import('../pages/login')
const showTab = () => import('../pages/home/showTab')
const appointment = () => import('../pages/home/appointment')
const myMessage = () => import('../pages/home/myMessage')
const register = () => import('../pages/register')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', 
    redirect: '/index/showTab' },
    { path: '/index', 
    redirect: '/index/showTab' },
    {
      path: '/index/',
      component: index,
      children:[
        // 首页
        {
          path: 'showTab',
          component: showTab,
        },
        //预约
        {
          path: 'appointment',
          component:appointment
        },
        // 我的
        {
          path: 'myMessage',
          component:myMessage
        }
      ]
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]
})
