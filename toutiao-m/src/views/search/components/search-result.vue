<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsAPI } from '../../../api/index.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      error: false// 接口请求失败时的错误信息提示状态值
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.获取下一页的数据
        const { data: res } = await getSearchResultsAPI({
          q: this.searchText,
          page: this.page,
          per_page: 10
        })
        // console.log(res)
        // 2.获取数据后插入到list列表中 res.data.results
        this.list.push(...res.data.results)
        // 2.5记录下一次查询时的页码
        this.page++
        // 3.加载状态结束
        this.loading = false
        // 4.判数据是否全部加载完成-后端返回的数据数组中没有内容了，表明没有下一页了
        if (res.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        // 5.如果报错了也需要主动关闭加载状态
        this.loading = false
        // 6.主动开启错误提示状态
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
