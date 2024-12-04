<template>
  <div class="detail">
    <el-row style="margin-bottom: 10px">
      <el-col>
        <el-button size="small" @click="showType = 'simple'">简单风格</el-button>
        <el-button size="small" @click="showType = 'card'">卡片风格</el-button>
        <el-button size="small" @click="showType = 'collapse'">折叠风格</el-button>
        <el-button size="small" @click="showType = 'tab'">tab风格</el-button>
      </el-col>
    </el-row>
    <re-detail :data="detailData" :show-type="showType" :title="'用户详情'" />
    <el-row style="margin-bottom: 10px"> </el-row>
    <re-descriptions :data="personalData" border :column="3" layout="auto">
      <template #label="scope">
        {{ scope.dataItem.label + ":" }}
      </template>
      <template #content="scope">
        <template v-if="scope.dataItem.prop === 'position'">
          <el-tag type="success">{{ scope.dataItem.value }}</el-tag>
        </template>
        <template v-else-if="scope.dataItem.prop === 'email'">
          <el-tag type="primary">{{ scope.dataItem.value }}</el-tag>
        </template>
        <template v-else-if="scope.dataItem.prop === 'address'">
          <el-tag type="primary">{{ scope.dataItem.value }}</el-tag>
        </template>
      </template>
    </re-descriptions>
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
          components: [{
            name: "re-descriptions", // 数据展示组件
            props: { column: 3, border: true }, // 数据展示组件的props
            dataForProps: "data",
            data: [
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
              },
            ],
          }],
        },
      ],
      personalData: [
        {
          prop: "name",
          label: "姓名",
          value: "张三",
          span: 1,
          labelClassName: "labelClassName",
          contentClassName: "contentClassName",
          labelStyle: {
            color: "red",
          },
          contentStyle: {
            color: "blue",
          },
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
          prop: "phone",
          label: "电话",
          value: "13800138000",
          span: 1,
        },
        {
          prop: "address",
          label: "地址",
          value: "上海市浦东新区",
          span: 1,
        },
        {
          prop: "education",
          label: "学历",
          value: "本科",
          span: 1,
        },
        {
          prop: "company",
          label: "公司",
          value: "阿里巴巴集团",
          span: 1,
        },
        {
          prop: "email",
          label: "邮箱",
          value: "zhangsan@example.com",
          span: 1,
        },
        {
          prop: "position",
          label: "职位",
          value: "软件工程师",
          span: 1,
        },
        {
          prop: "hobbies",
          label: "爱好",
          value: "编程, 阅读, 游泳",
          span: 1,
        },
        {
          prop: "webSite",
          label: "个人网站",
          value: "https://www.baidu.com",
          span: 2,
          contentComponent: "el-link",
          contentComponentProps: {
            type: "primary",
            underline: false,
          },
          contentComponentEvents: {
            click: (event) => {
              this.handleDetail(event, { url: "https://www.baidu.com" });
            },
          },
        },
      ],
    };
  },
  computed: {},

  mounted() {

  },
  methods: {
    handleDetail(event, data) {
      console.log('点击链接获取详情', data);
    }
  },
};
</script>
<style lang="less" scoped></style>
