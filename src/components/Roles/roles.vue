<template>
<div>
 <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
  <el-table
      :data="rolelist"
      style="width: 100%">
       <el-table-column
      type="index"
      :index="indexMethod"
      width="50">
    </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
           <span v-else-if="scope.row.level==='1'">二级</span>
             <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>


<script>
export default {
  data() {
    return {
      rolelist: [],
      //指定序号从0开始的
      indexMethod(index) {
        return index;
      }
    };
  },
  created() {
    this.getroleList();
  },

  methods: {
    async getroleList() {
      const res = await this.$http.get("rights/list");
      console.log(res);
      //渲染到页面
      this.rolelist = res.data.data;
    }
  }
};
</script>

<style scoped>
.el-input-group {
  width: 500px;
  margin-right: 15px;
}
.el-breadcrumb {
  font-size: 16px;
  height: 50px;
  background-color: #d4dae0;
  line-height: 50px;
  padding-left: 16px;
}
</style>

