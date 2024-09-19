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
       * @description: 分页组件布局
       */
      layout: {
        type: String,
        default: "total,sizes,prev,pager,next,jumper",
      },
      /**
       * @description: 是否使用背景色
       */
      background: {
        type: Boolean,
        default: true,
      },
      /**
       * @description: 总条数
       */
      total: {
        required: true,
        type: Number,
      },
      /**
       * @description: 当前页码
       */
      currentPage: {
        type: Number,
        default: 1,
      },
      /**
       * @description: 每页条数
       */
      pageSize: {
        type: Number,
        default: 20,
      },
      /**
       * @description: 每页条数选项
       */
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50];
        },
      },
      /**
       * @description: 移动端页码按钮的数量端
       */
      pagerCount: {
        type: Number,
        default: document.body.clientWidth < 992 ? 5 : 7,
      },
      /**
       * @description: 分页组件对齐方式
       */
      align: {
        type: String,
        default: "center",
        validator(value) {
          return ["left", "center", "right"].includes(value);
        },
      },
      /**
       * @description: 是否隐藏
       */
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    computed: {
      currentPageModel: {
        get() {
          return this.currentPage;
        },
        set(val) {
          this.$emit("update:currentPage", val);
        },
      },
      pageSizeModel: {
        get() {
          return this.pageSize;
        },
        set(val) {
          this.$emit("update:pageSize", val);
        },
      },
      hasSlot() {
        return this.layout.includes("slot");
      },
    },
    methods: {
      handleSizeChange(val) {
        if (this.currentPageModel * val > this.total) {
          this.currentPageModel = 1;
        }
        this.$emit("pagination", {
          currentPage: this.currentPageModel,
          pageSize: val,
        });
      },
      handleCurrentChange(val) {
        this.$emit("pagination", {
          currentPage: val,
          pageSize: this.pageSizeModel,
        })
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .re-pagination {
    margin-top: 10px;
    padding: 0px;
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
  