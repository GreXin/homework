<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
        <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/layout/qa" icon="comment-o">问答</van-tabbar-item>
        <van-tabbar-item replace to="/layout/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item replace to="/layout/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
