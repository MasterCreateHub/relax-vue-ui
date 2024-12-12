# Converter

用于展示某个字段或对某个字段的值进行特别的展示

## Converter Usage

### 基础示例

::: demo

```html
<template>
  <div>
    <el-card header="展示对象键值">
      <re-converter target="name" :source="person" container="span" />
      <re-converter target="gender" :source="person" container="el-tag" />
      <re-converter
        target="website"
        :source="person"
        container="el-link"
        :container-props="{type:'success'}"
      />
    </el-card>
    <el-card header="映射字典的值">
      <re-converter
        target="1"
        :source="dict"
        container="el-tag"
        :container-props="{type:'success'}"
      />
      <re-converter
        :target="['2', '5']"
        :source="dict"
        container="el-tag"
        :container-props="{type:'primary'}"
      />
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "BaseConverterDemo",
    data() {
      return {
        title: "Converter",
        dict: [
          { value: "1", label: "语文" },
          { value: "2", label: "数学" },
          { value: "3", label: "英语" },
          { value: "4", label: "物理" },
          { value: "5", label: "化学" },
          { value: "6", label: "生物" },
          { value: "7", label: "地理" },
        ],
        person: {
          name: "小明",
          gender: "男",
          website: "http://www.xiaoming.com",
        },
      };
    },
    methods: {},
  };
</script>
```

:::

### 其他示例
::: demo

```html
<template>
  <div>
    <el-card header="使用表达式">
      <re-converter target="1" source="$targetValue === '1' ? '成功' : '失败'" container="el-tag" :container-props="{type:'success'}"/>
      <re-converter target="0" source="$targetValue === '1' ? '成功' : '失败'" container="el-tag" :container-props="{type:'danger'}"/>
    </el-card>
    <el-card header="使用默认值">
      <re-converter target="name" :source="{name: null}" default-value="/" container="span"/>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "BaseConverterDemo",
    data() {
      return {
        title: "Converter",
        dict: [
          { value: "1", label: "语文" },
          { value: "2", label: "数学" },
          { value: "3", label: "英语" },
          { value: "4", label: "物理" },
          { value: "5", label: "化学" },
          { value: "6", label: "生物" },
          { value: "7", label: "地理" },
        ],
        person: {
          name: "小明",
          gender: "男",
          website: "http://www.xiaoming.com",
        },
      };
    },
    methods: {},
  };
</script>
```

:::
## Converter API

### Attributes

| 参数      | 说明                     | 类型                               | 可选值 | 默认值 |
| --------- | ------------------------ | ---------------------------------- | ------ | ------ |
| value     | 要转换的字段或要转换的值 | `Number,String,Boolean,Array,Date` | -      | -      |
| source    | 源数据或转换源数据的方法 | `Array,Object,Function`            | -      | -      |
| container | 最终的渲染容器           | `String`                           | -      | `span` |
