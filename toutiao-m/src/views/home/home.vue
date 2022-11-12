<template>
  <div class="home-container">
    <!-- 头部导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button to="/search" round type="info" size="small" icon="search" class="search-btn">搜索</van-button>
      </template>
    </van-nav-bar>
        <!-- 频道列表
          v-model 表示绑定当前激活标签对应的索引值，默认选中第一个
          animated 转场动画 在标签中直接写某个属性名如 animated === :animated="true"
          swipe-threshold 滚动阈值，表示最低滑动的标签数
          title 表示的是页面上的标题内容
          <van-tab>标签中设置内容区域 后续设置的表格数据放置在双标签中
        -->
      <van-tabs  class="channel-tabs" v-model="active" animated swipe-threshold="3">
      <van-tab
      v-for="channel in userChannels" :key="channel.id"
      :title="channel.name">
      <ArticleList :channelId="channel.id"></ArticleList>

      </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      class="channel-edit-popup"
      :style="{ height: '100%' }"
    >
    <ChannelEdit :myChannels="userChannels" :active="active" :allChannels="allChannels" @update-active="updateActiveFn"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
/*
  目标1：通过接口获取并展示频道列表数据
  1. 在api的功能文件中封装接口
  2. 在index.js中统一导出
  3. 在需要的文件中倒入接口方法并在合适的生命周期中调用
  4. 封装独一的调用方法
  5. 创建变量接收数据，并渲染到页面上
*/
/*
  目标2: 实现频道编辑弹框
  1. 使用弹框组件van-popup来实现弹框效果
  2. 通过子父组件传参，将我的频道列表传递给弹框频道编辑组件，渲染数据
  3. 通过父组件中的active频道选中索引值，来让编辑频道组件中的我的频道高亮
  4. 渲染推荐频道数据内容（推荐频道 = 全部频道 - 我的频道） => 过滤数组
*/
/*
  目标3: 实现频道编辑中的增加，删除，切换操作
  1. 当点击频道推荐中的选项时，将该选项添加到我的频道中（问题： 需不需要删除推荐频道中的当前选项？ =》 不需要）
  2. 实现删除和切换频道
  2.1 点击编辑、完成按钮，实现删除和切换频道的操作
  2.2 当为非编辑状态时，点击选项为切换操作
    - 点击选项时，切换了首页的频道选项
    - 同时会关闭弹框
  2.3 当为编辑状态时，点击选项为删除操作
    - 推荐频道不能删除（不能有删除图标）
    - 点击选项，将当前选项从myChannels列表中删除
    - 当删除选项的索引位置小于等于当前高亮选项的索引位置时， active需要 减1
*/
import { getUserChannelsAPI, getAllChannelsAPI } from '../../api/index.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit'
import { getItem } from '../..//utils/storage.js'
export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      allChannels: [],
      isChannelEditShow: false
    }
  },
  created () {
    // 获取用户频道列表
    this.loadUserChannels()
    // 获取全部频道列表
    this.loadAllChannels()
  },
  methods: {
    // 获取用户列表
    async loadUserChannels () {
      try {
        if (this.$store.state.user.token || !getItem('TOUTIAO_MYCHANNELS')) {
          const { data: res } = await getUserChannelsAPI()
          // console.log(res)
          this.userChannels = res.data.channels
        } else {
          this.userChannels = getItem('TOUTIAO_MYCHANNELS')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannelsAPI()
        console.log(res)
        this.allChannels = res.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 更新选中频道
    updateActiveFn (index, flag = false) {
      // 当flag为true时，不用关闭弹幕
      // 切换频道
      this.active = index
      // 关闭弹框
      if (!flag) {
        this.isChannelEditShow = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
  :deep(.van-nav-bar__title){
  max-width: unset;
  }
  .search-btn{
    background-color: #5babfb;
    border: none;
    width: 300px;
    }

  :deep(.channel-tabs) {
    .van-tabs__wrap{
      width:100%;
      z-index: 2;
      position: fixed;
      top: 46px;
    }
    .van-tab {
      width: 100px;
      border-right: 1px solid #f3f3f3;
    }

    .van-tabs__line {
      background-color: #3296fa;
      height: 4px;
      width: 16px;
    }
    .placeholder {
      flex-shrink: 0; /* 让当前元素不参与flex布局计算 */
      width: 32px;
      height: 44px;
    }

    .hamburger-btn {
      z-index: 9999;
      position: fixed;
      right: 0;
      background-color: #ffffff;
      width: 32px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        background-image: url('../../assets/gradient-gray-line.png');
        width: 1px;
        height: 44px;
        position: absolute;
        left: 0;
      }
    }
  }
  .channel-edit-popup{
    padding-top: 50px;
    box-sizing: border-box;
  }
}
</style>
