<template>
    <div class="re-table">
        <div v-if="toolbar" class="re-table-toolbar__wrapper">
            <slot name="toolbar"></slot>
        </div>
        <el-table class="re-table__body" :data="showData" v-bind="$attrs" v-on="$listeners">
            <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
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
         */
        data: {
            type: Array,
            default: () => { return [] }
        },
        /**
         * @description 表格列配置
         * @type {Array}
         * @property {String} columnKey - 列key
         * @property {String} type - 列类型
         * @property {String} prop - 列属性
         * @property {String} label - 列标签
         * @property {String} width - 列宽度
         * @property {String} align - 列对齐方式
         * @property {String} type - 列类型
         * @property {String} fixed - 列是否固定
         * @property {String} sortable - 列是是否可排序
         * @property {String} showOverflowTooltip - 列是否显示tooltip
         * @property {String} className - 列class
         * @default []
         */
        columns: {
            type: Array,
            default: () => { return [] },
        },
        /**
         * @description 是否显示工具栏
         */
        toolbar: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否显示分页器
         */
        pagination: {
            type: Boolean,
            default: false
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
         */
        paginationConfig: {
            type: Object,
            default: () => {
                return {
                    align: 'center',
                    background: true,
                    layout: 'total, sizes, prev, pager, next, jumper',
                    pageSizes: [10, 20, 30, 50],
                    currentPage: 1,
                    pageSize: 10,
                    pagerCount: document.body.clientWidth < 992 ? 5 : 7
                }
            },
            validator(value) {
                return ['align', 'background', 'layout', 'pageSizes', 'currentPage', 'pageSize', 'pagerCount'].every(
                    key => key in value);
            }
        }
    },
    data() {
        return {}
    },
    computed: {
        showData() {
            if (this.pagination && this.paginationConfig.currentPage && this.paginationConfig.pageSize) {
                const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
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
            }
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
::v-deep.re-table {
    width: 100%;

    .re-table-toolbar {
        margin-bottom: 10px;
        text-align: right;
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
  