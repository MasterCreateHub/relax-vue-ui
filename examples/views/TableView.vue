<template>
  <div class="table-view">
    <base-page-table :factor-span="6" :factors="seacherFactors" :columns="columns" :data="tableData" :total="total"
      :page.sync="queryForm.pageNumber" :limit.sync="queryForm.pageSize" @pagination="handleGet"></base-page-table>
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
        },
        {
          label: "年龄",
          prop: "age",
          type: "el-input",
        },
        {
          label: "邮箱",
          prop: "email",
          type: "el-input",
        },
      ],
      columns: [
        {
          label: "序号",
          prop: "id",
          align: "center",
        },
        {
          label: "姓名",
          prop: "name",
          align: "center",
        },
        {
          label: "年龄",
          prop: "age",
          align: "center",
        },
        {
          label: "邮箱",
          prop: "email",
          align: "center",
        },
        {
          label: "性别",
          prop: "gender",
          align: "center",
        },
        {
          label: "描述",
          prop: "desc",
          align: "center",
        },
        { label: "备注", prop: "remark", align: "center" },
      ],
      fetchData: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 5,
          name: "孙七",
          age: 22,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 6,
          name: "周八",
          age: 23,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 7,
          name: "吴九",
          age: 24,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 8,
          name: "郑十",
          age: 25,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 9,
          name: "郑十一",
          age: 26,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 10,
          name: "郑十二",
          age: 27,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 11,
          name: "郑十三",
          age: 28,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
        {
          id: 12,
          name: "郑十四",
          age: 29,
          email: "123@qq.com",
          gender: "男",
          desc: "描述",
          remark: "备注",
        },
      ],
      queryForm: {
        pageNumber: 1,
        pageSize: 10,
        name: "",
        age: "",
        gender: "",
        email: "",
        desc: "",
        remark: "",
      },
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.handleGet();
  },
  methods: {
    handleGet() {
      this.total = this.fetchData.length;
      this.tableData = this.fetchData.slice(
        (this.queryForm.pageNumber - 1) * this.queryForm.pageSize,
        this.queryForm.pageNumber * this.queryForm.pageSize
      );
    },
  },
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
