<template>
  <div class="home">
    <el-row>
      <el-col hidden="hidden">
        <el-input v-model="formData.productName"></el-input>
      </el-col>
    </el-row>
    <re-form
      :form-model.sync="formData"
      :form-items="formItems"
      label-position="top"
    ></re-form>
    <re-editable-table :columns="columns" v-model="editRows" row-key="id" :active-keys.sync="activeKeys"></re-editable-table>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      formTest: {
        obj: {
          name: "test",
        },
      },
      formData: {
        productName: null,
        productModel: null,
        productNum: null,
        words: null,
        saleRecord: [
          {
            remark: "第一次买卖",
            saleNum: 35,
          },
        ],
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
            placeholder:
              "{{'请输入'+($values.productName ? $values.productName : '您')+'的座右铭'}}",
          },
        },
        {
          label: "销售记录",
          span: 24,
          model: "saleRecord",
          children: [
            {
              label: "销售备注",
              span: 8,
              model: "remark",
              component: "el-input",
            },
            {
              label: "销售数量",
              span: 8,
              model: "saleNum",
              component: "el-input-number",
              props: {
                controls: false,
                min: 1,
              },
            },
          ],
        },
      ],
      editRows: [
        {
          id: "1",
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
        },
        {
          id: "2",
          name: "李四",
          age: 19,
          email: "lisi@163.com",
        },
      ],
      activeKeys: [],

      columns: [
        {
          prop: "name",
          label: "姓名",
          editable: true,
          editType: "el-input",
        },
        {
          prop: "age",
          label: "年龄",
          editable: true,
          editType: "el-input",
        },
        {
          prop: "email",
          label: "邮箱",
          editable: true,
          editType: "el-input",
        },
      ],
    };
  },
  mounted() {
    console.log();
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
  padding: 20px 50px;
}
</style>
