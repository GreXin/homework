<template>
  <van-cell class="article-item-container" :to="`/article/7817`">
  <!-- :to="`/article/${article.art_id}`" 以上文章id固定住，一边后续设置图片功能 -->
    <!-- 文章标题 -->
    <template #title>
      <div class="title">{{ article.title }}</div>
    </template>

    <!-- 底部信息 -->
    <template #label>
      <!-- 图片区域 -->
      <!-- 当图片数量为3时，才展示该区域 => article.cover.type === 3 时 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <van-image
          class="cover-image"
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="img"
          fit="cover"
        />
      </div>
      <!-- 作者信息 -->
      <div class="info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }} 评论</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </template>

    <!-- 右侧图片 -->
    <!-- 当图片数量为1时，才展示该区域 => article.cover.type === 1 -->
    <template #default v-if="article.cover.type === 1">
      <van-image
        :src="article.cover.images[0]"
        fit="cover"
        class="article-image"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: { // 当前文章简介
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="less">
.article-item-container {
  .title {
    font-size: 18px;
  }
  .van-cell__label {
    .cover-wrap {
      display: flex;
      flex: 1;
      .cover-image {
        width: 100%;
        height: 73px;

        &:not(:last-child) {
          padding-right: 4px;
        }
      }
    }

    .info {
      margin-top: 12px;
      span{
        margin-right: 6px;
      }
    }
  }

  .van-cell__value {
    flex: unset;
    .article-image {
      width: 116px;
      height: 73px;
    }
  }
}
</style>
