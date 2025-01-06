# Table

## Usage

### 基础用法

支持仅通过配置渲染表格。

::: demo

```vue
<template>
  <re-table :data="data" :columns="columns" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
    };
  },
};
</script>
```

:::

### 配置列渲染组件

支持直接指定表格列渲染组件。

::: demo

```vue
<template>
  <re-table :data="data" :columns="columns" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        {
          label: "电话",
          prop: "phone",
          contentComponent: "el-tag",
          dataInProps: null,
        },
      ],
    };
  },
};
</script>
```

:::

### 自定义列内容

支持使用插槽自定义列。

::: demo 1、可以使用`${column.prop}Label`和`${column.prop}Content`插槽单独自定义某一列，也可以使用`header`和`body`插槽自定义多列；</br>2、如果同时使用四种插槽的话，`${column.prop}Label`和`${column.prop}Content`插槽比`header`和`body`插槽性能优先级更高；</br>3、在`header`和`body`插槽中根据条件自定义不同列时请使用连续的`v-if`和`v-else-if`。

```vue
<template>
  <div>
    <p>使用 label 和 content 插槽</p>
    <re-table :data="data" :columns="columns">
      <template #nameLabel="{ column }">
        <div>
          <i class="el-icon-info" />
          {{ column.label }}
        </div>
      </template>
      <template #emailContent="{ row, column }">
        <el-link type="success">{{ row.email }}</el-link>
      </template>
    </re-table>
    <p>使用 header 和 body 插槽</p>
    <re-table :data="data" :columns="columns">
      <template #header="{ column }">
        <div>
          <i class="el-icon-info" />
          {{ column.label }}
        </div>
      </template>
      <template #body="{ row, column }">
        <template v-if="column.property === 'email'">
          <el-link type="success">{{ row.email }}</el-link>
        </template>
        <template v-else-if="column.property === 'phone'">
          <el-tag>{{ row.phone }}</el-tag>
        </template>
      </template>
    </re-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
    };
  },
};
</script>
```

:::

### 使用默认工具栏

通过`toolbar`属性开启工具栏，设置`toolbarConfig`属性可配置工具栏按钮。

::: demo

```vue
<template>
  <re-table
    :data="data"
    :columns="columns"
    toolbar
    :toolbar-config="toolbarConfig"
    @tool-add="handleAdd"
    @tool-delete="handleDelete"
    @tool-refresh="handleRefresh"
    @tool-export="handleExport"
  />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
      toolbarConfig: [
        {
          name: "add",
          label: "新增",
          position: "left",
          props: {
            type: "primary",
            icon: "el-icon-plus",
            plain: true,
          },
        },
        {
          name: "delete",
          label: "删除",
          position: "left",
          props: {
            type: "danger",
            icon: "el-icon-delete",
            plain: true,
          },
        },
        {
          name: "export",
          label: "导出",
          useTip: true,
          position: "right",
          props: {
            icon: "el-icon-download",
            circle: true,
            plain: true,
          },
        },
        {
          name: "refresh",
          label: "刷新",
          useTip: true,
          position: "right",
          props: {
            icon: "el-icon-refresh",
            circle: true,
            plain: true,
          },
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$message.success("点击了添加");
    },
    handleDelete() {
      this.$message.success("点击了删除");
    },
    handleExport() {
      this.$message.success("点击了导出");
    },
    handleRefresh() {
      this.$message.success("点击了刷新");
    },
  },
};
</script>
```

:::

### 自定义工具栏

支持完全自定义整个工具栏。
::: demo

```vue
<template>
  <re-table :data="data" :columns="columns" toolbar>
    <template #toolbar>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="handleAdd"
        >新增</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="handleDelete"
        >删除</el-button
      >
    </template>
  </re-table>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
      toolbarConfig: [
        {
          name: "add",
          label: "新增",
          position: "left",
          props: {
            type: "primary",
            icon: "el-icon-plus",
            plain: true,
          },
        },
        {
          name: "delete",
          label: "删除",
          position: "left",
          props: {
            type: "danger",
            icon: "el-icon-delete",
            plain: true,
          },
        },
        {
          name: "export",
          label: "导出",
          useTip: true,
          position: "right",
          props: {
            icon: "el-icon-download",
            circle: true,
            plain: true,
          },
        },
        {
          name: "refresh",
          label: "刷新",
          useTip: true,
          position: "right",
          props: {
            icon: "el-icon-refresh",
            circle: true,
            plain: true,
          },
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$message.success("点击了添加");
    },
    handleDelete() {
      this.$message.success("点击了删除");
    },
  },
};
</script>
```

:::

### 使用默认分页器

通过设置`pagination`属性开启分页器。

::: demo 默认分页器会自动分页，适合数据量不大的场景。

