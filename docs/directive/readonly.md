# v-readonly

为元素添加一层只读遮罩。

- 期望的绑定值类型：`Boolean | Object`

- 详细说明：

  1. 会在绑定该指令的元素内部追加一个`div`遮罩元素，当绑定值为`true`时，该遮罩元素将显示。
  2. 当绑定值为`Object`时，会根据`Object`的`style`属性值与默认样式进行合并，并应用到遮罩元素上。

#### Binding 对象结构

| 参数     | 说明     | 类型    | 可选值 | 默认值  |
| -------- | -------- | ------- | ------ | ------- |
| readonly | 是否只读 | Boolean | -      | `false` |
| style    | 样式对象 | Object  | -      | `{...}` |

#### 遮罩默认样式对象

```javascript
const defaultStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "transparent",
  zIndex: 100000,
  cursor: "unset",
};
```

#### 示例

::: demo

```vue
<template>
  <div class="container">
    <div style="margin-bottom: 10px;">
      <el-switch
        v-model="readonly"
        active-text="只读"
        inactive-text="可编辑"
      ></el-switch>
    </div>
    <div class="form-container" v-readonly="readonlyConfig">
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number style="width: 100%;"
            v-model="form.age"
            :min="0"
            :max="120"
            placeholder="请输入年龄"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            type="email"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="form.address"
            placeholder="请输入地址"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readonly: false,
      form: {
        name: "",
        age: null,
        email: "",
        address: "",
      },
    };
  },
  computed: {
    readonlyConfig() {
      return {
        readonly: this.readonly,
        style: {
          background: "rgba(255, 255, 255, 0.5)",
        },
      };
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-container {
  position: relative;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
}

</style>
```

:::
