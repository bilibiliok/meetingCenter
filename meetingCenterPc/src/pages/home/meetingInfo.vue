<template>
    <div class="hello">
        <van-nav-bar
        title="修改"
        right-plus
        @click-left="onClickLeft"
        @click-right="onClickRight"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
            <van-icon color="#000" name="plus" slot="right" />
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="getMission.meetingName"
                required
                clearable
                label="会议名"
                placeholder="请输入会议名"
            />
            <van-field
                v-model="getMission.meetingRoomName"
                readonly
                required
                clearable
                label="地点"
                placeholder="请输入会议地点"
            />
                <!-- @click="showMeeting = true" -->

             <van-field
                v-model="getMission.meetingDepartment"
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
                v-model="getMission.meetingParticipantName"
                required
                readonly
                clearable
                @click="toShowPerson"
                label="会议参与人"
                placeholder="请选择会议参与人"
            />
            <van-field
                @click="changeStartTime"
                v-model="getMission.meetingStart"
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
                v-model="getMission.meetingEnd"
                required
                clearable
                readonly
                label="会议结束时间"
                right-icon="arrow"
                placeholder="请选择时间"
            /> 
        </van-cell-group>
        <div class="button">
            <van-button @click="changeMessage" size="large" type="primary">修改</van-button>
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
        <van-popup
        v-model="showPerson"
        position="right"
        :style="{ height: '100%',width: '50%' }"
        >
        <div class="person" v-for="(item,index) in departmentNamePerson" :key="item.id">
            <van-checkbox @click="choosePerson(item,index)" v-model="item.checked">{{item.name}}</van-checkbox>
        </div>
        </van-popup>
    </div>
</template>
<script>
import {Toast,Dialog} from 'vant'

