// 关注用户组件
<template>
    <van-button
      class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        @click="onFollow"
        v-if="!isFollowed"
    >关注</van-button>

    <van-button
        class="follow-btn"
        round
        size="small"
        v-else
        :loading="followLoading"
        @click="onFollow"
    >已关注</van-button>
</template>

<script>
import { deleteFollowAPI, addFollowAPI } from '../../../api/index.js'

export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed', // 表示的是修改value名称的值 如     prop: 'isFollowed' 就将value 替换成了 isFollowed
    event: 'updateFollowed' // 表示的是修改input名称的值 如     event:'updateFollowed' 就将 input 替换成了 updateFollowed
  },
  props: {
    isFollowed: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      followLoading: false // 关注按钮加载状态
    }
  },
  methods: {
    // 关注，取消关注用户
    async onFollow () {
      // 定义一个提升变量  -  为什么要把这个变量创建再try前面
      let massage = '操作成功'
      try {
        // 调用接口前开启加载
        this.followLoading = true
        if (this.isFollowed) {
          // 已关注，需要取关
          await deleteFollowAPI(this.userId)
          massage = '取关成功'
        } else {
          // 未关注，需要关注
          await addFollowAPI({
            target: this.userId
          })
          massage = '关注成功'
        }
        // 如果接口调用成功了，就会接着往下执行，将原本的状态取反
        // 通过父组件来修改参数，可以直接在子组件中通过一下方式修改
        // this.$emit('input', !this.value)
        // this.$emit('updateFollowed', !this.isFollowed)

        // .sync的方式来实现子父组件传参
        this.$emit('update:isFollowed', !this.isFollowed)
        this.$toast.success(massage)
      } catch (error) {
        console.log(error)
        // 当后端返回错误代码为400时，表明不可以关注自己
        if (error.response && error.response.status === 400) {
          massage = '你不能关注你自己'
        } else {
          massage = '网络异常，请稍后重试'
        }
        this.$toast.fail(massage)
      }
      // 无论成功还是失败都需要关闭加载状态
      this.followLoading = false
    }
  }
}
</script>

<style>

</style>