```vue
<template>
  <re-table :data="data" :columns="columns" :pagination="true" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "张三",
          age: 18,
          email: "zhangsan@163.com",
          phone: "12345678901",
        },
        {
          id: 2,
          name: "李四",
          age: 19,
          email: "lisi@163.com",
          phone: "12345678902",
        },
        {
          id: 3,
          name: "王五",
          age: 20,
          email: "wangwu@163.com",
          phone: "12345678903",
        },
        {
          id: 4,
          name: "赵六",
          age: 21,
          email: "zhaoliu@163.com",
          phone: "12345678904",
        },
        {
          id: 5,
          name: "钱七",
          age: 22,
          email: "qianqiu@163.com",
          phone: "12345678905",
        },
        {
          id: 6,
          name: "孙八",
          age: 23,
          email: "sunba@163.com",
          phone: "12345678906",
        },
        {
          id: 7,
          name: "周八",
          age: 24,
          email: "zhouba@163.com",
          phone: "12345678907",
        },
        {
          id: 8,
          name: "吴九",
          age: 25,
          email: "wujiu@163.com",
          phone: "12345678908",
        },
        {
          id: 9,
          name: "郑十",
          age: 26,
          email: "zhengshi@163.com",
          phone: "12345678909",
        },
        {
          id: 10,
          name: "王十",
          age: 27,
          email: "wangshi@163.com",
          phone: "12345678910",
        },
        {
          id: 11,
          name: "钱十一",
          age: 28,
          email: "qianyi@163.com",
          phone: "12345678911",
        },
      ],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
    };
  },
};
</script>
```

:::

### 配置默认分页器

开启默认分页器后，设置`paginationConfig`属性可配置分页器。

::: demo 1、如果不配置分页器的`total`属性或者配置的`total`属性值不合法（类型为`number`且`total >= 0`视为合法），那么分页器依旧会自动地将表格数据分页。</br>2、如果表格的数据来自于分页接口，请设置分页器`total`属性，否则分页器的`total`属性值会默认为表格数据的长度并会开启自动分页。

```vue
<template>
  <re-table
    :data="data"
    :columns="columns"
    :pagination="true"
    :paginationConfig.sync="paginationConfig"
    @pagination="handlePagination"
  />
</template>
<script>
export default {
  data() {
    return {
      allData: [],
      data: [],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
      paginationConfig: {
        align: "right",
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
        pageSizes: [5, 10],
        currentPage: 1,
        pageSize: 5,
        pagerCount: 7,
        total: null,
      },
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.allData.push({
        id: i,
        name: "name" + i,
        age: i,
        email: "email" + i + "@qq.com",
        phone: Math.floor(Math.random() * 100000000),
      });
    }
    this.getData();
  },
  methods: {
    getData() {
      const startIndex =
        (this.paginationConfig.currentPage - 1) *
        this.paginationConfig.pageSize;
      const endIndex = startIndex + this.paginationConfig.pageSize;
      this.data = this.allData.slice(startIndex, endIndex);
      this.paginationConfig.total = this.allData.length;
    },
    handlePagination({ currentPage, pageSize, from }) {
      this.$message.success(
        `当前页码：${currentPage}，每页条数：${pageSize}，改变参数为：${from}`
      );
      this.getData();
    },
  },
};
</script>
```

:::

### 自定义分页器

也可以通过插槽自定义分页器。

::: demo

```vue
<template>
  <re-table :data="data" :columns="columns" pagination>
    <template #pagination>
      <re-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :total="total"
        @pagination="handlePagination"
      />
    </template>
  </re-table>
</template>
<script>
export default {
  data() {
    return {
      allData: [],
      data: [],
      columns: [
        { label: "会员ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "年龄", prop: "age" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "phone" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.allData.push({
        id: i,
        name: "name" + i,
        age: i,
        email: "email" + i + "@qq.com",
        phone: Math.floor(Math.random() * 100000000),
      });
    }
    this.getData(this.currentPage, this.pageSize);
  },
  methods: {
    getData(currentPage, pageSize) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      this.data = this.allData.slice(startIndex, endIndex);
      this.total = this.allData.length;
    },
    handlePagination({ currentPage, pageSize, from }) {
      this.$message.success(
        `当前页码：${currentPage}，每页条数：${pageSize}，改变参数为：${from}`
      );
      this.getData(currentPage, pageSize);
    },
  },
};
</script>
```

:::

## API

### Attributes

| 参数             | 说明                             | 类型                 | 可选值 | 默认值  |
| ---------------- | -------------------------------- | -------------------- | ------ | ------- |
| data             | 表格数据                         | Array                | -      | `[]`    |
| columns          | 表格列配置                       | Array\<Column\>      | -      | `[]`    |
| toolbar          | 是否显示工具栏                   | Boolean              | -      | `false` |
| toolbarConfig    | 工具栏配置                       | Array\<Tool\>        | -      | `[]`    |
| pagination       | 是否显示分页器                   | Boolean              | -      | `false` |
| paginationConfig | 分页器配置                       | Object\<Pagination\> | -      | `{...}` |
| 其他属性         | 表格其他属性，请参考`element-ui` | Any                  | -      | -       |

