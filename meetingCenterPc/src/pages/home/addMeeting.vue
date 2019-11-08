<template>
    <div class="hello">
        <van-nav-bar
        title="预约"
        right-plus
        @click-left="onClickLeft"
        @click-right="onClickRight"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
            <van-icon color="#000" name="plus" slot="right" />
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="meetingName"
                required
                clearable
                label="会议名"
                placeholder="请输入会议名"
            />
            <van-field
                v-model="meetingLocation"
                readonly
                @click="showMeeting = true"
                required
                clearable
                label="地点"
                placeholder="请输入会议地点"
            />
             <van-field
                v-model="meetingDepartment"
                required
                clearable
                readonly
                @click="showTab = true"
                label="会议部门"
                placeholder="请选择会议部门"
            />
            <van-field
                v-model="user.name"
                required
                clearable
                readonly
                label="会议发起人"
                placeholder="请输入会议发起人"
            />
             <van-field
                v-model="meetngParticipantId"
                required
                readonly
                clearable
                label="会议参与人"
                placeholder="请选择会议参与人"
            />
            <van-field
                @click="changeStartTime"
                v-model="showStartTime"
                required
                readonly
                clearable
                label="会议开始时间"
                right-icon="arrow"
                placeholder="请选择开始时间"
                @click-right-icon="$toast('question')"
            >
            </van-field>
            <van-field
                @click="changeEndTime"
                v-model="showEndTime"
                required
                clearable
                readonly
                label="会议结束时间"
                right-icon="arrow"
                placeholder="请选择时间"
            />
           
        </van-cell-group>
        <div class="button">
            <van-button @click="apartment" size="large" type="primary">预约</van-button>
        </div>
        <van-popup
        v-model="show"
        position="bottom"
        >
        <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="show = false"
        @confirm="confirmStartTime"
        />
        </van-popup>
        <van-popup
        v-model="showed"
        position="bottom"
        >
        <van-datetime-picker
        v-model="currentDate1"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="showed = false"
        @confirm="confirmEndTime"
        />
        </van-popup>
        <van-popup v-model="showTab" position="bottom">
			<van-picker
				show-toolbar
				:columns="departmentList"
				@cancel="showTab = false"
				@confirm="onConfirm"
			/>
		</van-popup>
         <van-popup v-model="showMeeting" position="bottom">
			<van-picker
				show-toolbar
				:columns="meetingList"
				@cancel="showMeeting = false"
				@confirm="onConfirmMeeting"
			/>
		</van-popup>
    </div>
</template>
<script>
import {Toast,Dialog} from 'vant'

export default {
    data() {
        return {
            showTab:false,
            showMeeting:false,
            show:false,
            showed:false,
            meetingLocation:'',//会议地点
            meetingName:'',//会议名称
            meetingPersonId:'',//发起人id
            meetngParticipantId:'1',//参与者id
            meetingStart:'',//开始时间
            meetingEnd:'',//结束时间
            meetingDepartment:'',//会议部门
            showEndTime:'',
            showStartTime:'',
            minHour: 10,
            maxHour: 20,
            minDate: new Date(),
            maxDate: new Date(2099, 10, 1),
            currentDate: new Date(),
            currentDate1: new Date(),
            user:JSON.parse(sessionStorage.getItem('user')),
            meetingList:[],
            departmentList:[]
        }
    },
    mounted(){
		// if(!this.$store.state.user){
		// 	this.$router.push('/login')
        // }
        this.getDepartMent()
        this.getMeeting()
	},
    methods:{
        // 确认会议地点
        onConfirmMeeting(value,index){
			console.log(value)
			console.log(index)
			this.meetingLocation = value.roomName
			this.showMeeting = false
        },
        // 确认部门
        onConfirm(value,index){
			console.log(value)
			console.log(index)
			this.meetingDepartment = value.departmentName
			this.showTab = false
        },
        // 获取部门信息
        getDepartMent() {
			this.axios({
				url:'/test/meeting/conference/department/list',
				method:'POST',
				data:{}
			})
			.then(res=>{
				console.log('res',res)
				const arr = res.data.data.records
				const department = []
				arr.forEach((item,index)=>{
					this.$set(item, 'text', item.departmentName)
					department.push(item.departmentName)
				})
				this.departmentList = arr
				// his.departmentList = department
			})
        },
        // 获取会议室信息
        getMeeting() {
            this.axios({
                method:'Post',
                url:'/test/meeting/conference/room/list',
                data:{
                    current:1,
                    pageSize:9999,
                }
            })
            .then((res) => {
                if(res.data.code === 200){
                    console.log('res',res)
                    this.meetingList = res.data.data.records
                    this.meetingList.forEach((item,index)=>{
                        this.$set(item, 'text', item.roomName)
                    })
                }
            })
        },
        onClickLeft() {
			this.$router.go(-1)
        },
        onClickRight() {
			console.log(1)
        },
        //开始时间
        changeStartTime(){
            this.show = true
            this.showStartTime = this.curentTime(this.currentDate)
        },
        //结束时间
        changeEndTime(){
            this.showed = true
            this.showEndTime = this.curentTime(this.currentDate1)
        },
        //确认开始时间
        confirmStartTime(){
            this.showStartTime = this.curentTime(this.currentDate)
            this.show = false
        },
        // 确认结束时间
        confirmEndTime(){
            this.showEndTime = this.curentTime(this.currentDate1)
            this.showed = false
        },
        curentTime(time){ 
            var now = new Date(time);
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒
            var clock = year + "-";
            if(month < 10)
                clock += "0";
            clock += month + "-";
            if(day < 10)
                clock += "0";
            clock += day + " ";
            if(hh < 10)
                clock += "0";
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm + ":";
            // clock += mm     
            if (ss < 10) clock += '0'; 
            clock += ss; 
            return(clock); 
        },
        formatter(type, value) {
            if(type === 'year') {
                return `${value}年`;
            }else if (type === 'month') {
                return `${value}月`
            }else if(type ==='day'){
                return `${value}日`
            }else if(type === 'hour'){
                return `${value}时`
            }else if(type === 'minute'){
                return `${value}分`
            }
            return value;
        },
        // 预约
        apartment(){
            Dialog.confirm({
                title: '预约',
                message: '确定预约吗'
            }).then(() => {
                this.axios({
                    method:'POST',
                    url:'http://192.168.2.118:8080/test/meeting/meetings/meetings',
                    data:{
                        meetingName:this.meetingName,
                        meetingDate:'2019-12-31',
                        meetingLocation:this.meetingLocation,
                        meetingPersonId:this.user.id,
                        meetngParticipantId:this.meetngParticipantId,
                        meetingStart:this.showStartTime,
                        meetingEnd:this.showEndTime,
                        meetingStatus:0,
                        meetingDepartment:this.meetingDepartment
                    }
                }).then((res)=>{
                    if(res.data.code === 200){
                        Toast.success('预约成功，正在审核')
                    } else{
                        Toast.fail(res.data.msg)
                    }
                })
            }).catch(() => {
            
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .hello{
        min-height: 100vh;
    }
</style>