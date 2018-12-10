<template>
 <div>
   <el-button type="success" plain @click="isShowCate">添加分类</el-button>
    <el-table
       v-loading="isloading"
        :data="cateList"
        style="width: 100%">

        <!-- 可展开的列 -->
      <el-table-tree-column 
      :index-size="30"
      prop="cat_name"
       tree-key="cat_id"
       parent-key="cat_pid"
       level-key="cat_level"
       label="分类名称"
       width="220">
      </el-table-tree-column>

        <!-- <el-table-column   
          prop="cat_name"
          label="分类名称"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="cat_deleted"
          label="是否有效"
          width="180">
          <!-- 自定义模板 -->
          <template slot-scope="scope">
              {{scope.row.cat_deleted ? "否" : "是"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="cat_level"
          label="层级">
        </el-table-column>
           <el-table-column
          label="操作">
         <template slot-scope="scope">
            <el-row>
        <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
         <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          </el-row>
         </template>
        </el-table-column>
      </el-table>

   <!-- 分页效果 -->
   <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="pagesize"
  :current-page="pagenum"
  @current-change="changePage"
  >
</el-pagination>

<el-dialog title="添加分类" :visible.sync="dialogCate" >
  <el-form :model="Catelist" label-width="80px" >
    <el-form-item label="分类名称">
      <el-input v-model="Catelist.cat_name" ></el-input>
    </el-form-item>
    <el-form-item label="父级名称">
      <el-cascader
      v-model="Catelist.cat_pid_arr"
        :options="options"
        change-on-select
        :props="lieb"
      ></el-cascader>
      </el-form-item>
  </el-form >
  <div slot="footer" class="dialog-footer" >
    <el-button @click="dialogCate = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </div>
</el-dialog>


 </div>
</template>


<script>
export default {
  data() {
    return {
      cateList: [],
      total: 0,
      pagenum: 1,
      pagesize: 10,
      isloading: true,
      dialogCate: false,
      Catelist: {
        cat_name: "",
        // cat_id: -1,
        //存储选中项结合
        cat_pid_arr: []
      },

      options: [],
      lieb: { label: "cat_name", value: "cat_id" }
    };
  },
  created() {
    this.getCatelist();

    this.CateAddlist();
  },
  methods: {
    async getCatelist(pagenum = 1) {
      //开启isloading
      this.isloading = true;
      const res = await this.$http.get("/categories", {
        params: {
          type: 3,
          total: 0,
          pagenum,
          pagesize: 10
        }
      });
      // console.log(res);
      const { result, total, pagenum: curPage } = res.data.data;
      if (res.data.meta.status === 200) {
        this.cateList = result;
        this.total = total;
        this.pagenum = curPage + 1;
        this.isloading = false;
      }
    },
    //  分页
    changePage(curPage) {
      this.getCatelist(curPage);
    },
    // 弹框
    isShowCate() {
      this.dialogCate = true;
    },

    async CateAddlist() {
      const res = await this.$http.get("/categories", {
        params: {
          type: 2
        }
      });
      console.log(res);
      if (res.data.meta.status === 200) {
        this.options = res.data.data;
      }
    },
    async addCate() {
      //发送axios
      const { cat_pid, cat_name, cat_pid_arr } = this.Catelist;
      const res = await this.$http.post("/categories", {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], //当前要添加元素的id
        cat_name,
        cat_level: cat_pid_arr.length
      });
      console.log(res);

      this.dialogCate = false;
      this.getCatelist();
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
    }
  }
};
</script>

<style>
</style>
