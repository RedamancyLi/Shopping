// 导入Vue
import Vue from 'vue'

// 1导入路由
import VueRouter from 'vue-router'
// 5.导入组件配置路由
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
// 2将路由作为插件安装
Vue.use(VueRouter)


// 3创建路由 配置路由
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// router.push('/login')
//添加导航守卫来实现登陆的访问限制
router.beforeEach((to, from, next) => {
  // ...
  if (to.path === "/login") {
    //是登陆页面
    return next();
  }
  //不是登陆页面
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

//导出路由实例
export default router

