<template>
	<div class="hello">
		<div class="back-img">
			<!-- <img src="../assets/time.jpg" alt=""> -->
		</div>
		<div class="top-line">
			<van-icon class="icon" @click="onClickLeft" color="white" size="30" name="arrow-left" />
		</div>
		<div class="message">
			<input readonly placeholder="请输入账号" v-model="user.loginId" type="text">
			<input readonly placeholder="请输入用户名" v-model="user.name" type="text">
			<input placeholder="请输入电话" v-model="user.mobile" type="text">
			<input placeholder="请输入邮箱" v-model="user.email" type="text">
			<input placeholder="请输入部门" v-model="user.department" type="text">
		</div>
		<div class="queryMessage" @click="jump">修改</div>	
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			// loginId: '',
			// userName: '',
			// userPassword: '',
			// userPassword1: '',
			// userPhone: '',
			// userEmail: '',
            // department: '',
            user:this.$store.state.user
		}
	},
	mounted() {
		// console.log(this.axios)
		// console.log(this.isEmail('11111@qq.com'));
		Toast.setDefaultOptions({ duration: 2000 })
	},
	computed:{

	},
	methods:{
		onClickLeft() {
			this.$router.push('/index/myMessage')
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
			// let password = this.$md5(this.userPassword)
			// let password1 = this.$md5(this.userPassword1)
			// console.log('password',password)
			if(this.user.loginId === ''){
				Toast('请输入账号')
			}else if (this.user.name === '') {
				Toast('请输入用户名')
			} else if(this.user.mobile === ''){
				Toast('请输入电话')
			} else if(this.user.email === ''){
				Toast('请输入邮箱')
			} else if(this.user.department === ''){
				Toast('请输入部门')
			} else if(this.isPhoneAvailable(this.user.mobile) === false){
				Toast('请输入正确的号码格式')
			} else if(this.isEmail(this.user.email) === false){
				Toast('请输入正确的邮箱格式')
			} else {
				Toast.loading({
					message: '修改中...',
					forbidClick: true,
					loadingType: 'spinner'
				})
				this.axios({
					method:'PUT',
					url:'/test/meeting/conference/user',
					data:this.user
				}).then((res)=>{
					Toast.clear()
					if(res.data.code === 200){
						Toast.success('修改成功')
						console.log(res)
						console.log('1111',this.user)
						sessionStorage.setItem('user',this.user)
					}else{
						Toast.fail('修改失败')
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