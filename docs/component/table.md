# Table

## Usage

### 基础示例

::: demo

```vue

```

:::

## API

### Attributes

| 参数             | 说明                             | 类型            | 可选值 | 默认值  |
| ---------------- | -------------------------------- | --------------- | ------ | ------- |
| data             | 表格数据                         | Array           | -      | `[]`    |
| columns          | 表格列配置                       | Array\<Column\> | -      | `[]`    |
| toolbar          | 是否显示工具栏                   | Boolean         | -      | `false` |
| toolbarConfig    | 工具栏配置                       | Array\<Tool\>   | -      | `[]`    |
| pagination       | 是否显示分页器                   | Boolean         | -      | `false` |
| paginationConfig | 分页器配置                       | Object          | -      | `{...}` |
| 其他属性         | 表格其他属性，请参考`element-ui` | Any             | -      | -       |

::: tip 表格分页器默认配置

```javascript
{
    align: "center",
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    pageSizes: [10, 20, 30, 50],
    currentPage: 1,
    pageSize: 10,
    pagerCount: 7
}
```

:::

#### Column 对象结构

| 属性                | 说明                                   | 类型   | 可选值                         | 默认值 |
| ------------------- | -------------------------------------- | ------ | ------------------------------ | ------ |
| type                | 表格列类型                             | String | `selection`, `index`, `expand` | -      |
| prop                | 表格列属性                             | String | -                              | -      |
| label               | 表格列标签                             | String | -                              | -      |
| width               | 表格列宽度                             | String | -                              | -      |
| minWidth            | 表格列最小宽度                         | String | -                              | -      |
| align               | 表格列对齐方式                         | String | -                              | -      |
| fixed               | 表格列固定方式                         | String | -                              | -      |
| showOverflowTooltip | 表格列是否显示 tooltip                 | String | -                              | -      |
| className           | 表格列样式类名                         | String | -                              | -      |
| 其他属性            | 表格列其他属性，请参考`element-ui`文档 | Any    | -                              | -      |

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

| 事件名        | 说明                                                        | 参数 |
| ------------- | ----------------------------------------------------------- | ---- |
| el-table 事件 | `el-table`原本的事件，请参考`element-ui`文档                | -    |
| ${tool.name}  | 当工具栏的工具使用默认的`el-button`时，点击按钮会触发该事件 | -    |

### Methods

| 方法名        | 说明                                             | 参数 |
| ------------- | ------------------------------------------------ | ---- |
| tableFunction | `el-table`原本提供的方法，请参考`element-ui`文档 | -    |

### Slots

| 名称                  | 说明                         |
| --------------------- | ---------------------------- |
| toolbar               | 工具栏完全自定义内容         |
| ${tool.name}          | 单个工具自定义内容           |
| header                | 表头自定义内容               |
| body                  | 表格主体自定义内容           |
| ${column.prop}Label   | 表格列表头自定义内容         |
| ${column.prop}Content | 表格列内容自定义内容         |
| default               | 表格默认插槽                 |
| append                | 插入至表格最后一行之后的内容 |
| pagination            | 分页器完全自定义内容         |
