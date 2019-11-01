<template>
	<div class="hello">
		<div class="back-img">
			<!-- <img src="../assets/time.jpg" alt=""> -->
		</div>
		<div class="top-line">
			<van-icon class="icon" @click="onClickLeft" color="white" size="30" name="arrow-left" />
		</div>
		<div class="message">
			<input placeholder="请输入账号" v-model="loginId" type="text">
			<input placeholder="请输入用户名" v-model="userName" type="text">
			<input placeholder="请输入密码" v-model="userPassword" type="password">
			<input placeholder="请输入电话" v-model="userPhone" type="text">
			<input placeholder="请输入邮箱" v-model="userEmail" type="text">
			<input placeholder="请输入部门" v-model="department" type="text">
		</div>
		<!-- <van-cell-group>
			<van-field
				v-model="username"
				label="用户名"
				placeholder="请输入用户名"
			/>
			<van-field
				v-model="userPhone"
				label="电话"
				placeholder="请输入电话"
			/>
			<van-field
				v-model="userEmail"
				label="邮箱"
				placeholder="请输入邮箱"
			/>
			<van-field
				v-model="department"
				label="部门"
				placeholder="请输入部门"
			/>
			<van-field
				v-model="userPassword"
				label="密码"
				placeholder="请输入密码"
			/>
			<van-field
				v-model="userPassword1"
				label="密码"
				placeholder="请确认密码"
			/>
		</van-cell-group> -->
		<div class="queryMessage" @click="jump">注册</div>	
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			loginId: '',
			userName: '',
			userPassword: '',
			userPassword1: '',
			userPhone: '',
			userEmail: '',
			department: ''
		}
	},
	mounted() {
		// console.log(this.axios)
		// console.log(this.isEmail('11111@qq.com'));
		
	},
	methods:{
		onClickLeft() {
			this.$router.push('login')
		},
		// 验证电话
		isPhoneAvailable(phonevalue) {
			const phoneReg = /^1[3-578]\d{9}$/
			if (phoneReg.test(phonevalue)) {
				return true
			}
			return false
		},
		// 验证邮箱
		isEmail(val) {
			let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			let domains= ["qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn"];
			if(pattern.test(val)) {
				let domain = val.substring(val.indexOf("@")+1);
				for(let i = 0; i< domains.length; i++) {
				if(domain == domains[i]) {
					return true;
				}
				}
			}
			return false;
		},
		// 注册账号
		jump() {
			if(this.userName === ''){
				Toast('请输入用户名')
			} else if(this.userPassword === ''){
				Toast('请输入密码')
			} else if(this.userPhone === ''){
				Toast('请输入电话')
			} else if(this.userEmail === ''){
				Toast('请输入邮箱')
			} else if(this.department === ''){
				Toast('请输入部门')
			} else if(this.isPhoneAvailable(this.userPhone) === false){
				Toast('请输入正确的号码格式')
			} else if(this.isEmail(this.userEmail) === false){
				Toast('请输入正确的邮箱格式')
			} else {
				Toast.loading({
					message: '注册中...',
					forbidClick: true,
					loadingType: 'spinner'
				})
				this.axios({
					method:'POST',
					url:'http://192.168.2.116:8080/test/meeting/conference/user',
					data:{
						loginId: this.loginId,
						name: this.userName,
						password: this.userPassword,
						mobile: this.userPhone,
						email: this.userEmail,
						department: this.department,
						jurisdiction: 2
					}
				}).then((res)=>{
					Toast.clear()
					if(res.data.code === 200){
						Toast.success('注册成功')
						console.log(res)
					}else{
						console.log(111)
						Toast.fail('该用户名已存在')
					}
				})
			}
			
		},
	}
}
</script>
<style lang="less" scoped>
	input{
		width: 80%;
		background: #fff;
		z-index: 99999;
		height: 30px;
		line-height: 30px;
		border-radius: 30px;
		background: transparent;
		border: .5px solid #fff;
		padding-left: 10px;
		color: #fff
	}
	:-ms-input-placeholder{
		color: #fff
	}
	::-webkit-input-placeholder{
		color: #fff
	}
	.hello{
		background-image: url('../assets/time.jpg');
		background-size: 100% 100%;
		font-size: .16rem;
		min-height: 100vh;
		.message{
			padding-top: 50px;
			text-align: center;
			padding-bottom:20px;
			&>input{
				margin-bottom:20px
			}
		}
	}
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
	}
</style>