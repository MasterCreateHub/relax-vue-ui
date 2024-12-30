<template>
  <div class="form-view">
    <re-form ref="form" :items="items" :model="model" :rules="rules" :changes="changes" :extra="extra" />
    <config-select v-model="test" :options="productModelOptions" @change="handleChange" clearable filterable>

    </config-select>
  </div>
</template>

<script>

export default {
  name: "FormView",
  components: {},
  data() {
    return {
      test: null,
      productModelOptions: [{ label: "苹果手机", value: "1", productType: "1" },],
      extra: {
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
        productModelOptions: [
          { label: "苹果手机", value: "1", productType: "1" },
          { label: "华为手机", value: "2", productType: "1" },
          { label: "联想电脑", value: "3", productType: "2" },
          { label: "惠普电脑", value: "4", productType: "2" },
          { label: "TCL电视", value: "5", productType: "3" },
          { label: "海信电视", value: "6", productType: "3" },
          { label: "小天鹅洗衣机", value: "7", productType: "4" },
          { label: "海尔洗衣机", value: "8", productType: "4" },
          { label: "短袖", value: "9", productType: "5" },
          { label: "长裙", value: "10", productType: "6" }
        ],
      },
      items: [
        {
          label: "产品大类",
          model: "productCategory",
          component: "config-select",
          initialValue: null,
          props: {
            clearable: true,
            options: "{{$extra.productCategoryOptions}}"
          }
        },
        {
          label: "产品类型",
          model: "productType",
          component: "config-select",
          initialValue: null,
          // hidden: "{{!$values.productCategory}}",
          props: {
            clearable: true,
            disabled: "{{!$values.productCategory}}",
            options: "{{$extra.productTypeOptions.filter(item => item.productCategory === $values.productCategory)}}"
          }
        },
        {
          label: "产品型号",
          model: "productModel",
          component: "config-select",
          initialValue: null,
          // hidden: "{{!$values.productType}}",
          props: {
            clearable: true,
            disabled: "{{!$values.productType}}",
            options: "{{$extra.productModelOptions.filter(item => item.productType === $values.productType)}}"
          }
        }
      ],
      model: {
        productCategory: null,
        productType: null,
        productModel: null,
      },
      rules: {},
      changes: []
    };
  },
  computed: {

  },
  methods: {
    handleChange(){
      this.productModelOptions = this.extra.productModelOptions.slice(0, Math.floor(Math.random() * 10))
    }

  }
};
</script>
<style lang="scss" scoped></style>
