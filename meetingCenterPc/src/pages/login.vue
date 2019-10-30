<template>
	<div class="hello">
		<div class="top-line">
			<van-icon class="icon" @click="back" size="30" name="cross" />
		</div>
		<div class="headimg">
			<img src="../assets/cat.jpg" alt="" height="80" width="80">
		</div>
		<div class="userMessage">
			<div class="userNumber">
				<input v-model="phone" ref="number" @blur="leaveNumber" @focus="watchNumber" type="text" placeholder="请输入手机号">
			</div>
			<div class="userPassword">
				<input v-model="password" ref="password" @blur="leavePassword" @focus="watchPassword" type="password" placeholder="请输入密码">
			</div>
		</div>
		<div class="login">
			<div :class="['queryMessage',{'search':show}]" @click="information">登录</div>
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
export default {
	data() {
		return {
			phone: '',
			password: '',
			show: false
		}
	},
	created() {
		
	},
	updated() {
		if (this.phone && this.password) {
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
		.headimg{
			padding-top: .2rem;
			text-align: center;
			img{
				border-radius: 50%;
			}
		}
		.userMessage{
			padding-top: 1rem;
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
				padding-top: .5rem;
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
			padding-top: 3rem;
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
		}
		.otherway{
			margin-top: 180px;
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