<template>
    <div class="hello">
         <van-nav-bar
        title="会议室列表"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
            <van-icon color="#000" name="plus" slot="right" />
        </van-nav-bar>
        <div class="list">
            <div @click="getMeetingMessage(item.id)" class="listType" v-for="(item,index) in meetingList" :key="item.id">
                <div @click.stop="showMessage(item.picture,index)" class="img">
                    <img width="90" height="90" :src="item.picture" alt="暂无图片显示">
                </div>
                <div>
                    <div class="roomName">会议室名：{{item.roomName}}</div>
                    <div class="equipment">设备：{{item.equipment}}</div>
                    <div class="person">会议容纳人数：{{item.maxCapacity}}</div>
                    <div v-if="item.status === 0" class="person">会议使用情况：已使用</div>
                    <div style="color:#22c8d8" v-if="item.status === 1" class="person">会议使用情况：可预约</div>
                    <div style="color:red" v-if="item.status === 2" class="person">会议使用情况：维修中</div>
                    <div @click.stop="checkoutMsg(item,index)" class="person check">查看任务状态</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ImagePreview,Toast } from 'vant'
export default {
    data() {
        return {
            meetingList: [],
            pages: 1,
            pageSize: 9999
        }
    },
    created(){
        this.getMeeting()
    },
    methods:{
        //获取获取会议室信息
        getMeeting() {
            this.axios({
                method:'Post',
                url:'/test/meeting/conference/room/list',
                data:{
                    current:this.pages,
                    pageSize:this.pageSize,
                }
            })
            .then((res) => {
                if(res.data.code === 200&&res.data.data.records && res.data.data.records.length > 0){
                    console.log('res',res)
                    this.meetingList = [...this.meetingList, ...res.data.data.records]
					this.pages = this.pages + 1
                    
                }
            })
        },
        onClickLeft() {
			this.$router.push('/index/showTab')
        },
        // 新增会议室
        onClickRight() {
            this.$router.push('/addMeetingCenter')
        },
        // 会议室详情
        getMeetingMessage(id){
            this.$router.push({
                path: '/missionInfo',
                query:{
                    id: id
                }
            })
        },
        // 显示图片
        showMessage(picture){
            ImagePreview({
                images: [
                    picture
                ],
            })
        },
        // 获取会议记录
        checkoutMsg(item,index){
            console.log(item)
            this.axios({
                url:`/test/meeting/conference/room/meetings/${item.id}`,
                method:'get',
                // data:{
                //     id:'1'
                // }
            }).then((res) =>{
                // console.log(res)
                if(res.data.code === 900){
                    Toast(res.data.msg)
                }else{
                    this.$router.push({
                        path:'/centerMessage',
                        query:{
                            id:item.id,
                            name:item.roomName
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .hello{
        font-size: 16px;
        background: url('../../assets/meeting1.jpg');
        background-size: 100% 100%;
        min-height: 100vh;
        background-attachment: fixed;
        color:#fff;
        .list{
            padding: 10px;
            .listType{
                display: flex;
                border:.5px solid #e8e8e8;
                padding: 5px;
                border-radius: 10px;
                margin-bottom:10px;
            .img{
                padding:5px
            }
            .equipment{
                padding-top: 10px
            }
            .person{
                padding-top: 10px
            }
            .check{
                background: #22c8d8;
                color: #fff;
                padding-bottom: 10px;
                text-align: center
            }
        }
        }
        
    }
</style>