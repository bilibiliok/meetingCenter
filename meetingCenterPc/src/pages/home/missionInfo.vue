<template>
    <div class="hello">
        <van-nav-bar
        title="会议室列表"
        @click-left="onClickLeft"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
        </van-nav-bar>
        <div class="info">
            <div class="roomName">
                <span>会议室名称：</span>
                <span>{{message.roomName}}</span>
            </div>
            <div class="roomName">
                <span>可用设备：</span>
                <span>{{message.equipment}}</span>
            </div>
            <div class="roomName">
                <span>最大容量：</span>
                <span>{{message.maxCapacity}}</span>
            </div>
             <div class="roomName">
                <span v-if="message.status === 0">使用状态：已使用</span>
                <span style="color:#22c8d8" v-if="message.status === 1">使用状态：可预约</span>
                <span style="color:red" v-if="message.status === 2">使用状态：维修中</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.query.id,
            roomName:'',    // 会议室名称
            equipment:'', // 可用设备
            maxCapacity:'', // 最大容量
            status:0, //使用状态（0已使用 1预约 2维修中）
            createTime:'',
            message:''
        }
    },
    mounted(){
        this.getMeeting()
    },
    methods:{
        getMeeting(){
            this.axios({
                method:'Get',
                url: `/test/meeting/conference/room/${this.id}`
            }).then((res) => {
                console.log(res)
                this.message = res.data.data
            })
        },
        onClickLeft() {
			this.$router.go(-1)
        },
    }
}
</script>
<style lang="less" scoped>
    .hello{
        font-size: 16px;
        color: #fff;
        background:url('../../assets/info.jpg');
        min-height: 100vh;
        background-size: 100% 100%;
        .info{
            padding: 15px;
            margin: 25px 10px 10px 10px;
            border: .5px #e8e8e8 solid;
            border-radius: 10px;
        }
    }
</style>