# Workbench

将多个不同的业务操作组件（如表单）聚合到一起并根据使用场景进行切换

## Workbench Usage

### 基础用法

将多个表单聚合到一起并根据使用场景进行切换。

::: demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      当前任务：
      <el-radio-group v-model="currentWork" size="mini">
        <el-radio-button label="add">新增商品</el-radio-button>
        <el-radio-button label="send">发货</el-radio-button>
      </el-radio-group>
    </div>
    <re-workbench
      :currentWork="currentWork"
      :works="works"
      @add-submit="handleAddSubmit"
      @send-confirm="handleSendConfirm"
    >
      <template #add>
        <div style="width: 80%; margin: 0 auto;">
          <el-form
            :model="productForm"
            label-width="80px"
            label-position="left"
          >
            <el-form-item label="商品分类">
              <el-select
                class="form-item"
                v-model="productForm.category"
                placeholder="请选择商品分类"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品品牌">
              <el-select
                class="form-item"
                v-model="productForm.brand"
                placeholder="请选择商品品牌"
              >
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input
                class="form-item"
                v-model="productForm.name"
                placeholder="请输入商品名称"
              />
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input-number
                class="form-item"
                v-model="productForm.price"
                placeholder="请输入商品价格"
              />
            </el-form-item>
            <el-form-item label="商品库存">
              <el-input-number
                class="form-item"
                v-model="productForm.stock"
                placeholder="请输入商品库存"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #send>
        <div style="width: 80%; margin: 0 auto;">
          <el-form :model="sendForm" label-width="80px" label-position="left">
            <el-form-item label="商品分类">
              <el-select
                class="form-item"
                v-model="sendForm.category"
                placeholder="请选择商品分类"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品品牌">
              <el-select
                class="form-item"
                v-model="sendForm.brand"
                placeholder="请选择商品品牌"
              >
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input
                class="form-item"
                v-model="sendForm.name"
                placeholder="请输入商品名称"
              />
            </el-form-item>
            <el-form-item label="发货数量">
              <el-input-number
                class="form-item"
                v-model="sendForm.sendQuantity"
                placeholder="请输入发货数量"
              />
            </el-form-item>
            <el-form-item label="发货地址">
              <el-input
                type="textarea"
                v-model="sendForm.address"
                placeholder="请输入发货地址"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="sendForm.remark"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
    </re-workbench>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentWork: "add",
      works: [
        {
          label: "新增商品",
          key: "add",
          actions: [
            {
              label: "提交",
              name: "add-submit",
              props: { type: "primary" },
            },
          ],
        },
        {
          label: "发货",
          key: "send",
          actions: [
            {
              label: "确认发货",
              name: "send-confirm",
              props: { type: "primary" },
            },
          ],
        },
      ],
      productForm: {
        brand: null,
        name: null,
        category: null,
        price: null,
        stock: null,
      },
      sendForm: {
        brand: null,
        name: null,
        category: null,
        sendQuantity: null,
        address: null,
        remark: null,
      },
      categoryOptions: [
        { label: "图书", value: "book" },
        { label: "数码", value: "digital" },
        { label: "家电", value: "appliance" },
        { label: "食品", value: "food" },
      ],
      brandOptions: [
        { label: "苹果", value: "apple" },
        { label: "华为", value: "huawei" },
        { label: "小米", value: "xiaomi" },
      ],
    };
  },
  methods: {
    handleAddSubmit(currentWork) {
      this.$message.success(`当前任务为：${currentWork}，点击了提交按钮`);
    },
    handleSendConfirm(currentWork) {
      this.$message.success(`当前任务为：${currentWork}，点击了确认发货按钮`);
    },
  },
};
</script>
<style>
.form-item {
  width: 100%;
}
</style>
```

:::

### 布局方式

### 自定义标题

### 自定义操作区

## Workbench API

### Attributes

| 参数        | 说明                                               | 类型            | 可选值        | 默认值 |
| ----------- | -------------------------------------------------- | --------------- | ------------- | ------ |
| layout      | 布局方式                                           | String          | `two`,`three` | `two`  |
| currentWork | 当前工作台的任务，值为工作任务的`key`              | String          | -             | -      |
| works       | 工作台配置，可配置多个任务，不同任务可对应不同操作 | Array\<Work\>   | -             | -      |
| actions     | 工作台所有可执行操作                               | Array\<Action\> | -             | `[]`   |

#### Work 对象结构

| 属性    | 说明                 | 类型            | 可选值 | 默认值 |
| ------- | -------------------- | --------------- | ------ | ------ |
| label   | 工作任务名称         | String          | -      | -      |
| key     | 工作任务标识         | String          | -      | -      |
| actions | 工作任务可执行的操作 | Array\<String\> | -      | -      |

#### Action 对象结构

| 属性      | 说明                                    | 类型   | 可选值 | 默认值      |
| --------- | --------------------------------------- | ------ | ------ | ----------- |
| label     | 操作名称                                | String | -      | -           |
| name      | 操作标识，也是`el-button`默认触发的事件 | String | -      | -           |
| component | 操作使用的组件                          | String | -      | `el-button` |
| props     | 工作台操作组件的属性配置                | Object | -      | -           |
| events    | 工作台操作组件的事件配置                | Object | -      | -           |

### Events

| 事件名称       | 说明               | 回调参数      |
| -------------- | ------------------ | ------------- |
| ${action.name} | 点击操作按钮时触发 | `currentWork` |

### Slots

| 名称    | 说明                   | 参数          |
| ------- | ---------------------- | ------------- |
| title   | 工作台标题自定义内容   | `currentWork` |
| action  | 工作台操作区自定义内容 | `currentWork` |
| default | 工作区自定义内容       | `currentWork` |
