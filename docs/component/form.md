# Form

## Usage

### 基础用法

### 自定义表单项

## API

### Attributes

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

| 属性   | 类型   | 描述               | 默认值 |
| ------ | ------ | ------------------ | ------ |
| model  | String | 表单项绑定的`mode` | -      |
| props  | Object | 表单项组件 props   | `{}`   |
| events | Object | 表单项组件事件     | `{}`   |

### Events

### Methods

### Slots
