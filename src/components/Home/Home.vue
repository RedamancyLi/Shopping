<template>
<el-container class="home">
  <el-header class="header">
<el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  <img src="@/assets/images/login.png" alt=""></el-col>
  <el-col :span="16"><div class="grid-content bg-purple"></div>
    <h1>电商后台管理系统</h1></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">
     <span>欢迎上海前端22期星曜会员
    <a href="javascript:">退出</a>
  </span></div></el-col>
</el-row>
  </el-header>
  <el-container class="bottom">
    <el-aside width="200px" class="left">Aside</el-aside>
    <el-main class="right">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {};
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
</style>

