<template>
    <!-- 收藏文章 -->
    <van-icon
         :color="attitude === 1 ?'#ff0000' :'#777'"
         :name="attitude === 1 ? 'good-job':'good-job-o'"
         :loading="likeLoading"
         @click="onLike"
       />
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from '../../../api/index.js'

export default {
  name: 'LikeArticle',
  props: {
    attitude: { // -1 无态度  1 点赞
      type: Number,
      default: -1
    },
    articleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      likeLoading: false // 点赞加载状态
    }
  },
  methods: {
    // 关注，取消关注用户
    async onLike () {
      // 定义一个提升变量  -  为什么要把这个变量创建再try前面
      let massage = '操作成功'
      try {
        // 调用接口前开启加载
        this.likeLoading = true
        if (this.attitude === 1) {
          // 已关注，需要取关
          await deleteLikeAPI(this.articleId)
          massage = '取消点赞成功'
        } else {
          // 未收藏，需要收藏
          await addLikeAPI({
            target: this.articleId
          })
          massage = '点赞成功'
        }
        // 如果接口调用成功了，就会接着往下执行，将原本的状态取反
        // 通过父组件来修改参数，可以直接在子组件中通过一下方式修改
        // this.$emit('input', !this.value)
        // this.$emit('updateFollowed', !this.isFollowed)

        // .sync的方式来实现子父组件传参
        this.$emit('update:attitude', this.attitude === 1 ? -1 : 1)
        this.$toast.success(massage)
      } catch (error) {
        console.log(error)
        // 当后端返回错误代码为400时，表明不可以关注自己

        massage = '网络异常，请稍后重试'

        this.$toast.fail(massage)
      }
      // 无论成功还是失败都需要关闭加载状态
      this.likeLoading = false
    }
  }
}
</script>

 <style>

 </style>
