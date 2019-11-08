<template>
    <div class="hello">
        <div class="info">
            <div class="roomName">
                <span>会议室名称：</span>
                <span>{{roomName}}</span>
            </div>
            <div class="roomName">
                <span>可用设备：</span>
                <span>{{equipment}}</span>
            </div>
            <div class="roomName">
                <span>最大容量：</span>
                <span>{{maxCapacity}}</span>
            </div>
             <div class="roomName">
                <span v-if="status === 0">使用状态：已使用</span>
                <span v-if="status === 1">使用状态：可预约</span>
                <span v-if="status === 2">使用状态：正维修</span>
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
            createTime:''
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
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .hello{
        font-size: 16px;
        color: #fff;
        background:url('../../assets/info.jpg');
        min-height: 100vh;
        padding: 25px 10px 10px 10px;
        background-size: 100% 100%;
        .info{
            padding: 15px;
            border: .5px #e8e8e8 solid;
            border-radius: 10px;
        }
    }
</style>