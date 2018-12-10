<template>

 <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>

 <el-table
    :data="characterData"
    style="width: 100%">
    <el-table-column type="expand" >
      <template slot-scope="props">
          <el-row v-if="props.row.children.length === 0">
            <el-col :span="24">暂无权限啊啊</el-col>
          </el-row>
        <!-- 渲染一级权限 -->
      <el-row v-for="levle1 in props.row.children" :key="levle1.id" class="levle1">
          <el-col :span="4"><el-tag closable>{{levle1.authName}}</el-tag>
          <i class="el-icon-arrow-right"></i></el-col>
          <el-col :span="20">

            <!-- 渲染二级权限 -->
             <el-row v-for="levle2 in levle1.children" :key="levle2.id" class="levle2">
          <el-col :span="4"> <el-tag type="success" closable>{{levle2.authName}}</el-tag>
          <i class="el-icon-arrow-right"></i>
           </el-col>
          <el-col :span="20">
            <!-- 渲染三级权限 -->
            <span v-for="levle3 in levle2.children" :key="levle3.id" class="levle3">
             <el-tag type="warning" closable>{{levle3.authName}}</el-tag> 
            </span>
          </el-col>
             </el-row>

            </el-col>   
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      :index="indexMethod"
      width="50">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描叙"
      prop="roleDesc">
    </el-table-column>
     <el-table-column
      label="操作" >
      <template slot-scope="scope">
    <el-button type="primary" plain icon="el-icon-edit" circle size="mini"></el-button>
     <el-button type="danger" plain icon="el-icon-delete" circle size="mini"></el-button>
      <el-button type="success"
       plain icon="el-icon-edit"  
       size="mini" @click="character(scope.row)">分配权限</el-button>
    </template>
    </el-table-column>
  </el-table>

  <!-- 分配权限 -->
  <el-dialog title="收货地址" :visible.sync="isshowchara">
  
   <!-- Tree结构 -->
   <el-tree
  :data="rigthsTree"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>


  <div slot="footer" class="dialog-footer">
    <el-button @click="isshowchara = false">取 消</el-button>
    <el-button type="primary" @click="assignRights">确 定</el-button>
  </div>
</el-dialog>

 </div>
</template>



<script>
export default {
  data() {
    return {
      characterData: [],
      isshowchara: false,

      rigthsTree: [],
      defaultProps: {
        label: "authName"
      },
      //角色id
      roleId: -1
    };
  },
  created() {
    this.characterlist();
    this.getrightTree();
  },
  methods: {
    indexMethod(index) {
      return index;
    },
    //请求列表的数据
    async characterlist() {
      const res = await this.$http.get("/roles");
      this.characterData = res.data.data;
      // console.log(res);
    },
    /**
     * 展示分配权限的对话框
     */
    character(curRole) {
      this.isshowchara = true;
      //暂存角色id
      this.roleId = curRole.id;
      console.log(curRole);
      this.$nextTick(() => {
        const checkedkeys = [];
        curRole.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedkeys.push(level3.id);
            });
          });
        });
        this.$refs.tree.setCheckedKeys(checkedkeys);
      });
    },
    /**
     * 获取所有权限的tree列表
     */
    async getrightTree() {
      const res = await this.$http.get("rights/tree");
      console.log(res);
      if (res.data.meta.status === 200) {
        //成功
        this.rigthsTree = res.data.data;
      }
    },
    /**
     * 给角色分配权限
     *
     */
    async assignRights() {
      //获取选中的节点
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      const halfcheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      // const allkeys = checkedKeys.concat(halfcheckedKeys);
      // es6里面的展开运算符
      const allkeys = [...checkedKeys, ...halfcheckedKeys];
      // console.log(allkeys);
      //发送axios
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: allkeys.join(",")
      })
      if (res.data.meta.status === 200) {
        //关闭对话框
        this.isshowchara = false;
        //更新列表数据
        this.characterlist();
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
      } else {
        this.$message({
          type: "info",
          message: "更新失败"
        });
      }
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
.levle1 {
  border-bottom: 1px dotted #ccc;
  padding: 10px 0;
}
.levle2 {
  padding: 5px 0;
}
.levle3 {
  padding: 5px;
}
.levle3 :last-child {
  border: 0px;
}
</style>