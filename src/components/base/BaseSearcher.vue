<template>
  <el-card :body-style="{ paddingBottom: '0px' }">
    <el-form
      class="base-searcher"
      :model="form"
      label-position="right"
      v-bind="formConfig"
      @keyup.enter.native="handleSearch"
    >
      <el-row :gutter="gutter">
        <el-col
          v-for="factor in showFactors"
          :key="factor.prop"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <el-form-item :prop="factor.prop" :label="factor.label">
            <component
              :is="factor.type || 'el-input'"
              v-model="form[factor.prop]"
              clearable
              v-bind="factor.config"
              class="base-factor-item"
            >
              <template v-if="factor.type === 'el-select'">
                <el-option
                  v-for="item in factor.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </template>
            </component>
          </el-form-item>
        </el-col>
        <el-col
          class="base-searcher-actions"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <el-form-item>
            <slot name="action" :form="form">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
              >
                {{ searchText }}
              </el-button>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-refresh"
                plain
                @click="handleReset"
              >
                {{ resetText }}
              </el-button>
              <el-button
                size="small"
                v-if="searcherInline"
                type="text"
                @click="handleResize"
              >
                {{ showAll ? collapseText : expandText }}
                <i
                  :class="showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                ></i>
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
     * @description 是否全部展示
     */
    showAll: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 栅格间隔
     */
    gutter: {
      type: Number,
      default: 20,
    },
    /**
     * @description 每个搜索条件占用多少栅格，只有6、8两种取值
     * @default 6 默认占用6个栅格，即每行4个搜索条件
     */
    span: {
      type: Number,
      default: 6,
      validator(val) {
        return [4, 6, 8].includes(val);
      },
    },
    /**
     * @description 搜索条件数组
     * @type {Array}
     * @ArrayItem {label: String, prop: String, type: String, config: Object, options: Array}
     * @ArrayItem.label {String} 搜索条件名称
     * @ArrayItem.prop {String} 搜索条件绑定的属性，即表单组件要绑定的v-model
     * @ArrayItem.type {String} 搜索条件组件类型，默认为el-input
     * @ArrayItem.config {Object} 搜索条件组件的配置项，默认为{}
     * @ArrayItem.options {Array} 搜索条件组件的选项，默认为[]，一般用于el-select、el-radio-group、el-checkbox-group等组件
     */
    factors: {
      type: Array,
      default: () => {
        return [];
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
  },
  data() {
    return {
      /**
       * @description 搜索表单可见的检索条件
       */
      viewportSize: "lg",
      /**
       * @description 搜索面板是否折叠
       */
      collapsed: true,
      /**
       * @description 搜索表单绑定的数据对象
       */
      form: {},
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
     *  @description 搜索表单可见的检索条件
     */
    showFactors() {
      if (!this.showAll) {
        let sizeValue = this.sizes.find(
          (size) => size.label === this.viewportSize
        ).value;
        let inlineMaxNum = sizeValue - 1;
        return this.factors.slice(0, inlineMaxNum);
      } else {
        return this.factors;
      }
    },
    /**
     * @description 搜索条件是否只有一行
     */
    searcherInline() {
      let inlineMaxNum = 24 / this.span - 1;
      return this.factors.length > inlineMaxNum;
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
      this.factors
        .map((item) => item.prop)
        .forEach((key) => {
          this.$set(this.form, key, null);
        });
    },
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
    handleSearch() {
      this.$emit("search", this.form);
    },
    handleReset() {
      Object.keys(this.form).forEach((key) => {
        this.$set(this.form, key, null);
      });
      this.$emit("reset", this.form);
    },
    handleResize() {
      this.$emit("update:showAll", !this.showAll);
      this.$emit("resize", this.showAll);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.base-searcher {
  .el-row {
    display: flex;
    flex-wrap: wrap;

    .base-factor-item {
      width: 100%;
    }
    .base-searcher-actions {
      text-align: right;
      flex: 1;
      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
}
</style>
