<template>
  <div class="search-suggestion">
    <van-cell
    v-for="(value,index ) in suggestions"
    :key="index"
    @click="$emit('search',value)"
    icon="search">
    <template #title>
      <span v-html="hightLight (value)"></span>
    </template>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '../../../api/index.js'
import _ from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  watch: {
    searchText: {
      handler: _.debounce(function () {
        // 调用联想查询方法
        this.loadSearchSuggestions()
      },
      500),
      immediate: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想列表内容
    }
  },
  methods: {
    async loadSearchSuggestions () {
      try {
        const { data: res } = await getSearchSuggestionsAPI(
          { q: this.searchText }
        )
        console.log(res)
        this.suggestions = res.data.options
        if (res.data.options.length === 0 || res.data.options[0] === null) {
          this.suggestions.splice(0, 1, this.searchText)
        }
      } catch (error) {
        console.log(error)
      }
    },
    hightLight (value) {
      // 高亮关键字
      // value：当前需要高亮处理的字符串

      // 方法1
      /*
      replace() 的第一个参数如果是字符串只能替换第一个找到的字符
      它的第一个参数如果传的是一个正则表达式，则会找到字符串中所有符合要求的部分并替换
    */

      // const reg = new RegExp(this.searchText, 'gi')
      // const str = value.replace(reg, `<span style="color:red;">${this.searchText}</span>`)

      // 方法2
      /*
      split(需要切割的字符目标) => 将所有符合输入框内容的部分切割成逗号  如： 101 => [ , 0, ]
      join(主要将逗号改为怎样的字符) => 将所有的逗号全部转化为带有标签的内容 如 [ , 0, ] => s0s
    */
      const str = value.split(this.searchText).join(`<span style="color:red;">${this.searchText}</span>`)
      return str
    }
  }
}
</script>

<style scoped lang="less"></style>
