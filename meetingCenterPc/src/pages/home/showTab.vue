<template>
	<div class="hello">
		<van-nav-bar
			title="首页"
			left-arrow
		/>
		<van-grid :column-num="3">
			<van-grid-item @click="$router.push('/meetingList')" icon="label-o" text="会议室列表" />
			<van-grid-item icon="notes-o" text="会议记录" />
			<van-grid-item @click="myMeeting" icon="friends-o" text="我的会议" />
			<van-grid-item @click="$router.push('/myDateTime')" icon="todo-list-o" text="我的日历" />
			<van-grid-item @click="addMeeting" icon="clock-o" text="预约会议" />
		</van-grid>
		<!-- <div class="function">
			<span><van-icon name="label-o" /></span>
			<span>会议记录</span>
		</div>
		<div class="function">
			<span><van-icon name="label-o" /></span>
			<span>我的会议</span>
		</div> -->
		
	</div>
</template>
<script>
export default {
	data() {
		return {
			user:''
		}
	},
	mounted(){
		this.user = JSON.parse(sessionStorage.getItem('user'))
		if(!JSON.parse(sessionStorage.getItem('user'))){
			this.$router.push('/login')
		}
	},
	methods:{
		// 添加会议
		addMeeting(){
			this.$router.push({
				path:'/addMeeting'
			})
		},
		// 我的会议
		myMeeting() {
			this.$router.push({
				path:'/myMeeting'
			})
		}
	}
}
</script>
<style scoped lang="less">
span{
	color:#fff
}
	.hello{
		min-height: 100vh;
		background: #f5f5f5;
		background-image: url('../../assets/test.gif');
		background-size: 100% 100%;
		.all{
			margin-left: 70px;
			.function{
				width: 40%;
				// position: relative;
				display: inline-block;
				// padding-bottom:20px;
				padding-left:10px;
				padding-top: 10px;
				&>span:last-child{
					// position: absolute;
					// top: 50px
					// display: flex;
					// justify-content: center
					width:20px
				}
			}
		}
	}
</style>
<style>
	.van-grid-item__content--center{
		background-color:transparent;
		color: #fff
	}
	.van-grid-item__text{
		color: #fff
	}
</style>