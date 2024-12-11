<template>
  <div class="detail-view">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <re-converter v-bind="convterConfig"></re-converter>
        <re-converter v-bind="convterConfig1"></re-converter>
      </el-col>
    </el-row>
    <el-row style="margin: 10px 0px"> </el-row>
    <re-descriptions :items="personalDataConfig" :border="true" :column="3" layout="auto" :data="personalData">
      <template #content="scope">
        <template v-if="scope.item.prop === 'position'">
          <el-tag type="success">{{ scope.item.value }}</el-tag>
        </template>
        <template v-else-if="scope.item.prop === 'email'">
          <el-tag type="primary">{{ scope.item.value }}</el-tag>
        </template>
      </template>
    </re-descriptions>

    <el-row style="margin: 10px 0px">
      <el-col>
        <el-button size="small" @click="showType = 'simple'">简单风格</el-button>
        <el-button size="small" @click="showType = 'card'">卡片风格</el-button>
        <el-button size="small" @click="collapsible = !collapsible">章节可折叠</el-button>
      </el-col>
    </el-row>
    <re-detail :data="detailData" :sections="sections" :show-type="showType" :title="'用户详情'" :collapsible="collapsible" />
  </div>
</template>

<script>
export default {
  name: "FormView",
  components: {},
  data() {
    return {
      convterConfig: {
        target: ["读书", "游泳", "跑步"],
        container: "el-tag",
        source: '$targetValue',
        type: "success",
        containerEvents: {
          click: this.handleCilckHappy
        },
      },
      convterConfig1: {
        target: 'https://www.baidu.com,https://www.sina.com',
        container: "el-link",
        source: `$targetValue.split(',')`,
        type: "primary",
      },
      showType: "simple",
      collapsible: true,
      sections: [
        {
          name: "baseInfo", // 区域名称
          label: "基础信息", // 区域标签
          components: [{
            name: "re-descriptions", // 数据展示组件
            props: {
              column: 3, border: true,
              items: [
                {
                  prop: "name",
                  label: "姓名",
                  span: 1,
                },
                {
                  prop: "age",
                  label: "年龄",
                  span: 1,
                },
                {
                  prop: "gender",
                  label: "性别",
                  span: 1,
                },
                {
                  prop: "birthday",
                  label: "生日",
                  span: 1,
                },
                {
                  prop: "post",
                  label: "职位",
                  span: 1,
                },
                {
                  prop: "department",
                  label: "部门",
                  span: 1,
                },
                {
                  prop: "education",
                  label: "学历",
                  span: 1,
                },
                {
                  prop: "school",
                  label: "毕业院校",
                  span: 1,
                },
              ]
            }, // 数据展示组件的props
            dataKey: "base",
            dataInProps: "data",
          }],
        },
        {
          name: "otherInfo", // 区域名称
          label: "其他信息", // 区域标签
          components: [{
            name: "re-descriptions", // 数据展示组件
            props: {
              column: 3, border: true,
              items: [
                {
                  prop: "name",
                  label: "姓名",
                  span: 1,
                },
                {
                  prop: "age",
                  label: "年龄",
                  span: 1,
                },
                {
                  prop: "gender",
                  label: "性别",
                  span: 1,
                },
                {
                  prop: "birthday",
                  label: "生日",
                  span: 1,
                },
                {
                  prop: "post",
                  label: "职位",
                  span: 1,
                },
                {
                  prop: "department",
                  label: "部门",
                  span: 1,
                },
                {
                  prop: "education",
                  label: "学历",
                  span: 1,
                },
                {
                  prop: "school",
                  label: "毕业院校",
                  span: 1,
                },
              ]
            }, // 数据展示组件的props
            dataKey: "other",
            dataInProps: "data",
          }],
        },
      ],
      detailData: {
        baseInfo: {
          base: {

          }
        },
        otherInfo: {
          other: {

          }
        }
      },
      personalDataConfig: [
        {
          prop: "name",
          label: "姓名",
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
          span: 1,
        },
        {
          prop: "gender",
          label: "性别",
          span: 1,
        },
        {
          prop: "phone",
          label: "电话",
          span: 1,
        },
        {
          prop: "address",
          label: "地址",
          span: 1,
        },
        {
          prop: "education",
          label: "学历",
          span: 1,
        },
        {
          prop: "company",
          label: "公司",
          span: 1,
        },
        {
          prop: "email",
          label: "邮箱",
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
        {
          prop: "happy",
          label: "爱好",
          span: 3,
          contentComponent: "re-converter",
          contentComponentProps: {
            container: "el-tag",
            source: [{ value: "读书", label: "读书" }, { value: "游泳", label: "游泳" }, { value: "跑步", label: "跑步" }]
          },
          dataInProps: "target",
        }
      ],
      personalData: {
        name: "张三",
        age: 28,
        gender: "男",
        phone: "13800138000",
        address: "上海市浦东新区",
        education: "本科",
        company: "阿里巴巴集团",
        email: "zhangsan@example.com",
        position: "软件工程师",
        hobbies: "编程, 阅读, 游泳",
        webSite: "https://www.baidu.com",
        happy: ["读书", "游泳", "跑步"]
      },
    };
  },
  computed: {},


  mounted() {
    this.handleGetdata()
    // 发起API请求
    fetch('/audience/data').then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
    })


  },
  methods: {
    handleGetdata() {
      setTimeout(() => {
        this.detailData.baseInfo.base = {
          name: "张三",
          age: 18,
          gender: "男",
          birthday: "1990-01-01",
          phone: "13800138000",
          address: "上海市浦东新区",
          education: "本科",
          company: "阿里巴巴集团",
          email: "zhangsan@example.com",
        }
      }, 1300)
    },
    handleCilckHappy() {

    },
    handleDetail(event, data) {
      console.log('点击链接获取详情', data);
    }
  },
};
</script>
<style lang="less" scoped></style>
