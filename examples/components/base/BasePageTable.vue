<template>
  <div class="bpt-container" :class="{ 'is-adapt': tableAdaption }">
    <div v-if="searcherVisible" class="bpt-searcher-container" :body-style="{ paddingBottom: '0px' }">
      <el-form class="bpt-searcher bpt-searcher-form" :model="queryForm" label-position="right" v-bind="searcherConfig"
        @keyup.enter.native="handleSearch">
        <el-row :gutter="factorGutter">
          <el-col v-for="factor in showFactors" :key="factor.prop" :span="factorSpan">
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
          <el-col class="base-searcher-actions" :span="factorSpan">
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-refresh" plain @click="handleReset">重置</el-button>
            <el-button v-if="searcherInline" size="small" type="text" @click="handleResize">
              {{ collapsed ? "展开" : "折叠" }}
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bpt-body">
      <div class="bpt-toolbar-container">
        <div class="bpt-toolbar actions">
          <el-button v-for="action in actions" :key="action.name" size="small" v-bind="action"
            @click="handleOperate(action.name, action.auto)">
            {{ action.label }}
          </el-button>
        </div>
        <div class="bpt-toolbar tools">
          <el-switch v-model="tableSearcher" inactive-text="搜索栏" />
          <el-divider direction="vertical" />
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="small" circle class="el-icon-refresh" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出" placement="top">
            <el-button size="small" circle class="el-icon-download" @click="handleExport" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="配置" placement="top">
            <el-button size="small" circle class="el-icon-setting" v-popover:tableConfigPopover />
          </el-tooltip>
          <el-popover ref="tableConfigPopover" placement="bottom" trigger="click" @show="showConfigTabs = true"
            @hide="showConfigTabs = false">

            <div class="table-config-container">
              <el-tabs v-if="showConfigTabs" v-model="configForm.tabName">
                <el-tab-pane label="基础设置" name="base"></el-tab-pane>
                <el-tab-pane label="列设置" name="column"></el-tab-pane>
                <!-- <el-tab-pane label="行设置" name="row"></el-tab-pane> -->
              </el-tabs>
              <template v-if="configForm.tabName === 'base'">
                <div class="config-item">
                  <div class="config-label">
                    高度铺满
                  </div>
                  <div class="config-value">
                    <el-switch v-model="tableAdaption" />
                  </div>
                </div>
                <div class="config-item">
                  <div class="config-label">
                    表格边框
                  </div>
                  <div class="config-value">
                    <el-switch v-model="tableBorder" />
                  </div>
                </div>
                <div class="config-item">
                  <div class="config-label">
                    表格斑纹
                  </div>
                  <div class="config-value">
                    <el-switch v-model="tableStripe" />
                  </div>
                </div>
                <div class="config-item">
                  <div class="config-label">
                    表格行高
                  </div>
                  <div class="config-value">
                    <el-select size="mini" style="width:80px;" v-model="rowDensity">
                      <el-option v-for="item in rowDensityOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </div>
                </div>

              </template>
              <template v-else-if="configForm.tabName === 'column'">
                <div v-for="col in canSetColumns" :key="col.prop" class="col-config-item is-hover">
                  <div class="col-config-drag">
                    <i class="el-icon-s-grid"></i>
                  </div>
                  <div class="col-config-check">
                    <el-checkbox v-model="col.visible" :label="col.prop">{{ col.label }}</el-checkbox>
                  </div>
                  <div class="col-config-fix">
                    <el-tooltip effect="dark" content="固定到左侧" placement="top">
                      <i class="el-icon-caret-left"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="固定到右侧" placement="top">
                      <i class="el-icon-caret-right"></i>
                    </el-tooltip>
                  </div>
                </div>
              </template>
            </div>
          </el-popover>
        </div>
      </div>
      <el-table class="bpt-table" :border="$attrs.border || tableBorder" :stripe="$attrs.stripe || tableStripe"
        v-bind="$attrs" v-on="$listeners" :height="600">
        <el-table-column v-for="column in showColumns" :key="column.prop" v-bind="column">
          <template slot="header" slot-scope="scope">
                    <slot v-if="$scopedSlots[`${column.prop}Label`]" :name="`${column.prop}Label`" :row="scope.row"
                        :index="scope.$index">{{ column.label }}</slot>
                    <slot v-else name="header" :column="scope.column" :index="scope.$index">{{ column.label }}</slot>
                </template>
                <template slot-scope="scope">
                    <slot v-if="$scopedSlots[`${column.prop}Content`]" :name="`${column.prop}Content`" :row="scope.row"
                        :column="scope.column" :index="scope.$index">
                        {{ scope.row[column.prop] }}
                    </slot>
                    <slot v-else name="body" :row="scope.row" :column="scope.column" :index="scope.$index">
                        {{ scope.row[column.prop] }}
                    </slot>
                </template>
        </el-table-column>
      </el-table>
      <div class="bpt-pagination-container">
        <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize"
          :layout="layout" :page-sizes="pageSizes" :pager-count="pagerCount" :total="total" v-bind="$attrs"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="导出" class="import-export-dialog">
      <el-form size="mini" :model="exportForm" ref="exportForm" label-width="80px">
        <el-form-item label="文件名称" prop="fileName" :rules="{ required: true, message: '请输入文件名称', trigger: 'blur' }">
          <el-input v-model="exportForm.fileName" class="export-config-item" />
        </el-form-item>
        <el-form-item label="导出类型" prop="fileType">
          <el-select v-model="exportForm.fileType" class="export-config-item" placeholder="请选择">
            <el-option label="excel" value="excel"></el-option>
            <el-option label="pdf" value="pdf"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围" prop="dataRange">
          <el-select v-model="exportForm.dataRange" class="export-config-item" placeholder="请选择">
            <el-option label="当前页数据" value="0"></el-option>
            <el-option label="已选中数据" value="1"></el-option>
            <el-option label="所有数据" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他选项" prop="otherOptions">
          <el-checkbox-group v-model="exportForm.otherOptions" class="export-config-item">
            <el-checkbox label="0">表头</el-checkbox>
            <el-checkbox label="1">表尾</el-checkbox>
            <el-checkbox label="2">字典映射</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEnterExport">确认</el-button>
          <el-button plain @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="importDialogVisible" title="导入" class="import-export-dialog" width="400px">
      <el-form size="mini" :model="importForm" ref="importForm" label-width="80px" class="import-config-form">
        <el-upload ref="importUpload" v-bind="importConfig" :on-success="onUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip text-center" slot="tip">
            <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline"
              @click="handleDownloadTemplete">下载模板</el-link>
          </div>
        </el-upload>
        <div>
          <el-button type="primary" size="small" @click="handleEnterExport">确认</el-button>
          <el-button size="small" plain @click="importDialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "BasePageTable",
  props: {
    /**
     * @description 搜索条件对象，即搜索框表单的model
     */
    queryParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 搜索条件的间隔
     */
    factorGutter: {
      type: Number,
      default: 20,
    },
    /**
     * @description 每个搜索条件占用多少栅格，只有4、6、8两种取值
     * @default 6 默认占用6个栅格，即每行4个搜索条件
     */
    factorSpan: {
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
    searcherConfig: {
      type: Object,
      default: () => {
        return {
          size: "small",
          labelWidth: "60px",
        };
      },
    },
    importConfig: {
      type: Object,
      default: () => {
        return {
          limit: 1,
          drag: true,
          accept: ".xlsx, .xls",
          action: "",
          autoUpload: false
        }
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
            auto: false,
          },
          {
            label: "删除",
            name: "delete",
            type: "danger",
            icon: "el-icon-delete",
            auto: false,
          },
          {
            label: "导入",
            name: "import",
            type: "primary",
            icon: "el-icon-upload",
            auto: true,
          },
        ];
      },
    },
    tools: {
      type: Array,
      default: () => {
        return [
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
      tableSearcher: true,
      tableBorder: true,
      tableStripe: true,
      tableAdaption: true,
      rowDensity: "A",
      rowDensityOptions: [
        { label: "紧凑", value: "A" },
        { label: "普通", value: "B" },
        { label: "宽松", value: "C" },
      ],
      showConfigTabs: false,
      configForm: {
        tabName: 'base',
      },
      dialogVisible: false,
      importDialogVisible: false,
      importForm: {
        file: null,
      },
      exportForm: {
        fileName: null,
        fileType: 'pdf',
        dataRange: '0',
        otherOptions: ['0'],
      },
      canSetColumns: []

    }
  },
  created() {
    this.canSetColumns = this.columns.map(item => {
      return {
        label: item.label,
        prop: item.prop,
        visible: true
      }
    })
  },
  computed: {
    searcherVisible() {
      return this.factors.length > 0 && this.tableSearcher
    },
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
        let inlineMaxNum = 24 / this.factorSpan- 1;
        return this.factors.slice(0, inlineMaxNum);
      } else {
        return this.factors;
      }
    },
    /**
     * @description 搜索条件是否只有一行
     */
    searcherInline() {
      let inlineMaxNum = 24 / this.factorSpan- 1
      return this.factors.length > inlineMaxNum;
    },
    /**
     * @description searcher开关tip
     */
    searcherSwitchTip() {
      return this.tableSearcher ? '关闭搜索栏' : '打开搜索栏'
    },
    /**
     * @description stripe开关tip
     */
    borderSwitchTip() {
      return this.tableBorder ? '关闭表格边框' : '开启表格边框'
    },
    /**
     * @description border开关tip
     */
    stripeSwitchTip() {
      return this.tableStripe ? '关闭表格斑马纹' : '开启表格斑马纹'
    },
    /**
     * @description adaption开关tip
     */
    adaptionSwitchTip() {
      return this.tableAdaption ? '关闭表格高度自适应' : '开启表格高度自适应'
    },
    /**
     * @description 要展示的数据列
     */
    showColumns() {
      let showArr = this.canSetColumns.filter(item => item.visible === true).map(item => item.prop)
      return this.columns.filter(item => showArr.includes(item.prop))
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
      this.$emit("search", this.queryForm);
    },
    handleReset() {
      Object.keys(this.queryForm).forEach((key) => {
        this.$set(this.queryForm, key, null);
      });
      this.$emit("reset", this.queryForm);
    },
    handleResize() {
      this.collapsed = !this.collapsed;
      this.$emit("resize", this.collapsed);
    },
    handleOperate(name, auto) {
      if (!auto) {
        this.$emit(name)
      } else {
        switch (name) {
          case 'import':
            this.handleImport()
            break;
          default:
            console.error('The component itself does not support this operation')
            this.$emit(name)
        }
      }
    },
    handleRefresh() {
      this.$emit("refresh");
    },
    handleImport() {
      this.$refs.importForm && this.$refs.importForm.resetFields()
      this.$emit("before-import");
      this.importDialogVisible = true;

    },
    handleDownloadTemplete() {
      this.$emit("download-templete");
    },
    onUploadSuccess() {

    },
    handleExport() {
      this.$refs.exportForm && this.$refs.exportForm.resetFields()
      this.$emit("before-export");
      this.dialogVisible = true;
    },
    handleEnterExport() {
      this.$emit("export");
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
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.bpt-container {

  .bpt-searcher-container {
    padding: 20px 20px 0px 20px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;

    .bpt-searcher {
      .el-row {
        display: flex;
        flex-wrap: wrap;

        .base-factor-item {
          width: 100%;
        }
      }
    }

    .base-searcher-actions {
      text-align: right;
      flex: 1;
    }
  }

  .bpt-body {
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    transition: 0.3s;

    .bpt-toolbar-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .bpt-toolbar.tools {
        text-align: right;

        .el-button {
          margin: 0px 6px;
        }
      }
    }

    .bpt-table {

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

    .bpt-pagination-container {
      margin-top: 20px;
      text-align: right;
    }
  }
}

.is-adapt {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .bpt-body {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;

    .bpt-table {
      flex: 1;
    }
  }
}

.table-config-container {
  width: 200px;
  // height: 300px;

  .config-item {
    width: 100%;
    margin: 10px 0px;
    height: 28px;
    line-height: 28px;
    display: flex;
    justify-content: space-between;

    .config-item-label {
      width: 50%;
      height: 28px;
      line-height: 28px;
      text-align: left;
      flex: 1;
    }

    .config-item-value {
      width: 50%;
      text-align: right;
      height: 28px;
      line-height: 28px;
    }
  }

  .col-config-item {
    width: 100%;
    margin: 6px 0px;
    padding: 0px 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;

    .col-config-drag {
      padding: 0px 4px;

      i {
        cursor: move;
      }
    }

    .col-config-check {
      flex: 1;
      text-align: left;
    }
  }

  .is-hover:hover {
    background-color: #b9d6ff;
  }
}

.import-export-dialog {

  .export-config-item {
    width: 100%;
  }

  .import-config-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
</style>

