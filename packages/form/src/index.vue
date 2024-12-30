<template>
  <el-form class="re-form" :model="formModel" ref="form" :inline="false" v-bind="$attrs" v-on="$listeners">
    <el-row :gutter="gutter" class="re-form__body">
      <el-col class="re-form-item__wrapper" v-for="(item, index) in formatFormItems" :span="item.span"
        :key="item.model + index">
        <el-form-item :label="item.label" class="re-form-item">
          <slot :name="item.model" :item="item">
            <component class="re-form-item-component" :is="item.component" v-model="formModel[item.model]"
              v-bind="item.props || {}" v-on="item.events || {}"></component>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

</template>
<script>
import { deepParse } from "./templateParse.js";
export default {
  name: "ReForm",
  props: {
    /**
     * @description 表单数据对象
     * @type {Object}
     */
    model: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @description 表单是否为只读
     * @type {Boolean}
     * @default false
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 表单是否为禁用
     * @type {Boolean}
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 表单项配置
     * @type {Array<FormItem>}
     * @property {Object} FormItem-表单项配置数组
     * @property {String} FormItem.label 表单项标签
     * @property {String} FormItem.required 表单项是否必填，默认为false
     * @property {String} FormItem.readonly 表单项是否只读，默认为false
     * @property {Boolean} FormItem.disabled 表单项是否禁用，默认为false
     * @property {Boolean} FormItem.hidden 表单项是否隐藏，默认为false
     * @property {String} FormItem.initialValue 表单项初始值，默认为null || []
     * @property {String} FormItem.component 表单项使用的组件，必需
     * @property {String} FormItem.model 表单项数据绑定的属性名，也是表单项标识
     * @property {String} FormItem.props 表单项使用的组件配置，默认为{}
     * @property {String} FormItem.events 表单项使用的组件绑定事件，默认为{}
     * @property {String} FormItem.rule 表单校验规则，默认为[]
     * @property {String} FormItem.change 表单项值联动配置，默认为[]
     * @default []
     */
    items: {
      type: Array,
      default: () => [],
    },
    gutter: {
      type: Number,
      default: 20,
    },
    /**
     * @description 是否自动滚动到第一个错误表单项
     * @type {Boolean}
     * @default true
     */
    autoScrollError: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 是否隐藏必填记号
     * @type {Boolean}
     * @default false
     */
    hideRequiredMark: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 表单校验配置
     * @type {Object}
     */
    rules: {
      type: Object,
      default: () => { return {} },
    },
    /**
     * @description 表单数据联动配置
     * @type {Object}
     */
    changes: {
      type: Array,
      default: () => { return [] },
    },
    /**
     * @description 额外的数据
     * @type {Object}
     */
    extra: {
      type: Object,
      default: () => { return {} },
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 表单数据
     * @type {Object}
     */
    formModel: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    /**
     * @description 表单项初始值对象
     * @type {Object}
     */
    formInitialValues() {
      return this.items.reduce((acc, cur) => {
        acc[cur.model] = cur.initialValue;
        return acc;
      }, {});
    },
    /**
     * @description 表单项选项集对象
     * @type {Object}
     */
    formSelectOptions() {
      return this.items.reduce((acc, cur) => {
        acc[cur.model] = cur.props?.options || null;
        return acc;
      }, {});
    },
    /**
     * @description 表单项联动配置数组
     * @type {Array}
     */
    formValueChanges() {
      const changeObj = this.items.reduce((acc, cur) => {
        acc[cur.model] = cur?.change || [];
        return acc;
      }, {});
      const changeArr = Object.keys(changeObj).reduce((acc, key) => {
        const itemChangeArr = changeObj[key].map((item) => {
          item.source = key;
          return item;
        });
        acc.push(...itemChangeArr);
        return acc;
      }, []);
      return deepParse(changeArr, this.formContext);
    },
    /**
     * @description 表单上下文
     * @type {Object}
     */
    formContext() {
      return {
        // 表单数据
        $values: this.formModel,
        // 表单各项初始值
        $initialValues: this.formInitialValues,
        // 表单选项数据
        $selectOptions: this.formSelectOptions,
        // 额外注入的数据
        $extra: this.extra,
      };
    },
    /**
     * @description 表单项配置数组解析后的最终配置
     * @type {Array}
     */
    formatFormItems() {
      return deepParse(this.items, this.formContext).filter(
        (item) => !item.hidden
      );
    },
  },
  watch: {
    model: {
      immediate: true,
      handler() {
        this.formValueChanges.forEach((changeConfigItem) => {
          this.formModel[changeConfigItem.target] = changeConfigItem.value;
        });
      },
      deep: true,
    },
  },
  methods: {
    /**
     * @description 表单校验
     * @param {Function} callback 回调函数
     */
    validate(callback) {
      if (this.$refs.form) {
        this.$refs.form.validate((valid) => {
          callback && callback(valid);
        });

        // this.$refs.form.validate(callback)
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 校验表单项
     */
    validateField() { },
    /**
     * @description 清空表单项校验
     */
    clearValidate() { },
    /**
     * @description 表单重置
     */
    reset() { },
    /**
     * @description 表单提交
     */
    submit() { },
  },
};
</script>
<style lang="scss" scoped>
.re-form {
  .re-form__body {
    display: flex;
    flex-wrap: wrap;

    .re-form-item__wrapper {
      .re-form-item {
        .re-form-item-component {
          width: 100%;
        }
      }
    }
  }
}
</style>
