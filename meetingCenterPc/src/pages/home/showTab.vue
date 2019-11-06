<template>
	<div class="hello">
		<van-nav-bar
			title="首页"
			left-arrow
		/>
		<div class="all" >
			<div class="function">
				<span style="display:block;padding-left:10px"><van-icon size="50" name="label-o" /></span>
				<span>会议室列表</span>
			</div>
			<div class="function">
				<span style="display:block;padding-left:10px"><van-icon size="50" name="notes-o" /></span>
				<span>会议记录</span>
			</div>
			<div class="function">
				<span style="display:block;padding-left:10px"><van-icon size="50" name="friends-o" /></span>
				<span>我的会议</span>
			</div>
			<div class="function">
				<span style="display:block;padding-left:10px"><van-icon size="50" name="todo-list-o" /></span>
				<span>我的日历</span>
			</div>
			<div @click="addMeeting" class="function">
				<span style="display:block;padding-left:10px"><van-icon size="50" name="clock-o" /></span>
				<span>预约会议</span>
			</div>
		</div>
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
			
		}
	},
	mounted(){
		if(!this.$store.state.user){
			this.$router.push('/login')
		}
	},
	methods:{
		addMeeting(){
			this.$router.push({
				path:'/addMeeting'
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