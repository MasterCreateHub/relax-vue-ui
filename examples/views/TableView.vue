<template>
  <div class="table-view">
    <!-- <base-page-table
      :factor-span="6"
      :factors="seacherFactors"
      :columns="columns"
      :data="tableData"
      :total="total"
      :page.sync="queryForm.pageNumber"
      :limit.sync="queryForm.pageSize"
      @pagination="handleGet"
    >
      <template #genderContent="scope">
        <el-tag>{{ scope.row.gender }}</el-tag>
      </template>
    </base-page-table> -->
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
          width: 80,
          type: "index",
          fixed: "left",
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
          label: "电话",
          prop: "phone",
          align: "center",
        },
        {
          label: "地址",
          prop: "address",
          align: "center",
        },
        {
          label: "生日",
          prop: "birthday",
          align: "center",
        },
        {
          label: "职位",
          prop: "post",
          align: "center",
        },
        {
          label: "部门",
          prop: "department",
          align: "center",
        },
        {
          label: "学历",
          prop: "education",
          align: "center",
        },
        {
          label: "毕业院校",
          prop: "school",
          align: "center",
        },
        {
          label: "毕业时间",
          prop: "graduationTime",
          align: "center",
        },
        {
          label: "描述",
          prop: "desc",
          align: "center",
          fixed: "right",
          width: 120,
          showOverflowTooltip: true,
        },
        {
          label: "备注",
          prop: "remark",
          align: "center",
          fixed: "right",
          width: 120,
          showOverflowTooltip: true,
        },
      ],
      fetchData: [],
      queryForm: {
        pageNumber: 1,
        pageSize: 20,
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
      this.fetchData = [];
      setTimeout(() => {
        for (let i = 0; i < 100; i++) {
          this.fetchData.push({
            id: i,
            name: `名字${i}`,
            age: 18,
            gender: "男",
            email: "12345678901@qq.com",
            desc: "我是一个描述",
            phone: "12345678901",
            address: "北京",
            birthday: "1999-09-09",
            post: "前端工程师",
            department: "前端部",
            education: "本科",
            school: "北京大学",
            graduationTime: "2019-09-09",
            remark: "我是一个备注",
          });
        }
        this.tableData = this.fetchData.slice(
          (this.queryForm.pageNumber - 1) * this.queryForm.pageSize,
          this.queryForm.pageNumber * this.queryForm.pageSize
        );
        this.total = this.fetchData.length;
      }, 1000);
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
