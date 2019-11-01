<template>
	<div class="hello">
		<router-view></router-view>
		<van-tabbar @click="changeTab1" @change="changeTab" v-model="active">
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="search">列表</van-tabbar-item>
			<van-tabbar-item icon="friends-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 0
		}
	},
	methods:{
		changeTab() {
			if(this.active === 0){
				console.log(0)
				this.$router.push('showTab')
			}else if(this.active === 1){
				console.log(1)
				this.$router.push('appointment')
			}else{
				console.log(2)
				this.$router.push('myMessage')
			}
		},
		changeTab1() {
			if(this.active === 0){
				console.log(0)
				this.$router.push('showTab')
			}else if(this.active === 1){
				console.log(1)
				this.$router.push('appointment')
			}else{
				console.log(2)
				this.$router.push('myMessage')
			}
		}
	}
}
</script>
<style scoped lang="less">
	.hello{
		font-size: 16px
	}
</style>