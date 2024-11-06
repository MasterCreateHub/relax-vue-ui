<template>
  <div class="home">
    <el-row>
      <el-col>
        
        
      </el-col>
    </el-row>
    <re-form :form-model.sync="formData" :form-items="formItems" label-position="top"></re-form>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      formData: {
        productName: null,
        productModel: null,
        productNum: null,
        words: null
      },
      formItems: [
        {
          label: "产品名称",
          span: 8,
          model: "productName",
          component: "el-input",
        },
        {
          label: "产品型号",
          span: 8,
          model: "productModel",
          component: "el-input",
        },
        {
          label: "产品数量",
          span: 8,
          model: "productNum",
          component: "el-input-number",
          props: {
            controls: false,
            min: 1,
          },
        },
        {
          label: "退货原因",
          span: 24,
          model: "words",
          component: "el-input",
          hidden: "{{!$values.productName}}",
          props: {
            type: "textarea",
            rows: 5,
            placeholder: "{{'请输入'+($values.productName ? $values.productName : '您')+'的座右铭'}}"
          }
        }
      ]
      

    }
  },
  methods: {


  }
};
</script>
<style lang="scss" scoped>
.home{
  padding: 20px 50px;
}
</style>
