# Descriptions

用于详细描述某个事物

## Descriptions Usage

## Descriptions API

### Attributes

| 参数   | 说明               | 类型   | 可选值          | 默认值  |
| ------ | ------------------ | ------ | --------------- | ------- |
| data   | 描述列表数据       | Array  | -               | `[]`    |
| layout | 描述列表的布局方式 | String | `fixed`, `auto` | `fixed` |

#### data 数组结构

| 属性             | 说明     | 类型                        | 可选值 | 默认值 |
| ---------------- | -------- | --------------------------- | ------ | ------ |
| prop             | 字段标识 | String                      | -      | -      |
| label            | 标签文本 | String                      | -      | -      |
| value            | 值       | String,Number,Boolean,Array | -      | -      |
| span             | 所占列数 | Number                      | -      | `1`    |
| labelClassName   | 标签类名 | String                      | -      | -      |
| contentClassName | 内容类名 | String                      | -      | -      |
| labelStyle       | 标签样式 | Object                      | -      | -      |
| contentStyle     | 内容样式 | Object                      | -      | -      |

### Events

### Methods

### Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| title   | 标题自定义内容         |
| extra   | 操作区自定义内容       |
| label   | 每项描述标签自定义内容 |
| default | 每项描述内容自定义内容 |
