<template>
  <el-form :class="[
    're-form',
    { 'is-readonly': readonly },
    { 'is-disabled': disabled },
    { 'is-justify': labelAlign === 'justify' },
  ]" ref="form" :model="formCurrentValues" :inline="false" :disabled="disabled" :label-position="labelAlign"
    :rules="formRules" v-bind="$attrs" v-on="$listeners">
    <el-row class="re-form__body" :gutter="spacing">
      <el-col class="re-form-item__wrapper" v-for="(item, index) in formatFormItems" :span="item.span"
        :key="item.model + index">
        <el-form-item class="re-form-item" :label="item.label" :prop="item.model" :required="item.required"
          v-readonly="(readonly || item.readonly)">
          <template slot="label">
            <slot name="itemLabel" :item="item">
              <span>{{ item.label }}</span>
              <el-tooltip v-if="item.description" effect="dark" :content="item.description" placement="top">
                <i class="el-icon-info re-form-item__label-info" />
              </el-tooltip>
            </slot>
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
     * @description 表单是否为禁用
     * @type {Boolean}
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 搜索表单标签位置
     * @type {'top'|'left'|'right'|'justify'}
     * @default 'justify'
     */
    labelAlign: {
      type: String,
      default: "justify",
      validator(value) {
        return ["top", "left", "right", "justify"].includes(value);
      },
    },
    /**
     * @description 表单项间隔
     * @type {Number}
     * @default 20
     */
    spacing: {
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
      default: () => {
        return {};
      },
    },
    /**
     * @description 表单校验规则
     * @type {Object}
     */
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 表单值联动规则
     * @type {Object}
     */
    changes: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 表单项配置
     * @type {Array<FormItem>}
     * @property {Object} FormItem - 表单项配置数组
     * @property {String} FormItem.label - 表单项标签
     * @property {String} FormItem.description - 表单项详细描述
     * @property {Boolean} FormItem.required - 表单项是否必填，默认为 `false`
     * @property {Boolean} FormItem.readonly - 表单项是否只读，默认为 `false`
     * @property {Boolean} FormItem.disabled - 表单项是否禁用，默认为 `false`
     * @property {Boolean} FormItem.hidden - 表单项是否隐藏，默认为 `false`
     * @property {Number} FormItem.span - 表单项占位宽度，默认为 `24`，可选值为 `1~24`
     * @property {Any} FormItem.initialValue - 表单项初始值，默认为 `null`、`[]` 或 `{}`
     * @property {String} FormItem.interactive - 表单项交互形式，可选值为 `'select'` 或 `'input'`
     * @property {String} FormItem.model - 表单项绑定的 `model`
     * @property {String} FormItem.component - 表单项组件，默认为 `el-input`
     * @property {Object} FormItem.props - 表单项组件配置，默认为 `{}`
     * @property {Object} FormItem.events - 表单项组件绑定事件，默认为 `{}`
     * @property {Array<Rule>} FormItem.rules - 表单校验规则，默认为 `[]`
     * @property {Array<Change>} FormItem.changes - 表单项值联动配置，默认为 `[]`
     * @default []
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 表单数据对象备份，用于确认表单项变化
     * @type {Object}
     */
    formModel() {
      return JSON.parse(JSON.stringify(this.model));
    },
    /**
     * @description 表单当前数据对象
     * @type {Object}
     */
    formCurrentValues: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("update:model", val);
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
        if (cur.interactive === "select" && cur.props?.options) {
          const parsedOptions = deepParse(cur?.props?.options, {
            $currentValues: this.formCurrentValues,
            $extraContexts: this.contexts,
          });
          const options = Array.isArray(parsedOptions) ? parsedOptions : [];
          if (Array.isArray(this.formCurrentValues[cur.model])) {
            acc[cur.model] =
              options.filter((option) =>
                this.formCurrentValues[cur.model].includes(option.value)
              ) || this.formCurrentValues[cur.model];
          } else {
            acc[cur.model] =
              options.find(
                (option) => this.formCurrentValues[cur.model] === option.value
              ) || this.formCurrentValues[cur.model];
          }
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
      return deepParse(this.items, this.formContext)
        .filter((item) => !item.hidden)
        .map((item) => {
          return {
            ...item,
            readonly: item.readonly || false,
            disabled: item.disabled || false,
            props: {
              ...item?.props,
              readonly: item.readonly || item.props?.readonly || false,
              disabled: item.disabled || item.props?.disabled || false,
            },
          };
        });
    },
    /**
     * @description 表单项值联动配置数组
     * @type {Array}
     */
    formChanges() {
      const changeObj = this.formatFormItems.reduce((acc, cur) => {
        if (
          cur.changes &&
          Array.isArray(cur.changes) &&
          cur.changes.length > 0
        ) {
          acc[cur.model] = cur.changes.map((change) => {
            change.source = cur.model;
            change.condition = Object.prototype.hasOwnProperty.call(
              change,
              "condition"
            )
              ? Boolean(change.condition)
              : true;
            return change;
          });
        } else {
          acc[cur.model] = [];
        }
        return acc;
      }, {});
      const formatChanges = deepParse(this.changes, this.formContext);
      Object.keys(formatChanges).forEach((key) => {
        if (
          Array.isArray(formatChanges[key]) &&
          formatChanges[key].length > 0
        ) {
          formatChanges[key] = formatChanges[key].map((change) => {
            change.source = key;
            change.condition = Object.prototype.hasOwnProperty.call(
              change,
              "condition"
            )
              ? Boolean(change.condition)
              : true;
            return change;
          });
          changeObj[key] = [...formatChanges[key], ...changeObj[key]];
        } else {
          changeObj[key] = [...changeObj[key]];
        }
      });
      return changeObj;
    },
    /**
     * @description 表单项校验配置数组
     * @type {Object}
     */
    formRules() {
      const ruleObj = this.formatFormItems.reduce((acc, cur) => {
        if (cur.rules && Array.isArray(cur.rules) && cur.rules.length > 0) {
          acc[cur.model] = cur.rules;
        } else {
          acc[cur.model] = [];
        }
        return acc;
      }, {});
      Object.keys(this.rules).forEach((key) => {
        if (Array.isArray(this.rules[key]) && this.rules[key].length > 0) {
          ruleObj[key] = [...this.rules[key], ...ruleObj[key]];
        } else {
          ruleObj[key] = [...ruleObj[key]];
        }
      });
      return ruleObj;
    },
  },
  watch: {
    formModel: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return;
        const keys = Object.keys(newVal);
        keys.forEach((key) => {
          if (JSON.stringify(newVal[key]) !== JSON.stringify(oldVal[key])) {
            const changes = this.formChanges[key];
            if (changes && changes.length > 0) {
              changes.forEach((change) => {
                if (change.condition) {
                  this.formCurrentValues[change.target] = change.value;
                }
              });
            }
          }
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
      if (this.$refs["form"]) {
        this.$refs.form.validate((valid) => {
          if (!valid && this.scrollToError) {
            this.$nextTick(() => {
              // 获取第一个校验错误的元素
              const element = document.querySelectorAll(
                ".el-form-item__error"
              )[0];
              // 滚动到错误元素对应位置
              element?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            });
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
      if (this.$refs["form"]) {
        this.$refs.form.validateField(prop, callback);
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 移除表单项的校验结果
     */
    resetFields() {
      if (this.$refs["form"]) {
        this.$refs.form.resetFields();
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 清空表单项校验
     */
    clearValidate(prop) {
      if (this.$refs["form"]) {
        this.$refs.form.clearValidate(prop);
      } else {
        console.error("form ref is undefined");
      }
    },
    /**
     * @description 表单重置
     */
    reset() {
      if (this.$refs["form"]) {
        Object.keys(this.formInitialValues).forEach((key) => {
          this.formCurrentValues[key] = this.formInitialValues[key];
        });
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
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
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.re-form {
  .re-form__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .re-form-item__wrapper {
      .re-form-item {
        i.re-form-item__label-info {
          margin-left: 4px;
        }

        .re-form-item-component {
          width: 100%;
        }
      }
    }
  }
}

::v-deep.is-justify {
  .el-form-item__label {
    display: flex;
    align-items: baseline;

    span {
      flex: 1;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
</style>
