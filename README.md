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
import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import RelaxVueUI from 'relax-vue-ui';
import 'relax-vue-ui/lib/relax-vue-ui.css';

Vue.use(ElementUI);
Vue.use(RelaxVueUI);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

## 组件

| 组件名称          | 说明                                 |
| ----------------- | ------------------------------------ |
| `re-converter`    | 转换器组件， 用于值处理或者字典映射  |
| `re-descriptions` | 描述列表组件，用于对事物进行详细描述 |
| `re-detail`       | 详情组件，用于展示事物详情           |
| `re-searcher`     | 搜索栏组件，用于数据搜索             |
| `re-toolbar`      | 工具栏组件，用于聚合收纳工具按钮     |
| `re-table`        | 表格组件，用于数据展示               |
| `re-pagination`   | 分页器组件，用于数据分页             |
| `re-form`         | 表单组件，用于搜集数据               |
| `re-workbench`    | 工作台组件，用于聚合多个页面或组件   |

## 示例

[示例文档：https://mastercreatehub.github.io/relax-vue-ui/](https://mastercreatehub.github.io/relax-vue-ui/)
