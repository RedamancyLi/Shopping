//导入axios
// import axios from "axios"

export default {
  data() {
    return {
      userlistData: [
       
      ],
      total: 0,
      pagesize: 3,
      pagenum: 1,
      searchText: "",
      isshowUserAddDialog: false,
      userAddForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      userAddRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "密码长度为6到12位字符", trigger: "blur" }
        ],
        email: [
          // pattern 表示使用正则表达式来校验
          /* eslint-disable no-useless-escape */
          {
            pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: /^1[3|4|5|8]\d{9}$/,
            message: "手机格式不正确",
            trigger: "blur"
          }
        ]
      },
      isshowEditdialog: false,
      userEditfrom: {
        username: "",
        email: "",
        mobile: "",
        id: -1
      },
      isshowUserRole: false,
      userformRole: {
        username: "",
        rid: "",
        id: -1
      },
      Rolelist: {}
    };
  },

  created() {
    this.getUserslist();
    //获取所有的角色列表
    this.getRolelist();
  },

  methods: {
 
    //封装
    async getUserslist(pagenum = 1, query = "") {
      const url = "http://localhost:8888/api/private/v1/users";
      const config = {
        params: {
          //查询条件
          query,
          pagenum,
          pagesize: 3
        },
        //给用户授权
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };
      // console.log(this.$http===axios)
      //发送axios
      const res = await this.$http.get(url, config);

     const aa=res.data.data.users[1].username;
     console.log(aa)
     this.$emit('unname',aa)
      if (res.data.meta.status === 200) {
        //将数据给到列表
        this.userlistData = res.data.data.users;
        //设置总条数
        this.total = res.data.data.total;
        //当前的页码
        this.pagenum = res.data.data.pagenum;
      } else {
        //token失效  用户重新登录
        this.$router.push("/login");
        //清除token
        localStorage.removeItem("token");
      }
      // this.$emit('usname',this.username)
    },
    changpage(curpage) {
      //根据当前页码获取该页的数据
      this.getUserslist(curpage, this.searchText);
    },
    search() {
      this.getUserslist(1, this.searchText);
    },
    //删除文件
    async deleteUser(id) {
      {
        try {
          await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          });
          // console.log(this.$http === axios)
          //确认删除  发送axios
          const res = await this.$http.delete(`/users/${id}`);
          // const res = await this.$http.delete(`/users/${id}`, {
          //   //校验
          //   headers: {
          //     Authorization: localStorage.getItem('token')
          //   }
          // })
          if (res.data.meta.status === 200) {
            //删除成功 刷新页面
            this.getUserslist(1, this.searchText);
          }
          console.log(res);
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        } catch (e) {
          //取消删除
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          console.log(e);
        }
      }
    },
    //切换状态
    async userChange(curstatus) {
      const res = await this.$http.put(
        `/users/${curstatus.id}/state/${curstatus.mg_state}`,
        null,
        {
          //校验
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      // this.getUserslist(1, this.searchText)
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
    },
    //弹出框
    async showUserAddDialog() {
      this.isshowUserAddDialog = true;
    },
    //添加文件
    async addUser() {
      try {
        await this.$refs.userAddFormRef.validate();
        const res = await this.$http.post("/users", this.userAddForm);
 
        if (res.data.meta.status === 201) {
          this.isshowUserAddDialog = false;
          this.getUserslist();
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        }
      } catch (e) {}
    },
    closeUserAddDialog() {
      //重置表单
      this.$refs.userAddFormRef.resetFields();
    },
    //弹出编辑框 提供数据
    Editdialog(editUser) {
      this.isshowEditdialog = true;
      //  this.userEditfrom.username=editUser.username
      //  this.userEditfrom.email=editUser.email
      //  this.userEditfrom.mobile=editUser.mobile
 
      for (let key in this.userEditfrom) {
        this.userEditfrom[key] = editUser[key];
      }
 
    },
    //编辑用户
    async edituserym() {
      const { email, mobile } = this.userEditfrom;
      const res = await this.$http.put(`/users/${this.userEditfrom.id}`, {
        email,
        mobile
      });
      // const res=await this.$http.put(`/users/${this.userEditfrom.id}`,{
      //   email:this.userEditfrom.email,
      //   mobile:this.userEditfrom.mobile
      // })
      // console.log(res)
      this.isshowEditdialog = false;
      this.getUserslist(1, this.searchText);
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
   
    },
    /**
     * 展示分配角色的对话框
     *
     */
    async showUserRole(current) {
      console.log(current);
      this.isshowUserRole = true;
      //选中
      const res = await this.$http.get(`/users/${current.id}`);
      // console.log(res)
      this.userformRole.rid = res.data.data.rid === -1 ? "" : res.data.data.rid;
      this.userformRole.username = current.username;
      //暂存用户id
      this.userformRole.id = current.id;
    },
    async getRolelist() {
      const res = await this.$http.get("/roles");
      // console.log(res)
      this.Rolelist = res.data.data;
    },
    //分配角色
    async assignRole() {
      const res = await this.$http.put(`users/${this.userformRole.id}/role`, {
        rid: this.userformRole.rid
      });
      if (res.data.meta.status === 200) {
        this.isshowUserRole = false;
        this.getUserslist(1, this.searchText);
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
      } else {
        this.$message({
          type: "info",
          message: "设置失败"
        });
      }
      //  console.log(res)
     
    }
  }
};

//通过then使用的
// getUserslist(pagenum = 1, query = "") {
//   //发送axios
//   axios.
//     get("http://localhost:8888/api/private/v1/users", {
//       params: {
//         //查询条件
//         query,
//         pagenum,
//         pagesize: 3
//       },
//       //给用户授权
//       headers: {
//         Authorization: localStorage.getItem("token")
//       }
//     })
//     .then(res => {
//       console.log(res)
//       if (res.data.meta.status === 200) {
//         //将数据给到列表
//         this.userlistData = res.data.data.users;
//         //设置总条数
//         this.total = res.data.data.total
//         //当前的页码
//         this.pagenum = res.data.data.pagenum

//       } else {
//         //token失效  用户重新登录
//         this.$router.push('/login');
//         //清除token
//         localStorage.removeItem('token');
//       }
//     })
// },
