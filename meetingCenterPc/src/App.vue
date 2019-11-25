<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted() {
    window.addEventListener('beforeunload', e => {
      window.localStorage.removeItem('user1')
    })
  }
}
</script>

<style>
  .van-cell{
    font-size: 16px
  }
  #app{
    font-size: 16px;
  }
</style>
