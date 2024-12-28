# Detail

## Usage

### 基础用法

支持仅通过配置就生成一份多模块的详情页。

::: demo

```vue
<template>
  <div>
    <re-detail :data="detailData" :sections="detailSections" :title="title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "用户信息",
      detailSections: [
        {
          name: "baseInfo",
          label: "基本信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "name", label: "姓名", span: 1 },
                  { prop: "age", label: "年龄", span: 1 },
                  { prop: "gender", label: "性别", span: 1 },
                  { prop: "birthday", label: "生日", span: 1 },
                  { prop: "email", label: "邮箱", span: 1 },
                  { prop: "qq", label: "QQ", span: 1 },
                  { prop: "weChat", label: "微信", span: 1 },
                  { prop: "phone", label: "电话", span: 1 },
                  { prop: "address", label: "地址", span: 1 },
                  { prop: "hobby", label: "爱好", span: 1 },
                  { prop: "education", label: "学历", span: 1 },
                  { prop: "school", label: "毕业院校", span: 1 },
                ],
              },
              dataKey: "base",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "jobInfo",
          label: "工作经历",
          components: [
            {
              name: "config-table",
              props: {
                columns: [
                  { prop: "company", label: "公司名称", align: "center" },
                  { prop: "post", label: "职位", align: "center" },
                  { prop: "workContent", label: "工作内容", align: "center" },
                  { prop: "startTime", label: "开始时间", align: "center" },
                  { prop: "endTime", label: "结束时间", align: "center" },
                  { prop: "workGrade", label: "工作成绩", align: "center" },
                ],
              },
              dataKey: "jobList",
              dataInProps: "data",
            },
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "workSummary", label: "工作总结", span: 3 },
                  { prop: "workPlan", label: "工作规划", span: 3 },
                ],
              },
              dataKey: "jobSummary",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "otherInfo",
          label: "其他信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 1,
                border: true,
                layout: "auto",
                items: [
                  { prop: "summary", label: "个人总结", span: 3 },
                  { prop: "remark", label: "备注", span: 3 },
                ],
              },
              dataKey: "other",
              dataInProps: "data",
            },
          ],
        },
      ],
      detailData: {
        baseInfo: {
          base: {},
        },
        jobInfo: {
          jobList: [],
          jobSummary: {},
        },
        otherInfo: {
          other: {},
        },
      },
    };
  },
  mounted() {
    this.handleGetdata();
  },
  methods: {
    handleGetdata() {
      setTimeout(() => {
        this.detailData.baseInfo.base = {
          name: "张三",
          age: 18,
          gender: "男",
          birthday: "1990-01-01",
          email: "zhangsan@example.com",
          qq: "123456789",
          weChat: "zhangsan_wechat",
          phone: "13800138000",
          address: "北京市海淀区",
          hobby: "阅读, 旅行, 运动",
          education: "本科",
          school: "清华大学",
        };

        this.detailData.jobInfo.jobList = [
          {
            company: "阿里巴巴集团",
            post: "软件工程师",
            workContent: "负责前端开发",
            startTime: "2018-01-01",
            endTime: "2020-12-31",
            workGrade: "优秀",
          },
          {
            company: "腾讯公司",
            post: "高级软件工程师",
            workContent: "负责前端架构设计",
            startTime: "2021-01-01",
            endTime: "2023-12-31",
            workGrade: "优秀",
          },
        ];

        this.detailData.jobInfo.jobSummary = {
          workSummary:
            "在阿里巴巴和腾讯积累了丰富的前端开发经验，熟悉Vue和React框架。",
          workPlan: "计划进一步提升自己的技术能力，参与更多的项目。",
        };

        this.detailData.otherInfo.other = {
          summary: "热爱生活，喜欢阅读和旅行，对未来充满期待。",
        };
      }, 1300);
    },
  },
};
</script>
```

:::

### 三种风格

支持`simple`、`bar`、`card`三种风格，默认为`simple`。

::: demo 通过`show-type`属性设置显示风格。

