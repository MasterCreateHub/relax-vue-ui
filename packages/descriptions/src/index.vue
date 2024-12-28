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
      v-for="(item, index) in renderConfig"
      :key="item.prop + index"
      :label="item.label"
      :span="item.span"
      :labelClassName="item.labelClassName"
      :contentClassName="item.contentClassName"
      :labelStyle="item.labelStyle"
      :contentStyle="item.contentStyle"
    >
      <template slot="label">
        <slot name="label" :item="item" :data="data">
          <template v-if="item.labelComponent">
            <component
              :is="item.labelComponent"
              v-bind="item.labelComponentProps"
              v-on="item.labelComponentFormatEvents"
              >{{ item.label }}</component
            >
          </template>
          <template v-else>{{ item.label }}</template>
        </slot>
      </template>
      <template slot="default">
        <slot name="content" :item="item" :data="data">
          <template v-if="item.contentComponent">
            <component
              :is="item.contentComponent"
              v-bind="item.contentComponentProps"
              v-on="item.contentComponentFormatEvents"
              >{{ item.value }}
            </component>
          </template>
          <template v-else>{{ item.value }}</template>
        </slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { cloneDeep } from "lodash";
import { formatEvents } from "@utils/formatEvents";
export default {
  name: "ReDescriptions",
  props: {
    /**
     * @description 描述列表数据配置
     * @type {Array<Item>}
     * @property {Object} item 描述列表项对象
     * @property {String} item.prop 描述列表项对象的属性名
     * @property {String} item.label 描述列表项对象的标签名
     * @property {Number} item.span 描述列表项对象的占几列
     * @property {String} item.labelClassName 描述列表项对象的标签class
     * @property {String} item.contentClassName 描述列表项对象的内容class
     * @property {Object} item.labelStyle 描述列表项对象的标签样式
     * @property {Object} item.contentStyle 描述列表项对象的内容样式
     * @property {String} item.labelComponent 描述列表项对象的标签组件
     * @property {Object} item.labelComponentProps 描述列表项对象的标签组件的props
     * @property {Object} item.labelComponentEvents 描述列表项对象的标签组件的events
     * @property {Object} item.contentComponent 描述列表项对象的内容组件
     * @property {Object} item.contentComponentProps 描述列表项对象的内容组件的props
     * @property {Object} item.contentComponentEvents 描述列表项对象的内容组件的events
     * @property {String} item.dataInProps 描述列表项对象的内容组件所需数据的prop名称，组件才能将数据自动注入
     * @default []
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 描述列表数据对象
     * @type {Object}
     */
    data: {
      type: Object,
      default: () => {
        return {};
      },
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
  computed: {
    /**
     * @description 最终渲染配置
     */
    renderConfig() {
      const itemsClone = cloneDeep(this.items);
      return itemsClone.map((item) => {
        item.labelComponent = item.labelComponent || null;
        item.labelComponentProps = item.labelComponentProps || {};
        item.labelComponentEvents = item.labelComponentEvents || {};
        item.labelComponentFormatEvents = formatEvents(
          { events: item.labelComponentEvents },
          item,
          this.data
        );
        item.contentComponent = item.contentComponent || null;
        item.contentComponentProps = item.contentComponentProps || {};
        item.contentComponentEvents = item.contentComponentEvents || {};
        item.contentComponentFormatEvents = formatEvents(
          { events: item.contentComponentEvents },
          item,
          this.data
        );
        item.dataInProps = item.dataInProps || null;
        item.value = this.data[item.prop] || null;
        if (item.dataInProps && typeof item.dataInProps === "string") {
          item.contentComponentProps[item.dataInProps] = this.data[item.prop];
        }
        return item;
      });
    },
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
