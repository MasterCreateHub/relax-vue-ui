# Relax Vue UI

## 简介

**什么是 Relax Vue UI？**

Relax Vue UI 是一个基于 element-ui 二次封装的、致力于快速开发中后台列表页面的组件库。

**Relax Vue UI 与 element-ui 的区别是？**

Relax Vue UI 是对 element-ui 的部分组件的二次封装，只提供与列表页面相关的功能组件。

**Relax Vue UI 的设计理念是什么？**

Relax Vue UI 的设计理念是，"能配置绝不模板"，通过配置即可实现大部分功能，大量减少模板代码，提升开发和维护效率。

## 快速上手

### 安装

在使用 relax-vue-ui 之前，你需要先安装 element-ui 并全局注册它。

```bash
npm install relax-vue-ui
```

然后再安装 relax-vue-ui。

```bash
npm install relax-vue-ui
```

### 使用

### 完整引入

```javascript
// main.js
import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import RelaxVueUI from "relax-vue-ui";
import 'relax-vue-ui/lib/relax-vue-ui.css';

// 全局注册 element-ui 和 relax-vue-ui
Vue.use(ElementUI);
Vue.use(RelaxVueUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

### 按需引入

```javascript
// main.js
import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 按需引入 relax-vue-ui 组件
import { ReConverter, ReDescriptions, ReDetail } from "relax-vue-ui";

// 全局注册 element-ui
Vue.use(ElementUI);
// 按需注册 relax-vue-ui
Vue.use(ReConverter);
Vue.use(ReDescriptions);
Vue.use(ReDetail);
new Vue({
  el: "#app",
});
```
