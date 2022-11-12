<template>
  <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
    <van-cell
    v-for="item in list"
      :key="item.com_id"
      :title="item.content" />
   </van-list>
</template>

<script>
import { getCommentsAPI } from '../../../api/index.js'
export default {
  name: 'CommentList',
  props: {
    sourceId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: res } = await getCommentsAPI({
          type: 'a',
          source: this.sourceId,
          offset: this.offset,
          limit: 10
        })
        console.log(res)
        this.list.push(...res.data.results)
        this.offset = res.data.last_id
        this.loading = false
        if (res.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
