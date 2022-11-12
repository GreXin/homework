import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// ui导入ui组件
// eslint规范要求，所有的import引入方法必须写在文件内容的最上面
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入全局样式表 - 全局样式表需要放在ui样式表的下面，这样才能覆盖ui样式中的内容
import './styles/index.less'

// 配置项目rem基准值
// 1.npm i amfe-flexbile --legacy-peer-deps 下载 lib-flexbile依赖
// 2.在main.js中引入相应依赖
// 3.当使用后，HTML标签就会设置一个当前设备口像素宽度的10%来作为font-size属性
// 4.通过postcss-pxtorem 插件可以将px转化为rem，但是在实际的操作中，该插件不可以修改行内样式的px
// 5.如果移动端项目中的样式涉及到自适应时，不可以写在行内样式中
import 'amfe-flexible'

// 引入时间格式化工具
import './utils/dayjs.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
