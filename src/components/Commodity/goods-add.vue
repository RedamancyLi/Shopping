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
  <el-form-item  label="商品名称">
    <el-input v-model="goodsAddForm.goods_name" ></el-input>
  </el-form-item>

    <el-form-item  label="商品价格">
    <el-input v-model="goodsAddForm.goods_price" ></el-input>
  </el-form-item>

    <el-form-item  label="商品数量">
    <el-input v-model="goodsAddForm.goods_number" ></el-input>
  </el-form-item>

    <el-form-item  label="商品重量">
    <el-input v-model="goodsAddForm.goods_weight" ></el-input>
  </el-form-item>
   <el-form-item label="商品分类" >
          <el-cascader
           v-model="goodsAddForm.goods_cat" 
          :options="cateList"
          :props="{label:'cat_name',value:'cat_id'}"
       >
        </el-cascader>
  </el-form-item>

    <el-form-item label="是否促销">

       <el-radio v-model="goodsAddForm.is_promote" :label="true">是</el-radio>
       <el-radio v-model="goodsAddForm.is_promote" :label="false">否</el-radio>

  </el-form-item>
   
  </el-form>
      <el-button type="primary" @click="nextstep(1,'pics')">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="pics">
      <el-upload
      class="upload-demo"
      action="http://localhost:8888/api/private/v1/upload"
      :on-success="uploadSuccess"
      :headers="uploadHeaders"
      list-type="picture-card">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
       <el-button class="mt20" type="primary" @click="nextstep(2,'content')">下一步</el-button>
       </el-tab-pane>
    <el-tab-pane label="商品内容" name="content">
<quill-editor v-model="goodsAddForm.goods_introduce"></quill-editor>
 <el-button type="primary" @click="addGoods">确定</el-button>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  created() {
    this.getgoodsList();
  },
  data() {
    return {
      stepactive: 0,
      tabActive: "basic",
      goodsAddForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        is_promote: false,
        //上传图片的临时路径
        pics: [],
        goods_introduce: ""
      },
      //分类数据
      cateList: [],

      //文件上传请求头部
      uploadHeaders: {
        Authorization: localStorage.getItem("token")
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
    },

    async getgoodsList() {
      const res = await this.$http.get("/categories", {
        params: {
          type: 3
        }
      });
      this.cateList = res.data.data;
      console.log(res);
    },
    //上传成功的回调
    uploadSuccess(response) {
      console.log(response);
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      });
    },
    async addGoods() {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        is_promote,
        pics
      } = this.goodsAddForm;
      const res = await this.$http.post("/goods", {
        goods_name,
        goods_cat: goods_cat.join(","),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        is_promote
      });
      console.log(res);
      //跳转到商品列表
      this.$router.push("/goods");
      this.$message({
        type: "success",
        message: res.data.meta.msg
      });
    }
  }
};
</script >

<style >
.mt20 {
  margin-top: 20px;
}
#pane-content .quill-editor .ql-blank
{
  background-color: #fff;
  height: 300px; 
}
</style>