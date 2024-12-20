# Toolbar

工具栏，将常用操作聚集到一起，以便于用户使用

## Usage

#### 1、基本用法

::: demo

```vue
<template>
  <re-toolbar
    :tools="tools"
    :shadow="true"
    @add="handleAdd"
    @delete="handleDelete"
    @refresh="handleRefresh"
  />
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          name: "add",
          label: "新增",
          position: "left",
          props: {
            type: "primary",
            icon: "el-icon-plus",
            plain: true,
          },
        },
        {
          name: "delete",
          label: "删除",
          position: "left",
          props: {
            type: "danger",
            icon: "el-icon-delete",
            plain: true,
          },
        },
        {
          name: "refresh",
          label: "刷新",
          useTip: true,
          position: "right",
          props: {
            icon: "el-icon-refresh",
            circle: true,
            plain: true,
          },
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$message.success("点击了添加");
    },
    handleDelete() {
      this.$message.success("点击了删除");
    },
    handleRefresh() {
      this.$message.success("点击了刷新");
    },
  },
};
</script>
```

:::

## Toolbar API

### Attributes

| 参数   | 说明         | 类型            | 可选值 | 默认值  |
| ------ | ------------ | --------------- | ------ | ------- |
| shadow | 是否显示阴影 | Boolean         | -      | `false` |
| tools  | 工具数组     | Array\<Column\> | -      | `[]`    |

#### Tool 对象结构

| 属性      | 说明                     | 类型    | 可选值          | 默认值      |
| --------- | ------------------------ | ------- | --------------- | ----------- |
| name      | 工具名称，工具的标识     | String  | -               | -           |
| label     | 工具标签名称             | String  | -               | -           |
| useTip    | 是否使用提示             | Boolean | -               | -           |
| tooltip   | 提示内容，默认为工具标签 | String  | -               | -           |
| position  | 工具位置                 | String  | `left`, `right` | -           |
| component | 工具组件                 | String  | -               | `el-button` |
| props     | 工具组件配置             | Object  | -               | -           |
| events    | 工具绑定的事件           | Object  | -               | -           |

### Events

| 事件名称     | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| ${tool.name} | 点击工具按钮时触发 | -        |

### Slots

| 名称         | 说明                   |
| ------------ | ---------------------- |
| ${tool.name} | 单个工具区域自定义内容 |
