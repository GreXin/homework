// 全局配置axios模块
import axios from 'axios'
import store from '../store/index.js'

export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// axios请求拦截器
request.interceptors.request.use(config => {
  // config：本次请求的配置对象（这个对象中就有我们传递的参数）
  // 可以通过config去插入headers数据
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  // 导出config
  return config
})
