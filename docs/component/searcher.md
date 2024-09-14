# Searcher

## Searcher Description

搜索栏，用于列表搜索

## Seacher Usage

::: demo

```html
<template>
  <re-searcher
    :default-expand="false"
    label-position="justify"
    :factors="seacherFactors"
    @search="handleSearch"
  />
</template>

<script>
  export default {
    data() {
      return {
        seacherFactors: [
          {
            label: "姓名",
            prop: "name",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "年龄",
            prop: "age",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "电话",
            prop: "tel",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "邮箱",
            prop: "email",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "爱好",
            prop: "happy",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "描述",
            prop: "desc",
            type: "el-input",
            valueType: "string",
          },
          {
            label: "等级",
            prop: "level",
            type: "el-select",
            valueType: "string",
            config: {
              placeholder: "",
              clearable: false,
            },
            options: [
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
            ],
          },
        ],
      };
    },
    methods: {
      handleSearch(val) {
        console.log(val);
      },
    },
  };
</script>
```

:::

## Seacher API

### Attributes

| 参数          | 说明                  | 类型    | 可选值                     | 默认值                                  |
| ------------- | --------------------- | ------- | -------------------------- | --------------------------------------- |
| formModel     | 搜索表单数据对象      | Object  | -                          | `{}`                                    |
| formConfig    | 搜索表单配置          | Object  | -                          | `{ size: "small", labelWidth: "60px" }` |
| labelPosition | 搜索表单项 label 位置 | String  | `left`, `right`, `justify` | `right`                                 |
| defaultExpand | 是否默认展开          | Boolean | -                          | `false`                                 |
| factorSpacing | 每个条件的左右间距    | Number  | -                          | `20`                                    |
| factors       | 搜索条件数组          | Array   | -                          | `[]`                                    |
| searchText    | 搜索按钮文字          | String  | -                          | `搜索`                                  |
| resetText     | 重置按钮文字          | String  | -                          | `重置`                                  |
| expandText    | 展开按钮文字          | String  | -                          | `展开`                                  |
| collapseText  | 收起按钮文字          | String  | -                          | `收起`                                  |

### Events

| 事件名称 | 说明                    | 回调参数             |
| -------- | ----------------------- | -------------------- |
| search   | 点击搜索按钮时触发      | `function(formData)` |
| change   | 筛选条件发生变化时触发  | `function(formData)` |
| reset    | 点击重置按钮时触发      | `function(formData)` |
| toggle   | 点击展开/收起按钮时触发 | `function(expanded)` |

### Slots

| 名称        | 说明                       |
| ----------- | -------------------------- |
| factor.name | 单个搜索条件区域自定义内容 |
| action      | 按钮区域自定义内容         |
