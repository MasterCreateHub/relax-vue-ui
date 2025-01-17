# Descriptions

用于详细描述某个事物。

## Descriptions Usage

### 基础用法

支持仅通过属性配置来实现对某个事物的详情展示。

:::demo

```vue
<template>
  <div>
    <re-descriptions
      style="width: 100%"
      :items="items"
      :data="personData"
      :column="3"
      :border="true"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { label: "姓名", prop: "name", span: 1 },
        { label: "年龄", prop: "age", span: 1 },
        { label: "性别", prop: "sex", span: 1 },
        {
          label: "生日",
          prop: "birthday",
          span: 1,
          contentComponent: "el-tag",
        },
        { label: "手机号", prop: "phone", span: 1 },
        {
          label: "邮箱",
          prop: "email",
          span: 1,
          labelComponent: "el-link",
          labelComponentProps: { type: "success" },
          labelComponentEvents: {
            click: this.handleEmailLabelClick,
          },
          contentComponent: "el-tag",
        },
        { label: "公司", prop: "company", span: 1 },
        { label: "地址", prop: "address", span: 2 },
        {
          label: "个人网站",
          prop: "website",
          span: 3,
          contentComponent: "el-link",
          contentComponentProps: { type: "success" },
          contentComponentEvents: {
            click: (item, data, event) => {
              console.log("测试参数", item, data, event);
              this.$message.success("想看王小明的个人网站？" + data[item.prop]);
            },
          },
        },
      ],
      personData: {
        name: "王小明",
        age: 18,
        sex: "男",
        birthday: "1999-01-01",
        phone: "12345678901",
        email: "12345678901@qq.com",
        company: "腾讯",
        address: "北京市海淀区",
        website: "https://www.wxm.com",
      },
    };
  },
  methods: {
    handleEmailLabelClick() {
      this.$message.success("邮箱都不知道是啥嘛？啊喂");
    },
  },
};
</script>
```

:::

### 自定义标签和内容

每个列表项的标签和内容都可以自定义。

:::demo 要对多个列表项的标签或者内容自定义时，请使用连续的`v-if`和`v-else-if`来实现。

```vue
<template>
  <div>
    <re-descriptions
      style="width: 100%"
      :items="items"
      :data="personData"
      :column="3"
      :border="true"
    >
      <template #label="{ item }">
        <span>{{ item.label + ":" }}</span>
      </template>
      <template #content="{ item, data }">
        <el-tag v-if="item.prop === 'sex'">{{ data[item.prop] }}</el-tag>
        <el-link v-else-if="item.prop === 'website'" type="success">{{
          data[item.prop]
        }}</el-link>
      </template>
    </re-descriptions>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { label: "姓名", prop: "name", span: 1 },
        { label: "年龄", prop: "age", span: 1 },
        { label: "性别", prop: "sex", span: 1 },
        { label: "生日", prop: "birthday", span: 1 },
        { label: "手机号", prop: "phone", span: 1 },
        { label: "邮箱", prop: "email", span: 1 },
        { label: "公司", prop: "company", span: 1 },
        { label: "地址", prop: "address", span: 2 },
        { label: "个人网站", prop: "website", span: 3 },
      ],
      personData: {
        name: "王小明",
        age: 18,
        sex: "男",
        birthday: "1999-01-01",
        phone: "12345678901",
        email: "12345678901@qq.com",
        company: "腾讯",
        address: "北京市海淀区",
        website: "https://www.wxm.com",
      },
    };
  },
};
</script>
```

:::

### 与`re-converter`结合使用

`re-converter`可以很方便的将后端返回的数据进行转换，从而实现对`re-descriptions`组件的描述。

:::demo

