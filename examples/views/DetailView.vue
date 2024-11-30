<template>
  <div class="detail">
    <el-row style="margin-bottom: 10px">
      <el-col>
        <el-button size="small" @click="showType = 'simple'"
          >简单风格</el-button
        >
        <el-button size="small" @click="showType = 'card'">卡片风格</el-button>
        <el-button size="small" @click="showType = 'collapse'"
          >折叠风格</el-button
        >
        <el-button size="small" @click="showType = 'tab'">tab风格</el-button>
      </el-col>
    </el-row>
    <re-detail :data="detailData" :show-type="showType" :title="'用户详情'" />
  </div>
</template>

<script>
export default {
  name: "FormView",
  components: {},
  data() {
    return {
      showType: "simple",
      detailData: [
        {
          name: "baseInfo", // 区域名称
          label: "基础信息", // 区域标签
          component: "re-descriptions", // 数据展示组件
          props: { column: 3, border: true }, // 数据展示组件的props
          dataForProps: 'data',
          data: [ // 数据展示组件的数据
            {
              prop: "name",
              label: "姓名",
              value: "张三",
              span: 1,
            },
            {
              prop: "age",
              label: "年龄",
              value: 28,
              span: 1,
            },
            {
              prop: "gender",
              label: "性别",
              value: "男",
              span: 1,
            },
            {
              prop: "birthday",
              label: "生日",
              value: "1999-09-09",
              span: 1,
            },
            {
              prop: "post",
              label: "职位",
              value: "前端工程师",
              span: 1,
            },
            {
              prop: "department",
              label: "部门",
              value: "前端部",
              span: 1,
            },
            {
              prop: "education",
              label: "学历",
              value: "本科",
              span: 1,
            },
            {
              prop: "school",
              label: "毕业院校",
              value: "北京大学",
            }
          ],
        },
        {
          name: "otherInfo", // 区域名称
          label: "其他信息", // 区域标签
          component: "re-descriptions", // 数据展示组件
          props: { column: 3, border: true }, // 数据展示组件的props
          dataForProps: 'data',
          data: [ // 数据展示组件的数据
            {
              prop: "name",
              label: "姓名",
              value: "张三",
              span: 1,
            },
            {
              prop: "age",
              label: "年龄",
              value: 28,
              span: 1,
            },
            {
              prop: "gender",
              label: "性别",
              value: "男",
              span: 1,
            },
            {
              prop: "birthday",
              label: "生日",
              value: "1999-09-09",
              span: 1,
            },
            {
              prop: "post",
              label: "职位",
              value: "前端工程师",
              span: 1,
            },
            {
              prop: "department",
              label: "部门",
              value: "前端部",
              span: 1,
            },
            {
              prop: "education",
              label: "学历",
              value: "本科",
              span: 1,
            },
            {
              prop: "school",
              label: "毕业院校",
              value: "北京大学",
            }
          ],
        },
        // {
        //   name: "contactInfo", // 区域名称
        //   label: "联系方式", // 区域标签
        //   component: "el-table", // 数据展示组件
        //   props: { // 数据展示组件的props
        //     columns: [
        //       {
        //         prop: "name",
        //         label: "姓名",
        //       },
        //       {
        //         prop: "address",
        //         label: "地址",
        //       },
        //       {
        //         prop: "phone",
        //         label: "电话",
        //       },
        //       {
        //         prop: "email",
        //         label: "邮箱",
        //       },
        //     ],
        //   },
        //   data: [ // 数据展示组件的数据
        //     {
        //       name: "张三",
        //       address: "上海市浦东新区",
        //       phone: "13800138000",
        //       email: "zhangsan@example.com",
        //     },
        //     {
        //       name: "李四",
        //       address: "上海市浦东新区",
        //       phone: "13800138000",
        //       email: "zhangsan@example.com",
        //     },
        //     {
        //       name: "王五",
        //       address: "上海市浦东新区",
        //       phone: "13800138000",
        //       email: "zhangsan@example.com",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {},

  mounted() {},
};
</script>
<style lang="less" scoped></style>
