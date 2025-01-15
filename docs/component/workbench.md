# Workbench

将多个不同的业务操作组件（如表单）聚合到一起并根据使用场景进行切换。

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

提供`two`和`three`两种布局方式。

::: demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      布局方式：
      <el-radio-group v-model="layout" size="mini">
        <el-radio-button label="two">两栏布局</el-radio-button>
        <el-radio-button label="three">三栏布局</el-radio-button>
      </el-radio-group>
      <el-divider direction="vertical"></el-divider>
      当前任务：
      <el-radio-group v-model="currentWork" size="mini">
        <el-radio-button label="add">新增商品</el-radio-button>
        <el-radio-button label="send">发货</el-radio-button>
      </el-radio-group>
    </div>
    <re-workbench
      :currentWork="currentWork"
      :works="works"
      :layout="layout"
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
      layout: "two",
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

### 配置任务组件

支持直接为任务配置组件。

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
      ref="workbenchRef"
      :currentWork="currentWork"
      :works="works"
      :layout="layout"
      @add-submit="handleAddSubmit"
      @send-confirm="handleSendConfirm"
    >
    </re-workbench>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: "two",
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
          component: "re-form",
          props: {
            labelWidth: "80px",
            model: {
              brand: null,
              name: null,
              category: null,
              price: 0,
              stock: 0,
            },
            items: [
              {
                label: "商品分类",
                model: "category",
                component: "config-select",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请选择商品分类",
                  options: [
                    {
                      label: "分类1",
                      value: "1",
                    },
                    {
                      label: "分类2",
                      value: "2",
                    },
                  ],
                },
                rules: [{ required: true, message: "请选择商品分类" }],
              },
              {
                label: "商品品牌",
                model: "brand",
                component: "config-select",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请选择商品品牌",
                  options: [
                    {
                      label: "品牌1",
                      value: "1",
                    },
                    {
                      label: "品牌2",
                      value: "2",
                    },
                  ],
                },
              },
              {
                label: "商品名称",
                model: "name",
                component: "el-input",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入商品名称",
                  clearable: true,
                },
              },
              {
                label: "商品价格",
                model: "price",
                component: "el-input-number",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入商品价格",
                  controls: true,
                  min: 0,
                },
              },
              {
                label: "商品库存",
                model: "stock",
                component: "el-input-number",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入商品库存",
                  controls: true,
                  min: 0,
                },
              },
            ],
          },
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
          component: "re-form",
          props: {
            labelWidth: "100px",
            model: {
              brand: null,
              name: null,
              category: null,
              sendQuantity: 0,
              address: null,
              remark: null,
            },
            items: [
              {
                label: "商品分类",
                model: "category",
                component: "config-select",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请选择商品分类",
                  options: [
                    {
                      label: "分类1",
                      value: "1",
                    },
                    {
                      label: "分类2",
                      value: "2",
                    },
                  ],
                },
                rules: [{ required: true, message: "请选择商品分类" }],
              },
              {
                label: "商品品牌",
                model: "brand",
                component: "config-select",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请选择商品品牌",
                  options: [
                    {
                      label: "品牌1",
                      value: "1",
                    },
                    {
                      label: "品牌2",
                      value: "2",
                    },
                  ],
                },
              },
              {
                label: "商品名称",
                model: "name",
                component: "el-input",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入商品名称",
                  clearable: true,
                },
              },
              {
                label: "发货数量",
                model: "sendQuantity",
                component: "el-input-number",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入发货数量",
                  controls: true,
                  min: 0,
                },
              },
              {
                label: "发货地址",
                model: "address",
                component: "el-input",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入发货地址",
                  clearable: true,
                  type: "textarea",
                },
              },
              {
                label: "备注",
                model: "remark",
                component: "el-input",
                initialValue: null,
                span: 24,
                props: {
                  placeholder: "请输入备注",
                  clearable: true,
                  type: "textarea",
                },
              },
            ],
          },
        },
      ],
    };
  },
  methods: {
    handleAddSubmit(currentWork) {
      this.$refs["workbenchRef"].workFunction("validate", (valid) => {
        this.$message.success(
          `当前任务为：${currentWork}，点击了提交按钮, ${
            valid ? "校验成功" : "校验失败"
          }`
        );
      });
    },
    handleSendConfirm(currentWork) {
      this.$refs["workbenchRef"].workFunction("validate", (valid) => {
        this.$message.success(
          `当前任务为：${currentWork}，点击了确认发货按钮, ${
            valid ? "校验成功" : "校验失败"
          }`
        );
      });
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

### 自定义标题

可以为每个任务自定义标题。

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
      <template #title="{ config }">
        <span>
          <i class="el-icon-info" />
          {{ config.label }}
        </span>
      </template>
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

### 自定义操作区

可以为每个任务自定义操作区。

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
    <re-workbench :currentWork="currentWork" :works="works">
      <template #action="{ currentWork, config }">
        <el-button
          v-if="currentWork === 'add'"
          type="primary"
          @click="handleAddSubmit(currentWork, config)"
          >提交</el-button
        >
        <el-button
          v-if="currentWork === 'send'"
          type="primary"
          @click="handleSendConfirm(currentWork, config)"
          >确认发货</el-button
        >
        <el-button type="primary" @click="handleCancel(currentWork, config)"
          >取消</el-button
        >
      </template>
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
    handleAddSubmit(currentWork, config) {
      this.$message.success(
        `当前任务为：${currentWork}，任务配置为：${config}，您点击了提交按钮`
      );
    },
    handleSendConfirm(currentWork, config) {
      this.$message.success(
        `当前任务为：${currentWork}，任务配置为：${config}，您点击了确认发货按钮`
      );
    },
    handleCancel(currentWork, config) {
      this.$message.success(
        `当前任务为：${currentWork}，任务配置为：${config}，点击了取消按钮`
      );
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

## Workbench API

### Attributes

| 参数        | 说明           | 类型          | 可选值        | 默认值 |
| ----------- | -------------- | ------------- | ------------- | ------ |
| layout      | 布局方式       | String        | `two`,`three` | `two`  |
| currentWork | 当前任务       | String        | `${work.key}` |        |
| works       | 工作台任务列表 | Array\<Work\> | -             | `[]`   |

#### Work 对象结构

| 属性    | 说明                 | 类型            | 可选值 | 默认值 |
| ------- | -------------------- | --------------- | ------ | ------ |
| label   | 工作任务名称         | String          | -      | -      |
| key     | 工作任务标识         | String          | -      | -      |
| actions | 工作任务可执行的操作 | Array\<Action\> | -      | `[]`   |

#### Action 对象结构

| 属性      | 说明                              | 类型   | 可选值 | 默认值      |
| --------- | --------------------------------- | ------ | ------ | ----------- |
| label     | 操作标签                          | String | -      | -           |
| name      | 操作名称，`el-button`触发的事件名 | String | -      | -           |
| component | 操作使用的组件                    | String | -      | `el-button` |
| props     | 工作台操作组件的属性配置          | Object | -      | -           |
| events    | 工作台操作组件的事件配置          | Object | -      | -           |

### Events

| 事件名称       | 说明               | 回调参数                |
| -------------- | ------------------ | ----------------------- |
| ${action.name} | 点击操作按钮时触发 | `{currentWork, $event}` |

### Slots

| 名称           | 说明                   | 参数                    |
| -------------- | ---------------------- | ----------------------- |
| title          | 工作台标题自定义内容   | `{currentWork, config}` |
| action         | 工作台操作区自定义内容 | `{currentWork, config}` |
| ${currentWork} | 工作任务自定义内容     | `{currentWork, config}` |
