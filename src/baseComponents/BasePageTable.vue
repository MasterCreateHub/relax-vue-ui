<template>
  <div class="base-page-table-container">
    <el-card class="base-page-table-searcher-container" :body-style="{ paddingBottom: '0px' }">
      <el-form class="base-page-table-searcher" :model="queryForm" label-position="right" v-bind="formConfig"
        @keyup.enter.native="handleSearch">
        <el-row :gutter="gutter">
          <el-col v-for="factor in showFactors" :key="factor.prop" :span="span">
            <el-form-item :prop="factor.prop" :label="factor.label">
              <component :is="factor.type || 'el-input'" v-model="queryForm[factor.prop]" clearable v-bind="factor.config"
                class="base-factor-item">
                <template v-if="factor.type === 'el-select'">
                  <el-option v-for="item in factor.options" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
                </template>
              </component>
            </el-form-item>
          </el-col>
          <el-col class="base-searcher-actions" :span="span">
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-refresh" plain @click="handleReset">重置</el-button>
            <el-button v-if="searcherInline" size="small" type="text" @click="handleResize">
              {{ collapsed ? "展开" : "折叠" }}
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="base-page-table-main">
      <template #header></template>
      <div class="base-page-table-toolbar">
        <div :span="12" class="base-page-table-toolbar-actions">
          <el-button v-for="action in actions" :key="action.name" size="small" v-bind="action"
            @click="$emit(action.name)">
            {{ action.label }}
          </el-button>
        </div>
        <div class="base-page-table-toolbar-tools">
          <el-tooltip class="item" effect="dark" content="设置表格边框" placement="top">
            <el-switch v-model="borderValue" inactive-text="边框" />
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-tooltip class="item" effect="dark" content="设置表格斑马纹" placement="top">
            <el-switch v-model="zebraValue" inactive-text="斑马纹" />
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-tooltip class="item" effect="dark" content="设置表格高度自适应" placement="top">
            <el-switch v-model="heightValue" inactive-text="高度适应" />
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-tooltip class="item" effect="dark" content="隐藏搜索" placement="top">
            <el-button size="small" circle class="el-icon-search" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="small" circle class="el-icon-refresh" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="密度" placement="top">
            <el-dropdown trigger="click" placement="bottom">
              <el-button size="small" circle class="el-icon-s-operation" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in densityArr" :key="item.value" :command="item.value">
                  <el-radio v-model="densityValue" :label="item.value">{{
                    item.label
                  }}</el-radio>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出" placement="top">
            <el-button size="small" circle class="el-icon-download" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="列配置" placement="top">
            <el-button size="small" circle class="el-icon-setting" />
            <el-popover placement="bottom" trigger="click" title="配置表格">
              <el-checkbox-group v-model="showColumns" @change="onColumnsChange">
                <el-checkbox v-for="item in columns" :key="item.prop" :label="item.prop">
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-popover>
          </el-tooltip>
        </div>
      </div>
      <el-table class="base-page-table-table" v-bind="$attrs" v-on="$listeners">
        <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <template v-if="$slots[`${column.prop}Header`]" slot="header">
              <slot :name="`${column.prop}Header`"></slot>
            </template>
            <template v-if="$slots[`${column.prop}Content`]">
              <slot :name="`${column.prop}Content`" :row="scope.row" :index="scope.$index"></slot>
            </template>
            <template v-else>{{ scope.row[column.prop] }}</template>
          </template>
        </el-table-column>
      </el-table>
      <div class="base-page-table-pagination">
        <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize"
          :layout="layout" :page-sizes="pageSizes" :pager-count="pagerCount" :total="total" v-bind="$attrs"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "BasePageTable",
  props: {
    queryParams: {
      type: Object,
      default: () => {
        return {};
      },
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
    actions: {
      type: Array,
      default: () => {
        return [
          {
            label: "新增",
            name: "add",
            type: "primary",
            icon: "el-icon-plus",
          },
          {
            label: "删除",
            name: "delete",
            type: "danger",
            icon: "el-icon-delete",
          },
          {
            label: "导入",
            name: "import",
            type: "primary",
            icon: "el-icon-upload",
          },
        ];
      },
    },
    tools: {
      type: Array,
      default: () => {
        return [
          "border",
          "zebra",
          "height",
          "density",
          "search",
          "refresh",
          "export",
          "config",
        ];
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 分页器布局
     */
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7,
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * @description 搜索面板是否折叠
       */
      collapsed: true,
      borderValue: true,
      zebraValue: true,
      heightValue: true,
      densityValue: "A",
      densityArr: [
        { label: "紧凑", value: "A" },
        { label: "普通", value: "B" },
        { label: "普通", value: "C" },
      ],
    };
  },
  computed: {
    queryForm: {
      get() {
        return this.queryParams;
      },
      set(val) {
        this.$emit("update:queryParams", val);
      },
    },
    /**
     * @description 要显示的搜索条件
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
      let inlineMaxNum = 24 / this.span - 1
      return this.factors.length > inlineMaxNum;
    },
    showColumns() {
      return this.columns.map((item) => item.prop);
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
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
    handleRefresh() {
      this.$emit("handleRefresh");
    },
    onColumnsChange(value) {
      let data = JSON.parse(
        JSON.stringify(
          this.columns.filter((item) => {
            return value.includes(item.prop);
          })
        )
      );
      this.$emit("config-change", data);
    },
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit("pagination", { page: this.currentPage, limit: val });
      // if (this.autoScroll) {
      //     scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      // if (this.autoScroll) {
      //     scrollTo(0, 800)
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.base-page-table-searcher-container {
  margin-bottom: 10px;

  .base-page-table-searcher {
    .el-row {
      display: flex;
      flex-wrap: wrap;

      .base-factor-item {
        width: 100%;
      }
    }
  }

  .base-searcher-actions {
    line-height: 40px;
    text-align: right;
    flex: 1;
  }
}

.base-page-table-main {}

::v-deep.base-page-table-table {

  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    th {
      word-break: break-word;
      background-color: #f8f8f9;
      color: #515a6e;
      height: 40px;
      font-size: 13px;
    }
  }
}

.base-page-table-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &-tools {
    text-align: right;

    & .el-button {
      margin: 0px 6px;
    }
  }
}

.base-page-table-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
