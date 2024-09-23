# Toolbar

工具栏，将常用操作聚集到一起，以便于用户使用

## Usage

## Toolbar API

### Attributes

| 参数   | 说明         | 类型    | 可选值 | 默认值  |
| ------ | ------------ | ------- | ------ | ------- |
| shadow | 是否显示阴影 | Boolean | -      | `false` |
| tools  | 工具数组     | Array   | -      | `[]`    |

#### tools 数组结构

| 属性     | 说明                   | 类型    | 可选值         | 默认值  |
| -------- | ---------------------- | ------- | -------------- | ------- |
| name     | 工具标识，用于触发事件 | String  | -              | -       |
| label    | 工具名称               | String  | -              | -       |
| config   | 工具配置               | Object  | -              | -       |
| useTip   | 使用提示               | Boolean | -              | `true`  |
| tooltip  | 提示内容               | String  | -              | `label` |
| position | 所在位置               | String  | `left`,`right` | `left`  |

### Events

| 事件名称  | 说明               | 回调参数 |
| --------- | ------------------ | -------- |
| tool.name | 点击工具按钮时触发 | -        |

### Slots

| 名称      | 说明                   |
| --------- | ---------------------- |
| tool.name | 单个工具区域自定义内容 |
