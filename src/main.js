// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 1导入路由
import VueRouter from 'vue-router'
// 2将路由作为插件安装
Vue.use(VueRouter)
// 3创建路由 配置路由
const router = new VueRouter({
 
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
