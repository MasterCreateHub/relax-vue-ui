<template>
  <div class="table-view">
    <re-searcher :factors="seacherFactors" layout="grid" @search="handleSearch" />
  </div>
</template>

<script>
export default {
  name: "TableView",
  components: {},
  data() {
    return {
      seacherFactors: [
        {
          label: "姓名",
          prop: "name",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "年龄",
          prop: "age",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "电话",
          prop: "tel",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "邮箱",
          prop: "email",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "爱好",
          prop: "happy",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "描述",
          prop: "desc",
          type: "el-input",
          valueType: "string",
        },
        {
          label: "等级",
          prop: "level",
          type: "el-select",
          valueType: "string",
          config: {
            placeholder: "",
            clearable: false,
          },
          options: [
            { label: "A", value: "A" },
            { label: "B", value: "B" },
            { label: "C", value: "C" },
          ],
        },
      ],
    };
  },
  mounted() {

  },
  methods: {
    handleSearch(val) {
      console.log(val);
    },
  }
};
</script>
<style lang="scss" scoped>
.table-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // overflow: hidden;
}

::v-deep.tool-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-card__body {
    height: 300px;
    flex: 1;
  }
}
</style>
