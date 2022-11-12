// 事件处理工具模块
// 引入依赖
import dayjs from 'dayjs'
import Vue from 'vue'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 引入配置相对事件的方法
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs 默认语音是英文，将其配置成中文
dayjs.locale('zh-cn')

// console.log(dayjs(new Date()).format('YYYY-MM-DD'))
// dayjs(new Date()) => 当前时间
// .to() => 到哪里
// .to(dayjs('1996-01-23')) => 到1996年1月23日
// => 当前时间至目标事件的距离
// console.log(dayjs(new Date()).to(dayjs('1996-01-23')))

// 制作过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs(new Date()).to(dayjs(value))
})
