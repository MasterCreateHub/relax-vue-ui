# Toolbar

工具栏，将常用操作聚集到一起，以便于用户使用。

## Usage

### 基础用法

支持仅通过配置渲染工具栏。

::: demo 　点击默认渲染的工具按钮会触发`${tool.name}`事件，事件默认参数为`点击事件对象`。

```vue
<template>
  <re-toolbar
    :tools="tools"
    :shadow="true"
    @add="handleAdd"
    @delete="handleDelete"
    @refresh="handleRefresh"
  />
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          name: 'add',
          label: '新增',
          position: 'left',
          props: {
            type: 'primary',
            icon: 'el-icon-plus',
            plain: true,
          },
        },
        {
          name: 'delete',
          label: '删除',
          position: 'left',
          props: {
            type: 'danger',
            icon: 'el-icon-delete',
            plain: true,
          },
        },
        {
          name: 'searcher',
          label: '搜索栏',
          useTip: false,
          position: 'right',
          component: 'el-switch',
          props: {
            value: true,
            inactiveText: '搜索栏',
          },
          events: {
            input: (val) => {
              this.tools.find((item) => item.name === 'searcher').props.value = val;
            },
          },
        },
        {
          name: 'refresh',
          label: '刷新',
          useTip: true,
          position: 'right',
          props: {
            icon: 'el-icon-refresh',
            circle: true,
            plain: true,
          },
        },
      ],
    };
  },
  methods: {
    handleAdd(event) {
      console.log(event);
      this.$message.success('点击了添加，控制台查看默认参数');
    },
    handleDelete() {
      this.$message.success('点击了删除');
    },
    handleRefresh() {
      this.$message.success('点击了刷新');
    },
  },
};
</script>
```

:::

### 自定义工具内容

每个工具都可以自定义内容。

::: demo

```vue
<template>
  <re-toolbar :tools="tools" :shadow="true">
    <template #add="{ tool }">
      <el-button type="primary" icon="el-icon-plus" plain size="mini" @click="handleAdd">{{
        tool.label
      }}</el-button>
    </template>
    <template #delete>
      <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="handleDelete"
        >删除</el-button
      >
    </template>
    <template #density>
      <el-dropdown placement="bottom">
        <el-button icon="el-icon-s-operation" circle plain size="mini" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>紧凑</el-dropdown-item>
          <el-dropdown-item>适中</el-dropdown-item>
          <el-dropdown-item>宽松</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template #refresh>
      <el-button icon="el-icon-refresh" plain circle size="mini" @click="handleRefresh" />
    </template>
  </re-toolbar>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          name: 'add',
          label: '新增',
          position: 'left',
        },
        {
          name: 'delete',
          label: '删除',
          position: 'left',
        },
        {
          name: 'density',
          label: '密度',
          useTip: true,
          position: 'right',
        },
        {
          name: 'refresh',
          label: '刷新',
          useTip: true,
          position: 'right',
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$message.success('点击了添加');
    },
    handleDelete() {
      this.$message.success('点击了删除');
    },
    handleRefresh() {
      this.$message.success('点击了刷新');
    },
  },
};
</script>
```

:::

## Toolbar API

### Attributes

| 参数   | 说明         | 类型            | 可选值 | 默认值  |
| ------ | ------------ | --------------- | ------ | ------- |
| shadow | 是否阴影环绕 | Boolean         | -      | `false` |
| tools  | 工具数组     | Array\<Column\> | -      | `[]`    |

#### Tool 对象结构

| 属性      | 说明                     | 类型    | 可选值         | 默认值      |
| --------- | ------------------------ | ------- | -------------- | ----------- |
| name      | 工具名称，工具的标识     | String  | -              | -           |
| label     | 工具标签名称             | String  | -              | -           |
| useTip    | 是否使用提示             | Boolean | -              | -           |
| tooltip   | 提示内容，默认为工具标签 | String  | -              | -           |
| position  | 工具位置                 | String  | `left`,`right` | -           |
| component | 工具组件                 | String  | -              | `el-button` |
| props     | 工具组件配置             | Object  | -              | `{}`        |
| events    | 工具绑定的事件           | Object  | -              | `{}`        |

### Events

| 事件名称     | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| ${tool.name} | 点击工具按钮时触发 | -        |

### Slots

| 名称         | 说明                   | 参数   |
| ------------ | ---------------------- | ------ |
| ${tool.name} | 单个工具区域自定义内容 | `tool` |