::: tip 表格分页器默认配置

```javascript
{
    align: "center",
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    pageSizes: [10, 20, 30, 50],
    currentPage: 1,
    pageSize: 10,
    pagerCount: 7,
    total: null
}
```

`total`实际取值为`data.length`
:::

#### Column 对象结构

| 属性                | 说明                                   | 类型   | 可选值                             | 默认值 |
| ------------------- | -------------------------------------- | ------ | ---------------------------------- | ------ |
| type                | 表格列类型                             | String | `'selection'`,`'index'`,`'expand'` | -      |
| prop                | 表格列属性                             | String | -                                  | -      |
| label               | 表格列标签                             | String | -                                  | -      |
| width               | 表格列宽度                             | String | -                                  | -      |
| minWidth            | 表格列最小宽度                         | String | -                                  | -      |
| align               | 表格列对齐方式                         | String | -                                  | -      |
| fixed               | 表格列固定方式                         | String | -                                  | -      |
| showOverflowTooltip | 表格列是否显示 tooltip                 | String | -                                  | -      |
| className           | 表格列样式类名                         | String | -                                  | -      |
| 其他属性            | 表格列其他属性，请参考`element-ui`文档 | Any    | -                                  | -      |

#### Tool 对象结构

| 属性      | 说明                     | 类型    | 可选值              | 默认值        |
| --------- | ------------------------ | ------- | ------------------- | ------------- |
| name      | 工具名称，工具的标识     | String  | -                   | -             |
| label     | 工具标签名称             | String  | -                   | -             |
| useTip    | 是否使用提示             | Boolean | -                   | -             |
| tooltip   | 提示内容，默认为工具标签 | String  | -                   | -             |
| position  | 工具位置                 | String  | `'left'`, `'right'` | -             |
| component | 工具组件                 | String  | -                   | `'el-button'` |
| props     | 工具组件配置             | Object  | -                   | -             |
| events    | 工具绑定的事件           | Object  | -                   | -             |

### Pagination 对象结构

| 属性        | 说明         | 类型    | 可选值                    | 默认值                                 |
| ----------- | ------------ | ------- | ------------------------- | -------------------------------------- |
| align       | 对齐方式     | String  | `left`, `center`, `right` | `'center'`                             |
| background  | 使用背景色   | Boolean | -                         | `true`                                 |
| layout      | 组件布局     | String  | -                         | `'total,sizes,prev,pager,next,jumper'` |
| pageSizes   | 每页条数选项 | Array   | -                         | `[10, 20, 30, 50]`                     |
| currentPage | 当前页码     | Number  | -                         | `1`                                    |
| pageSize    | 每页条数     | Number  | -                         | `20`                                   |
| pagerCount  | 页码按钮     | Number  | -                         | `7`                                    |
| total       | 总条数       | Number  | -                         | -                                      |

### Events

| 事件名            | 说明                                                        | 参数                            |
| ----------------- | ----------------------------------------------------------- | ------------------------------- |
| el-table 事件     | `el-table`原本的事件，请参考`element-ui`文档                | -                               |
| tool-${tool.name} | 当工具栏的工具使用默认的`el-button`时，点击按钮会触发该事件 | -                               |
| pagination        | 分页跳转、分页大小改变事件                                  | `{currentPage, pageSize, from}` |

::: tip pagination 事件参数详细说明：
`pagination`事件的参数是一个对象，其中 currentPage 为当前页码，pageSize 为每页显示条数，from 为触发该事件来源，值为`currentPage`或`pageSize`。
:::

### Methods

| 方法名        | 说明                                             | 参数 |
| ------------- | ------------------------------------------------ | ---- |
| tableFunction | `el-table`原本提供的方法，请参考`element-ui`文档 | -    |

### Slots

| 名称                  | 说明                         | 参数                      |
| --------------------- | ---------------------------- | ------------------------- |
| toolbar               | 工具栏完全自定义内容         | -                         |
| header                | 表头自定义内容               | `{ column, $index }`      |
| body                  | 表格主体自定义内容           | `{ row, column, $index }` |
| ${column.prop}Label   | 表格列表头自定义内容         | `{ column, $index }`      |
| ${column.prop}Content | 表格列内容自定义内容         | `{ row, column, $index }` |
| default               | 表格默认插槽                 | -                         |
| append                | 插入至表格最后一行之后的内容 | -                         |
| pagination            | 分页器完全自定义内容         | -                         |
