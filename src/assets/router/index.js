// 导入Vue
import Vue from "vue";

// 1导入路由
import VueRouter from "vue-router";
// 5.导入组件配置路由
import Home from "@/components/Home/Home";
import Login from "@/components/Login/Login";
// 用户组件
import Userlist from "@/components/User/users";
// 权限管理
import Roleslist from "@/components/Roles/roles";
import Character from "@/components/Roles/rights";
//商品管理
import Commoditylist from "@/components/Commodity/goods";
import Parameterlist from "@/components/Commodity/params";
import Prolist from "@/components/Commodity/categories";
//订单管理
import Orderlist from "@/components/Order/orders";
//数据统计
import Datalist from "@/components/Data/reports";

//配置商品添加的路由
import Addgoods from "@/components/Commodity/goods-add";

//404页面
import CannotFind from "@/components/CannotFind/CannotFind"
// 2将路由作为插件安装
Vue.use(VueRouter);

// 3创建路由 配置路由
const router = new VueRouter({
  routes: [
    //路由重定向
    { path: "/", redirect: "/home" },
    { path: "/login", component: Login },
    {
      path: "/home",
      component: Home,
      children: [
        //用户
        { path: "/users", component: Userlist },
        //权限
        { path: "/roles", component: Roleslist },
        { path: "/rights", component: Character },
        //商品
        ///goods/:page 表示使用了路由参数 用来动态的匹配路由哈希值
        // :page? 表示是可选的
        { path: "/goods/:page?", component: Commoditylist },
        { path: "/params", component: Parameterlist },
        { path: "/categories", component: Prolist },
        //订单
        { path: "/orders", component: Orderlist },
        //数据
        { path: "/reports", component: Datalist },
        { path: "/goods-add", component: Addgoods }
      ]
    },
    // *表示要匹配所有的路由 所以一定要放在最后
    { path: "*", component: CannotFind }
  ]
});
// router.push('/login')
//添加导航守卫来实现登陆的访问限制
router.beforeEach((to, from, next) => {
  // ...
  if (to.path === "/login") {
    //是登陆页面
    return next();
  }
  //不是登陆页面
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next("/login");
  }
});

//导出路由实例
export default router;
