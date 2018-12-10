export default {
  data() {
    return {
      dityList: [],
      isshowEditdity: false,
      total: 0,
      pagenum: 1,
      pagesize: 5,

      editfrom: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce: "",
        goods_id: -1
      },
      editdityrules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到  个字符", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            type: "number",
            message: "必须是数字,长度在 1 到 2 个字符",
            trigger: "blur"
          }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { type: "number", message: "长度在 1 到 2 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 获取路由参数 分页
    this.getdityList(this.$route.params.page);
  },
  watch: {
    $route(to, from) {
      this.getdityList(to.params.page);
    }
  },
  methods: {
    async getdityList(pagenum = 1) {
      // 这里要注意 get请求时用params拿到数据
      const res = await this.$http.get("/goods", {
        params: {
          query: "",
          pagenum,
          pagesize: 5
        }
      });
      console.log(res);
      if (res.data.meta.status === 200) {
        //拿到数据给到列表
        this.dityList = res.data.data.goods;
        // 设置总条数
        this.total = res.data.data.total;
        console.log(this.total);
        //设置当前页
        this.pagenum = Number(res.data.data.pagenum); //这里也可以减0 转化

        //遍历goods
        // let times = res.data.data.goods;
        // times.forEach(function(item, index) {
        //   let d = new Date(item.upd_time);
        //   let youWant =
        //   d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        //   console.log(youWant);
        //   // this.youWant=youWant
        // });
      } else {
        //登陆失败
        this.$router.push("./login");
        localStorage.removeItem("token");
      }
    },
    //删除商品
    async deletedity(goods_id) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const res = await this.$http.delete(`/goods/${goods_id}`);
        console.log(res);
        if (res.data.meta.status === 200) {
          //删除成功
          this.getdityList();
        }
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
      } catch (e) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },
    //编辑框
    async isshowEdit(list) {
      console.log(list);
      this.isshowEditdity = true;
      //将表单上面的数据展示到列表
      for (let key in this.editfrom) {
        this.editfrom[key] = list[key];
      }
    },
    //编辑商品
    async Editdity() {
      //发送axios
      const res = await this.$http.put(`goods/${this.editfrom.goods_id}`, {
        goods_name: this.editfrom.goods_name,
        goods_price: this.editfrom.goods_price,
        goods_number: this.editfrom.goods_number,
        goods_weight: this.editfrom.goods_weight,
        goods_introduce: this.editfrom.goods_introduce,
        pics: "",
        attrs: ""
      });
      console.log(res);
    },
    //分页
    changecur(page) {
      // this.getdityList(page);
      this.$router.push(`/goods/${page}`);
    }
  },
  //日期过滤器
  filters: {
    timeAll: function(value) {
      console.log(value);
      // value 表示当前要格式化的数据
      value *= 1000;
      let date = new Date(value);
      console.log(date);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay() +
        1}`;
    }
  }
};
