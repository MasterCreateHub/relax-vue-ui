<template>
  <el-pagination :class="['re-pagination', { 'is-hidden': hidden }, `is-${align}`]" :layout="layout"
    :background="background" :total="total" :current-page.sync="currentPageModel" :page-size.sync="pageSizeModel"
    :page-sizes="pageSizes" :pager-count="pagerCount" v-bind="$attrs" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" v-on="$listeners">
    <slot v-if="hasSlot"></slot>
  </el-pagination>
</template>
  
<script>

export default {
  name: "RePagination",
  props: {
    /**
     * @description 组件布局
     * @type {String}
     * @default 'total,sizes,prev,pager,next,jumper'
     */
    layout: {
      type: String,
      default: "total,sizes,prev,pager,next,jumper",
    },
    /**
     * @description 使用背景色
     * @type {Boolean}
     * @default true
     */
    background: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 总条数
     * @type {Number}
     */
    total: {
      required: true,
      type: Number,
    },
    /**
     * @description 当前页码
     * @type {Number}
     * @default 1
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * @description 每页条数
     * @type {Number}
     * @default 20
     */
    pageSize: {
      type: Number,
      default: 10,
    },
    /**
     * @description 每页条数选项
     * @type {Array}
     * @default [10, 20, 30, 50]
     */
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    /**
     * @description 页码按钮
     * @type {Number}
     */
    pagerCount: {
      type: Number,
      default: 7,
    },
    /**
     * @description 对齐方式
     * @type {String}
     * @default 'center'
     */
    align: {
      type: String,
      default: "center",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      },
    },
    /**
     * @description 是否隐藏
     * @type {Boolean}
     * @default false
     */
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localCurrentPage: 1,
      localPageSize: this.pageSize,
    };
  },
  computed: {
    /**
     * @description 当前页码
     */
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(val) {
        this.localCurrentPage = val;
        this.$emit("update:currentPage", val);
      },
    },
    /**
     * @description 每页条数
     */
    pageSizeModel: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.localPageSize = val;
        this.$emit("update:pageSize", val);
      },
    },
    /**
     * @description 是否有插槽
     */
    hasSlot() {
      return this.layout.includes("slot");
    },
  },
  methods: {
    /**
     * @description 当前页码改变事件
     * @param {Number} val 当前页码
     */
    handleCurrentChange(val) {
      this.$emit("pagination", {
        currentPage: val,
        pageSize: this.localPageSize,
        from: "currentPage"
      })
    },
    /**
     * @description 每页条数改变事件
     * @param {Number} val 每页条数
     */
    handleSizeChange(val) {
      if (this.currentPageModel * val >= this.total) {
        this.currentPageModel = 1;
      }
      this.$emit("pagination", {
        currentPage: this.localCurrentPage,
        pageSize: val,
        from: "pageSize"
      });
    },
  },
}
</script>
  
<style lang="scss" scoped>
.re-pagination {
  padding: 0;
  margin-top: 10px;
}

.is-left {
  text-align: left;
}

.is-center {
  text-align: center;
}

.is-right {
  text-align: right;
}

.is-hidden {
  display: none;
}
</style>
  