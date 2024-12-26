<template>
  <div v-measure="onResize" class="re-searcher">
    <el-form
      :class="[{ 'is-justify': labelPosition === 'justify' }, { 'is-flex': layout === 'flex' }, { 'is-grid': layout === 'grid' }]"
      :model="form" :size="size" :label-position="labelPosition" :label-width="labelWidth" :inline="false"
      :inline-message="true" v-bind="$attrs">
      <template v-if="layout === 'flex'">
        <el-row class="re-searcher__body is-flex" :gutter="factorSpacing">
          <el-col :style="{ minWidth: factorMinWidth + 'px' }" class="re-searcher-factor__wrapper"
            v-for="factor in showFactors" :key="factor.model" :span="factorSpan">
            <el-form-item :prop="factor.model" :label="factor.label">
              <slot :name="factor.model" :form="form" :factor="factor">
                <component :is="factor.component || 'el-input'" v-model="form[factor.model]" clearable
                  v-bind="factor.props || {}" v-on="factor.events || {}" class="re-factor-item">
                  <template v-if="factor.component === 'el-select'">
                    <el-option v-for="item in factor.options" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
                  </template>
                  <template v-if="factor.component === 'el-radio-group'">
                    <el-radio v-for="item in factor.options" :key="item.value" :label="item.value">
                      {{ item.label }}
                    </el-radio>
                  </template>
                  <template v-if="factor.component === 'el-checkbox-group'">
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
            <el-form-item label-width="0px">
              <slot name="action" :form="form">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">
                    {{ searchText }}
                  </el-button>
                  <el-button type="primary" icon="el-icon-refresh" @click="handleReset">
                    {{ resetText }}
                  </el-button>
                  <el-button v-if="onlyInline" type="primary" @click="handleToggle"
                    :icon="expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'">
                    {{ expanded ? collapseText : expandText }}
                  </el-button>
                </el-button-group>
              </slot>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-if="layout === 'grid'">
        <div class="re-searcher__body is-grid"
          :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: `0px ${factorSpacing}px` }">
          <div class="re-searcher-factor__wrapper" v-for="factor in showFactors" :key="factor.model">
            <el-form-item :prop="factor.model" :label="factor.label">
              <slot :name="factor.model" :form="form" :factor="factor">
                <component :is="factor.component || 'el-input'" v-model="form[factor.model]" clearable
                  v-bind="factor.props || {}" v-on="factor.events || {}" class="re-factor-item">
                  <template v-if="factor.component === 'el-select'">
                    <el-option v-for="item in factor.options" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
                  </template>
                  <template v-if="factor.component === 'el-radio-group'">
                    <el-radio v-for="item in factor.options" :key="item.value" :label="item.value">
                      {{ item.label }}
                    </el-radio>
                  </template>
                  <template v-if="factor.component === 'el-checkbox-group'">
                    <el-checkbox v-for="item in factor.options" :key="item.value" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </template>
                </component>
              </slot>
            </el-form-item>
          </div>
          <div :class="['re-searcher-action__wrapper', `is-${actionPosition}`]"
            :style="(actionPosition === 'right') ? { gridColumn: `${gridCols}`, gridRow: `${gridRows}` } : {}">
            <el-form-item label-width="0px">
              <slot name="action" :form="form">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="handleSearch">
                    {{ searchText }}
                  </el-button>
                  <el-button type="primary" icon="el-icon-refresh" @click="handleReset">
                    {{ resetText }}
                  </el-button>
                  <el-button v-if="onlyInline" type="primary" @click="handleToggle"
                    :icon="expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'">
                    {{ expanded ? collapseText : expandText }}
                  </el-button>
                </el-button-group>
              </slot>
            </el-form-item>
          </div>
        </div>
      </template>
    </el-form>
  </div>
