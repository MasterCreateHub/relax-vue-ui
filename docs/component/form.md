# Form

## Usage

### 基础用法

支持仅通过配置就渲染表单

::: demo 
```vue
<template>
```
:::

### 自定义表单项

## API

### Attributes

| 参数             | 说明                           | 类型              | 可选值 | 默认值  |
| ---------------- | ------------------------------ | ----------------- | ------ | ------- |
| formModel        | 表单数据对象                   | Object            | -      | `{}`    |
| readonly         | 表单是否为只读                 | Boolean           | -      | `false` |
| disabled         | 表单是否为禁用                 | Boolean           | -      | `false` |
| formItems        | 表单项配置                     | Array\<FormItem\> | -      | `[]`    |
| formSections     | 表单分组配置                   | Array\<Object\>   | -      | `[]`    |
| formSteps        | 表单分步配置                   | Array\<Object\>   | -      | `[]`    |
| autoScrollError  | 是否自动滚动到第一个错误表单项 | Boolean           | -      | `true`  |
| hideRequiredMark | 是否隐藏必填记号               | Boolean           | -      | `false` |
| rules            | 表单校验配置                   | Object            | -      | `{}`    |
| changes          | 表单数据联动配置               | Array             | -      | `[]`    |
| baseConfig       | 表单基础配置                   | Object            | -      | `{}`    |

#### FormItem 对象结构

| 属性         | 类型               | 描述                | 默认值       |
| ------------ | ------------------ | ------------------- | ------------ |
| label        | String             | 表单项标签          | -            |
| model        | String             | 表单项绑定的`model` | -            |
| required     | Boolean            | 表单项是否必填      | `false`      |
| readonly     | Boolean            | 表单项是否只读      | `false`      |
| disabled     | Boolean            | 表单项是否禁用      | `false`      |
| hidden       | Boolean            | 表单项是否隐藏      | `false`      |
| initialValue | String             | 表单项初始值        | `null`或`[]` |
| dynamic      | Boolean            | 是否为动态项        | `false`      |
| rules        | Array\<Rule\>      | 表单想校验规则      | `[]`         |
| changes      | Array\<change\>    | 表单项值联动配置    | `[]`         |
| components   | Array\<Component\> | 表单项组件配置数组  | `[]`         |

#### Change 对象结构

| 属性   | 类型   | 描述   | 默认值 |
| ------ | ------ | ------ | ------ |
| target | String | 目标项 | -      |
| value  | Any    | 传递值 | -      |

#### Component 对象结构

| 属性   | 类型   | 描述                | 默认值 |
| ------ | ------ | ------------------- | ------ |
| model  | String | 表单项绑定的`model` | -      |
| props  | Object | 表单项组件 props    | `{}`   |
| events | Object | 表单项组件事件      | `{}`   |

### Events

### Methods

| 事件名   | 说明     | 参数   |
| -------- | -------- | ------ |
| validate | 表单校验 | result |

### Slots

| 名称             | 说明       | 参数   |
| ---------------- | ---------- | ------ |
| ${formItem.name} | 表单项插槽 | {item} |
