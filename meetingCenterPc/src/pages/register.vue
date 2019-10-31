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
		console.log(this.axios)
	},
	methods:{
		onClickLeft() {
			this.$router.push('login')
		},
		// 注册账号
		jump() {
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
				console.log(res)
			})
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