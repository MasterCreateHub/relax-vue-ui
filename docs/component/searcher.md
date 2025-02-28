# Searcher

搜索栏，用于列表搜索。

## Searcher Usage

### 基础用法

适用于大部分列表搜索场景。

::: demo 如果不为搜索条件配置`component`，则默认渲染为`el-input`。

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
          model: "name",
        },
        {
          label: "年龄",
          model: "age",
        },
        {
          label: "电话",
          model: "tel",
        },
        {
          label: "邮箱",
          model: "email",
        },
        {
          label: "爱好",
          model: "happy",
        },
        {
          label: "描述",
          model: "desc",
        },
        {
          label: "评级",
          model: "level",
          component: "config-select",
          props: {
            placeholder: "",
            clearable: false,
            options: [
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
            ],
          },
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

### 搜索条件布局

支持`flex`布局和`grid`布局，默认使用`flex`布局。

::: demo 1、`flex`布局采用`el-row`和`el-col`组合实现，`flex`布局只能实现 1 列，2 列、3 列、4 列、6 列、8 列布局。</br>2、`grid`布局没有布局列数的限制，其布局列数只取决于搜索栏宽度和搜索条件最小宽度。</br>3、`flex`和`grid`两种布局都是自适应的，如果目标浏览器支持`grid`布局，推荐使用`grid`布局。

```vue
<template>
  <el-row style="margin-bottom: 10px;"><el-tag>flex 布局</el-tag></el-row>
  <re-searcher :factors="seacherFactors" @search="handleSearch" />
  <el-row style="margin: 10px 0px;"><el-tag>grid 布局</el-tag></el-row>
  <re-searcher :factors="seacherFactors" layout="grid" @search="handleSearch" />
</template>

<script>
export default {
  data() {
    return {
      seacherFactors: [
        {
          label: "姓名",
          model: "name",
        },
        {
          label: "年龄",
          model: "age",
        },
        {
          label: "电话",
          model: "tel",
        },
        {
          label: "邮箱",
          model: "email",
        },
        {
          label: "爱好",
          model: "happy",
        },
        {
          label: "描述",
          model: "desc",
        },
        {
          label: "评级",
          model: "level",
          component: "el-select",
          props: {
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

### 标签对齐方式

搜索条件标签默认对齐方式为两端对齐。

::: demo 设置`labelPosition`属性可改变标签对齐方式，对齐方式支持`left`、`right`、`justify`三种，默认为两端对齐，即`justify`。

```vue
<template>
  <div style="margin-bottom: 10px;">
    对齐方式：
    <el-radio-group v-model="labelPosition" size="mini">
      <el-radio-button label="justify">两端对齐</el-radio-button>
      <el-radio-button label="left">靠左对齐</el-radio-button>
      <el-radio-button label="right">靠右对齐</el-radio-button>
    </el-radio-group>
  </div>
  <re-searcher
    :factors="seacherFactors"
    :label-position="labelPosition"
    @search="handleSearch"
  />
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "justify",
      seacherFactors: [
        {
          label: "姓名",
          model: "name",
        },
        {
          label: "年龄",
          model: "age",
        },
        {
          label: "电话",
          model: "tel",
        },
        {
          label: "邮箱",
          model: "email",
        },
        {
          label: "爱好",
          model: "happy",
        },
        {
          label: "描述",
          model: "desc",
        },
        {
          label: "评级",
          model: "level",
          component: "el-select",
          props: {
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

每当搜索条件发生变化时，自动触发防抖搜索。

::: demo 启用自动搜索时若不绑定`model`属性，组件内部初始化时会自动发起一次搜索。

```vue
<template>
  <re-searcher
    :model="form"
    :factors="seacherFactors"
    @search="handleSearch"
    autoSearch
  />
</template>

<script>
export default {
  data() {
    return {
      form: { name: null, tel: null, level: null },
      seacherFactors: [
        {
          label: "姓名",
          model: "name",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "电话",
          model: "tel",
          component: "el-input",
          valueType: "string",
        },
        {
          label: "评级",
          model: "level",
          component: "el-select",
          valueType: "string",
          props: {
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

每个搜索条件都可以自定义内容。

::: demo

```vue
<template>
  <re-searcher :model="form" :factors="seacherFactors" @search="handleSearch">
    <template #name>
      <el-input
        v-model="form.name"
        placeholder="请输入名称"
        clearable
        style="width: 100%"
      />
    </template>
    <template #category>
      <el-select
        v-model="form.category"
        placeholder="请选择分类"
        clearable
        style="width: 100%"
      >
        <el-option label="科幻" :value="0" />
        <el-option label="玄幻" :value="1" />
        <el-option label="奇幻" :value="2" />
      </el-select>
    </template>
    <template #status>
      <el-select
        v-model="form.status"
        placeholder="请选择状态"
        clearable
        style="width: 100%"
      >
        <el-option label="已借出" :value="0" />
        <el-option label="在书架" :value="1" />
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
        category: null,
        status: null,
      },
      seacherFactors: [
        {
          label: "名称",
          model: "name",
        },
        {
          label: "分类",
          model: "category",
        },
        {
          label: "状态",
          model: "status",
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

## Searcher API

### Attributes

| 参数           | 说明                 | 类型            | 可选值                   | 默认值    |
| -------------- | -------------------- | --------------- | ------------------------ | --------- |
| factors        | 搜索条件数组         | Array           | -                        | `[]`      |
| model          | 搜索表单数据对象     | Object          | -                        | `{}`      |
| layout         | 搜索表单布局         | String          | `flex`,`grid`            | `flex`    |
| size           | 搜索表单尺寸         | String          | `small`,`mini`           | `small`   |
| labelWidth     | 搜索表单项标签宽度   | String          | -                        | `60px`    |
| labelPosition  | 搜索表单项标签位置   | String          | `left`,`right`,`justify` | `justify` |
| defaultExpand  | 是否默认展开所有条件 | Boolean         | -                        | `false`   |
| factorSpacing  | 搜索条件左右间距     | Number          | -                        | `20`      |
| autoSearch     | 是否启用自动搜索     | Boolean, Number | -                        | `false`   |
| searchText     | 搜索按钮文字         | String          | -                        | `搜索`    |
| resetText      | 重置按钮文字         | String          | -                        | `重置`    |
| expandText     | 展开按钮文字         | String          | -                        | `展开`    |
| collapseText   | 收起按钮文字         | String          | -                        | `收起`    |
| actionPosition | 操作按钮位置         | String          | `left`,`right`           | `right`   |

#### Factor 对象结构

| 参数      | 说明                     | 类型   | 可选值                                       | 默认值     |
| --------- | ------------------------ | ------ | -------------------------------------------- | ---------- |
| label     | 搜索条件标签名称         | String | -                                            | -          |
| model     | 搜索条件双向绑定的属性名 | String | -                                            | -          |
| component | 搜索条件组件名称         | String | -                                            | `el-input` |
| props     | 搜索条件组件的配置项     | Object | -                                            | `{}`       |
| events    | 搜索条件组件的事件绑定   | Object | -                                            | `{}`       |
| valueType | 搜索条件组件绑定值的类型 | String | `string`,`number`,`boolean`,`array`,`object` | -          |

### Events

| 事件名称 | 说明                    | 回调参数   |
| -------- | ----------------------- | ---------- |
| search   | 点击搜索按钮时触发      | `formData` |
| change   | 筛选条件发生变化时触发  | `formData` |
| reset    | 点击重置按钮时触发      | `formData` |
| toggle   | 点击展开/收起按钮时触发 | `expanded` |

### Slots

| 名称           | 说明                       | 参数             |
| -------------- | -------------------------- | ---------------- |
| ${factor.name} | 单个搜索条件区域自定义内容 | `{form, factor}` |
| ${action}      | 按钮区域自定义内容         | `{form}`         |
