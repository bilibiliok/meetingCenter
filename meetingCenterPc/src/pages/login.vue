<template>
	<div class="hello">
		<div class="top-line">
			<van-icon class="icon" @click="back" size="30" name="arrow-left" />
		</div>
		<div class="headimg">
			<img v-if="!loginId"  height="80" width="80" src="../assets/test.jpg" alt="">
			<img v-else src="../assets/cat.jpg" alt="" height="80" width="80">
		</div>
		<div class="userMessage">
			<div class="userNumber">
				<input v-model="loginId" ref="number" @blur="leaveNumber" @focus="watchNumber" type="text" placeholder="请输入用户名">
			</div>
			<div class="userPassword">
				<input v-model="password" ref="password" @blur="leavePassword" @focus="watchPassword" type="password" placeholder="请输入密码">
			</div>
		</div>
		<div class="login">
			<div @keyup.enter.native="information" :class="['queryMessage',{'search':show}]" @click="information">登录</div>
			<div class="register">没有账号？<span @click="jump">立即注册</span></div>
		</div>
		<div class="otherway">
			<span>——&nbsp;第三方登录&nbsp;——</span>
			<div class="ways">
				<img width="50" height="50" src="../assets/weixin.png" alt="">
			</div>
			<div class="ways">
				<img width="50" height="50" src="../assets/qq.png" alt="">
			</div>
			<div class="ways">
				<img width="50" height="50" src="../assets/zhifubao.png" alt="">
			</div>
			<div class="ways-name">

			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			loginId: '',
			password: '',
			show: false,
			count:'',
		}
	},
	created() {
		
	},
	updated() {
		if (this.loginId&& this.password) {
			if (!this.show) {
				this.show = true
			}
		} else if (this.show) {
			this.show = false
		}
	},
	methods:{
		back() {
			this.$router.go(-1)
		},
		//监听账号
		watchNumber() {
			this.$refs.number.style.borderBottom = '.5px solid #22c8d8'
		},
		//离开
		leaveNumber() {
			this.$refs.number.style.borderBottom = '.5px solid #e8e8e8'
		},
		//监听密码
		watchPassword() {
			this.$refs.password.style.borderBottom = '.5px solid #22c8d8'
		},
		leavePassword() {
			this.$refs.password.style.borderBottom = '.5px solid #e8e8e8'
		},
		// 登录账号
		information() {
			let password = this.$md5(this.password)
			// console.log('password',password)
			let params = {
				loginId:this.loginId,
				password:password
			}
			// this.$store.dispatch('Login', params)
				// .then((res) => {
				// 	Toast.success('登陆成功')
				// 	this.$router.push({ 
				// 		path: '/index/myMessage'
				// 	});
				// })
				// .catch((error) => {
				// 	console.log('1111',error.response); 
				// });
			this.axios({
				method:'POST',
				url:'/test/meeting/conference/user/login',
				data:{
					loginId:this.loginId,
					password:password
				}
			})
			.then((res)=>{
				if(res.data.code === 200){
					Toast.success('登录成功')
					console.log('res',res.data.data)
					this.count = res.data.data[0]
					let objStr = JSON.stringify(this.count) //先转化为键值对模式
					sessionStorage.setItem('user',objStr)
					 localStorage.setItem('user1',objStr)
					// let a = sessionStorage.getItem('user')
					// console.log('a',a)
					let obj1 = JSON.parse(sessionStorage.getItem('user'))
					// console.log('obj1',obj1.name)
					this.$store.dispatch('user',res)
					this.$router.push({
						path: '/index/myMessage',
						query:{
							active: 1
						}
					})
				}else{
					Toast.fail(res.data.msg)
				}
			})
		},
		// 注册账号
		jump() {
			this.$router.push('/register')
		}
	}
}
</script>
<style lang="less" scoped>
	.hello{
		color: #333;
		font-size: 16px;
		// background: #f5f5f5;
		min-height: 100vh;
		width: 100vw;
		.headimg{
			padding-top: .1rem;
			text-align: center;
			img{
				border-radius: 50%;
			}
		}
		.userMessage{
			padding-top: .1rem;
			.userNumber{
				text-align: center;
				input{
					width: 80%;
					// background: #f5f5f5;
					height: 40px;
					border-bottom: .5px solid #e8e8e8;
					caret-color:#22c8d8;
				}
			}
			.userPassword{
				padding-top: .1rem;
				text-align: center;
				input{
					width: 80%;
					// background: #f5f5f5;
					height: 40px;
					border-bottom: .5px solid #e8e8e8;
					caret-color:#22c8d8;
				}
			}
		}
		.login{
			padding-top: .5rem;
			width: 80%;
			margin: 0 auto;
			.queryMessage {
				width: 315px;
				height: 50px;
				background: #22c8d8;
				border-radius: 3px;
				text-align: center;
				font-size: 17px;
				color: #ffffff;
				line-height: 50px;
				margin: 0 auto;
				box-sizing: border-box;
				margin-top: 30.5px;
				opacity: 0.3;
			}
			.search {
				opacity: 1;
			}
			.register{
				text-align: center;
				padding-top:5px;
				&>span{
					color:#22c8d8
				}
			}
		}
		.otherway{
			margin-top: 100px;
			// text-align: center;
			&>span{
				width: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: center
			}
			.ways{
				display: inline-block;
				margin-top: 30px;
				&>img{
					padding-left: 55px
				}
			}
		}
	}
</style>