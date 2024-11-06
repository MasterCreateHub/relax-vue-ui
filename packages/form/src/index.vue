<template>
  <el-form
    class="re-form"
    :model="formData"
    ref="form"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-row :gutter="20" class="re-form__body">
      <el-col
        class="re-form-item__wrapper"
        v-for="(item, index) in formFinalItems"
        :span="item.span"
        :key="item.model + index"
      >
        <el-form-item :label="item.label" class="re-form-item">
          <slot :name="item.model" :item="item">
            <component
              class="re-form-item-component"
              :is="item.component"
              v-bind="item.props"
              v-model="formData[item.model]"
            ></component>
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
    formModel: {
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
     * @type {Array<Object>}
     * @default []
     * @property {Object[]} formItems-表单项配置数组
     * @property {String} formItems[].label 表单项标签
     * @property {String} formItems[].model 表单项数据路径，也是表单项唯一标识
     * @property {String} formItems[].required 表单项是否必填，默认为false
     * @property {String} formItems[].readonly 表单项是否只读，默认为false
     * @property {Boolean} formItems[].disabled 表单项是否禁用，默认为false
     * @property {Boolean} formItems[].hidden 表单项是否隐藏，默认为false
     * @property {String} formItems[].component 表单项组件类型，表明用什么组件渲染，默认为el-input
     * @property {Object} formItems[].props 表单项组件配置，会透传给组件，默认为{}
     * @property {String} formItems[].initialValue 表单项初始值，默认为null
     * @property {String} formItems[].rule 表单校验规则，默认为[]
     * @property {Array} formItems[].children 表单项子项，默认为[]
     * @property {String} formItems[].change 表单项值联动配置，默认为[]
     */
    formItems: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 表单分组配置
     * @type {Array<Object>}
     * @default []
     * @property {Object[]} formSections-表单分组配置数组
     * @property {String} formSections[].label 表单分组标签
     * @property {String} formSections[].name 表单分组唯一标识
     * @property {Array<String>} formSections[].fields 表单分组成员
     */
    formSections: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 表单分步配置
     * @type {Array<Object>}
     * @default []
     * @property {Object[]} formSteps-表单步骤配置数组
     * @property {String} formSteps[].label 表单步骤标签
     * @property {String} formSteps[].name 表单步骤唯一标识
     * @property {Array<String>} formSteps[].fields 表单步骤成员
     */
    formSteps: {
      type: Array,
      default: () => [],
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
      default: () => {},
    },
    /**
     * @description 表单数据联动配置
     * @type {Object}
     */
    changes: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 表单基础配置
     * @type {Object}
     * @property {Number} baseConfig.gutter 表单栅格间隔，默认为20
     * @property {Number} baseConfig.span 表单项宽度，默认为8
     * @property {Number} baseConfig.labelWidth 表单项标签宽度，默认为100
     * @property {String} baseConfig.labelPosition 表单项标签位置，默认为left
     * @property {String} baseConfig.size 表单项尺寸，默认为medium
     */
    baseConfig: {
      type: Object,
      default: () => {},
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
    formData: {
      get() {
        return this.formModel;
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
      return this.formItems.reduce((acc, cur) => {
        acc[cur.model] = cur.initialValue;
        return acc;
      }, {});
    },
    /**
     * @description 表单项选项集
     * @type {Object}
     */
    formSelectOptions() {
      return this.formItems.reduce((acc, cur) => {
        acc[cur.model] = cur.config?.options || null;
        return acc;
      }, {});
    },
    /**
     * @description 表单项联动配置数组
     * @type {Array}
     */
    formValueChanges() {
      const changeObj = this.formItems.reduce((acc, cur) => {
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
        $values: this.formData,
        // 表单各项初始值formFinalItems
        $initialValues: this.formInitialValues,
        // 表单选项数据
        $selectOptions: this.formSelectOptions,
      };
    },
    /**
     * @description 表单项配置数组解析后的最终配置
     * @type {Array}
     */
    formFinalItems() {
      return deepParse(this.formItems, this.formContext).filter(item => !item.hidden);
    },
  },
  watch: {
    formModel: {
      immediate: true,
      handler() {
        this.formValueChanges.forEach((changeConfigItem) => {
          this.formData[changeConfigItem.target] = changeConfigItem.value;
        });
      },
      deep: true,
    },
  },
  mounted() {},
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
    validateField() {},
    /**
     * @description 清空表单项校验
     */
    clearValidate() {},
    /**
     * @description 表单重置
     */
    reset() {},
    /**
     * @description 表单提交
     */
    submit() {},
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
