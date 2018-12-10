// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入路由
import router from './assets/router'
//导入ElementUI 组件库
import ElementUI from 'element-ui'
//导入ElementUI 样式文件
import 'element-ui/lib/theme-chalk/index.css'

//导入自定义样式啊
import '@/assets/css/index.css'

//导入第三方组件 表格展开
import ElTreeGrid from 'element-tree-grid'


//导入axios
import axios from 'axios'
//将axios添加到Vue的原型中
Vue.prototype.$http=axios
//注册全局组件
Vue.component(ElTreeGrid.name,ElTreeGrid)
//配置基础地址
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 所有请求之前都要执行的操作
  config.headers.Authorization=localStorage.getItem('token')
  return config
},  (error) => {
  // 错误处理
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
  // 所有请求完成后都要执行的操作
  return response
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})

//作为插件引入
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4.将vue实例和router实例关联
  router
})
