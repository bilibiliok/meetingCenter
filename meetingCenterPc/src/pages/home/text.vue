<template>
    <div class="hello">
        <div :class="[{bgfirst:bgfir},{bgsecond:bgsec}]">改变背景颜色</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            bgfir:false,
            bgsec:true,
        }
    },
    mounted(){
        // this.changebg()
    },
    methods:{
        changebg() {
            setInterval(() => {
                this.bgfir = !this.bgfir
                this.bgsec = !this.bgsec
            }, 1000);
        }
    }
}
</script>
<style lang="less" scoped>
    .hello{
        min-height: 100vh;
        .bgfirst{
            background-image: url('../../assets/meeting.jpg');
            min-height: 100vh;
            background-size: 100% 100%;
            transform: 2s
        }
        .bgsecond{
            background-image: url('../../assets/meeting1.jpg');
            min-height: 100vh;
            background-size: 100% 100%;
            transform: 2s
        }
    }
</style>