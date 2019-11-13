<template>
    <div class="hello">
       <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        ></Calendar>
    </div>
</template>
<script>
import Calendar from 'vue-calendar-component'

export default {
    components: {
        Calendar
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
    
</style>