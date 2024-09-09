<template>
  <el-card class="base-searcher" :body-style="{ paddingBottom: '0px' }">
    <el-form :class="[{ 'is-justify': labelPosition === 'justify' }]" :model="form" :label-position="labelPosition"
      v-bind="formConfig" @keyup.enter.native="handleSearch">
      <el-row class="base-searcher__body" :gutter="factorSpacing">
        <el-col class="base-searcher-factor__wrapper" v-for="factor in showFactors" :key="factor.prop" :xs="24" :sm="12"
          :md="8" :lg="6" :xl="4">
          <el-form-item :prop="factor.prop" :label="factor.label">
            <slot :name="factor.prop" :form="form">
              <component :is="factor.type || 'el-input'" v-model="form[factor.prop]" clearable v-bind="factor.config"
                class="base-factor-item">
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
        <el-col class="base-searcher-action__wrapper" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
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
  </el-card>
</template>
<script>
export default {
  name: "BaseSearcher",
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
     * @description 搜索表单项label位置
     */
    labelPosition: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "right", "justify"].includes(value);
      },
    },
    /**
     * @description 是否默认展开
     */
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 每个条件的左右间距
     */
    factorSpacing: {
      type: Number,
      default: 20,
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
          return Object.prototype.toString.call(factor) === '[object Object]'
            && factor.label && factor.prop
            && factor.type && factor.valueType
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
      /**
       * @description size配置
       */
      sizes: [
        { label: "xs", value: 1 },
        { label: "sm", value: 2 },
        { label: "md", value: 3 },
        { label: "lg", value: 4 },
        { label: "xl", value: 6 },
      ],
    };
  },
  computed: {
    /**
     * @description 搜索表单双向绑定
     */
    form: {
      get() {
        return this.formModel
      },
      set() {
        this.$emit('update:formModel', this.form)
      }
    },
    /**
     *  @description 搜索表单可见的检索条件
     */
    showFactors() {
      if (!this.expanded) {
        let sizeValue = this.sizes.find(
          (size) => size.label === this.viewportSize
        ).value;
        let inlineMaxNum = (sizeValue - 1) ? (sizeValue - 1) : 1
        return this.factors.slice(0, inlineMaxNum);
      } else {
        return this.factors;
      }
    },
    /**
     * @description 搜索条件是否只有一行
     */
    onlyInline() {
      let sizeValue = this.sizes.find(
        (size) => size.label === this.viewportSize
      ).value;
      let inlineMaxNum = sizeValue - 1;
      return this.factors.length > inlineMaxNum || this.factors.length === 1;
    },
  },
  mounted() {
    this.onInit();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    /**
     * @description 组件初始化
     */
    onInit() {
      this.factors.forEach((factor) => {
        if (!(factor.prop in this.form)) {
          if (factor.valueType === 'array') {
            this.$set(this.form, factor.prop, []);
          } else {
            this.$set(this.form, factor.prop, null);
          }
        }
      })
    },
    /**
     * @description 窗口大小改变事件
     */
    onResize() {
      const width = window.innerWidth;
      if (width < 768) {
        this.viewportSize = "xs";
      } else if (width < 992) {
        this.viewportSize = "sm";
      } else if (width < 1200) {
        this.viewportSize = "md";
      } else if (width < 1920) {
        this.viewportSize = "lg";
      } else {
        this.viewportSize = "xl";
      }
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
      this.expanded = !this.expanded
      this.$emit("toggle", this.expanded);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.base-searcher {
  .is-justify {
    .el-form-item__label {
      text-align: justify;
      text-align-last: justify;
    }
  }

  .base-searcher__body {
    display: flex;
    flex-wrap: wrap;

    .base-searcher-factor__wrapper {
      min-width: 240px;

      .base-factor-item {
        width: 100%;
      }
    }

    .base-searcher-action__wrapper {
      min-width: 240px;
      text-align: right;
      flex: 1;

      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
}
</style>
