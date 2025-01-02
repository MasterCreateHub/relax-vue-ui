<template>
  <el-form
    :class="['re-form', { 'is-readonly': readonly }, { 'is-disabled': disabled }, { 'is-justify': labelPosition === 'justify' }]"
    :model="formCurrentValues" ref="form" :inline="false" :disabled="readonly || disabled" v-bind="$attrs"
    v-on="$listeners">
    <el-row class="re-form__body" :gutter="gutter">
      <el-col class="re-form-item__wrapper" v-for="(item, index) in formatFormItems" :span="item.span"
        :key="item.model + index">
        <el-form-item class="re-form-item" :label="item.label" :prop="item.model">
          <template slot="label">
            <slot name="label" :item="item">{{ item.label }}</slot>
          </template>
          <slot :name="item.model" :item="item">
            <component class="re-form-item-component" :is="item.component" v-model="formCurrentValues[item.model]"
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
     * @description 搜索表单标签位置
     * @type {'top'|'left'|'right'|'justify'}
     * @default 'justify'
     */
    labelPosition: {
      type: String,
      default: "justify",
      validator(value) {
        return ['top', 'left', 'right', 'justify'].includes(value)
      }
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
     * @description 检验时滚动到第一个错误表单项
     * @type {Boolean}
     * @default true
     */
    scrollToError: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 额外的数据
     * @type {Object}
     */
    contexts: {
      type: Object,
      default: () => { return {} },
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 表单当前数据对象
     * @type {Object}
     */
    formCurrentValues: {
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
        acc[cur.model] = deepParse(cur.initialValue, {
          $currentValues: this.formCurrentValues,
          $extraContexts: this.contexts,
        });
        return acc;
      }, {});
    },
    /**
     * @description 表单项选中项集合对象
     * @type {Object}
     */
    formSelectedOptions() {
      return this.items.reduce((acc, cur) => {
        const options = deepParse(cur?.props?.options, {
          $currentValues: this.formCurrentValues,
          $extraContexts: this.contexts,
        }) || [];
        if (Array.isArray(this.formCurrentValues[cur.model])) {
          acc[cur.model] = options.filter(option => this.formCurrentValues[cur.model].includes(option.value)) || this.formCurrentValues[cur.model]
        } else {
          acc[cur.model] = options.find(option => this.formCurrentValues[cur.model] === option.value) || this.formCurrentValues[cur.model]
        }
        return acc;
      }, {});
    },
    /**
     * @description 表单上下文
     * @type {Object}
     */
    formContext() {
      return {
        $currentValues: this.formCurrentValues,
        $initialValues: this.formInitialValues,
        $selectedOptions: this.formSelectedOptions,
        $extraContexts: this.contexts,
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
    /**
     * @description 表单项联动配置数组
     * @type {Array}
     */
    formValueChanges() {
      const changeObj = this.formatFormItems.reduce((acc, cur) => {
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
      return changeArr;
    },
  },
  watch: {
    model: {
      handler() {
        this.formValueChanges.forEach((changeConfigItem) => {
          this.formCurrentValues[changeConfigItem.target] = changeConfigItem.value;
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
      if (this.$refs['form']) {
        this.$refs.form.validate((valid) => {
          if (!valid && this.scrollToError) {
            this.$nextTick(() => {
              // 获取第一个校验错误的元素
              const element = document.querySelectorAll(".el-form-item__error")[0];
              // 滚动到错误元素对应位置
              element?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            })
          }
          callback?.(valid);
        });
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 校验表单项
     */
    validateField(prop, callback) {
      if (this.$refs['form']) {
        this.$refs.form.validateField(prop, callback);
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 移除表单项的校验结果
     */
    resetFields() {
      if (this.$refs['form']) {
        this.$refs.form.resetFields();
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 清空表单项校验
     */
    clearValidate(prop) {
      if (this.$refs['form']) {
        this.$refs.form.clearValidate(prop);
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 表单重置
     */
    reset() {
      if (this.$refs['form']) {
        Object.keys(this.formInitialValues).forEach((key) => {
          this.formCurrentValues[key] = this.formInitialValues[key];
        });
        this.$nextTick(() => {
          this.$refs['form'].clearValidate();
        })
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 表单提交
     */
    submit() {
      this.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formCurrentValues);
        }
      })
    }
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
