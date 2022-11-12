<template>
  <div class="artlcle-list-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  :success-text="successText"
    success-duration="2000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
    </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
/*
  目标1：通过接口渲染列表组件数据
  1. 正常调用接口获取数据，（发现channel_id来源于父组件，需要子父组件传参）
  2. 得到数据后。合并数组并记录下一页的查询参数
  3. 关闭列表的加载状态
  4. 判断列表数据是否全部渲染完成
  5. 如果报错了，依然要关闭加载状态
*/

/*
  van-list 各个属性和方法的作用
  @load 事件： 当van-list组件初始化或翻到块下一页时自动触发的事件，获取下一页的数据

  loading: 控制加载中的状态，当loading变量为true时，会阻止@load事件的触发、当@load事件触发时，loading会自动变成true，当我们数据获取完成后需要主动将它改为false

  finished: 是否列表加载完成状态
  如果finished为true时，无论loading为何值，@load事件均不会再触发，当完成时，列表最后会显示 finished-text 属性后的文本内容
*/

import { getArticleListAPI } from '../../../api/index.js'
import ArticleItem from './article-item.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channelId: {
      typeof: Number,
      default: 0
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 滚动更新的加载状态
      finished: false,
      currentTimestamp: null,
      error: false, // 接口请求失败时的错误信息提示状态值
      refreshing: false, // 下拉更新的加载状态
      successText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.获取下一页的数据
        const { data: res } = await getArticleListAPI({
          channel_id: this.channelId,
          timestamp: this.currentTimestamp || Date.now()
          // Date.now() 当前时间戳
          // 如果 currentTimestamp 有值，则直接用currentTimestamp ，如果没值，就用当前时间戳
        })
        console.log(res)
        // 2.获取数据后插入到list列表中 res.data.results
        this.list.push(...res.data.results)
        // 2.5 记录下一次查询的时间戳
        this.currentTimestamp = res.data.pre_timestamp
        // 3.加载状态结束
        this.loading = false
        // 4.判断数据是否全部加载完成 - 后端数据返回的数据没有内容了，表明没有下一页了
        if (res.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        // 5.如果报错了也需要主动关闭加载状态
        this.loading = false
        console.log(error)
        this.error = true
      }

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      // 加载状态结束
      //   this.loading = false

      // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    // 下拉加载数据
    async onRefresh () {
      try {
        // 1.获取新数据
        const { data: res } = await getArticleListAPI({
          channel_id: this.channelId,
          timestamp: Date.now()
          // Date.now() 当前时间戳
        })
        console.log(res)
        // 2.获取数据后插入到list列表中 res.data.results
        this.list.unshift(...res.data.results)
        // 2.5 设置成功时的提示
        this.successText = `刷新成功，更新了${res.data.results.length}条数据`
        // 3.加载状态结束
        this.refreshing = false
      } catch (error) {
        console.log(error)
        // 5.如果报错了也需要主动关闭加载状态
        this.refreshing = false
      }
      // 5.如果报错了也需要主动关闭加载状态
      this.refreshing = false
    }

  }
}
</script>

<style scoped lang="less">
.artlcle-list-container{
  height: 527px;
  overflow-y: auto;

  // height: 79vh;
  // 还可以用vh 和 vw 视口高度和宽度 1vh= 1%视口高度
  // 527/667 * 100%
}
</style>
