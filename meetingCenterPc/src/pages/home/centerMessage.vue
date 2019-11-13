<template>
    <div class="hello">
         <van-nav-bar
        :title=title
        @click-left="onClickLeft"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
            <van-icon color="#000" name="plus" slot="right" />
        </van-nav-bar>
        <div class="list">
            <div class="listType" v-for="(item,index) in meetingList" :key="index">
                <div>
                    <div class="roomName">会议名称：{{item.meetingName}}</div>
                    <div class="equipment">会议开始时间：{{item.meetingStart}}</div>
                    <div class="person">会议结束时间：{{item.meetingEnd}}</div>
                    <div class="person">会议部门：{{item.meetingDepartment}}</div>
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
            pageSize: 9999,
            title:this.$route.query.name
        }
    },
    created(){
        this.checkoutMsg()
    },
    methods:{
        // 获取会议记录
        onClickLeft() {
			this.$router.go(-1)
        },
        checkoutMsg(){
            this.axios({
                url:`/test/meeting/conference/room/meetings/${this.$route.query.id}`,
                method:'Get',
                // data:{
                //     id:this.$route.query.id
                // }
            }).then((res) =>{
                // console.log(res)
                if(res.data.code === 900){
                    Toast(res.data.msg)
                }else{
                   console.log(res.data.data)
                   this.meetingList = res.data.data
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