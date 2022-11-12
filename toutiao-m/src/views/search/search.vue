<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search">
        <van-search
            v-model="searchText"
            show-action
            background="#3296fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
    </form>
    <!-- 搜索结果列表 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>
     <!-- 联想搜索 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText"
    @search="onSearch"></search-suggestion>
    <!-- 搜索历史 -->
    <search-history v-else :searchHistoryList="searchHistoryList"
    @clearAll="searchHistoryList =[]"
    @search="onSearch"></search-history>

  </div>
</template>

<script>
/*
  目标1： 各组件的切换逻辑
  业务分析
  1. 初始化状态先                  搜索历史
  2. 当输入框中有值时              联想列表
  3. 通过某个状态值的变化来控制     搜索结果列表
  4. 当聚焦搜索框时，搜索结果会消失

                  searchText       isResultShow
  搜索历史             X                 X
  联想列表             √                 X
  搜索结果列表         √                 √
*/
/*
  目标2： 联想搜索
  1. 当输入框中输入内容时，会实时的获取联想内容 => watch 监听器当数据改变时触发查询功能
    1.1 当空字符串输入第一个字符内容时，并没有触发监听器 => 因为只有有值时才会将组件渲染到真实dom上，所有watch在监听初期，字符串中就至少有第一个字符
    => 解决方案，通过watch的完整写法中的immediate立即执行属性来解决这一缺陷
  2. 将查询的结果渲染到页面上
    2.1 发现如果后端没有查到相关联想数据，有可能会返回带有null的数组，也有可能会返回空数组 => 只要后端查询某个字符串没有查到相关内容时，让这个字符串本身作为一个列表元素
  3. 在测试查询联想列表时，发现删除字符时查询的频率过于频繁，所以决定对该查询进行防抖优化 => lodash中有一个专门处理防抖的方法 debounce()
  4. 联想查询结果的富文本配置
    4.1 通过v-html来显示带有标签的文本
    4.2 如何替换一个字符串中符合要求的字符？ => replace 来替换符合要求的文本（搜索框中的内容）
    str.replace('1', '<span style="color: red;">1</span>')

    如： 101 => 1 => <span style="color: red;">1</span>
        => <span style="color: red;">1</span>0<span style="color: red;">1</span>

*/
/*
  目标3：搜索结果功能
  1. 在联想查询中，搜索框敲击enter， 点击联想单元格都可以跳转到 搜索结果 => 父传子的过程
    1.1 当输入框中没有内容时，不允许跳转到查询结果
  2. 将输入框内容传递给搜索结果组件，通过该内容进行接口查询数据
*/
/*
  目标4： 搜索历史
  1. 只有通过搜索结果(触发onSearch方法)的行为，会将输入框中的内容设置到搜索历史列表中
  2. 关于搜索列表的排序规则： 最新搜索的排在最前面，不能有重复的搜索记录
  3. 通过垃圾桶和完成按钮来实现删除状态与查询状态的切换
  4. 在删除状态下点击单元格进行历史记录的删除，在查询状态下点击单元格进行结果查询
  5. 点击全部删除按钮，清空历史列表
  规律： 如果发现子组件中无法通过拷贝的方式进行数据修改时，立马转化为让父组件自己去修改
  6. 搜索历史的数据持久化
    6.1 初始化数据时尝试从本地存储中获取
    6.2 数据变化时，更新本地存储数据
*/

import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { getItem, setItem } from '../../utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索框内容
      isResultShow: false, // 是否展示搜索结果
      searchHistoryList: getItem('TOUTIAO_SEARCHHISTORY') || [] // 搜索历史列表
    }
  },
  methods: {
    // 输入内容后敲击回车时触发的查询方法
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 判断输入框内容是否为空，如果为空则不允许进行查询
      if (this.searchText.trim().length === 0) return

      // 存储添加历史搜索记录
      // 在添加元素之前先把原数组中的相同元素删除
      const index = this.searchHistoryList.indexOf(this.searchText)
      if (index !== -1) {
        // 找到了相同元素，把找到的元素给删除掉
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(this.searchText)

      // 开启搜索结果
      this.isResultShow = true
      console.log(val)
    },
    onCancel () {
      console.log('取消')
      this.$router.back()
    }
  },
  watch: {
    'searchHistoryList' () {
      setItem('TOUTIAO_SEARCHHISTORY', this.searchHistoryList)
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
    padding-top: 54px;
    .search{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 11;
        .van-search__action{
            color: #fff;
        }
    }
}

</style>
