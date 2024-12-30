<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <el-table-column
      v-for="(column, index) in columns"
      :key="column.prop + index"
      v-bind="column"
    >
      <template slot-scope="scope">
        <slot
          name="bodyCell"
          :row="scope.row"
          :$index="scope.$index"
          :column="scope.column"
        >
          {{ scope.row[column.prop] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ConfigTable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },
};
</script>
