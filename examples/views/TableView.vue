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
          model: "name",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "年龄",
          model: "age",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "电话",
          model: "tel",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "邮箱",
          model: "email",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "爱好",
          model: "happy",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "描述",
          model: "desc",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "等级",
          model: "level",
          component: "el-select",
          valueType: "string",
          props: {
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
