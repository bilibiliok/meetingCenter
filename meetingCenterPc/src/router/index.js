import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')
const login = () => import('../pages/login')
const showTab = () => import('../pages/home/showTab')
const appointment = () => import('../pages/home/appointment')
const myMessage = () => import('../pages/home/myMessage')
const register = () => import('../pages/register')
const showMessage = () => import('../pages/showMessage')
const addMeeting = () => import('../pages/home/addMeeting')
const meetingList = () => import('../pages/home/meetingList')
const addMeetingCenter = () => import('../pages/home/addMeetingCenter')
const missionInfo = () => import('../pages/home/missionInfo')


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
    // 修改信息
    {
      path: '/showMessage',
      name: 'showMessage',
      component: showMessage
    },
    // 新增会议
    {
      path: '/addMeeting',
      name: 'addMeeting',
      component: addMeeting
    },
    // 会议室列表
    {
      path: '/meetingList',
      name: 'meetingList',
      component: meetingList
    },
    // 新增会议室
    {
      path: '/addMeetingCenter',
      name: 'addMeetingCenter',
      component: addMeetingCenter
    },
    //会议室详情
    {
      path: '/missionInfo',
      name: 'missionInfo',
      component: missionInfo
    },
    
    
    
  ]
})

