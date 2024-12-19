# Pagintion

## Usage

## API

### Attributes

| 参数        | 说明           | 类型    | 可选值                    | 默认值                                 |
| ----------- | -------------- | ------- | ------------------------- | -------------------------------------- |
| layout      | 组件布局       | String  | -                         | `'total,sizes,prev,pager,next,jumper'` |
| background  | 是否使用背景色 | Boolean | -                         | `true`                                 |
| total       | 总条数         | Number  | -                         | -                                      |
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

| 名称    | 说明                    |
| ------- | ----------------------- |
| default | `el-pagination`默认插槽 |
