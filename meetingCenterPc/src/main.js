// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/reset.css'
import axios from 'axios'
import qs from 'qs'
import Vant from 'vant'
import 'vant/lib/index.css'
import md5 from 'js-md5'
import Vuex from 'vuex'
import store from './store/store'

Vue.prototype.$md5 = md5
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs
axios.defaults.baseURL = ''
Vue.use(Vant)
axios.defaults.baseURL = 'http://192.168.2.129:8080/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
