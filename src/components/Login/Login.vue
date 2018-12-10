<template>

<el-row type="flex" justify="center" class="login" align="middle">
  <el-col  :xs="14" :sm="12" :md="10" :lg="6" :xl="6">
    <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form" label-position="top">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password" type="password"></el-input>
  </el-form-item>
  <el-form-item class="btn">
    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form></el-col>
</el-row>

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
    async submitForm(formName) {
      try {
        await this.$refs[formName].validate();

        //验证成功：
        //发送axios
        const res = await axios.post(
          "http://localhost:8888/api/private/v1/login",
          this.loginForm
        );
console.log(res)
        if (res.data.meta.status === 200) {
          //将登陆标识token存储到localStorage中
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem('unname',this.loginForm.username)
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
      } catch (err) {
        //失败
      }

      // console.log(this.$route, this.$router);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
}
.btn {
  text-align: center;
}
</style>
