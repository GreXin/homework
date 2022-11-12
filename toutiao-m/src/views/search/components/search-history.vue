<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <!--
          template标签的作用：
          1.能让包裹的标签视为一个整体
          2.真是dom渲染时，并不会有多余的标签产生
         -->
        <span @click="$emit('clearAll')">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </template>

      <van-icon name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(value,index) in searchHistoryList"
      :key="index"
      :title="value"
      @click="onHistoryClick('search',value)"
      >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistoryList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isDeleteShow: false, // 是否时删除状态
      searchHistoryListClone: this.searchHistoryList
    }
  },
  methods: {
    onHistoryClick (value, index) {
      // 点击历史单元格
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录
        this.searchHistoryListClone.splice(index, 1)
      } else {
        // 非删除状态进行搜索
        this.$emit('search', value)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
