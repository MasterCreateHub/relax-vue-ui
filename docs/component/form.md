# Form

## Usage

### 基础用法

支持仅通过配置就渲染表单

::: demo

```vue
<template>
  <div style="width: 600px; margin: auto;">
    <re-form
      ref="form"
      label-width="80px"
      :items="items"
      :model="model"
      :rules="rules"
    />
    <div class="form-view-footer">
      <el-button type="primary" @click="handleSubmit" size="small"
        >提交</el-button
      >
      <el-button type="primary" @click="handleReset" size="small"
        >重置</el-button
      >
      <el-button type="primary" @click="handleClear" size="small"
        >清除</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "姓名",
          model: "name",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入姓名",
            clearable: true,
          },
        },
        {
          label: "性别",
          model: "gender",
          component: "config-select",
          initialValue: null,
          span: 24,
          props: {
            options: [
              { label: "男", value: "1" },
              { label: "女", value: "0" },
            ],
          },
        },
        {
          label: "年龄",
          model: "age",
          component: "el-input-number",
          initialValue: undefined,
          span: 24,
          props: {
            placeholder: "请输入年龄",
            controls: false,
            min: 0,
            max: 120,
          },
        },
        {
          label: "邮箱",
          model: "email",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入邮箱",
            clearable: true,
            type: "email",
          },
        },
        {
          label: "电话",
          model: "phone",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入电话",
            clearable: true,
          },
        },
        {
          label: "地址",
          model: "address",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入地址",
            clearable: true,
            type: "textarea",
          },
        },
      ],
      model: {
        name: null,
        gender: null,
        age: undefined,
        email: null,
        phone: null,
        address: null,
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
        valid
          ? this.$message.success(
              `校验成功， 表单信息为${JSON.stringify(this.model)}`
            )
          : this.$message.error("校验失败");
      });
    },
    handleReset() {
      this.$refs["form"].reset();
    },
    handleClear() {
      this.$refs["form"].clearValidate();
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

:::

### 表单项配置联动

支持通过配置实现表单项之间的配置联动。举例如下：

- 表单项`A`等于某值时，表单项`B`才显示

::: demo

```vue
<template>
  <div style="width: 600px; margin: auto;">
    <re-form ref="form" label-width="100px" :items="items" :model="model" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "合格状态",
          model: "qualified",
          component: "config-select",
          initialValue: null,
          span: 24,
          props: {
            clearable: true,
            options: [
              { label: "合格", value: "1" },
              { label: "不合格", value: "0" },
            ],
          },
        },
        {
          label: "不合格原因",
          model: "reason",
          component: "el-input",
          initialValue: null,
          span: 24,
          hidden: "{{!($currentValues.qualified === '0')}}",
          props: {
            placeholder: "请输入不合格原因",
            clearable: true,
            type: "textarea",
          },
        },
      ],
      model: {
        qualified: null,
        reason: null,
      },
    };
  },
};
</script>
```

:::

- 表单项`A`的值`>0`时，表单项`B`才可填写

::: demo

```vue
<template>
  <div style="width: 600px; margin: auto;">
    <re-form ref="form" label-width="80px" :items="items" :model="model" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "分数",
          model: "grades",
          component: "el-input-number",
          initialValue: null,
          span: 24,
          props: {
            clearable: true,
            min: 0,
            max: 100,
          },
        },
        {
          label: "评语",
          model: "comment",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            disabled: "{{!($currentValues.grades > 0)}}",
            clearable: true,
            type: "textarea",
          },
        },
      ],
      model: {
        grades: null,
        component: null,
      },
    };
  },
};
</script>
```

:::

### 表单项值联动

支持通过配置实现表单项的值联动。举例如下：

- 表单项`A`的值填入时，其余表单项自动填入相关数据

::: demo

```vue
<template>
  <div style="width: 600px; margin: auto;">
    <re-form ref="form" label-width="80px" :items="items" :model="model" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "商品名称",
          model: "goods",
          component: "config-select",
          initialValue: null,
          span: 24,
          props: {
            clearable: true,
            options: [
              { label: "华为三折叠", value: "1", price: 39000, brand: "华为" },
              { label: "苹果1888", value: "2", price: 9999, brand: "苹果" },
            ],
          },
          changes: [
            {
              target: "price",
              value: "{{$select.price ? $select.price : $initialValues.price}}",
            },
            {
              target: "brand",
              value: "{{$select.brand ? $select.brand : $initialValues.brand}}",
            },
          ],
        },
        {
          label: "商品价格",
          model: "price",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            readonly: true,
            placeholder: "根据商品自动填充价格",
          },
        },
        {
          label: "商品品牌",
          model: "brand",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            readonly: true,
            placeholder: "根据商品自动填充品牌",
          },
        },
      ],
      model: {
        goods: null,
        price: null,
        brand: null,
      },
    };
  },
};
</script>
```

:::

- 表单项`A`值重置时，其余相关表单项自动重置

::: demo

```vue
<template>
  <div style="width: 600px; margin: auto;">
    <re-form ref="form" label-width="80px" :items="items" :model="model"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "病症名称",
          model: "issue",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            clearable: true,
          },
          changes: [
            {
              target: "description",
              value: "{{ null }}",
              condition: "{{!$value}}",
            },
          ],
        },
        {
          label: "病情描述",
          model: "description",
          component: "el-input",
          initialValue: null,
          span: 24,
          props: {
            disabled: "{{!$currentValues.issue}}",
            clearable: true,
            type: "textarea",
          },
        },
      ],
      model: {
        issue: "上班特别难受证",
        description: "一上班就不能感觉呼吸，症状严重，工作无法完成。",
      },
    };
  },
};
</script>
```

:::

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

| 属性         | 类型            | 描述                | 可选值              | 默认值     |
| ------------ | --------------- | ------------------- | ------------------- | ---------- |
| label        | String          | 表单项标签          | -                   | -          |
| description  | String          | 表单项详细描述      | -                   | -          |
| required     | Boolean         | 表单项是否必填      | -                   | `false`    |
| readonly     | Boolean         | 表单项是否只读      | -                   | `false`    |
| disabled     | Boolean         | 表单项是否禁用      | -                   | `false`    |
| hidden       | Boolean         | 表单项是否隐藏      | -                   | `false`    |
| span         | Number          | 表单项占位宽度      | `1~24`              | `24`       |
| initialValue | Any             | 表单项初始值        | -                   | `null`     |
| interactive  | String          | 表单项交互形式      | `'select', 'input'` | -          |
| model        | String          | 表单项绑定的`model` | -                   | -          |
| component    | String          | 表单项组件          | -                   | `el-input` |
| props        | Object          | 表单项组件          | -                   | `{}`       |
| events       | Object          | 表单项组件          | -                   | `{}`       |
| rules        | Array\<Rule\>   | 表单想校验规则      | -                   | `[]`       |
| changes      | Array\<change\> | 表单项值联动配置    | -                   | `[]`       |

#### Change 对象结构

| 属性      | 类型   | 描述     | 可选值 | 默认值 |
| --------- | ------ | -------- | ------ | ------ |
| target    | String | 目标项   | -      | -      |
| value     | Any    | 传递值   | -      | -      |
| condition | String | 触发条件 | -      | -      |

### Events

### Methods

| 事件名   | 说明     | 参数   |
| -------- | -------- | ------ |
| validate | 表单校验 | result |

### Slots

| 名称             | 说明           | 参数     |
| ---------------- | -------------- | -------- |
| itemLabel        | 表单项标签插槽 | `{item}` |
| ${formItem.name} | 表单项插槽     | `{item}` |
