<template>
   <!-- 收藏文章 -->
   <van-icon
        :color="isCollected ?'#ffa500' :'#777'"
        :name="isCollected ? 'star':'star-o'"
        :loading="collectLoading"
        @click="onCollect"
      />

</template>

<script>
import { deleteCollectAPI, addCollectAPI } from '../../../api/index.js'

export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collectLoading: false // 收藏加载状态
    }
  },
  methods: {
    // 关注，取消关注用户
    async onCollect () {
      // 定义一个提升变量  -  为什么要把这个变量创建再try前面
      let massage = '操作成功'
      try {
        // 调用接口前开启加载
        this.collectLoading = true
        if (this.isCollected) {
          // 已关注，需要取关
          await deleteCollectAPI(this.articleId)
          massage = '取消收藏成功'
        } else {
          // 未收藏，需要收藏
          await addCollectAPI({
            target: this.articleId
          })
          massage = '收藏成功'
        }
        // 如果接口调用成功了，就会接着往下执行，将原本的状态取反
        // 通过父组件来修改参数，可以直接在子组件中通过一下方式修改
        // this.$emit('input', !this.value)
        // this.$emit('updateFollowed', !this.isFollowed)

        // .sync的方式来实现子父组件传参
        this.$emit('update:isCollected', !this.isCollected)
        this.$toast.success(massage)
      } catch (error) {
        console.log(error)
        // 当后端返回错误代码为400时，表明不可以关注自己

        massage = '网络异常，请稍后重试'

        this.$toast.fail(massage)
      }
      // 无论成功还是失败都需要关闭加载状态
      this.collectLoading = false
    }
  }
}
</script>

<style>

</style>
