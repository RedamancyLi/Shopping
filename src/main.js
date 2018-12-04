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
