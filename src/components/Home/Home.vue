<template>

<el-container class="home">
  <el-header class="header">
<el-row>
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  <img src="@/assets/images/login.png" alt=""></el-col>
  <el-col  :xs="10" :sm="12" :md="13" :lg="16" ><div class="grid-content bg-purple"></div>
    <h1>电商后台管理系统</h1></el-col>
  <el-col :xs="10" :sm="8" :md="7" :lg="4" ><div class="grid-content bg-purple">
     <span ><span>{{name}}欢迎光临</span>
    <a href="javascript:" @click.prevent="logout">退出</a>
  </span></div></el-col>
</el-row>
  </el-header>
  <el-container class="bottom">
    <el-aside width="200px" class="left">

<!-- 左侧模块 -->
 <el-menu
      :unique-opened="true"
      :router="true"
      :default-active="$route.path.slice(1)"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="level1.id+''" v-for="level1 in menus" :key="level1.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{level1.authName}}</span>
        </template>
        <!-- 内部导航 -->
      <el-menu-item :index="level2.path" v-for="level2 in level1.children" :key="level2.id">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ level2.authName}}</span>
      </el-menu-item>
      </el-submenu>
      
        
    </el-menu>

    </el-aside>
    <el-main class="right">
      <!-- v-show="right" -->
<div v-show="fl">  
<h1>您好!欢迎光临电商后台管理系统</h1>
</div>
  <!-- 设置路由出口 -->
  <router-view></router-view>

    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      fl: false,
      menus: [],
      name: ""
    };
  },
  created() {
    this.routerPath();
    this.getMenus();
    // this.huuser();
    this.unname();
    let unname = localStorage.getItem("unname");
    console.log(unname);
    this.name = unname;
  },
  methods: {
    routerPath() {
      if (this.$route.path === "/home") this.fl = true;
    },
    //退出功能
    logout() {
      this.$confirm("您确定退出系统吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          //跳转到登录页面 移除token
          this.$router.push("/login");
          //移除token
          localStorage.removeItem("token");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    //动态获取菜单
    async getMenus() {
      const res = await this.$http.get("/menus");
      console.log(res);
      this.menus = res.data.data;
    },
    unname(name) {
      console.log(name + "12312");
    }
  },
  watch: {
    $route(to, form) {
      if (to.path === "/home") this.fl = true;
      else this.fl = false;
    }
  }
};
</script>
<style>
.home {
  height: 100%;
}
.header {
  background-color: #b3c1cd;
}
.header img {
  width: 180px;
  padding-top: 5px;
}
.header h1 {
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 60px;
  color: #fff;
}
.header span {
  text-align: right;
  line-height: 60px;
  font-weight: bold;
}
.header span a {
  text-decoration: none;
  color: #daa520;
}
.left {
  background-color: #545c64;
}
.right {
  background-color: #eaeef1;
}
.grid-content {
  position: absolute;
  right: 0;
}
</style>

