<template>
  <div class="my-container">
    <!-- 未登录板块 -->
    <div class="offline" v-if="!$store.state.user.token">
      <div class="login-box" @click="$router.push({path:'/login'})">
        <img src="../../assets/mobile.png" alt="" />
        <span>登录/注册</span>
      </div>
    </div>

    <!-- 已登录板块 -->
    <div class="online" v-else>
      <!-- 用户信息区 -->
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <van-button round type="default" size="mini">编辑资料</van-button>
      </div>
      <!-- 头条 关注 粉丝 获赞 -->
      <van-grid>
        <van-grid-item text="头条" >
          <template #icon>
            <span>{{ userInfo.art_count}}</span>
          </template>
        </van-grid-item>
        <van-grid-item text="关注" >
          <template #icon>
            <span>{{ userInfo.follow_count}}</span>
          </template>
        </van-grid-item>
        <van-grid-item text="粉丝" >
          <template #icon>
            <span>{{ userInfo.fans_count}}</span>
          </template>
        </van-grid-item>
        <van-grid-item text="获赞" >
          <template #icon>
            <span>{{ userInfo.like_count}}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 收藏、历史 -->
    <van-grid :column-num="2">
      <van-grid-item style="color: red;" icon="star-o" text="收藏" />
      <van-grid-item style="color: orange;" icon="clock-o" text="历史" />
    </van-grid>

    <!-- 单元格信息栏 -->
    <van-cell title="消息通知" is-link class="mt-6" />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录"
    @click="loginOut"
    class="loginOut mt-6"  v-if="$store.state.user.token"/>
  </div>
</template>

<script>
/*
  目标1: 登录、退出登录功能实现
  1. 通过某个状态值来控制 未登录板块、已登录板块、退出登录单元格的显示隐藏
  2. 这个状态值可以是 $store.state.user.token
  3. 点击未登录板块，'跳转' 登录页面，当点击 'x' 时，'返回'上一页，当登录成功时，同样也是'返回'上一页
  4. 点击退出登录时，进行退出操作 => 清空 $store.state.user 用户信息 （不仅要干掉vuex中的数据，还要干掉本地存储中的）
*/
/*
  目标2： 获取数据并渲染页面
  1. 在api的功能模块中封装获取数据的接口
  2. 在api的导出出口index.js中统一导出接口
  3. 在需要使用的组件中引入对应接口
  4. 选择对应需要调用接口的声明生命周期，触发获取方法（封装独立的函数）
  5. 将接口返回的数据赋值给data中的变量，最后再页面上使用渲染
*/
/*
  目标3： 设置请求头
  1. 统一传入请求头
  2. 什么时候统一传请求头？ => 只要有token，就把请求头传给后端
  3. 在哪设置？ => 在axios请求拦截器中统一设置请求头信息
*/
import { getUserInfoAPI } from '../../api/index.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 进入个人中心页面时，就要请求数据（只有登录时触发）
    if (this.$store.state.user.token) {
      // 请求接口
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录
    loginOut () {
      this.$dialog.confirm({
        title: '确定退出？？？？？'
      })
        .then(() => {
        // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
        // on cancel
        })
    },
    // 请求用户信息
    async loadUserInfo () {
      try {
        const res = await getUserInfoAPI()
        console.log(res)
        this.userInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .offline {
    background-image: url('../../assets/banner.png');
    background-size: cover;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        width: 65px;
        height: 65px;
      }

      span {
        margin-top: 8px;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }

  .online {
    background-image: url('../../assets/banner.png');
    background-size: cover;

    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 38px 16px 0;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 55px;
          height: 55px;
          border: 2px solid #ffffff;
        }
        .name {
          margin-left: 10px;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }

    // 样式穿透 - 第三方的组件样式可能会影响不到
    :deep(.van-grid) {
      &::after {
        border: none;
      }
      .van-grid-item__content {
        background-color: unset;
        color: #ffffff;
        &::after {
          border: 0;
        }

        .van-grid-item__text {
          color: #ffffff;
        }
      }
    }
  }

  .loginOut {
    .van-cell__title {
      text-align: center;
      color: red;
    }
  }

  .mt-6 {
    margin-top: 6px;
  }
}
</style>
