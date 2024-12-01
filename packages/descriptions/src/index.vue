<template>
  <el-descriptions
    v-bind="$attrs"
    :class="['re-descriptions', { 'is-layout-fixed': layout === 'fixed' }]"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="extra">
      <slot name="extra"></slot>
    </template>

    <el-descriptions-item
      v-for="(item, index) in data"
      :key="item.prop + index"
      :label="item.label"
      :span="item.span"
      :labelClassName="item.labelClassName"
      :contentClassName="item.contentClassName"
      :labelStyle="item.labelStyle"
      :contentStyle="item.contentStyle"
    >
      <template slot="label">
        <slot name="label" :dataItem="item">
          <template v-if="item.labelComponent">
            <component
              :is="item.labelComponent"
              v-bind="item.labelComponentProps"
              v-on="item.labelComponentEvents"
            >{{ item.label }}</component>
          </template>
          <template v-else>{{ item.label }}</template>
        </slot>
      </template>
      <template slot="default">
        <slot name="content" :dataItem="item">
          <template v-if="item.contentComponent">
            <component
              v-if="item.contentComponent"
              :is="item.contentComponent"
              v-bind="item.contentComponentProps"
              v-on="item.contentComponentEvents"
            >{{ item.value }}</component>
          </template>
          <template v-else>{{ item.value }}</template>
        </slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "ReDescriptions",
  props: {
    /**
     * @data 描述列表数据配置
     * @type {Array}
     * @property {Object} [] 描述列表项对象
     * @property {String} [].prop 描述列表项对象的属性名
     * @property {String} [].label 描述列表项对象的标签名
     * @property {String} [].value 描述列表项对象的值
     * @property {Number} [].span 描述列表项对象的跨列数
     * @property {String} [].labelClassName 描述列表项对象的标签class
     * @property {String} [].contentClassName 描述列表项对象的内容class
     * @property {Object} [].labelStyle 描述列表项对象的标签样式
     * @property {Object} [].contentStyle描述列表项对象的内容样式
     * @property {String} [].labelComponent 描述列表项对象的标签组件
     * @property {Object} [].labelComponentProps 描述列表项对象的标签组件的props
     * @property {Object} [].labelComponentEvents 描述列表项对象的标签组件的events
     * @property {Object} [].contentComponent 描述列表项对象的内容组件
     * @property {Object} [].contentComponentProps 描述列表项对象的内容组件的props
     * @property {Object} [].contentComponentEvents 描述列表项对象的内容组件的events
     * @default []
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 描述列表的布局方式，可选值：fixed、auto
     * @type {'fixed' | 'auto'}
     */
    layout: {
      type: String,
      default: "fixed",
      validator(value) {
        return ["fixed", "auto"].includes(value);
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep.is-layout-fixed {
  .el-descriptions__body .el-descriptions__table {
    table-layout: fixed;
  }
}
</style>
