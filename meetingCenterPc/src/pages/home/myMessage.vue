<template>
	<div class="hello">
		<div class="user">
			<div class="logo">
				<img src="../../assets/cat.jpg" alt="" height="80" width="80">
			</div>
			<div class="userMessage">
				<div class="userName">
					<span>名字</span>
				</div>
				<div class="userPhone">
					<span>17178181717</span>
				</div>
			</div>
		</div>
	
	</div>
</template>
<script>
export default {
	data() {
		return {
			phone:''
		}
	}
}
</script>
<style lang="less" scoped>
	.hello{
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
	}
</style>