<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"
    class="page-nav-bar"
    >
      <template #left>
          <van-icon name="cross"  @click="$router.back()"/>
          <!-- <van-icon name="cross"  @click="$router.go(-1)"/> -->
      </template>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        label="手机号"
        v-model="user.mobile"
        name="mobile"
        placeholder="请填写手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i  class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field class="van-field"
        label="验证码"
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
            <i  class="toutiao toutiao-yanzhengma"></i>
        </template>
       <!-- 发送验证码 -->
      <template #button>
        <van-count-down v-if="isCountDown"
        @finish = 'isCountDown = false'
         :time="5 * 1000" format=" ss 秒" />

        <van-button  v-else native-type="button" round class="send-sms-btn" size="small" type="default"
        @click="onSendSms"
        >获取验证码</van-button>
      </template>
     </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import { LoginAPI, userSendSmsAPI } from '../../api/index.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDown: false
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user

      // 2.提交表单请求登录
      try {
        // 3.表单验证
        // 通过加载提示来阻止用户高频的请求点击
        // 挂载在vant中   全局引用实例方法需要用this.$
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true, // 禁用背景点击
          duration: 0 // 持续时间  如果为0则持续展示  成功之后停止
        })
        const res = await LoginAPI(user)
        console.log('登录成功', res)
        // 通过状态管理器存储token => 调用mutations中的方法
        /*
          this.$store  vuex的内置方法
          this.$store.commit  是调用mutations中的方法
          this.$store.commit('mutations中的方法名',需要传递的参数)
        */
        this.$store.commit('setUser', res.data.data)
        // 返回上一页，也就是登录成功的页面
        this.$router.back()
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
        // 通过不同的响应代码来判断提示错误的内容
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
          // console.log('手机号或验证码错误')
        } else {
          this.$toast.fail('网络异常,请稍后重试')
          // console.log('登录失败,请稍后重试', err)
        }
      }
      // 4.根据请求响应结果处理后续操作
    },

    async onSendSms () {
      try {
      // 1.校验手机号码
      // 通过form表单的验证规则，来判断是否符合手机格式
        await this.$refs.loginForm.validate('mobile')
        // 如果一个接口返回成功的返回值不需要在代码中使用，则可以省略赋值操作
        console.log('验证通过')
        // 3.请求发送验证码  有接口
        await userSendSmsAPI(this.user.mobile)

        // 2.验证通过显示倒计时
        // 当接口调用成功，展示倒计时组件
        this.isCountDown = true

        this.$toast.success('发送验证码成功')
      } catch (err) {
        // console.log('验证失败', err)
        if (err.response && err.response.status === 404) {
          this.$toast.fail('手机号不正确')
        } else if (err.response && err.response.status === 429) {
          this.$toast.fail('访问繁忙请一分钟后重试')
        } else if (err.name === 'mobile') {
          this.$toast.fail('手机号不正确')
        } else {
          this.$toast.fail('网络异常，请稍后重试')
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
.container{
  .van-field{
    display: flex;
    align-items: center;
  }
  .send-sms-btn{
      background-color: #ededed;
      .van-button__text{
        color: #666;
      }
    }
.login-btn-wrap{
  padding: 43px 23px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
  }
}
}
</style>
