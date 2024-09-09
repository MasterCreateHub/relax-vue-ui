<template>
    <div class="base-table">
        <div v-if="toolbar" class="base-table-toolbar">
            <slot name="toolbar">
                <el-button v-for="tool in toolbarConfig" :key="tool.name" v-bind="tool.config" size="mini" @click="$emit(tool.name)">{{
                    tool.label }}</el-button>
            </slot>
        </div>
        <el-table class="base-table__body" :data="data" v-bind="$attrs" v-on="$listeners">
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
        <el-pagination v-if="pagination" :class="['base-table-pagination', `is-${paginationConfig.align}`]"
            :total="data.length" v-bind="paginationConfig">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: "BaseTable",
    props: {
        data: {
            type: Array,
            default: () => { return [] }
        },
        columns: {
            type: Array,
            default: () => { return [] }
        },
        toolbar: {
            type: Boolean,
            default: false
        },
        toolbarConfig: {
            type: Array,
            default: () => { return [] },
            validator(value) {
                return value.every(item => {
                    return item.name && item.label
                });
            }
        },
        pagination: {
            type: Boolean,
            default: false
        },
        paginationConfig: {
            type: Object,
            default: () => {
                return {
                    background: true,
                    layout: 'total, sizes, prev, pager, next, jumper',
                    pageSizes: [10, 20, 30, 50],
                    align: 'center',
                    currentPage: 1,
                    pageSize: 10,
                    pagerCount: document.body.clientWidth < 992 ? 5 : 7
                }
            }
        }

    },
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
::v-deep.base-table {
    width: 100%;

    .base-table-toolbar {
        margin-bottom: 10px;
        text-align: right;
    }

    .base-table__body {

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

    .base-table-pagination {
        margin-top: 10px;
    }
}
</style>
  