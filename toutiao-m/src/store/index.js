import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({

  // 1. 储存公共数据（变量）的地方 =》 类比与vue文件中的data()的返回值
  state: {
    // 一个user变量，存储当前用户的token信息
    user: getItem('TOKEN_KEY') || {}
    // user: {}
  },

  // 3. 是state中定义数据的计算属性 => 类比与computed
  getters: {
  },
  // 2. 外界只可读取state中的属性，不可直接进行修改，但是可以用过mutations中定义的方法来修改state中的属性
  // => 类比与methods中的方法， 使用逻辑与refs来调用子组件方法一致
  mutations: {
    setUser (state, data) {
      /*
        state  表示是state对象 ， 可以访问内部的值
        data  外界传递过来的参数
      */
      state.user = data

      setItem('TOKEN_KEY', state.user)
    }
  },
  // 4. 在vuex中的mutations里的方法不允许直接任何的异步操作，如果修改逻辑涉及到异步操作时，现在actions中执行完异步步骤，在让mutations进行state的值的修改
  // 翻译翻译： actions中执行异步操作，mutations中执行赋值操作
  actions: {
  },
  // 5. 模块化vuex，一个状态管理器中可能后很多类 state mutations actions getters，那么每一必要在一个文件中写完所有的内容，可以分不同的模块来写相应的方法和数据，最后再modules里面统一整合
  modules: {
  }
})
