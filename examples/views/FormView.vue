<template>
  <div class="form-view">
    <re-form ref="form" :items="items" :model="model" :rules="rules" :contexts="contexts"/>
    <div class="form-view-footer">
      <el-button type="primary" @click="handleSubmit" size="small">提交</el-button>
      <el-button type="primary" @click="handleReset" size="small">重置</el-button>
      <el-button type="primary" @click="handleClear" size="small">清除</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "FormView",
  components: {},
  data() {
    return {
      test: null,
      productNameOptions: [{ label: "苹果手机", value: "1", productType: "1" },],
      contexts: {
        productCategoryOptions: [
          { label: "数码", value: "1" },
          { label: "家电", value: "2" },
          { label: "服装", value: "3" }
        ],
        productTypeOptions: [
          { label: "手机", value: "1", productCategory: "1" },
          { label: "电脑", value: "2", productCategory: "1" },
          { label: "电视", value: "3", productCategory: "2" },
          { label: "洗衣机", value: "4", productCategory: "2" },
          { label: "男装", value: "5", productCategory: "3" },
          { label: "女装", value: "6", productCategory: "3" }
        ],
        productNameOptions: [
          { label: "苹果手机", value: "1", productType: "1", price: 1000 },
          { label: "华为手机", value: "2", productType: "1", price: 2000 },
          { label: "联想电脑", value: "3", productType: "2", price: 3000 },
          { label: "惠普电脑", value: "4", productType: "2", price: 3000 },
          { label: "TCL电视", value: "5", productType: "3", price: 3000 },
          { label: "海信电视", value: "6", productType: "3", price: 3000 },
          { label: "小天鹅洗衣机", value: "7", productType: "4", price: 3000 },
          { label: "海尔洗衣机", value: "8", productType: "4", price: 3000 },
          { label: "短袖", value: "9", productType: "5", price: 3000 },
          { label: "长裙", value: "10", productType: "6", price: 3000 }
        ],
      },
      items: [
        {
          label: "产品大类",
          model: "productCategory",
          component: "config-select",
          initialValue: null,
          span: 8,
          props: {
            // placeholder: "请选择产品大类",
            clearable: true,
            options: "{{ $extraContexts.productCategoryOptions }}"
          }
        },
        {
          label: "产品类型",
          model: "productType",
          component: "config-select",
          initialValue: null,
          span: 8,
          props: {
            placeholder: "请选择产品大类后选择产品类型",
            clearable: true,
            disabled: "{{ !$currentValues.productCategory }}",
            options: "{{ $extraContexts.productTypeOptions.filter(item => item.productCategory === $currentValues.productCategory) }}"
          }
        },
        {
          label: "产品名称",
          model: "productName",
          component: "config-select",
          initialValue: null,
          span: 8,
          props: {
            placeholder: "请选择产品类型后选择产品名称",
            clearable: true,
            disabled: "{{ !$currentValues.productType }}",
            options: "{{ $extraContexts.productNameOptions.filter(item => item.productType === $currentValues.productType) }}"
          },
          change: [
            {
              target: "price",
              value: "{{ $select.price }}"
            }
          ]
        },
        {
          label: "价格",
          model: "price",
          component: "el-input-number",
          initialValue: undefined,
          span: 8,
          props: {
            placeholder: "根据产品名称自动填充",
            controls: false,
            disabled: true,
          }
        },
        {
          label: "数量",
          model: "quantity",
          component: "el-input-number",
          initialValue: undefined,
          span: 8,
          props: {
            placeholder: "请选择产品名称后填写数量",
            controls: false,
            disabled: "{{ !$currentValues.productName }}",
          },
          change: [
            {
              target: "totalPrice",
              value: "{{ ($value * $currentValues.price) || undefined }}"
            }
          ]
        },
        {
          label: "总价",
          model: "totalPrice",
          component: "el-input-number",
          initialValue: undefined,
          span: 8,
          props: {
            placeholder: "根据价格和数量自动计算",
            controls: false,
            disabled: true,
          }
        },
        {
          label: "备注",
          model: "remark",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            type: "textarea",
            clearable: true,
            disabled: "{{ !($currentValues.totalPrice > 0) }}"
          }
        }
      ],
      model: {
        productCategory: null,
        productType: null,
        productName: null,
        price: undefined,
        quantity: undefined,
        totalPrice: undefined,
        remark: null
      },
      rules: {
        productCategory: [
          { required: true, message: "请选择产品大类", trigger: "change" }
        ],
        productType: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        productName: [
          { required: true, message: "请选择产品名称", trigger: "change" }
        ],
        quantity: [
          { required: true, message: "请填写数量", trigger: "blur" }
        ],
      },
    };
  },
  computed: {

  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid)=>{
        this.$message.info(valid ? '校验成功' : '校验失败')
      })
    },
    handleReset(){
      this.$refs['form'].reset()
      // this.$refs['form'].clearValidate()
    },
    handleClear(){
      this.$refs['form'].clearValidate()
    }

  }
};
</script>
<style lang="scss" scoped></style>
