<template>
	<div class="hello">
		<div class="user">
			<div v-if="user" class="logo">
				<img src="../../assets/cat.jpg" alt="" height="80" width="80">
			</div>
			<div v-else class="logo">
				<img src="../../assets/time.jpg" alt="" height="80" width="80">
			</div>
			<div v-if="user" class="userMessage">
				<div class="userName">
					<span>{{user.name}}</span>
				</div>
				<div class="userPhone">
					<span>用户ID:{{user.loginId}}</span>
				</div>
			</div>
			<div v-else class="userMessage">
				<div class="userName">
					<span>登录/注册</span>
				</div>
			</div>
		</div>
		<div class="message">
			<van-cell-group @click="changeMessage">
				<van-field
					center
					clearable
					readonly
					label="个人中心"
				>
					<van-icon slot="right-icon" name="arrow" />
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field
					center
					clearable
					readonly
					label="修改密码"
				>
					<van-icon slot="right-icon" name="arrow" />
				</van-field>
			</van-cell-group>
		</div>
		<div class="safe">
			<van-cell-group>
				<van-field
					@click="rubbish"
					center
					clearable
					readonly
					label="清除缓存"
				>
					<van-icon slot="right-icon" name="arrow" />
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field
					center
					clearable
					readonly
					label="关于我们"
				>
					<van-icon slot="right-icon" name="arrow" />
				</van-field>
			</van-cell-group>
		</div>
		<div class="leave">
			<van-button @click="leaveOut" size="large">退出登录</van-button>
		</div>
		<div @click="deleteMessage" class="delete">
			<van-button size="large">账户注销</van-button>
		</div>
	</div>
</template>
<script>
import {Toast,Dialog} from 'vant'
export default {
	data() {
		return {
			phone:'',
			name:'',
			user:''
		}
	},
	mounted(){
		this.user = JSON.parse(sessionStorage.getItem('user')) //转化为json字符串之后再转回来
		if(!this.user){
			Toast.fail('请先完成账号登录')
			this.$router.push('/login')
		}
	},
	watch:{
		user(nvl,ovl){
			if(nvl === ''){
				this.$router.push({
				path:'/login'
			})
			}
		}
	},
	methods:{
		changeMessage(){
			this.$router.push({
				path:'/showMessage'
			})
		},
		//退出登录
		leaveOut(){
			// this.$store.commit('logout')
			sessionStorage.clear()
			this.$router.push('/login')
		},
		// 清除缓存
		rubbish() {
			Toast.success('清除成功')
		},
		// 账户注销
		deleteMessage() {
			Dialog.confirm({
			title: '注销',
			message: '一旦注销将无法找回账号，确定要注销吗？'
			}).then(() => {
				this.axios({
					method:'DELETE',
					url:`/test/meeting/conference/user/${this.user.id}`,
				})
				.then((res) => {
					if(res.data.code === 200){
						Toast.success('注销成功')
						sessionStorage.clear()
						this.$router.push('/login')
					} else {
						Toast.fail('注销失败')
					}
				})
			}).catch(() => {
			// on cancel
			});
		}
	}
}
</script>
<style lang="less" scoped>
	.hello{
		background:#f5f5f5;
		.user{
			display: flex;
			border-bottom: .5px solid #e8e8e8;
			padding-bottom:10px
		}
		min-height: 100vh;
		.logo{
			display: inline-block;
			&>img{
				display: inline-block;
				border-radius: 50%;
				padding-left: 5%;
				padding-top: 5%
			}
		}
		.userMessage{
			// float: right;
			padding-left: 10px;
			padding-top: 30px;
			.userPhone{
				padding-top: 10px
			}
		}
		.safe{
			margin-top:10px
		}
		.leave{
			margin-top:10px
		}
		.delete{
			margin-top:10px
		}

	}
</style>
<style>
	
</style>