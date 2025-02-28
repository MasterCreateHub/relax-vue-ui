# v-measure

测量元素尺寸，并在尺寸发生变化时触发回调。

- 期望的绑定值类型：`Object` | `Function`

- 详细说明：

  1. `v-measure` 使用 `ResizeObserver` 来监听元素尺寸的变化，当元素尺寸发生变化时，会触发回调函数，并将新的尺寸作为参数传入。
  2. `v-measure` 的绑定值可以是一个 `{ handler: Function, delay: Number }` 对象，也可以是一个函数。
  3. `v-measure` 本身调用回调时已经采用了防抖策略，防抖时间默认为 `100ms`。

#### Binding 对象结构

| 参数    | 说明             | 类型     | 可选值 | 默认值   |
| ------- | ---------------- | -------- | ------ | -------- |
| handler | 尺寸变化时的回调 | Function | -      | `()=>{}` |
| delay   | 防抖时间         | Number   | -      | `100`    |

#### 示例

::: demo 元素渲染时会调用一次回调，并显示当前尺寸信息

```vue
<template>
  <div class="container">
    <div class="box" v-measure="measureConfig" :style="{ width: `${width}%` }">
      当前尺寸: {{ size.width }}px , {{ size.height }}px
    </div>
    <el-slider v-model="width" :min="10" :max="100" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 100,
      size: { width: 0, height: 0 }
    };
  },
  computed: {
    measureConfig() {
      return {
        handler: this.handleResize,
        delay: 1000
      };
    }
  },
  methods: {
    handleResize(params) {
      this.size = params.contentRect;
      this.$message.success(`尺寸变化了: ${this.size.width}px x ${this.size.height}px`);
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  position: relative;
}

.box {
  width: 100%;
  height: 100px;
  background-color: #000;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 100px;
}
</style>