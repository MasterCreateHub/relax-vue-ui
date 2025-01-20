# Relax Vue UI

## 简介

relax-vue-ui 是一个基于 element-ui 二次封装的、致力于快速开发中后台列表页面的组件库。

## 安装

在使用 relax-vue-ui 之前，你需要先安装 element-ui 并全局注册它。

```bash
npm install relax-vue-ui
```

然后再安装 relax-vue-ui。

```bash
npm install relax-vue-ui
```

## 使用

在 main.js 中引入并使用 relax-vue-ui（包含全局注册 element-ui ）：

```javascript
import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import RelaxVueUI from "relax-vue-ui";

Vue.use(ElementUI);
Vue.use(RelaxVueUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```
