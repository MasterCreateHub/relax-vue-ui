# Searcher

搜索栏，用于列表搜索

## Searcher Usage

### 基础用法

::: demo

```vue
<template>
  <re-searcher :factors="seacherFactors" @search="handleSearch" />
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
      this.$message.success(`搜索条件参数为：${JSON.stringify(val)}`);
    },
  },
};
</script>
```

:::

### 启用自动搜索

::: demo

```vue
<template>
  <re-searcher :factors="seacherFactors" @search="handleSearch" autoSearch />
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
          label: "电话",
          prop: "tel",
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
      this.$message.success(`搜索条件参数为：${JSON.stringify(val)}`);
    },
  },
};
</script>
```

:::

### 自定义搜索条件

::: demo

```vue
<template>
  <re-searcher :factors="seacherFactors" @search="handleSearch">
    <template #level>
      <el-select v-model="form.level" placeholder="请选择" clearable style="width: 100%">
        <el-option label="A" :value="0" />
        <el-option label="B" :value="1" />
        <el-option label="C" :value="2" />
      </el-select>
    </template>
  </re-searcher>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        tel: null,
        level: null,
      },
      seacherFactors: [
        {
          label: "姓名",
          prop: "name",
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
          label: "等级",
          prop: "level",
          type: "el-select",
          valueType: "string",
        },
      ],
    };
  },
  methods: {
    handleSearch(val) {
      this.$message.success(`搜索条件参数为：${JSON.stringify(val)}`);
    },
  },
};
</script>
```

:::

### 自动搜索

## Searcher API

### Attributes

| 参数           | 说明                 | 类型            | 可选值                     | 默认值    |
| -------------- | -------------------- | --------------- | -------------------------- | --------- |
| factors        | 搜索条件数组         | Array           | -                          | `[]`      |
| model          | 搜索表单数据对象     | Object          | -                          | `{}`      |
| layout         | 搜索表单布局         | String          | `flex`, `grid`             | `flex`    |
| size           | 搜索表单尺寸         | String          | `small`, `mini`            | `small`   |
| labelWidth     | 搜索表单项标签宽度   | String          | -                          | `60px`    |
| labelPosition  | 搜索表单项标签位置   | String          | `left`, `right`, `justify` | `justify` |
| defaultExpand  | 是否默认展开所有条件 | Boolean         | -                          | `false`   |
| factorSpacing  | 搜索条件左右间距     | Number          | -                          | `20`      |
| autoSearch     | 是否启用自动搜索     | Boolean, Number | -                          | `false`   |
| searchText     | 搜索按钮文字         | String          | -                          | `搜索`    |
| resetText      | 重置按钮文字         | String          | -                          | `重置`    |
| expandText     | 展开按钮文字         | String          | -                          | `展开`    |
| collapseText   | 收起按钮文字         | String          | -                          | `收起`    |
| actionPosition | 操作按钮位置         | String          | `left`, `right`            | `right`   |

### Events

| 事件名称 | 说明                    | 回调参数   |
| -------- | ----------------------- | ---------- |
| search   | 点击搜索按钮时触发      | `formData` |
| change   | 筛选条件发生变化时触发  | `formData` |
| reset    | 点击重置按钮时触发      | `formData` |
| toggle   | 点击展开/收起按钮时触发 | `expanded` |

### Slots

| 名称           | 说明                       | 参数          |
| -------------- | -------------------------- | ------------- |
| ${factor.name} | 单个搜索条件区域自定义内容 | {form,factor} |
| ${action}      | 按钮区域自定义内容         | {form}        |
