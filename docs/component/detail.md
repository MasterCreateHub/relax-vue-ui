# Detail

## Usage

### 基础示例

::: demo

```vue
<template>
  <div>
    <el-row style="margin: 10px 0px">
      <el-col>
        <el-radio v-model="showType" label="simple">简单风格</el-radio>
        <el-radio v-model="showType" label="bar">带状风格</el-radio>
        <el-radio v-model="showType" label="card">卡片风格</el-radio>
        <el-switch v-model="collapsible" inactive-text="折叠模式" />
      </el-col>
    </el-row>
    <re-detail
      :data="detailData"
      :sections="detailSections"
      :show-type="showType"
      :title="title"
      :collapsible="collapsible"
    />
  </div>
</template>

<script>
export default {
  name: "FormView",
  components: {},
  data() {
    return {
      title: "用户信息",
      showType: "simple",
      collapsible: true,
      detailSections: [
        {
          name: "baseInfo", // 区域名称
          label: "基本信息", // 区域标签
          components: [
            {
              name: "re-descriptions", // 数据展示组件
              props: {
                column: 3,
                border: true,
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
                    prop: "education",
                    label: "学历",
                    span: 1,
                  },
                  {
                    prop: "school",
                    label: "毕业院校",
                    span: 1,
                  },
                ],
              }, // 数据展示组件的props
              dataKey: "base",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "contactInfo", // 区域名称
          label: "联系信息", // 区域标签
          components: [
            {
              name: "re-descriptions", // 数据展示组件
              props: {
                column: 3,
                border: true,
                items: [
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
                    prop: "email",
                    label: "邮箱",
                    span: 1,
                  },
                ],
              }, // 数据展示组件的props
              dataKey: "contact",
              dataInProps: "data",
            },
          ],
        },
        {
          name: "otherInfo", // 区域名称
          label: "其他信息", // 区域标签
          components: [
            {
              name: "re-descriptions", // 数据展示组件
              props: {
                column: 3,
                border: true,
                items: [
                  {
                    prop: "company",
                    label: "公司",
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
                ],
              }, // 数据展示组件的props
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
        contactInfo: {
          contact: {},
        },
        otherInfo: {
          other: {},
        },
      },
    };
  },
  computed: {},
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
          education: "本科",
          school: "清华大学",
        };
        this.detailData.contactInfo.contact = {
          phone: "13800138000",
          address: "北京市海淀区",
          email: "zhangsan@example.com",
        };
        this.detailData.otherInfo.other = {
          company: "阿里巴巴集团",
          post: "软件工程师",
          department: "技术部",
        };
      }, 1300);
    },
  },
};
</script>
```

:::

## API

### Attributes

| 参数           | 说明               | 类型             | 可选值                        | 默认值     |
| -------------- | ------------------ | ---------------- | ----------------------------- | ---------- |
| title          | 标题               | string           | -                             | `''`       |
| sections       | 章节数组           | Array\<Section\> | -                             | `[]`       |
| data           | 详情数据对象       | Object           | -                             | `{}`       |
| showType       | 章节的展现形式     | string           | `'simple'`, `'bar'`, `'card'` | `'simple'` |
| collapsible    | 章节是否可折叠     | boolean          | -                             | `false`    |
| activeSections | 激活（展开）的章节 | Array\<String\>  | -                             | -          |

### Section 对象结构

| 属性名     | 类型               | 描述               |
| ---------- | ------------------ | ------------------ |
| label      | string             | 章节标签           |
| name       | string             | 章节名称           |
| components | Array\<Component\> | 章节所用的组件数组 |

### Component 对象结构

| 属性名      | 类型   | 描述                               |
| ----------- | ------ | ---------------------------------- |
| name        | string | 组件的名称                         |
| dataKey     | string | 组件获取从 `data` 中获取数据的标识 |
| props       | Object | 组件的属性                         |
| events      | Object | 组件的事件                         |
| dataInProps | string | 为组件注入数据使用的属性名         |

### Events

| 事件名称         | 说明           | 回调参数                                                                 |
| ---------------- | -------------- | ------------------------------------------------------------------------ |
| `active-section` | 激活或关闭章节 | 第一个参数为章节`name`,第二个参数为是否激活，激活为`true`，关闭为`false` |

### Slots

| 名称                   | 说明                 |
| ---------------------- | -------------------- |
| header                 | 头部与标题自定义内容 |
| footer                 | 底部自定义内容       |
| ${section.name}Title   | 章节标题自定义内容   |
| ${section.name}Content | 章节自定义内容       |
