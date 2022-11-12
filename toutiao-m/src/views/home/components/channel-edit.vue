<template>
  <div class="channel-edit-container">
    <!-- 我的频道标题 -->
    <van-cell title="我的频道">
      <template #default>
        <van-button
          plain
          round
          type="danger"
          size="mini"
          class="edit-btn"
          @click="isEdit=!isEdit"
        >{{isEdit?'完成':'编辑'}}</van-button>
      </template>
    </van-cell>

    <!-- 我的频道宫格 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        :class="{active_red : active === index}"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        :icon="(isEdit && index !==0)? 'close':''"
        :text="channel.name"
        @click="onChannelClick(index,channel.id)"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐"></van-cell>

    <!-- 频道推荐宫格 -->
    <van-grid :gutter="8" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="value in newRecommendChannels"
        :key="value.id"
        icon="plus"
        :text="value.name"
        @click="onAddChannnel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
/*
  需求1： 新增删除频道时的数据处理
  1.判断用户是否登录  => $store.state.user.token
  2.如果已登录，则调用接口，进行新增操作
  3.如果未登录，则进行本地储存
 */
/*
  需求2： 获取频道列表逻辑修改
  1.$store.state.user.token 存在时=> 已登录，携带token调用查询接口
  2.$store.state.user.token 不存在时 => 未登录，通过本地存储中获取数据
  2.$store.state.user.token 不存在时 => 未登录，不携带token调用查询接口

  => 代码情景
  1.调用接口 => $store.state.user.token  || !getItem('TOUTIAO_MYCHANNELS')
  2.本地存储 => ELSE
 */
import _ from 'lodash'
import { addUserChannelAPI, delUserChannelAPI } from '../../../api/index.js'
import { setItem } from '../../../utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      default: () => []
    },
    active: { // 当前高亮频道
      type: Number,
      default: 0
    },
    allChannels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      myChannelsClone: this.myChannels,
      isEdit: false
    }
  },
  methods: {
    // 添加到我的频道
    async onAddChannnel (channel) {
      this.myChannelsClone.push(channel)

      // 数据持久化处理
      if (this.$store.state.user.token) {
        // 已登录状态
        try {
          await addUserChannelAPI({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast.success('添加成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('添加失败')
        }
      } else {
        // 未登录状态
        // 把数据存储到本地
        setItem('TOUTIAO_MYCHANNELS', this.myChannels)
      }
    },
    // 点击我的频道触发的方法
    async onChannelClick (index, channelId) {
      if (this.isEdit) {
        // 编辑状态，删除频道
        if (index !== 0) {
          this.myChannelsClone.splice(index, 1)
          // 如果删除的元素索引小于等于当前高亮的索引，需要让active 减 1
          if (index <= this.active) {
            this.$emit('update-active', this.active - 1, true)
          }
        }

        // 删除频道数据持久化
        // 数据持久化处理
        if (this.$store.state.user.token) {
        // 已登录状态
          try {
            await delUserChannelAPI(channelId)
            this.$toast.success('删除成功')
          } catch (error) {
            console.log(error)
            this.$toast.fail('删除失败')
          }
        } else {
        // 未登录状态
        // 把数据存储到本地
          setItem('TOUTIAO_MYCHANNELS', this.myChannels)
        }
      } else {
        // 非编辑状态，切换频道并关闭弹框
        this.$emit('update-active', index)
      }
    }
  },
  computed: {
    // 计算得出推荐频道的列表数组
    recommendChannels () {
      // 1.从allChannels中通过过滤器进行筛选
      const list = this.allChannels.filter(channel => {
      //  在filter中返回为true时，这个元素会添加到新数组中
      //  在filter中返回为false时，这个元素会被过滤掉
      // 当前循环的元素如果没有出现在 myChannels 数组里 那么返回true
        return !this.myChannels.find(mychannel => mychannel.id === channel.id)
      })
      console.log(list, '推荐列表')
      return list
    },
    newRecommendChannels () {
      return _.differenceBy(this.allChannels, this.myChannels, 'id')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit-container {
  .my-grid {
    :deep(.active_red){
      .van-grid-item__text{
        color: red !important;
      }
    }
    .edit-btn {
      padding: 0 12px;
    }

    :deep(.channel-item) {
      .van-grid-item__content {
        background-color: #f5f5f6;
      }

      .van-grid-item__text {
        font-size: 12px;
        color: #222222;
        margin-top: 0;
      }

      .van-icon-close {
        position: absolute;
        font-size: 16px;
        top: -7px;
        right: -7px;
        color: #d9d6d9;
      }
    }
  }
  .recommend-grid {
    :deep(.channel-item) {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        background-color: #f5f5f6;
        padding: 16px 4px;
      }

      .van-grid-item__text {
        font-size: 12px;
        color: #222222;
        margin-top: 0;
      }

      .van-icon-plus {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
</style>
