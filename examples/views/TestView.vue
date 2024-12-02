<template>
  <div class="test-view">
    <el-table :data="tableData" style="width: 100%" :height="500" border>
      <el-table-column
        label="序号"
        prop="id"
        align="center"
        width="80"
        type="index"
        fixed="left"
      ></el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column label="年龄" prop="age" align="center"></el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
        align="center"
      ></el-table-column>
      <el-table-column
        label="性别"
        prop="gender"
        align="center"
      ></el-table-column>
      <el-table-column
        label="电话"
        prop="phone"
        align="center"
      ></el-table-column>
      <el-table-column
        label="地址"
        prop="address"
        align="center"
      ></el-table-column>
      <el-table-column
        label="生日"
        prop="birthday"
        align="center"
      ></el-table-column>
      <el-table-column
        label="职位"
        prop="post"
        align="center"
      ></el-table-column>
      <el-table-column
        label="部门"
        prop="department"
        align="center"
      ></el-table-column>
      <el-table-column
        label="学历"
        prop="education"
        align="center"
      ></el-table-column>
      <el-table-column
        label="毕业院校"
        prop="school"
        align="center"
      ></el-table-column>
      <el-table-column
        label="毕业时间"
        prop="graduationTime"
        align="center"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="desc"
        align="center"
        fixed="right"
        width="120"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="备注"
        prop="remark"
        align="center"
        fixed="right"
        width="120"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TestView",
  components: {},
  data() {
    return {
      fetchData: [],
      tableData: [],
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
        this.tableData = this.fetchData;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.test-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.el-table {
  width: 100%;
  flex: 1;
}
</style>
