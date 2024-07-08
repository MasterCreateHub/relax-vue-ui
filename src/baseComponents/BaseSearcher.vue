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
        <el-col v-for="factor in showFactors" :key="factor.prop" :span="span">
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
          v-if="$scopedSlots.action"
          class="base-searcher-actions"
          :span="span"
        >
          <slot name="action" :form="form"></slot>
        </el-col>
        <el-col v-else class="base-searcher-actions" :span="span">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
            >搜索</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="handleReset"
            >重置</el-button
          >
          <el-button
            size="small"
            v-if="searcherInline"
            type="text"
            @click="handleResize"
          >
            {{ collapsed ? "展开" : "折叠" }}
            <i class="el-icon-arrow-down"></i>
          </el-button>
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
       * @description 搜索面板是否折叠
       */
      collapsed: true,
      /**
       * @description 搜索表单绑定的数据对象
       */
      form: {},
    };
  },
  computed: {
    /**
     *  @description 搜索表单可见的检索条件
     */
    showFactors() {
      if (this.collapsed) {
        let inlineMaxNum = 24 / this.span - 1;
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
      this.collapsed = !this.collapsed;
      this.$emit("resize", this.collapsed);
    },
  },
};
</script>
<style lang="scss" scoped>
.base-searcher {
  .el-row {
    display: flex;
    flex-wrap: wrap;

    .base-factor-item {
      width: 100%;
    }
  }
}

.base-searcher-actions {
//   line-height: 40px;
  text-align: right;
  flex: 1;
}
</style>
