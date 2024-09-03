<template>
    <el-table v-bind="$attrs" v-on="$listeners" class="base-table">
        <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
                <template slot="header" slot-scope="scope">
                    <slot v-if="$scopedSlots[`${column.prop}Label`]" :name="`${column.prop}Label`" :row="scope.row" :index="scope.$index">{{ column.label }}</slot>
                    <slot v-else name="header" :column="scope.column" :index="scope.$index">{{ column.label }}</slot>
                </template>
                <template slot-scope="scope">
                    <slot v-if="$scopedSlots[`${column.prop}Content`]" :name="`${column.prop}Content`" :row="scope.row" :column="scope.column" :index="scope.$index">
                        {{ scope.row[column.prop] }}
                    </slot>
                    <slot v-else name="body" :row="scope.row" :column="scope.column" :index="scope.$index">
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
        /**
         * @description 表格列配置
         * @type {Array}
         * @property {Object} [] 表格列配置
         * @property {String} [].prop 列绑定的属性，用于绑定行对象属性
         * @property {String} [].label 列标题
         * @property {String | Number | Boolean} [].property-value 列属性，用于el-table-column的属性
         * @default []
         */
        columns: {
            type: Array,
            default: () => []
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
  