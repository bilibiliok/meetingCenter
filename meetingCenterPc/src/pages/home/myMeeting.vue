<template>
    <div class="hello">
      <van-nav-bar
        title="会议列表"
        style="position:fixed;width:100%;top:0;z-index:9999"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon color="#000" name="arrow-left" slot="left" />
        <van-icon color="#000" name="plus" slot="right" />
      </van-nav-bar>
      <van-search
        style="position:fixed;width:100%;top:40px;z-index:9999"
        placeholder="请输入会议部门"
        v-model="department"
      />
      <van-pull-refresh pulling-text=" " v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已无更多数据"
          @load="onLoad"
          :offset="10"
        >
          <div class="list">
            <div
              @click="getMeetingMessage(item.id)"
              class="listType"
              v-for="(item,index) in myMeeting"
              :key="index"
            >
              <div>
                <div class="roomName">会议名：{{item.meetingName}}</div>
                <div class="equipment">会议地点：{{item.meetingRoomName}}</div>
                <div class="equipment">会议部门：{{item.meetingDepartment}}</div>
                <div class="equipment">会议发起人：{{item.meetingPersonName}}</div>
                <div class="equipment">会议参与人：{{item.meetingParticipantName}}</div>
                <div class="equipment">会议开始时间：{{item.meetingStart}}</div>
                <div class="person">会议结束时间：{{item.meetingEnd}}</div>
                <div v-if="item.meetingStatus == 0" class="person">会议状况：未开始</div>
                <div v-if="item.meetingStatus == 1" class="person">会议状况：进行中</div>
                <div v-if="item.meetingStatus == 2" class="person">会议状况：已结束</div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      isLoading: false,
      // value: '',
      myMeeting: [],
      pages: 1,
      pageSize: 3,
      user: '',
      department: '',
      loading: false,
      finished: false
    }
  },
  mounted () {
    this.user = JSON.parse(sessionStorage.getItem("user"))
  },
	created() {
		this.$nextTick(() => {
			if (this.user) {
				this.getMeeting();
			}
		});
	},
	//监听部门是否发生变化
	watch: {
		department() {
			this.myMeeting = [];
			this.searchNameChange();
		}
	},
	methods: {
		//下拉刷新
		onRefresh() {
			setTimeout(() => {
				// this.pages = 1
				// this.myMeeting = []
				this.getMeeting();
				this.$toast("刷新成功");
			}, 500);
		},
		// 上拉加载
		onLoad() {
			setTimeout(() => {
				this.getMeeting();
				this.loading = false;
			}, 500);
		},
		//节流函数
		searchNameChange() {
			this.isScroll = 0;
			this.pages1 = 1;
			if (window.lazy) {
				window.clearTimeout(window.lazy);
			}
			window.lazy = window.setTimeout(() => {
				this.pages = 1;
				this.getMeeting();
			}, 500);
		},
		//获取会议信息
		getMeeting() {
			this.axios({
				method: "Post",
				url: "/test/meeting/meetings/meetings/list",
				data: {
					current: this.pages,
					pageSize: this.pageSize,
					//查询条件 "meetingPersonId":"102"
					condition: {
						meetingPersonId: this.user.id, //会议发起人id
						meetingDepartment: this.department
					}
				}
			}).then(res => {
				// console.log('res',res)
				this.isLoading = false;
				if (
					res.data.code === 200 &&
					res.data.data.records &&
					res.data.data.records.length > 0
				) {
					// console.log('res',res)
					this.myMeeting = [
						...this.myMeeting,
						...res.data.data.records
					];
					this.pages = this.pages + 1;
				} else {
					this.loading = false;
					this.finished = true;
				}
			});
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		// 新增会议室
		onClickRight() {
			this.$router.push("/addMeeting");
		},
		// 会议详情
		getMeetingMessage(id) {
			this.$router.push({
				path: "/meetingInfo",
				query: {
					id: id
				}
			});
		},
		// 显示图片
		showMessage(picture) {
			ImagePreview({
				images: [picture]
			});
		}
	}
};
</script>
<style lang="less" scoped>
.hello {
	font-size: 16px;
	background: url("../../assets/meeting1.jpg");
	background-size: 100% 100%;
	background-attachment: fixed;
	min-height: 100vh;
	color: #fff;
	.list {
		padding: 10px;
		margin-top: 90px;
		.listType {
			display: flex;
			border: 0.5px solid #e8e8e8;
			padding: 5px;
			border-radius: 10px;
			margin-bottom: 10px;
			.img {
				padding: 5px;
			}
			.equipment {
				padding-top: 10px;
			}
			.person {
				padding-top: 10px;
			}
		}
	}
}
</style>
<style lang="">
.van-list__error-text,
.van-list__finished-text,
.van-list__loading {
	color: #fff;
}
.van-loading__text {
	color: #fff;
}
.van-loading__circular {
	color: #22c8d8;
}
</style>