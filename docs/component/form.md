# Form

收集数据。

## Usage

### 基础用法

支持仅通过配置就渲染表单。

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
    <div>
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

### 特色用法

- 支持表单只读模式；
- 支持表单标签文字两端对齐；
- 支持配置表单项的描述和提示信息；
- 支持表单校验时滚动到第一次校验失败的表单项。

::: demo 1、通过`readonly`属性可设置表单为只读模式，方便展示；</br>2、通过`labelAlign`属性可设置表单项标签的文字两端对齐；</br>3、通过设置表单项的`description`可让表单项显示描述信息；</br>4、通过`scrollToError`属性可设置表单项校验时滚动到第一个错误处。

```vue
<template>
  <div style="width: 600px;  margin: auto;">
    <div style="margin-bottom: 10px;">
      表单模式：
      <el-radio-group v-model="mode" size="mini">
        <el-radio-button label="normal">普通</el-radio-button>
        <el-radio-button label="readonly">只读</el-radio-button>
        <el-radio-button label="disabled">禁用</el-radio-button>
      </el-radio-group>
    </div>
    <div class="form-container">
      <re-form
        ref="form"
        label-width="120px"
        label-align="justify"
        :scroll-to-error="true"
        :readonly="mode === 'readonly'"
        :disabled="mode === 'disabled'"
        :items="items"
        :model="model"
        :rules="rules"
      />
    </div>
    <div>
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
      mode: "normal",
      items: [
        {
          label: "姓名",
          model: "name",
          component: "el-input",
          description: "身份证现用姓名",
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
          description: "生理性别",
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
          description: "年龄",
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
          description: "目前只支持QQ邮箱、网易邮箱和新浪邮箱",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入邮箱",
            clearable: true,
            type: "email",
          },
        },
        {
          label: "手机号码",
          model: "phone",
          component: "el-input",
          description: "格式为11位大陆手机号码",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入手机号码",
            clearable: true,
          },
        },
        {
          label: "个人住址",
          model: "address",
          component: "el-input",
          description: "目前居住地址或身份证上的地址",
          initialValue: null,
          span: 24,
          props: {
            placeholder: "请输入个人住址",
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
          { required: true, message: "请输入手机号码", trigger: "blur" },
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
<style>
.form-container {
  width: 100%;
  height: 300px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow-y: auto;
  margin-bottom: 10px;
}
</style>
```

:::

::: tip 只读模式：

只读模式让表单可以直接展示详情，由于`el-form`组件不支持只读模式，所以使用了自定义指令`v-readonly`在`el-form-item`上添加了一层遮罩，只读模式的样式请自己定义。

:::

### 自定义表单项内容

支持自定义表单项内容。

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
    >
      <template #itemLabel="{ item }">
        <div class="item-label">{{ item.label + "：" }}</div>
      </template>
      <template #gender="{ item }">
        <el-select
          style="width: 100%;"
          v-model="model.gender"
          placeholder="请选择性别"
        >
          <el-option label="女" value="0" />
          <el-option label="男" value="1" />
          <el-option label="未知" value="2" />
        </el-select>
      </template>
    </re-form>
    <div>
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
          initialValue: null,
          span: 24,
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

- 表单项`A`的值填入时，其余表单项自动填入相关数据。

::: demo 表单项的`interactive`属性值为`select`且`props`中传入`options`数组是使用`$select`前提条件。

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
          interactive: "select",
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

- 表单项`A`值重置时，其余相关表单项自动重置。

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

| 参数          | 说明                         | 类型              | 可选值                            | 默认值    |
| ------------- | ---------------------------- | ----------------- | --------------------------------- | --------- |
| model         | 表单数据对象                 | Object            | -                                 | `{}`      |
| readonly      | 表单是否为只读               | Boolean           | -                                 | `false`   |
| disabled      | 表单是否为禁用               | Boolean           | -                                 | `false`   |
| labelPosition | 搜索表单标签位置             | String            | `top`, `left`, `right`, `justify` | `justify` |
| spacing       | 表单项间隔                   | Number            | -                                 | `20`      |
| scrollToError | 检验时滚动到第一个错误表单项 | Boolean           | -                                 | `true`    |
| contexts      | 额外的数据                   | Object            | -                                 | `{}`      |
| rules         | 表单校验规则                 | Object            | -                                 | `{}`      |
| changes       | 表单值联动规则               | Object            | -                                 | `{}`      |
| items         | 表单项配置                   | Array\<FormItem\> | -                                 | `[]`      |
| 其他属性      | 参考`element-ui`             | Any               | -                                 | -         |

#### FormItem 对象结构

| 属性         | 类型            | 描述                | 可选值           | 默认值     |
| ------------ | --------------- | ------------------- | ---------------- | ---------- |
| label        | String          | 表单项标签          | -                | -          |
| description  | String          | 表单项详细描述      | -                | -          |
| required     | Boolean         | 表单项是否必填      | -                | `false`    |
| readonly     | Boolean         | 表单项是否只读      | -                | `false`    |
| disabled     | Boolean         | 表单项是否禁用      | -                | `false`    |
| hidden       | Boolean         | 表单项是否隐藏      | -                | `false`    |
| span         | Number          | 表单项占位宽度      | `1~24`           | `24`       |
| initialValue | Any             | 表单项初始值        | -                | `null`     |
| interactive  | String          | 表单项交互形式      | `select`,`input` | -          |
| model        | String          | 表单项绑定的`model` | -                | -          |
| component    | String          | 表单项组件          | -                | `el-input` |
| props        | Object          | 表单项组件          | -                | `{}`       |
| events       | Object          | 表单项组件          | -                | `{}`       |
| rules        | Array\<Rule\>   | 表单想校验规则      | -                | `[]`       |
| changes      | Array\<change\> | 表单项值联动配置    | -                | `[]`       |

#### Change 对象结构

| 属性      | 类型   | 描述     | 可选值 | 默认值 |
| --------- | ------ | -------- | ------ | ------ |
| target    | String | 目标项   | -      | -      |
| value     | Any    | 传递值   | -      | -      |
| condition | String | 触发条件 | -      | -      |

#### 联动变量

| 名称             | 说明                             | 默认值 |
| ---------------- | -------------------------------- | ------ |
| $value           | 表单项当前的值                   | -      |
| $select          | 表单项当前选中的选项             | -      |
| $currentValues   | 表单绑定的数据对象               | -      |
| $initialValues   | 表单项定义的初始值组成的数据对象 | {}     |
| $selectedOptions | 选择类表单项选中的选项组成的对象 | {}     |
| $extraContexts   | 表单额外注入的数据对象           | {}     |

### Methods

| 方法名        | 说明                   | 参数               |
| ------------- | ---------------------- | ------------------ |
| validate      | 表单校验               | `callback`         |
| validateField | 校验部分表单项         | `{prop, callback}` |
| resetFields   | 重置表单并移除校验结果 | -                  |
| clearValidate | 移除表单项校验结果     | `prop`             |
| reset         | 表单重置               | -                  |
| submit        | 表单提交               | -                  |

### Slots

| 名称        | 说明           | 参数     |
| ----------- | -------------- | -------- |
| itemLabel   | 表单项标签插槽 | `{item}` |
| {item.name} | 表单项组件插槽 | `{item}` |