export default {
    data() {
        return {
            // result: ['a', 'b'],
            // checked:false,
            showPerson:false,
            showTab:false,
            showMeeting:false,
            show:false,
            showed:false,
            meetingLocation:'',//会议地点
            meetingName:'',//会议名称
            meetingPersonId:'',//发起人id
            meetngParticipantId:'',//参与者id
            meetingStart:'',//开始时间
            meetingEnd:'',//结束时间
            meetingDepartment:'',//会议部门
            meetingDepartmentId:'',// 会议部门id
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
            departmentList:[],
            meetingValue:'',
            departmentValue:'',
            departmentNamePerson:[], //部门所有人
            checkedPerson:'',// 被选中的人
            checkPersonId:'',//被选中人的ID
            getMission:'',
            meetingRoomId:'',
            meetingDepartmentId:'',
            meetngParticipantId:'',
            startMessage:''
        }
    },
    mounted(){
		// if(!this.$store.state.user){
		// 	this.$router.push('/login')
        // }
        this.geitMeetingMessage()
        this.getDepartMent()
        this.getMeeting()
        this.meetingRoomId = this.getMission.meetingRoomId
        this.meetingDepartmentId = this.getMission.meetingDepartmentId
        this.meetngParticipantId = this.getMission.meetngParticipantId
        // this.currentDate = this.getMission.meetingStart
        // this.currentDate1 = this.getMission.meetingEnd
        // 获取人员信息
    },
    methods:{
        // 获取会议信息
        geitMeetingMessage(){
            this.axios({
                method:'GET',
                url:`/test/meeting/meetings/meetings/${this.$route.query.id}`
            })
            .then((res) =>{
                if(res.data.code ===200){
                    console.log(res)
                    this.getMission = res.data.data
                    const nowTime = +new Date(this.getMission.meetingStart)
                    console.log(nowTime);
                    const time = +new Date()
                    if(nowTime<time){
                        Toast.fail('会议时间已过，无法修改')
                        this.$router.go(-1)
                    }
                    this.getDepartmentPeople()
                }
            })
        },
        // 确认会议地点
        onConfirmMeeting(value,index){
            if(value.status === 0){
                Toast.fail('该会议室正在使用')
            }else if (value.status === 2) {
                 Toast.fail('该会议室正在维修')
            } else {
                this.getMission.meetingRoomName = value.roomName
                this.showMeeting = false
                this.meetingValue = value
                this.meetingDepartmentId = this.meetingValue.id
            }
        },
        // 确认部门
        onConfirm(value,index){
            this.getMission.meetingDepartment = value.departmentName
            this.getMission.meetingDepartmentId = value.id
            this.departmentValue = value
            this.getDepartmentPeople()
            this.getMission.meetingParticipantName = ''
            this.getMission.meetingParticipantId = ''
        },
        // 获取部门信息
        getDepartMent() {
			this.axios({
				url:'/test/meeting/conference/department/list',
				method:'POST',
				data:{}
			})
			.then(res=>{
				// console.log('res',res)
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
                    // console.log('res',res)
                    this.meetingList = res.data.data.records
                    this.meetingList.forEach((item,index)=>{
                        this.$set(item, 'text', item.roomName)
                    })
                }
            })
        },
        // 获取用户信息
        getDepartmentPeople(){
            this.axios({
                url:'/test/meeting/conference/department/personnels',
                method:'post',
                data:{
                    departmentName:this.getMission.meetingDepartment
                }
            })
            .then((res) =>{
                if(res.data.code === 200){
                    // console.log(res.data.data)
                    this.departmentNamePerson = res.data.data
                    this.departmentNamePerson.forEach((item,index)=>{
                        this.$set(item, 'checked', false)
                    })
                    this.showTab = false
                } else if(res.data.code === 900){
                    Toast.fail(res.data.msg)
                }
            })
        },
        // 选择客户信息
        choosePerson(item,index){
            // console.log(index)
            item.checked = !item.checked
            // console.log(item.checked)
            const choosePerson = []
            const choosePersonid = []
            this.departmentNamePerson.forEach((ite,ind) =>{
                if(ite.checked === true){
                    choosePerson.push(ite.name)
                    choosePersonid.push(ite.id)
                    // console.log('choosePerson',choosePerson)
                    // console.log('choosePersonid',choosePersonid)
                    this.checkedPerson = choosePerson.join(',')
                    this.getMission.meetingParticipantName = this.checkedPerson
                    this.checkPersonId = choosePersonid.join(',')
                    this.getMission.meetingParticipantId = this.choosePersonid
                }
            })
        },
        toShowPerson(){
            console.log(this.departmentNamePerson)
            if(this.departmentNamePerson.length === 0){
                Toast.fail('请先选择会议部门')
            }else{
                this.showPerson = true
            }
        },
        onClickLeft() {
			this.$router.go(-1)
        },
        onClickRight() {
			// console.log(1)
        },
        //开始时间
        changeStartTime(){
            this.show = true
            this.showStartTime = this.curentTime(this.currentDate)
            this.getMission.meetingStart = this.showStartTime
        },
        //结束时间
        changeEndTime(){
            this.showed = true
            this.showEndTime = this.curentTime(this.currentDate1)
            this.getMission.meetingEnd = this.showEndTime
        },
        //确认开始时间
        confirmStartTime(){
            this.showStartTime = this.curentTime(this.currentDate)
            this.getMission.meetingStart = this.showStartTime
            this.show = false
        },
        // 确认结束时间
        confirmEndTime(){
            this.showEndTime = this.curentTime(this.currentDate1)
            this.getMission.meetingEnd = this.showEndTime
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
        // 修改时间
        changeTime(){
            this.axios({
                method:'put',
                url:'/test/meeting/meetings/meetings/important',
                data:{
                    id:this.getMission.id,
                    meetingStart:this.getMission.meetingStart,
                    meetingEnd:this.getMission.meetingEnd,
                }
            }).then((res) =>{
                if(res.data.code === 200){
                    console.log('修改成功')
                    this.startMessage = 1
                }else{
                    Toast.fail(res.data.msg)
                    this.startMessage = 0
                }
            }).catch((error) =>{
                console.log(error)
            })
        },
        // 修改信息
        changeMessage(){
            const nowTime = +new Date(this.getMission.meetingStart)
            console.log(nowTime);
            const endTime = +new Date(this.getMission.meetingEnd)
            if(nowTime>endTime){
                Toast.fail('会议开始时间不得大于结束时间')
            }else if(this.getMission.meetingName === ''){
                Toast.fail('请输入会议名')
            } else if(this.getMission.meetingRoomName === ''){
                Toast.fail('请选择会议室')
            } else if(this.getMission.meetingDepartment === ''){
                Toast.fail('请选择部门')
            } else if(this.getMission.meetingParticipantName === ''){
                Toast.fail('请选择会议参与人')
            } else{
                Dialog.confirm({
                    title: '修改',
                    message: '确定修改吗？'
                }).then(() => {
                    this.changeTime()
                    this.axios({
                        method:'put',
                        url:'/test/meeting/meetings/meetings/base',
                        data:{
                            id:this.getMission.id,
                            meetingName:this.getMission.meetingName,
                            meetingRoomName:this.getMission.meetingRoomName,
                            meetingRoomId:this.meetingRoomId,
                            meetingPersonName:this.user.name,
                            meetingPersonId:this.user.id,
                            meetingParticipantName:this.getMission.meetingParticipantName,
                            meetngParticipantId:this.getMission.meetngParticipantId,
                            meetingStatus:0,
                            meetingDepartment:this.getMission.meetingDepartment,
                            meetingDepartmentId:this.getMission.meetingDepartmentId
                        }
                    }).then((res)=>{
                        if(res.data.code === 200){
                            Toast.success('修改成功，正在审核')
                            this.$router.push('/myMeeting')
                        } else{
                            Toast.fail(res.data.msg)
                        }
                    })
                }).catch(() => {
                
                });
            } 
        }
    }
}
</script>
<style lang="less" scoped>
    .hello{
        min-height: 100vh;
    }
    .person{
        text-align: right;
        padding: .1rem
    }
</style>