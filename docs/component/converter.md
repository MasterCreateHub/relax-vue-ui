# Converter

用于展示对象的某个字段、或者映射字典的值，或者格式化字符串

## Converter Usage

#### 1、展示对象键值
::: demo

```vue
<template>
  <div>
    <re-converter target="name" :source="person" container="span" />
    <re-converter target="gender" :source="person" container="el-tag" />
    <re-converter
      target="website"
      :source="person"
      container="el-link"
      :container-props="{ type: 'success' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
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

#### 2、映射字典的值
::: demo 当`source`为字典数组时，`target`为字典的单个或多个值，最终会渲染字典的`label`，并且可以在字典中为容器单独定制`containerProps`，字典中定制的`containerProps`优先级高于直接传入的`containerProps`。

```vue
<template>
  <div>
    <re-converter
      target="1"
      :source="subjectDict"
      container="el-tag"
      :container-props="{ type: 'success' }"
    />
    <re-converter
      :target="['2', '5']"
      :source="subjectDict"
      container="el-tag"
      :container-props="{ type: 'primary' }"
    />
    <re-converter
      :target="['1', '2', '3', '4']"
      :source="processDict"
      container="el-tag"
      :container-props="{ type: 'primary' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectDict: [
        { value: "1", label: "语文" },
        { value: "2", label: "数学" },
        { value: "3", label: "英语" },
        { value: "4", label: "物理" },
        { value: "5", label: "化学" },
        { value: "6", label: "生物" },
        { value: "7", label: "地理" },
      ],
      processDict: [
        { value: "1", label: "待审核", containerProps: { type: "info" } },
        { value: "2", label: "审核中", containerProps: { type: "primary" } },
        { value: "3", label: "审核通过", containerProps: { type: "success" } },
        { value: "4", label: "审核拒绝", containerProps: { type: "danger" } },
      ],
    };
  },
  methods: {},
};
</script>
```

:::

#### 3、使用函数转换值
::: demo

```vue
<template>
  <div>
    <re-converter
      :target="status[0]"
      :source="handleFormat"
      container="el-tag"
      :container-props="{ type: 'info' }"
    />
    <re-converter
      :target="status[1]"
      :source="handleFormat"
      container="el-tag"
      :container-props="{ type: 'primary' }"
    />
    <re-converter
      :target="status[2]"
      :source="handleFormat"
      container="el-tag"
      :container-props="{ type: 'success' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: ['1','2','3'],
    };
  },
  methods: {
    handleFormat(value) {
      if (value === "1") {
        return "上班";
      }
      if (value === "2") {
        return "下班";
      }
      if (value === "3") {
        return "辞职";
      }
    }
  },
};
</script>
```

:::

#### 4、使用表达式转换值
::: demo

```vue
<template>
  <div>
    <re-converter
      :target="status"
      source="$targetValue === '1' ? '成功' : '失败'"
      container="el-tag"
      :container-props="{ type: 'success' }"
    />
    <re-converter
      :target="numbers"
      source="$targetValue.split(',')"
      container="el-tag"
    />
    <re-converter :target="price" source="'￥' + $targetValue" />
    <re-converter :target="percent" source="$targetValue + '%'" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "1",
      numbers: "11011,11012,11013",
      price: 36,
      percent: 57.5,
    };
  },
};
</script>
```

:::

#### 5、使用默认值
::: demo

```vue
<template>
  <div>
    <re-converter
      target="name"
      :source="{ name: null }"
      default-value="/"
      container="span"
    />
    <re-converter
      :target="''"
      :source="{ name: null }"
      default-value="无"
      container="span"
    />
  </div>
</template>
```

:::

#### 5、为渲染值容器绑定事件
::: demo 为渲染值的容器绑定事件时，事件的第一个参数默认为渲染后的值

```vue
<template>
  <div>
    <re-converter
      :target="links"
      source="$targetValue"
      default-value="/"
      container="el-link"
      :container-props="{ type: 'success' }"
      :container-events="linkEvents"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: ['baidu.com', 'douban.com', 'google.com'],
      linkEvents: {
        click: this.handleClick,
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$message.success(`点击了${item}`)
    }
  }
}
</script>
```

:::


## Converter API

### Attributes

| 参数            | 说明                                     | 类型                               | 可选值 | 默认值 | 必需 |
| --------------- | ---------------------------------------- | ---------------------------------- | ------ | ------ | ---- |
| target          | 要转换的字段或要转换的值                 | `Number,String,Boolean,Array,Date` | -      | -      | 是   |
| source          | 源数据或转换源数据的方法                 | `Array,Object,Function,String`     | -      | -      | 是   |
| container       | 最终的渲染容器                           | `String`                           | -      | `span` | 否   |
| containerProps  | 容器的属性                               | `Object`                           | -      | `{}`   | 否   |
| containerEvents | 容器的事件                               | `Object`                           | -      | `{}`   | 否   |
| defaultValue    | 默认值，当没有找到对应值时，使用此默认值 | `String`                           | -      | `null` | 否   |
