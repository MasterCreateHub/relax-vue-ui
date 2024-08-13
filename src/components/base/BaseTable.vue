<template>
    <el-table v-bind="$attrs" v-on="$listeners" class="base-table">
        <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
            <template slot="header" slot-scope="scope">
                <slot :name="`${column.prop}Header`"  :row="scope.row"  :index="scope.$index">{{ column.label }}</slot>
            </template>
            <template slot-scope="scope">
                <slot :name="`${column.prop}Content`" :row="scope.row" :column="scope.column" :index="scope.$index">
                    {{ scope.row[column.prop] }}
                </slot>
            </template>
        </el-table-column>
        <slot name="append"></slot>
    </el-table>
</template>
<script>
export default {
    name: "BaseTable",
    props: {
        columns: {
            type: Array,
            default: () => { return [] }
        },
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
</style>
  