# v-measure

测量元素尺寸，并在尺寸发生变化时触发回调。

- 期望的绑定值类型：`Object` | `Function`

- 详细说明：

  1. `v-measure`使用`ResizeObserver`来监听元素尺寸的变化，当元素尺寸发生变化时，会触发回调函数，并将新的尺寸作为参数传入。
  2. `v-measure`的绑定值可以是一个对象，也可以是一个函数。
  3. `v-measure`本身调用回调时已经采用了防抖策略，防抖时间默认为`100ms`。

#### Binding 对象结构

| 参数    | 说明             | 类型     | 可选值 | 默认值 |
| ------- | ---------------- | -------- | ------ | ------ |
| handler | 尺寸变化时的回调 | Function | -      | -      |
| delay   | 防抖时间         | Number   | -      | `100`  |

#### 示例

::: demo 元素渲染时会调用一次回调

```vue
<template>
  <div v-measure="handleResize" class="demo-box"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleResize(size) {
      this.$message.success("尺寸变化了");
      console.log(size);
    },
  },
};
</script>
<style>
.demo-box {
  width: 100%;
  height: 100px;
  background-color: #ccc;
}
</style>
```

:::
