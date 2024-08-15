<template>
  <div class="pop-staging" role="pop-staging">
    <div class="pop-staging__reference" @click="show = true">
      <slot name="reference"></slot>
    </div>

    <el-dialog :visible.sync="show" v-bind="$attrs" :width="$attrs.size || '80%'" :top="$attrs.top || '10vh'">
      <div class="pop-staging__body">
        <div class="pop-staging-tool">
          <slot name="tool"></slot>
        </div>
        <el-table class="pop-staging-table" :height="500" :data="pageData" @row-click="handleClickRow"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
            align="center"></el-table-column>
        </el-table>
        <div class="pop-staging-operate">
          <slot name="operate"></slot>
        </div>
        <div class="pop-staging-result">
          <slot name="result"></slot>
        </div>
      </div>
      <div class="pop-staging__footer" :class="{ 'is-multiple': multiple }">
        <el-pagination small background layout="prev, pager, next" :pager-count="5" :page-size="pageSize"
          :current-page.sync="pageNumber" :total="tableData.length" />
        <div v-if="multiple">
          <el-button type="primary" size="mini" @click="handleEnter">
            提交
          </el-button>
          <el-button size="mini" @click="show = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "PopStaging",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    pageData() {
      return this.tableData.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      );
    },
    setMaxHeight() {
      return this.tableData.length > this.pageSize;
    },
  },
  methods: {
    toggleShow() {
      this.$emit("update:visible", !this.visible);
    },
    handleSelectionChange(rows) {
      this.$emit("selectRows", rows);
    },
    handleClickRow(row) {
      this.$emit("clickRow", row);
    },
    handleEnter() {
      this.$emit("clickEnter");
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

.pop-staging__body {
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;

  .pop-staging-tool {
    width: 100%;
    // margin-bottom: 10px;
  }

  .pop-staging-table {
    width: 100%;
    flex: 1;

    // margin-bottom: 10px;
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
    // margin-bottom: 10px;
  }
}

::v-deep.pop-staging__footer {
  width: 100%;
  height: 30px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pop-staging-actions__container {
    padding: 2px 5px;
    margin: 0px 3px;
  }
}

.is-multiple {
  justify-content: space-between;
}

::v-deep .el-dialog {
  .el-dialog__header {
    color: #72767b;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #e4e7ed;
    padding: 20px;
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    background-color: #fff;

    &> :first-child {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    & .el-tabs__item {
      font-size: 20px;
      color: #72767b;
    }

    & .el-tabs__nav-wrap::after {
      display: none;
    }

    .base-poptabs-header-action {
      height: 54px;
      box-sizing: border-box;
      padding-bottom: 15px;
      display: flex;
      align-items: center;
    }

    &>button {
      display: none;
    }
  }

  .el-dialog__body {
    padding: 20px;
    height: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