</template>
<script>
const DEFAULT_MODEL = Symbol("defaultModel")
export default {
  name: "ReSearcher",
  props: {
    /**
     * @description 搜索条件数组
     * @type {Array<Factor>}
     * @property {Object} factor 搜索条件对象
     * @property {String} factor.label  搜索条件标签名称
     * @property {String} factor.model  搜索条件双向绑定的属性名
     * @property {String} factor.component 搜索条件组件名称，默认为el-input
     * @property {Object} factor.props 搜索条件组件的配置项，默认为{}
     * @property {Object} factor.events 搜索条件组件的事件绑定，默认为{}
     * @property {'string'|'number'|'boolean'|'array'|'object'} factor.valueType 搜索条件组件绑定值的类型
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
            factor.model 
          );
        });
      },
    },
    /**
     * @description 搜索表单数据对象
     * @type {Object}
     * @default {}
     */
    model: {
      type: Object,
      default: () => {
        const defaultModel = {};
        defaultModel[DEFAULT_MODEL] = true;
        return defaultModel;
      },
    },
    /**
     * @description 搜索表单布局方式
     * @type {'flex'|'grid'|}
     * @default 'flex'
     */
    layout: {
      type: String,
      default: "flex",
      validator(value) {
        return ['flex', 'grid'].includes(value)
      }
    },
    /**
     * @description 搜索表单尺寸
     * @type {'small'|'mini'}
     * @default 'small'
     */
    size: {
      type: String,
      default: "small",
      validator(value) {
        return ['small', 'mini'].includes(value)
      }
    },
    /**
     * @description 搜索表单项标签宽度
     * @type {String}
     * @default '60px'
     */
    labelWidth: {
      type: String,
      default: "60px",
    },
    /**
     * @description 搜索表单标签位置
     * @type {'left'|'right'|'justify'}
     * @default 'justify'
     */
    labelPosition: {
      type: String,
      default: "justify",
      validator(value) {
        return ['left', 'right', 'justify'].includes(value)
      }
    },
    /**
     * @description 是否默认展开所有条件
     * @type {Boolean}
     * @default false
     */
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 搜索条件左右间距
     * @type {Number}
     * @default 20
     */
    factorSpacing: {
      type: Number,
      default: 20,
    },
    /**
     * @description 搜索条件最小宽度
     * @type {Number}
     * @default 240
     */
    factorMinWidth: {
      type: Number,
      default: 240,
    },
    /**
     * @description 是否启用自动搜索
     */
    autoSearch: {
      type: [Boolean, Number],
      default: false,
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
     * @description 操作按钮位置
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
      /**
 * @description grid布局列数量
 */
      gridCols: 1,
      /**
       * @description 自动搜索定时器
       */
      timer: null,
    };
  },
  computed: {
    /**
     * @description 搜索表单双向绑定
     */
    form: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("update:model", val);
      },
    },
    /**
     * @description 表单数据对象的拷贝，用于监听表单字段值的改变
     */
    modelClone() {
      return JSON.parse(JSON.stringify(this.model))
    },
    /**
     *  @description 搜索表单可见的检索条件
     */
    showFactors() {
      if (this.layout === 'flex') {
        if (!this.expanded) {
          let inlineMaxNum = (24 / this.factorSpan - 1) ? (24 / this.factorSpan - 1) : 1;
          return this.factors.slice(0, inlineMaxNum);
        } else {
          return this.factors;
        }
      }
      if (this.layout === 'grid') {
        if (!this.expanded) {
          let inlineMaxNum = this.gridCols - 1;
          return this.factors.slice(0, inlineMaxNum);
        } else {
          return this.factors;
        }
      }
      return []
    },
    /**
     * @description 搜索条件是否只有一行
     */
    onlyInline() {
      if (this.layout === 'flex') {
        let inlineMaxNum = 24 / this.factorSpan - 1;
        return this.factors.length > inlineMaxNum || this.factors.length === 1;
      }
      if (this.layout === 'grid') {
        return (this.factors.length + 1) > this.gridCols
      }
      return true
    },
    /**
     * @description 搜索表单栅格布局尺寸配置数组
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
     * @description flex布局下，搜索条件所占栅格的宽度
     */
    factorSpan() {
      return this.sizeArray.find((size) => size.label === this.viewportSize).span;
    },
    /**
     * @description grid布局下，搜索条件占几行
     */
    gridRows() {
      if (this.showFactors.length !== this.factors.length) {
        return 1
      } else {
        return Math.ceil(this.factors.length / this.gridCols)
      }
    },
    /**
     * @description 自动搜索延迟
     */
    searchDelay() {
      return this.autoSearch > 300 ? this.autoSearch : 300;
    },
  },
  watch: {
    modelClone: {
      handler(newVal, oldVal) {
        if (this.autoSearch) {
          const changeFields = this.factors.some((factor) => {
            return newVal[factor.model] !== oldVal[factor.model];
          })
          if (changeFields) {
            this.onDebounceSearch();
          }
        }
      },
      deep: true
    },
  },
  created() {
    this.onInit();
  },
  methods: {
    /**
     * @description 组件初始化
     */
    onInit() {
      if (!this.model[DEFAULT_MODEL]) {
        return;
      }
      this.factors.forEach((factor) => {
        switch (factor.valueType) {
          case 'array':
            this.$set(this.form, factor.model, []);
            break;
          case 'object':
            this.$set(this.form, factor.model, {});
            break;
          default:
            this.$set(this.form, factor.model, null);
        }
      });
    },
    /**
     * @description 点击搜索按钮事件
     */
    handleSearch() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.$emit("search", this.form);
    },
    /**
     * @description 自动防抖搜索
     */
    onDebounceSearch() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.handleSearch()
      }, this.searchDelay)
    },
    /**
     * @description 点击重置按钮事件
     */
    handleReset() {
      this.factors.forEach((factor) => {
        switch (factor.valueType) {
          case 'array':
            this.$set(this.form, factor.model, []);
            break;
          case 'object':
            this.$set(this.form, factor.model, {});
            break;
          default:
            this.$set(this.form, factor.model, null);
        }
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
      if (width !== 0) {
        this.gridCols = Math.floor((width + this.factorSpacing) / (this.factorMinWidth + this.factorSpacing));
        for (let i = 0; i < this.sizeArray.length; i++) {
          if (width <= this.sizeArray[i].boundary) {
            this.viewportSize = this.sizeArray[i].label;
            break;
          }
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

    .re-searcher-factor__wrapper {

      .re-factor-item {
        width: 100%;
      }
    }

    .re-searcher-action__wrapper {
      & .el-form-item__content {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .re-searcher__body.is-flex {
    display: flex;
    flex-wrap: wrap;
  }

  .re-searcher__body.is-grid {
    display: grid;
  }

  .re-searcher__body .is-left {
    text-align: left;
  }

  .re-searcher__body .is-right {
    text-align: right;
    flex: 1;
  }
}
</style>
  