<template>
<el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>


<script>
//导入axios
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度为6到12位字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登陆
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //valid 表示表单是否校验成功
        if (!valid) {
          return false;
        }
        //验证成功：
        //发送axios
        axios
          .post("http://localhost:8888/api/private/v1/login", this.loginForm)
          .then(res => {
            if (res.data.meta.status === 200) {
              //将登陆标识token存储到localStorage中
              localStorage.setItem('token',res.data.data.token)
              //登陆成功  跳转到首页
              this.$router.push("/home");
              this.$message({
                message: res.data.meta.msg,
                type: "success",
                duration: 800
              });
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: "error",
                duration: 1000
              });
            }
          });
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
