<template>
	<div class="hello">
		<div class="back-img">
			<!-- <img src="../assets/time.jpg" alt=""> -->
		</div>
		<div class="top-line">
			<van-icon class="icon" @click="onClickLeft" color="white" size="30" name="arrow-left" />
		</div>
		<div class="message">
			<input  @blur.prevent="changeBlur()" placeholder="请输入账号"  oninput="value=value.replace(/[^\d]/g,'')" v-model="loginId" type="text">
			<input  @blur.prevent="changeBlur()" placeholder="请输入用户名" v-model="userName" type="text">
			<input  @blur.prevent="changeBlur()" placeholder="请输入密码" v-model="userPassword" type="password">
			<input  @blur.prevent="changeBlur()" placeholder="请确定密码" v-model="userPassword1" type="password">
			<input  @blur.prevent="changeBlur()" placeholder="请输入电话" v-model="userPhone" type="text">
			<input  @blur.prevent="changeBlur()" placeholder="请输入邮箱" v-model="userEmail" type="text">
			<input @click="show = true" placeholder="请选择部门" readonly v-model="department" type="text">
				<van-popup
				v-model="show"
				position="bottom"
			>
			</van-popup>
			
		</div>
		<div class="queryMessage" @click="jump">注册</div>	
		<van-popup v-model="show" position="bottom">
			<van-picker
				show-toolbar
				:columns="departmentList"
				@cancel="show = false"
				@confirm="onConfirm"
			/>
		</van-popup>
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			show:false,
			loginId: '',
			userName: '',
			userPassword: '',
			userPassword1: '',
			userPhone: '',
			userEmail: '',
			department: '',
			departmentList:[]
		}
	},
	mounted() {
		Toast.setDefaultOptions({ duration: 2000 })
		this.getDepartMent()
	},
	methods:{
		//解决ios键盘弹起页面无法恢复原样的问题
		changeBlur() {
			const u = navigator.userAgent
			// const app = navigator.appVersion
			const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			if (isIOS) {
				setTimeout(() => {
					const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
					window.scrollTo(0, Math.max(scrollHeight - 1, 0))
				}, 200)
			}
		},
		onConfirm(value,index){
			console.log(value)
			console.log(index)
			this.department = value.departmentName
			this.show = false
		},
		// 获取部门列表、
		getDepartMent() {
			this.axios({
				url:'/test/meeting/conference/department/list',
				method:'POST',
				data:{}
			})
			.then(res=>{
				console.log('res',res)
				const arr = res.data.data.records
				const department = []
				arr.forEach((item,index)=>{
					this.$set(item, 'text', item.departmentName)
					department.push(item.departmentName)
				})
				this.departmentList = arr
				// his.departmentList = department
			})
		},
		onClickLeft() {
			this.$router.push('/login')
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
			// let password = this.password
			let password = this.$md5(this.userPassword)
			let password1 = this.$md5(this.userPassword1)
			// console.log('password',password)
			if(this.loginId === ''){
				Toast('请输入账号')
			}else if (this.userName === '') {
				Toast('请输入用户名')
			} else if(password === '') {
				Toast('请输入密码')
			} else if(this.userPhone === ''){
				Toast('请输入电话')
			} else if(this.userEmail === ''){
				Toast('请输入邮箱')
			} else if(this.department === ''){
				Toast('请输入部门')
			} else if(this.loginId.length <6){
				Toast('用户账号至少6位')
			} else if(password1 !== password){
				Toast('请确认输入密码一致')
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
					url:'/test/meeting/conference/user',
					data:{
						loginId: this.loginId,
						name: this.userName,
						password: password,
						mobile: this.userPhone,
						email: this.userEmail,
						department: this.department,
						jurisdiction: 2
					}
				}).then((res)=>{
					Toast.clear()
					if(res.data.code === 200){
						Toast.success('注册成功')
						this.$router.push('/login')
						// console.log(res)
					}else{
						// console.log(111)
						Toast.fail('该用户名已存在')
					}
				})
				.catch(error => {
					 Toast.fail(error.response.data.message)                }
				)
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