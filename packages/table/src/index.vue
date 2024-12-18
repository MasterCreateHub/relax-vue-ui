<template>
  <div class="re-table">
    <div v-if="toolbar" class="re-table-toolbar__wrapper">
      <slot name="toolbar">
        <div class="re-table-toolbar">
          <div class="re-table-toolbar__left">
            <span class="re-table-toolbar-tool is-left" :class="[`re-table-toolbar-${tool.name}`]"
              v-for="(tool, index) in leftTools" :key="tool.name + index">
              <el-tooltip :disabled="!tool.useTip" :content="tool.tooltip || tool.label" placement="top">
                <slot :name="`${tool.name}Tool`" :tool="tool">
                  <template v-if="tool.component">
                    <component :is="tool.component" v-bind="tool.props" v-on="tool.events" />
                  </template>
                  <template v-else>
                    <el-button v-bind="tool.props" size="mini" @click="$emit(tool.name)">{{ tool.label }}</el-button>
                  </template>
                </slot>
              </el-tooltip>
            </span>
          </div>
          <div class="re-table-toolbar__right">
            <span class="re-table-toolbar-tool is-right" :class="[`re-table-toolbar-${tool.name}`]"
              v-for="(tool, index) in rightTools" :key="tool.name + index">
              <el-tooltip :disabled="!tool.useTip" :content="tool.tooltip || tool.label" placement="top">
                <slot :name="`${tool.name}Tool`" :tool="tool">
                  <template v-if="tool.component">
                    <component :is="tool.component" v-bind="tool.props" v-on="tool.events" />
                  </template>
                  <template v-else>
                    <el-button v-bind="tool.props" size="mini" @click="$emit(tool.name)" />
                  </template>
                </slot>
              </el-tooltip>
            </span>
          </div>
        </div>
      </slot>
    </div>
    <el-table ref="tableRef" class="re-table__body" :data="tableShowData" v-bind="$attrs" v-on="$listeners">
      <el-table-column v-for="(column, index) in columns" :key="column.prop + index" v-bind="column">
        <template slot="header" slot-scope="scope">
          <slot v-if="$scopedSlots[`${column.prop}Label`]" :name="`${column.prop}Label`" :row="scope.row"
            :index="scope.$index">{{ column.label }}</slot>
          <slot v-else name="header" :column="scope.column" :index="scope.$index">{{ column.label }}</slot>
        </template>
        <template slot-scope="scope">
          <slot v-if="$scopedSlots[`${column.prop}Content`]" :name="`${column.prop}Content`" :row="scope.row"
            :column="scope.column" :index="scope.$index">
            {{ scope.row[column.prop] }}
            <template v-if="column.contentComponent">
              <component :is="column.contentComponent || null" v-bind="column.contentComponentProps || {}"
                v-on="column.contentComponentEvents || {}" :[column.dataInProps]="scope.row[column.prop]">
                {{ scope.row[column.prop] }}
              </component>
            </template>
            <template v-else>{{ scope.row[column.prop] }}</template>
          </slot>
          <slot v-else name="body" :row="scope.row" :column="scope.column" :index="scope.$index">
            <template v-if="column.contentComponent">
              <component :is="column.contentComponent || null" v-bind="column.contentComponentProps || {}"
                v-on="column.contentComponentEvents || {}" :[column.dataInProps]="scope.row[column.prop]">
                {{ scope.row[column.prop] }}
              </component>
            </template>
            <template v-else>{{ scope.row[column.prop] }}</template>
          </slot>
        </template>
      </el-table-column>
      <slot name="default"></slot>
      <slot name="append"></slot>
    </el-table>
    <div v-if="pagination" class="re-table-pagination__wrapper">
      <slot name="pagination">
        <el-pagination :class="['re-table-pagination', `is-${paginationConfigModel.align}`]" :total="data.length"
          v-bind.sync="paginationConfigModel" />
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReTable",
  props: {
    /**
     * @description 表格数据
     * @type {Array}
     * @default []
     */
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 表格列配置
     * @type {Array<Column>}
     * @property {Object} column  表格列对象
     * @property {'selection'|'index'|'expand'} column.type 表格列类型
     * @property {String} column.prop 表格列属性
     * @property {String} column.label 表格列标签
     * @property {String} column.width 表格列宽度
     * @property {String} column.minWidth 表格列最小宽度
     * @property {String} column.align 表格列对齐方式
     * @property {String} column.fixed 表格列固定方式
     * @property {String} column.showOverflowTooltip 表格列是否显示tooltip
     * @property {String} column.className 表格列样式类名
     * @property {Any} 其他属性请参考element ui文档
     * @default []
     */
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 是否显示工具栏
     * @type {Boolean}
     * @default false
     */
    toolbar: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 工具栏配置
     * @type {Array<Tool>}
     * @property {Object} tool 工具对象
     * @property {String} tool.name 工具名称，工具的标识，用于触发事件
     * @property {String} tool.label 工具标签名称，用于显示在工具栏上
     * @property {Boolean} tool.useTip 是否使用提示
     * @property {String} tool.tooltip  提示内容，默认为工具标签 
     * @property {String} tool.position 工具位置，left表示左侧，right表示右侧
     * @property {String} tool.component 工具组件，默认为el-button
     * @property {Object} tool.props 工具组件配置
     * @property {Object} tool.events 工具绑定的事件
     * @default []
     */
    toolbarConfig: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 是否显示分页器
     * @type {Boolean}
     * @default false
     */
    pagination: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 分页器配置
     * @type {Object}
     * @property {String} align - 分页器对齐方式
     * @property {Boolean} background - 是否显示背景
     * @property {String} layout - 分页器布局
     * @property {Array} pageSizes - 每页显示条数选择器的选项设置
     * @property {Number} currentPage - 当前页
     * @property {Number} pageSize - 每页显示条目个数
     * @property {Number} pagerCount - 分页导航的按钮数
     * @default {
     *   align: 'center',
     *   background: true,
     *   layout: 'total, sizes, prev, pager, next, jumper',
     *   pageSizes: [10, 20, 30, 50],
     *   currentPage: 1,
     *   pageSize: 10,
     *   pagerCount: 7
     * }
     */
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          align: "center",
          background: true,
          layout: "total, sizes, prev, pager, next, jumper",
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
        };
      },
      validator(value) {
        return [
          "align",
          "background",
          "layout",
          "pageSizes",
          "currentPage",
          "pageSize",
          "pagerCount",
        ].every((key) => key in value);
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 左侧工具
     */
    leftTools() {
      return this.tools.filter((item) => item.position === "left");
    },
    /**
     * @description 右侧工具
     */
    rightTools() {
      return this.tools.filter((item) => item.position === "right");
    },

    /**
     * @description 表格分页后展示的数据
     */
    tableShowData() {
      if (
        this.pagination &&
        this.paginationConfig.currentPage &&
        this.paginationConfig.pageSize
      ) {
        const startIndex =
          (this.paginationConfig.currentPage - 1) *
          this.paginationConfig.pageSize;
        const endIndex = startIndex + this.paginationConfig.pageSize;
        return this.data.slice(startIndex, endIndex);
      } else {
        return this.data;
      }
    },
    /**
     * @description 分页器配置双向绑定
     */
    paginationConfigModel: {
      get() {
        return this.paginationConfig;
      },
      set(val) {
        this.$emit("update:paginationConfig", val);
      },
    },
  },
  methods: {
    /**
     * @description 调用el-table自身的方法
     * @param {String} name - 方法名
     */
    tableFunction(name) {
      // 参数校验
      if (!name || typeof name !== "string") {
        console.error("Invalid method name:", name);
        return;
      }

      // 获取 el-table 实例
      const tableRef = this.$refs.table;
      if (!tableRef) {
        console.error("Table reference not found");
        return;
      }

      // 检查方法是否存在
      const tableMethod = tableRef[name];
      if (typeof tableMethod !== "function") {
        console.error(`Method ${name} does not exist on el-table`);
        return;
      }

      // 调用方法
      try {
        tableMethod();
      } catch (error) {
        console.error(`Error calling method ${name}:`, error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.re-table {
  width: 100%;
  flex: 1;

  .re-table-toolbar__wrapper {
    padding-bottom: 10px;

    .re-table-toolbar {
      display: flex;
      justify-content: space-between;

      .re-table-toolbar__left,
      .re-table-toolbar__right {
        display: flex;
        align-items: center;
      }

      .re-table-toolbar__right {
        justify-content: flex-end;

        .re-table-toolbar-tool {
          margin-left: 5px;
        }
      }

      .re-table-toolbar__left {
        justify-content: flex-start;

        .re-table-toolbar-tool {
          margin-right: 5px;
        }
      }
    }
  }

  .re-table__body {

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

  .re-table-pagination__wrapper {
    padding-top: 10px;

    .is-left {
      text-align: left;
    }

    .is-center {
      text-align: center;
    }

    .is-right {
      text-align: right;
    }
  }
}
</style>
