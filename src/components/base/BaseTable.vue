<template>
    <el-table v-bind="$attrs" v-on="$listeners">
        <template v-if="columns.length > 0">
            <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
                <template slot-scope="scope">
                    <template v-if="$slots[`${column.prop}Header`]" slot="header">
                        <slot :name="`${column.prop}Header`"></slot>
                    </template>
                    <template v-if="$slots[`${column.prop}Content`]">
                        <slot :name="`${column.prop}Content`" :row="scope.row" :index="scope.$index"></slot>
                    </template>
                    <template v-else>{{ scope.row[column.prop]  }}</template>
                </template>
            </el-table-column>
        </template>
        <slot></slot>
    </el-table>
</template>
<script>
export default {
    name: "BaseTable",
    data() {
        
    },
    props: {
        columns: {
            type: Array,
            default: () => { return [] }
        },
    },
    computed: {

    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped></style>
  