```vue
<template>
  <div>
    <re-descriptions
      style="width: 100%"
      :items="items"
      :data="personData"
      :column="3"
      :border="true"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { label: "姓名", prop: "name", span: 1 },
        {
          label: "年龄",
          prop: "age",
          span: 1,
          contentComponent: "re-converter",
          contentComponentProps: {
            source: "$targetValue  + '岁'",
          },
          dataInProps: "target",
        },
        {
          label: "性别",
          prop: "sex",
          span: 1,
          contentComponent: "re-converter",
          contentComponentProps: {
            source: [
              { label: "男", value: "1" },
              { label: "女", value: "2" },
            ],
            container: "el-tag",
          },
          dataInProps: "target",
        },
        { label: "生日", prop: "birthday", span: 1 },
        { label: "手机号", prop: "phone", span: 1 },
        { label: "邮箱", prop: "email", span: 1 },
        { label: "公司", prop: "company", span: 1 },
        { label: "地址", prop: "address", span: 2 },
        {
          label: "个人网站",
          prop: "website",
          span: 3,
          contentComponent: "el-link",
          contentComponentProps: { type: "success" },
          contentComponentEvents: {
            click: () => {
              this.$message.success("想看王小明的个人网站？");
            },
          },
        },
      ],
      personData: {
        name: "王小明",
        age: 18,
        sex: "1",
        birthday: "1999-01-01",
        phone: "12345678901",
        email: "12345678901@qq.com",
        company: "腾讯",
        address: "北京市海淀区",
        website: "https://www.wxm.com",
      },
    };
  },
};
</script>
```

:::

## Descriptions API

### Attributes

| 参数             | 说明                     | 类型          | 可选值                    | 默认值       |
| ---------------- | ------------------------ | ------------- | ------------------------- | ------------ |
| items            | 描述列表项数组           | Array\<Item\> | -                         | `[]`         |
| data             | 描述列表数据对象         | String        | -                         | `{}`         |
| layout           | 描述列表的布局方式       | String        | `fixed`, `auto`           | `fixed`      |
| border           | 是否带有边框             | Boolean       | -                         | `false`      |
| column           | 一行列表项的数量         | Number        | -                         | `3`          |
| direction        | 排列的方向               | String        | `vertical`, `horizontal`  | `horizontal` |
| size             | 列表的尺寸               | String        | `medium`, `small`, `mini` | -            |
| title            | 标题文本，显示在左上方   | String        | -                         | -            |
| extra            | 操作区文本，显示在右上方 | String        | -                         | -            |
| colon            | 是否显示冒号             | Boolean       | -                         | `true`       |
| labelClassName   | 自定义标签类名           | String        | -                         | -            |
| contentClassName | 自定义内容类名           | String        | -                         | -            |
| labelStyle       | 自定义标签样式           | Object        | -                         | -            |
| contentStyle     | 自定义内容样式           | Object        | -                         | -            |

#### Item 对象结构

| 属性                   | 说明                         | 类型   | 可选值 | 默认值 |
| ---------------------- | ---------------------------- | ------ | ------ | ------ |
| prop                   | 字段标识                     | String | -      | -      |
| label                  | 标签文本                     | String | -      | -      |
| span                   | 所占列数                     | Number | -      | -      |
| labelClassName         | 标签类名                     | String | -      | -      |
| contentClassName       | 内容类名                     | String | -      | -      |
| labelStyle             | 标签样式                     | Object | -      | -      |
| contentStyle           | 内容样式                     | Object | -      | -      |
| labelComponent         | 标签组件                     | String | -      | -      |
| labelComponentProps    | 标签组件的`props `           | Object | -      | -      |
| labelComponentEvents   | 标签组件的`events`           | Object | -      | -      |
| contentComponent       | 内容组件                     | Object | -      | -      |
| contentComponentProps  | 内容组件的`props`            | Object | -      | -      |
| contentComponentEvents | 内容组件的`events`           | Object | -      | -      |
| dataInProps            | 内容组件所需数据的`prop`名称 | String | -      | `data` |

### Slots

| 名称    | 说明               | 参数           |
| ------- | ------------------ | -------------- |
| title   | 标题自定义内容     | -              |
| extra   | 操作区自定义内容   | -              |
| label   | 描述标签自定义内容 | `{item, data}` |
| content | 描述内容自定义内容 | `{item, data}` |
