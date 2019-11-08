<template>
    <div class="hello">
        <van-nav-bar
        title="新增会议室"
        right-plus
        @click-left="onClickLeft"
        @click-right="onClickRight"
        >
            <van-icon color="#000" name="arrow-left" slot="left" />
            <van-icon color="#000" name="plus" slot="right" />
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="equipment"
                required
                clearable
                label="设备"
                placeholder="请输入设备"
            />
            <van-field
                v-model="roomName"
                required
                clearable
                label="地点"
                placeholder="请输入会议室名称"
            />
            <van-field
                v-model="maxCapacity"
                oninput = "value=value.replace(/[^\d]/g,'')"
                required
                clearable
                label="会议室人数"
                placeholder="会议室人数"
            />
        </van-cell-group>
        <div class="upload">
             <!-- <van-uploader :after-read="onRead" style="width:100%"> 
            </van-uploader> 
             <div>
                <img width="78" height="78" :src="picyure" alt="">
            </div>  -->
            <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :max-count="1"
            @click="showImages"
            :before-delete="deleteImg"
            />
        </div>
        <div class="button">
            <van-button @click="apartment" size="large" type="primary">新增</van-button>
        </div>
    </div>
</template>
<script>
import {Toast,Dialog} from 'vant'

export default {
    data() {
        return {
            roomName:'',//会议地点
            equipment:'',//设备
            picyure:'',
            showAttachment:[],
            maxCapacity:'',
            showIndex:false,
            fileList:[],
            file:''
        }
    },
    mounted(){
		// if(!this.$store.state.user){
		// 	this.$router.push('/login')
		// }
	},
    methods:{
        onClickLeft() {
			this.$router.go(-1)
        },
        onClickRight() {
			console.log(1)
        },
        //上传
        afterRead(file) {
            // this.file = file.content
            // this.state = true
            // this.showAttachment.push(file.content)
            // this.axios({
            //     url:'/api/common/uploadBase64File.do',
            //     method:'post',
            //     data:{file:file.content,suffix:'jpg'}
            // }).then(res => {
            //     if(res.data.status == 1){
                    
            //         this.state = false
            //         this.$toast('上传成功')
            //         console.log(res)
            //         this.formValidate.imgUrl= res.data.filePath
            //     }
            // })
           
            //通过FormData构造函数创建一个空对象
            const formdata=new FormData();
            // this.file = file.name
            //可以通过append()方法来追加数据
            formdata.append("img",file.file);
            //通过get方法对值进行读取
            console.log(formdata.get("img"));//laotie
            //通过set方法对值进行设置
            // formdata.set("name","laoliu");
            // console.log(formdata.get("name"));//laoliu
            // console.log('file',file)
            // this.picyure = this.fileList[0].content
             this.axios.post('/test/meeting/storage/postfile',formdata).then((res) => {
                console.log(res)
                this.picyure = res.config.baseURL + res.data.data.imageUrl
            })
        },
        // 显示图片
        showImages(){
            if(this.picyure == ''){
                this.$toast({type:'fail',message:'请选择附件'})
            }else{
                ImagePreview(this.fileList)
            }
        },
        //删除图片
        deleteImg(){
            console.log(1)
            this.picyure = ''
            return true
        },
        // 新增会议室
        apartment(){
             Dialog.confirm({
                title: '新增',
                message: '确定新增会议室吗'
            }).then(() => {
                this.axios({
                    method:'POST',
                    url:'/test/meeting/conference/room',
                    data:{
                        roomName:this.roomName,
                        maxCapacity:this.maxCapacity,
                        equipment:this.equipment,
                        status:1,
                        picture:this.picyure,
                    }
                }).then((res)=>{
                    if(res.data.code === 200){
                        Toast.success('新增成功')
                        // this.$router.push('/meetingList')
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
    // .upload-img{
    //     width:30%;
    //     height: 30%;
    //     margin-left:40%;
    //     margin-top:1rem;
    //     padding: .5rem;
    // }
    .upload{
        margin-left: 35%
    }
</style>