```vue
<template>
  <div>
    <div style="margin: 10px 0px">
      显示风格：
      <el-radio-group v-model="showType" size="small">
        <el-radio-button label="simple">简单风格</el-radio-button>
        <el-radio-button label="bar">带状风格</el-radio-button>
        <el-radio-button label="card">卡片风格</el-radio-button>
      </el-radio-group>
    </div>
    <re-detail
      :data="detailData"
      :sections="detailSections"
      :show-type="showType"
      :title="title"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "用户信息",
      showType: "simple",
      detailSections: [
        {
          name: "baseInfo",
          label: "基本信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "name", label: "姓名", span: 1 },
                  { prop: "age", label: "年龄", span: 1 },
                  { prop: "gender", label: "性别", span: 1 },
                  { prop: "birthday", label: "生日", span: 1 },
                  { prop: "email", label: "邮箱", span: 1 },
                  { prop: "qq", label: "QQ", span: 1 },
                  { prop: "weChat", label: "微信", span: 1 },
                  { prop: "phone", label: "电话", span: 1 },
                  { prop: "address", label: "地址", span: 1 },
                  { prop: "hobby", label: "爱好", span: 1 },
                  { prop: "education", label: "学历", span: 1 },
                  { prop: "school", label: "毕业院校", span: 1 },
                ],
              },
              dataKey: "base",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "jobInfo",
          label: "工作经历",
          components: [
            {
              name: "config-table",
              props: {
                columns: [
                  { prop: "company", label: "公司名称", align: "center" },
                  { prop: "post", label: "职位", align: "center" },
                  { prop: "workContent", label: "工作内容", align: "center" },
                  { prop: "startTime", label: "开始时间", align: "center" },
                  { prop: "endTime", label: "结束时间", align: "center" },
                  { prop: "workGrade", label: "工作成绩", align: "center" },
                ],
              },
              dataKey: "jobList",
              dataInProps: "data",
            },
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "workSummary", label: "工作总结", span: 3 },
                  { prop: "workPlan", label: "工作规划", span: 3 },
                ],
              },
              dataKey: "jobSummary",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "otherInfo",
          label: "其他信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 1,
                border: true,
                layout: "auto",
                items: [
                  { prop: "summary", label: "个人总结", span: 3 },
                  { prop: "remark", label: "备注", span: 3 },
                ],
              },
              dataKey: "other",
              dataInProps: "data",
            },
          ],
        },
      ],
      detailData: {
        baseInfo: {
          base: {},
        },
        jobInfo: {
          jobList: [],
          jobSummary: {},
        },
        otherInfo: {
          other: {},
        },
      },
    };
  },
  mounted() {
    this.handleGetdata();
  },
  methods: {
    handleGetdata() {
      setTimeout(() => {
        this.detailData.baseInfo.base = {
          name: "张三",
          age: 18,
          gender: "男",
          birthday: "1990-01-01",
          email: "zhangsan@example.com",
          qq: "123456789",
          weChat: "zhangsan_wechat",
          phone: "13800138000",
          address: "北京市海淀区",
          hobby: "阅读, 旅行, 运动",
          education: "本科",
          school: "清华大学",
        };

        this.detailData.jobInfo.jobList = [
          {
            company: "阿里巴巴集团",
            post: "软件工程师",
            workContent: "负责前端开发",
            startTime: "2018-01-01",
            endTime: "2020-12-31",
            workGrade: "优秀",
          },
          {
            company: "腾讯公司",
            post: "高级软件工程师",
            workContent: "负责前端架构设计",
            startTime: "2021-01-01",
            endTime: "2023-12-31",
            workGrade: "优秀",
          },
        ];

        this.detailData.jobInfo.jobSummary = {
          workSummary:
            "在阿里巴巴和腾讯积累了丰富的前端开发经验，熟悉Vue和React框架。",
          workPlan: "计划进一步提升自己的技术能力，参与更多的项目。",
        };

        this.detailData.otherInfo.other = {
          summary: "热爱生活，喜欢阅读和旅行，对未来充满期待。",
        };
      }, 1300);
    },
  },
};
</script>
```

:::

### 折叠模式

设置`collapsible`属性设置可开启折叠模式。

::: demo

