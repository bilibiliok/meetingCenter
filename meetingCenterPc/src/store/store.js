import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import {Toast} from 'vant'
const state = {//要设置的全局访问的state对象
    user: null,
    // isState: false,
    token: '',
    status: '',
    // count: 1
    //要设置的初始属性值
}
//
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
}
//
const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, user) {
        state.status = 'success'
        // state.token = token;
        state.user = user
        console.log(state.user)
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''; 
        state.user = null;
        console.log('user',state.user)
    },
}
//
const actions = {
    Login({commit}, user) {
        // console.log('{commit}',{commit})
        // console.log('user',user)
        return new Promise((resolve, reject) => {
            // console.log('resolve',resolve)
            // console.log('reject',reject)
            commit('auth_request')
            // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
            axios({
                method:'POST',
                url:'/test/meeting/conference/user/login',
                data:user
            })
            .then(resp => {
                console.log('resp',resp)
                // const token = resp.data.token
                if(resp.data.code === 900){
                    console.log('re1sp',resp)
                    Toast.fail(resp.data.msg)
                } else {
                    const user = resp.data.data[0]
                    console.log(user)
                    localStorage.setItem('user',user)
                    // localStorage.setItem('token', token)
                    // 每次请求接口时，需要在headers添加对应的Token验证
                    // axios.defaults.headers.common['Authorization'] = token
                    // 更新token
                    commit('auth_success',user)
                    resolve(resp)
                    Toast.success('登陆成功')
					console.log('res',resp)
					// this.$store.dispatch('user',res)
					this.$router.push('/index/myMessage')
                }
            })
            .catch(err => {
                commit('auth_error')
                // localStorage.removeItem('token')
                reject(err)
            })
        })
      },
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store