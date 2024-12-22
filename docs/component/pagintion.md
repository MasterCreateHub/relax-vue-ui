# Pagintion

## Usage

### 基础用法

`re-pagination`组件的用法基本与`el-pagination`一致。

::: demo `re-pagination`可以通过设置`align`属性来设置分页组件的对齐方式。

```vue
<template>
  <div>
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24">
        <el-radio-group v-model="align" size="mini">
          <el-radio-button label="left">靠左</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">靠右</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <re-pagination :total="total" :align="align" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      align: "left",
      total: 100,
    };
  },
};
</script>
```

:::

### 处理分页事件

`re-pagination`将页码改变事件和页大小改变事件合并为`pagination`事件。
::: demo `re-pagination`可以通过设置`align`属性来设置分页组件的对齐方式。

```vue
<template>
  <re-pagination :total="total" @pagination="handlePagination" />
</template>

<script>
export default {
  data() {
    return {
      total: 100,
    };
  },
  methods: {
    handlePagination({ currentPage, pageSize, from }) {
      this.$message.success(
        `当前页码：${currentPage}，每页条数：${pageSize}，改变参数为：${from}`
      );
    },
  },
};
</script>
```

:::

## API

### Attributes

| 参数        | 说明           | 类型    | 可选值                    | 默认值                                 |
| ----------- | -------------- | ------- | ------------------------- | -------------------------------------- |
| layout      | 组件布局       | String  | -                         | `'total,sizes,prev,pager,next,jumper'` |
| background  | 使用背景色     | Boolean | -                         | `true`                                 |
| total       | 总条数，`必需` | Number  | -                         | -                                      |
| currentPage | 当前页码       | Number  | -                         | `1`                                    |
| pageSize    | 每页条数       | Number  | -                         | `20`                                   |
| pageSizes   | 每页条数选项   | Array   | -                         | `[10, 20, 30, 50]`                     |
| pagerCount  | 页码按钮       | Number  | -                         | `7`                                    |
| align       | 对齐方式       | String  | `left`, `center`, `right` | `'center'`                             |
| hidden      | 是否隐藏       | Boolean | -                         | `false`                                |

### Events

| 事件名     | 说明                       | 参数                            |
| ---------- | -------------------------- | ------------------------------- |
| pagination | 分页跳转、分页大小改变事件 | `{currentPage, pageSize, from}` |

::: tip
`pagination`事件的参数是一个对象，其中 currentPage 为当前页码，pageSize 为每页显示条数，from 为触发该事件来源，值为`currentPage`或`pageSize`。
:::

### Slots

| 名称    | 说明                    | 参数 |
| ------- | ----------------------- | ---- |
| default | `el-pagination`默认插槽 | -    |
