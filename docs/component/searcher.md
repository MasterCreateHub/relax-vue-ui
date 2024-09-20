# Searcher

搜索栏，用于列表搜索

## Searcher Usage

::: demo `factors` 配置项是必须要有的
```html
<demo-searcher-BaseDemo></demo-searcher-BaseDemo>
```
:::

## Searcher API

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
