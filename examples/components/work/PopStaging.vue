<template>
  <div class="pop-staging" role="pop-staging">
    <div class="pop-staging__reference" @click="show = true">
      <slot name="reference"></slot>
    </div>

    <el-dialog class="pop-staging-dialog" :visible.sync="show" v-bind="$attrs" :width="$attrs.size || '80%'"
      :top="$attrs.top || '7.5vh'">
      <div class="pop-staging__body">
        <div class="pop-staging-tool">
          <slot name="tool"></slot>
        </div>
        <el-table class="pop-staging-table" :data="pageData" :height="400" v-bind="tableConfig"
          @selection-change="handleSelectionChange" v-on="$listeners">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
            align="center" v-bind="column">
            <template slot="header" slot-scope="scope">
              <slot name="tableHeader" :column="scope.column" :index="scope.$index">{{ column.label }}</slot>
            </template>
            <template slot-scope="scope">
              <slot name="tableBody" :row="scope.row" :column="scope.column" :index="scope.$index">
                {{ scope.row[column.prop] }}
              </slot>
            </template>
          </el-table-column>
        </el-table>
        <div class="pop-staging-operate">
          <slot name="operate"></slot>
        </div>
        <div class="pop-staging-result">
          <slot name="result"></slot>
        </div>
      </div>
      <div class="pop-staging__footer">
        <el-pagination class="pop-staging-pagination" small background layout="prev, pager, next" :pager-count="5"
          :page-size="pageSize" :current-page.sync="pageNumber" :total="tableData.length" />
        <div class="pop-staging-actions">
          <slot name="actions">
            <el-button type="primary" size="mini" :disabled="!isFairSelection" @click="handleEnter">
              {{ enterText }}
            </el-button>
            <el-button size="mini" @click="handleCancel">{{
              cancelText
            }}</el-button>
          </slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "PopStaging",
  props: {
    /**
     * @description 工作台是否可见
     * @type {Boolean}
     * @default false
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 工作数据表格列
     * @type {Array} columns
     * @property {Object} [] - 数据列对象
     * @property {String} [].label - 列标题
     * @property {String} [].prop - 列属性
     * @default []
     */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 工作数据
     * @type {Array}
     * @property {Object} [] - 数据对象
     * @default []
     */
    tableData: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 表格配置
     * @type {Object}
     * @default {}
     */
    tableConfig: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @description 是否允许多选
     * @type {Boolean}
     * @default false
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 确定按钮文字
     * @type {String}
     * @default "确定"
     */
    enterText: {
      type: String,
      default: "确定",
    },
    /**
     * @description 取消按钮文字
     * @type {String}
     * @default "取消"
     */
    cancelText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      /**
       * @description 每页显示条数
       * @type {Number}
       * @default 10
       */
      pageSize: 10,
      /**
       * @description 当前页码
       * @type {Number}
       * @default 1
       */
      pageNumber: 1,
      /**
       * @description 选择的数据是否合理，只校验多选单选
       * @type {Boolean}
       * @default true
       */
      isFairSelection: true,
    };
  },
  computed: {
    /**
     * @description 控制弹窗显示隐藏
     */
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    /**
     * @description 当前页显示的数据
     */
    pageData() {
      return this.tableData.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      );
    },
  },
  methods: {
    /**
     * @description 处理表格选择变化
     * @param {Array} rows - 选中的数据
     */
    handleSelectionChange(rows) {
      if (!this.multiple && rows.length > 1) {
        this.isFairSelection = false;
      } else {
        this.isFairSelection = true;
      }
      this.$emit("selection-change", rows);
    },
    /**
     * @description 点击确定按钮
     */
    handleEnter() {
      this.$emit("enter");
    },
    /**
     * @description 点击取消按钮
     */
    handleCancel() {
      this.$emit("cancel");
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pop-staging {
  .pop-staging__reference {
    width: auto;
  }
}

::v-deep.pop-staging-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #e4e7ed;
  }

  .el-dialog__body {
    padding: 20px 20px 20px 20px;
  }
}

::v-deep.pop-staging__body {
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;

  .pop-staging-tool {
    width: 100%;
  }

  .pop-staging-table {
    width: 100%;
    flex: 1;

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

  .pop-staging-operate {
    width: 100%;
  }

  .pop-staging-result {
    width: 100%;
  }
}

::v-deep.pop-staging__footer {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;

  .pop-staging-pagination {
    padding: 0px;

    &> :first-child {
      margin-left: 0px;
    }
  }
}

.tab {
  width: 150px;
  height: 40px;
  background: #515a6e;
  border-radius: 10px 10px 0 0;
}
</style>
