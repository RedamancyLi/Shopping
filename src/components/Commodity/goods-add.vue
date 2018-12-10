<template >
  <div>
    <el-steps :active="stepactive" finish-status="success">
     <el-step title="第一步 " description="基本信息">
</el-step>
  <el-step title="第二步 " description="商品图片"></el-step>
  <el-step title="第三步 " description="商品内容"></el-step>
</el-steps>
  <el-tabs v-model="tabActive" tab-position="left" @tab-click="changetab">
    <el-tab-pane label="基本信息" name="basic">
<el-form label-width="80px">
  <el-form-item :model="prolist" label="商品名称">
    <el-input v-model="prolist.goods_name" ></el-input>
  </el-form-item>

    <el-form-item :model="prolist" label="商品价格">
    <el-input v-model="prolist.goods_price" ></el-input>
  </el-form-item>

    <el-form-item :model="prolist" label="商品数量">
    <el-input v-model="prolist.goods_number" ></el-input>
  </el-form-item>

    <el-form-item :model="prolist" label="商品重量">
    <el-input v-model="prolist.goods_weight" ></el-input>
  </el-form-item>
   <el-form-item :model="prolist" label="商品分类">
     <el-select v-model="prolist.goods_cat" placeholder="请选择分类商品">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="是否促销">
    <el-radio-group v-model="prolist.is_promote">
      <el-radio :label="true">是</el-radio>
      <el-radio :label="false">否</el-radio>
    </el-radio-group>
  </el-form-item>
   
  </el-form>
      <el-button type="primary" @click="nextstep(1,'pics')">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="pics">
       <el-button type="primary" @click="nextstep(2,'content')">下一步</el-button>
       </el-tab-pane>
    <el-tab-pane label="商品内容" name="content"></el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
export default {
  created() {
    this.prolist.is_promote = false;
  },
  data() {
    return {
      stepactive: 0,
      tabActive: "basic",
      prolist: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: "",
        is_promote: ""
      }
    };
  },

  methods: {
    changetab(tab) {
      console.log(tab);
      this.stepactive = tab.index - 0;
    },
    nextstep(step, tabname) {
      this.stepactive = step;
      this.tabActive = tabname;
    }
  }
};
</script >

<style>
</style>