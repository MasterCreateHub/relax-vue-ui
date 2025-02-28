# Converter

用于展示对象的某个字段、或者映射字典的值，或者格式化字符串。

## Converter Usage

### 基础用法

展示对象字段和映射字典标签是最常用的用法。

::: demo 字典的基本格式为一个对象数组，对象中包含`value`和`label`两个属性。

```vue
<template>
  <div>
    <re-converter target="name" :source="person" />
    <re-converter target="gender" :source="person" />
    <re-converter target="1" :source="dict" />
    <re-converter target="2" :source="dict" />
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
      dict: [
        { value: "1", label: "喜羊羊" },
        { value: "2", label: "灰太狼" },
      ],
    };
  },
};
</script>
```

:::

### 设置渲染容器

可通过`container`属性设置渲染容器，默认为`span`。

::: demo

```vue
<template>
  <div>
    <re-converter target="title" :source="book" container="h1" />
    <re-converter target="2" :source="dict" container="el-tag" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: "JOJO的奇妙冒险",
      },
      dict: [
        { value: "1", label: "科幻" },
        { value: "2", label: "玄幻" },
      ],
    };
  },
};
</script>
```

:::

### 设置容器属性

可通过`containerProps`属性为渲染容器设置属性。

::: demo

```vue
<template>
  <div>
    <re-converter
      target="website"
      :source="book"
      container="el-link"
      :container-props="{ type: 'success', underline: true }"
    />
    <re-converter
      target="1"
      :source="dict"
      container="el-tag"
      :container-props="{ type: 'warning' }"
    />
    <re-converter
      target="2"
      :source="dict"
      container="el-tag"
      :container-props="{ type: 'danger' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        website: "http://www.baidu.com",
      },
      dict: [
        { value: "1", label: "警告" },
        { value: "2", label: "处罚" },
      ],
    };
  },
};
</script>
```

:::

### 绑定容器事件

可通过`container-events`属性为渲染容器绑定事件。

::: demo 为渲染值的容器绑定事件时，事件的第一个参数默认为渲染后的值。

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
      links: ["奥特曼", "铠甲勇士", "魂斗罗"],
      linkEvents: {
        click: this.handleClick,
      },
    };
  },
  methods: {
    handleClick(item) {
      this.$message.success(`点击了${item}`);
    },
  },
};
</script>
```

:::

### 使用默认值

可通过`default-value`设置默认值，当转换后的值为`null`或`undefined`时，会显示默认值。

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

### 使用函数转换值

可通过函数进行自定义转换。

::: demo 使用函数转换时请保证该函数有返回值且返回值不为`null`。

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
      status: ["1", "2", "3"],
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
    },
  },
};
</script>
```

:::

### 使用表达式转换值

也许写函数过于繁琐，因此也可通过表达式进行自定义转换。

::: demo `$targetValue`为传入的`target`属性值。

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

### 展示对象键值

这是展示对象键值用例专场。

::: demo

```vue
<template>
  <div>
    <re-converter target="name" :source="person" container="span" />
    <re-converter target="gender" :source="person" container="el-tag" />
    <re-converter target="happy" :source="person" default-value="无爱好" />
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
        happy: null,
        website: "http://www.xiaoming.com",
      },
    };
  },
};
</script>
```

:::

### 映射字典键值

这是映射字典键值用例专场。

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
};
</script>
```

:::

## Converter API

### Attributes

| 参数            | 说明                                                    | 类型                               | 可选值 | 默认值 |
| --------------- | ------------------------------------------------------- | ---------------------------------- | ------ | ------ |
| target          | 要转换的字段或要转换的值，`必需`                        | `Number`,`String`,`Boolean`,`Array`,`Date` | -      | -      |
| source          | 源数据或转换源数据的方法，`必需`                        | `Array`,`Object`,`Function`,`String`     | -      | -      |
| container       | 最终的渲染容器，默认为`span`                            | `String`                           | -      | `span` |
| containerProps  | 容器的属性配置，默认为`{}`                              | `Object`                           | -      | `{}`   |
| containerEvents | 容器的绑定的事件，默认为`{}`                            | `Object`                           | -      | `{}`   |
| defaultValue    | 默认值，当转换失败或转换后值为`null`、`undefined`时使用 | `String`                           | -      | `null` |
