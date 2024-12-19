# Descriptions

用于详细描述某个事物

## Descriptions Usage

#### 1、详细描述某个事物

`re-descriptions`组件支持仅通过配置来实现对某个事物的详情展示

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
        { label: "生日", prop: "birthday", span: 1 },
        { label: "手机号", prop: "phone", span: 1 },
        { label: "邮箱", prop: "email", span: 1 },
        { label: "公司", prop: "company", span: 1 },
        { label: "地址", prop: "address", span: 2 },
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
      },
    };
  },
};
</script>
```

:::

## Descriptions API

### Attributes

| 参数             | 说明                     | 类型          | 可选值                      | 默认值       |
| ---------------- | ------------------------ | ------------- | --------------------------- | ------------ |
| items            | 描述列表项数组           | Array\<Item\> | -                           | `[]`         |
| data             | 描述列表数据对象         | String        | -                           | `{}`         |
| layout           | 描述列表的布局方式       | String        | `fixed`, `auto`             | `fixed`      |
| border           | 是否带有边框             | boolean       | -                           | `false`      |
| column           | 一行列表项的数量         | number        | -                           | `3`          |
| direction        | 排列的方向               | string        | `vertical` / `horizontal`   | `horizontal` |
| size             | 列表的尺寸               | string        | `medium` / `small` / `mini` | -            |
| title            | 标题文本，显示在左上方   | string        | -                           | -            |
| extra            | 操作区文本，显示在右上方 | string        | -                           | -            |
| colon            | 是否显示冒号             | boolean       | -                           | `true`       |
| labelClassName   | 自定义标签类名           | string        | -                           | -            |
| contentClassName | 自定义内容类名           | string        | -                           | -            |
| labelStyle       | 自定义标签样式           | object        | -                           | -            |
| contentStyle     | 自定义内容样式           | object        | -                           | -            |

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
| labelComponentProps    | 标签组件的 props             | Object | -      | -      |
| labelComponentEvents   | 标签组件的 events            | Object | -      | -      |
| contentComponent       | 内容组件                     | Object | -      | -      |
| contentComponentProps  | 内容组件的 props             | Object | -      | -      |
| contentComponentEvents | 内容组件的 events            | Object | -      | -      |
| dataInProps            | 内容组件所需数据的 prop 名称 | String | -      | -      |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| title   | 标题自定义内容     |
| extra   | 操作区自定义内容   |
| label   | 描述标签自定义内容 |
| content | 描述内容自定义内容 |