```vue
<template>
  <div>
    <div style="margin: 10px 0px">
      <el-switch v-model="collapsible" inactive-text="折叠模式" />
    </div>
    <re-detail
      :data="detailData"
      :sections="detailSections"
      :title="title"
      :collapsible="collapsible"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "用户信息",
      collapsible: true,
      detailSections: [
        {
          name: "baseInfo",
          label: "基本信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "name", label: "姓名", span: 1 },
                  { prop: "age", label: "年龄", span: 1 },
                  { prop: "gender", label: "性别", span: 1 },
                  { prop: "birthday", label: "生日", span: 1 },
                  { prop: "email", label: "邮箱", span: 1 },
                  { prop: "qq", label: "QQ", span: 1 },
                  { prop: "weChat", label: "微信", span: 1 },
                  { prop: "phone", label: "电话", span: 1 },
                  { prop: "address", label: "地址", span: 1 },
                  { prop: "hobby", label: "爱好", span: 1 },
                  { prop: "education", label: "学历", span: 1 },
                  { prop: "school", label: "毕业院校", span: 1 },
                ],
              },
              dataKey: "base",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "jobInfo",
          label: "工作经历",
          components: [
            {
              name: "config-table",
              props: {
                columns: [
                  { prop: "company", label: "公司名称", align: "center" },
                  { prop: "post", label: "职位", align: "center" },
                  { prop: "workContent", label: "工作内容", align: "center" },
                  { prop: "startTime", label: "开始时间", align: "center" },
                  { prop: "endTime", label: "结束时间", align: "center" },
                  { prop: "workGrade", label: "工作成绩", align: "center" },
                ],
              },
              dataKey: "jobList",
              dataInProps: "data",
            },
            {
              name: "re-descriptions",
              props: {
                column: 3,
                border: true,
                items: [
                  { prop: "workSummary", label: "工作总结", span: 3 },
                  { prop: "workPlan", label: "工作规划", span: 3 },
                ],
              },
              dataKey: "jobSummary",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "otherInfo",
          label: "其他信息",
          components: [
            {
              name: "re-descriptions",
              props: {
                column: 1,
                border: true,
                layout: "auto",
                items: [
                  { prop: "summary", label: "个人总结", span: 3 },
                  { prop: "remark", label: "备注", span: 3 },
                ],
              },
              dataKey: "other",
              dataInProps: "data",
            },
          ],
        },
      ],
      detailData: {
        baseInfo: {
          base: {},
        },
        jobInfo: {
          jobList: [],
          jobSummary: {},
        },
        otherInfo: {
          other: {},
        },
      },
    };
  },
  mounted() {
    this.handleGetdata();
  },
  methods: {
    handleGetdata() {
      setTimeout(() => {
        this.detailData.baseInfo.base = {
          name: "张三",
          age: 18,
          gender: "男",
          birthday: "1990-01-01",
          email: "zhangsan@example.com",
          qq: "123456789",
          weChat: "zhangsan_wechat",
          phone: "13800138000",
          address: "北京市海淀区",
          hobby: "阅读, 旅行, 运动",
          education: "本科",
          school: "清华大学",
        };

        this.detailData.jobInfo.jobList = [
          {
            company: "阿里巴巴集团",
            post: "软件工程师",
            workContent: "负责前端开发",
            startTime: "2018-01-01",
            endTime: "2020-12-31",
            workGrade: "优秀",
          },
          {
            company: "腾讯公司",
            post: "高级软件工程师",
            workContent: "负责前端架构设计",
            startTime: "2021-01-01",
            endTime: "2023-12-31",
            workGrade: "优秀",
          },
        ];

        this.detailData.jobInfo.jobSummary = {
          workSummary:
            "在阿里巴巴和腾讯积累了丰富的前端开发经验，熟悉Vue和React框架。",
          workPlan: "计划进一步提升自己的技术能力，参与更多的项目。",
        };

        this.detailData.otherInfo.other = {
          summary: "热爱生活，喜欢阅读和旅行，对未来充满期待。",
        };
      }, 1300);
    },
  },
};
</script>
```

:::

### 自定义章节内容

每个章节都可以自定义内容。

::: demo

