<template>
  <div v-measure="onResize" class="re-searcher">
    <el-form :class="[{ 'is-justify': labelPosition === 'justify' }]" :model="form" :label-position="labelPosition"
      v-bind="formConfig" @keyup.enter.native="handleSearch">
      <el-row class="re-searcher__body" :gutter="factorSpacing">
        <el-col :style="{ minWidth: factorMinWidth + 'px' }" class="re-searcher-factor__wrapper"
          v-for="factor in showFactors" :key="factor.prop" :span="factorSpan">
          <el-form-item :prop="factor.prop" :label="factor.label">
            <slot :name="factor.prop" :form="form">
              <component :is="factor.type || 'el-input'" v-model="form[factor.prop]" clearable v-bind="factor.config"
                class="re-factor-item">
                <template v-if="factor.type === 'el-select'">
                  <el-option v-for="item in factor.options" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
                </template>
                <template v-if="factor.type === 'el-radio-group'">
                  <el-radio v-for="item in factor.options" :key="item.value" :label="item.value">
                    {{ item.label }}
                  </el-radio>
                </template>
                <template v-if="factor.type === 'el-checkbox-group'">
                  <el-checkbox v-for="item in factor.options" :key="item.value" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </template>
              </component>
            </slot>
          </el-form-item>
        </el-col>
        <el-col :style="{ minWidth: factorMinWidth + 'px' }"
          :class="['re-searcher-action__wrapper', `is-${actionPosition}`]" :span="factorSpan">
          <el-form-item>
            <slot name="action" :form="form">
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">
                {{ searchText }}
              </el-button>
              <el-button type="primary" icon="el-icon-refresh" plain @click="handleReset">
                {{ resetText }}
              </el-button>
              <el-button v-if="onlyInline" type="text" @click="handleToggle">
                {{ expanded ? collapseText : expandText }}
                <i :class="expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
              </el-button>
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ReSearcher",
  props: {
    /**
     * @description 搜索表单数据对象
     */
    formModel: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 搜索表单配置
     */
    formConfig: {
      type: Object,
      default: () => {
        return {
          size: "small",
          labelWidth: "60px",
        };
      },
    },
    /**
     * @description 搜索条件label位置
     */
    labelPosition: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "right", "justify"].includes(value);
      },
    },
    /**
     * @description 是否默认展开所有搜索条件
     */
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 搜索条件间距
     */
    factorSpacing: {
      type: Number,
      default: 20,
    },
    /**
     * @description 搜索条件最小宽度
     */
    factorMinWidth: {
      type: Number,
      default: 240,
    },
    /**
     * @description 搜索条件数组
     * @type {Array}
     * @ArrayItem {label: String, prop: String, type: String, config: Object, options: Array, valueType: String}
     * @ArrayItem.label {String} 搜索条件名称
     * @ArrayItem.prop {String} 搜索条件绑定的属性，即表单组件要绑定的v-model
     * @ArrayItem.type {String} 搜索条件组件类型，默认为el-input
     * @ArrayItem.config {Object} 搜索条件组件的配置项，默认为{}
     * @ArrayItem.options {Array} 搜索条件组件的选项，默认为[]，一般用于el-select、el-radio-group、el-checkbox-group等组件
     * @ArrayItem.valueType {String} 搜索条件组件绑定值的类型，默认为String
     */
    factors: {
      type: Array,
      default: () => {
        return [];
      },
      validator(value) {
        return value.every((factor) => {
          return (
            Object.prototype.toString.call(factor) === "[object Object]" &&
            factor.label &&
            factor.prop &&
            factor.type &&
            factor.valueType
          );
        });
      },
    },
    /**
     * @description 搜索按钮文字
     */
    searchText: {
      type: String,
      default: "搜索",
    },
    /**
     * @description 重置按钮文字
     */
    resetText: {
      type: String,
      default: "重置",
    },
    /**
     * @description 展开按钮文字
     */
    expandText: {
      type: String,
      default: "展开",
    },
    /**
     * @description 收起按钮文字
     */
    collapseText: {
      type: String,
      default: "收起",
    },
    /**
     * @description 按钮位置
     */
    actionPosition: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "right"].includes(value);
      },
    },
  },
  data() {
    return {
      /**
       * @description 是否展开
       */
      expanded: this.defaultExpand,
      /**
       * @description 视口尺寸
       */
      viewportSize: "lg",
    };
  },
  computed: {
    /**
     * @description 搜索表单双向绑定
     */
    form: {
      get() {
        return this.formModel;
      },
      set() {
        this.$emit("update:formModel", this.form);
      },
    },
    /**
     *  @description 搜索表单可见的检索条件
     */
    showFactors() {
      if (!this.expanded) {
        let inlineMaxNum = (24 / this.factorSpan - 1) ? (24 / this.factorSpan - 1) : 1;
        return this.factors.slice(0, inlineMaxNum);
      } else {
        return this.factors;
      }
    },
    /**
     * @description 搜索条件是否只有一行
     */
    onlyInline() {
      let inlineMaxNum = 24 / this.factorSpan - 1;
      return this.factors.length > inlineMaxNum || this.factors.length === 1;
    },
    /**
     * @description 搜索表单尺寸数组
     */
    sizeArray() {
      let array = [
        { label: "xxs", number: 1, threshold: 2, span: 24 },
        { label: "xs", number: 2, threshold: 3, span: 12 },
        { label: "sm", number: 3, threshold: 4, span: 8 },
        { label: "md", number: 4, threshold: 6, span: 6 },
        { label: "lg", number: 6, threshold: 8, span: 4 },
        { label: "xl", number: 8, threshold: 24, span: 3 },
      ]
      return array.map(size => {
        size.boundary = size.threshold * this.factorMinWidth + (size.threshold - 1) * this.factorSpacing
        return size
      })
    },
    /**
     * @description 搜索条件所占栅格的宽度
     */
    factorSpan() {
      return this.sizeArray.find((size) => size.label === this.viewportSize).span;
    },
  },
  mounted() {
    this.onInit();
  },
  methods: {
    /**
     * @description 组件初始化
     */
    onInit() {
      this.factors.forEach((factor) => {
        if (!(factor.prop in this.form)) {
          if (factor.valueType === "array") {
            this.$set(this.form, factor.prop, []);
          } else {
            this.$set(this.form, factor.prop, null);
          }
        }
      });
    },
    /**
     * @description 点击搜索按钮事件
     */
    handleSearch() {
      this.$emit("search", this.form);
    },
    /**
     * @description 点击重置按钮事件
     */
    handleReset() {
      Object.keys(this.form).forEach((key) => {
        this.$set(this.form, key, null);
      });
      this.$emit("reset", this.form);
    },
    /**
     * @description 收起或展开事件
     */
    handleToggle() {
      this.expanded = !this.expanded;
      this.$emit("toggle", this.expanded);
    },
    /**
     * @description 容器大小改变事件
     */
    onResize(entry) {
      const width = entry.contentRect.width;
      for (let i = 0; i < this.sizeArray.length; i++) {
        if (width <= this.sizeArray[i].boundary) {
          this.viewportSize = this.sizeArray[i].label;
          break;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.re-searcher {
  padding: 18px 18px 0px 18px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .is-justify {
    .el-form-item__label {
      text-align: justify;
      text-align-last: justify;
    }
  }

  .re-searcher__body {
    display: flex;
    flex-wrap: wrap;

    .re-searcher-factor__wrapper {

      .re-factor-item {
        width: 100%;
      }
    }

    .is-left {
      text-align: left;
    }

    .is-right {
      text-align: right;
      flex: 1;
    }

    .re-searcher-action__wrapper {
      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
}</style>