```vue
<template>
  <div>
    <re-detail :data="detailData" :sections="detailSections" :title="title">
      <template #baseInfoContent="{ section, data}">
      <el-tag><span>{{ section.label }}</span></el-tag>
       </template>
      <template #jobInfoContent="{ section, data }">
        <el-table :data="data.jobList" border stripe>
          <el-table-column prop="company" label="公司名称"></el-table-column>
          <el-table-column prop="post" label="职位"></el-table-column>
          <el-table-column
            prop="workContent"
            label="工作内容"
          ></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="workGrade" label="工作成绩"></el-table-column>
        </el-table>
      </template>
      <template #otherInfoContent="{ section, data }">
      <el-tag><span>{{ section.label }}</span></el-tag>
       </template>
    </re-detail>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "用户信息",
      detailSections: [
        {
          name: "baseInfo",
          label: "基本信息",
        },
        {
          name: "jobInfo",
          label: "工作经历",
        },
        {
          name: "otherInfo",
          label: "其他信息",
        },
      ],
      detailData: {
        baseInfo: {},
        jobInfo: {
          jobList: [],
        },
        otherInfo: {},
      },
    };
  },
  mounted() {
    // this.handleGetdata();
  },
  methods: {
    // handleGetdata() {
    //   setTimeout(() => {
    //     this.detailData.baseInfo.base = {
    //       name: "张三",
    //       age: 18,
    //       gender: "男",
    //       birthday: "1990-01-01",
    //       email: "zhangsan@example.com",
    //       qq: "123456789",
    //       weChat: "zhangsan_wechat",
    //       phone: "13800138000",
    //       address: "北京市海淀区",
    //       hobby: "阅读, 旅行, 运动",
    //       education: "本科",
    //       school: "清华大学",
    //     };
    //     this.detailData.jobInfo.jobList = [
    //       {
    //         company: "阿里巴巴集团",
    //         post: "软件工程师",
    //         workContent: "负责前端开发",
    //         startTime: "2018-01-01",
    //         endTime: "2020-12-31",
    //         workGrade: "优秀",
    //       },
    //       {
    //         company: "腾讯公司",
    //         post: "高级软件工程师",
    //         workContent: "负责前端架构设计",
    //         startTime: "2021-01-01",
    //         endTime: "2023-12-31",
    //         workGrade: "优秀",
    //       },
    //     ];
    //     this.detailData.jobInfo.jobSummary = {
    //       workSummary:
    //         "在阿里巴巴和腾讯积累了丰富的前端开发经验，熟悉Vue和React框架。",
    //       workPlan: "计划进一步提升自己的技术能力，参与更多的项目。",
    //     };
    //     this.detailData.otherInfo.other = {
    //       summary: "热爱生活，喜欢阅读和旅行，对未来充满期待。",
    //     };
    //   }, 1300);
    // },
  },
};
</script>
```

:::

## API

### Attributes

| 参数           | 说明               | 类型             | 可选值                        | 默认值     |
| -------------- | ------------------ | ---------------- | ----------------------------- | ---------- |
| title          | 标题               | String           | -                             | -          |
| sections       | 章节数组           | Array\<Section\> | -                             | `[]`       |
| data           | 详情数据对象       | Object           | -                             | `{}`       |
| showType       | 章节的展现形式     | String           | `'simple'`, `'bar'`, `'card'` | `'simple'` |
| collapsible    | 章节是否可折叠     | Boolean          | -                             | `false`    |
| activeSections | 激活（展开）的章节 | Array\<String\>  | -                             | -          |

#### Section 对象结构

| 属性       | 说明               | 类型               | 可选值 | 默认值 |
| ---------- | ------------------ | ------------------ | ------ | ------ |
| name       | 章节名称           | String             | -      | -      |
| label      | 章节标签           | String             | -      | -      |
| components | 章节所用的组件数组 | Array\<Component\> | -      | -      |

#### Component 对象结构

| 属性        | 说明                                 | 类型   | 可选值 | 默认值 |
| ----------- | ------------------------------------ | ------ | ------ | ------ |
| name        | 组件的名称                           | String | -      | -      |
| props       | 组件的属性                           | Object | -      | -      |
| events      | 组件的事件                           | Object | -      | -      |
| dataKey     | 组件从`data`中获取数据的标识，`必需` | String | -      | -      |
| dataInProps | 为组件注入数据使用的属性名           | String | -      | `data` |

### Events

| 事件名称         | 说明           | 回调参数                                                                 |
| ---------------- | -------------- | ------------------------------------------------------------------------ |
| `active-section` | 激活或关闭章节 | 第一个参数为章节`name`,第二个参数为是否激活，激活为`true`，关闭为`false` |

### Slots

| 名称                   | 说明                 | 参数              |
| ---------------------- | -------------------- | ----------------- |
| header                 | 头部与标题自定义内容 | -                 |
| footer                 | 底部自定义内容       | -                 |
| ${section.name}Title   | 章节标题自定义内容   | `{section}`       |
| ${section.name}Content | 章节自定义内容       | `{section, data}` |
