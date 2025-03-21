<template>
  <div :class="['re-toolbar', { 'is-shadow': shadow }]">
    <div class="re-toolbar__left">
      <span class="re-toolbar-tool is-left" :class="[`re-toolbar-${tool.name}`]" v-for="(tool, index) in leftTools"
        :key="tool.name + index">
        <el-tooltip :disabled="!tool.useTip" :content="tool.tooltip || tool.label" placement="top">
          <slot :name="tool.name" :tool="tool">
            <template v-if="tool.component">
              <component :is="tool.component" v-bind="tool.props || {}" v-on="tool.events || {}" />
            </template>
            <template v-else>
              <el-button v-bind="tool.props || {}" size="mini" @click="$emit(tool.name, $event)">{{ tool.label }}</el-button>
            </template>
          </slot>
        </el-tooltip>
      </span>
    </div>
    <div class="re-toolbar__right">
      <span class="re-toolbar-tool is-right" :class="[`re-toolbar-${tool.name}`]" v-for="(tool, index) in rightTools"
        :key="tool.name + index">
        <el-tooltip :disabled="!tool.useTip" :content="tool.tooltip || tool.label" placement="top">
          <slot :name="tool.name" :tool="tool">
            <template v-if="tool.component">
              <component :is="tool.component" v-bind="tool.props || {}" v-on="tool.events || {}" />
            </template>
            <template v-else>
              <el-button v-bind="tool.props || {}" size="mini" @click="$emit(tool.name, $event)" />
            </template>
          </slot>
        </el-tooltip>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReToolbar",
  props: {
    /**
     * @description 是否阴影环绕
     * @type {Boolean}
     * @default false
     */
    shadow: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 工具数组
     * @type {Array<Tool>}
     * @property {Object} tool 工具对象
     * @property {String} tool.name 工具名称，工具的标识，用于触发事件
     * @property {String} tool.label 工具标签名称，用于显示在工具栏上
     * @property {Boolean} tool.useTip 是否使用提示，默认为false
     * @property {String} tool.tooltip 提示内容，默认为工具标签
     * @property {String} tool.position 工具位置，left表示左侧，right表示右侧
     * @property {String} tool.component 工具组件，默认为el-button
     * @property {Object} tool.props 工具组件配置
     * @property {Object} tool.events 工具绑定的事件
     * @default []
     */
    tools: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.every((item) => {
          return (
            item.name && item.label && ["left", "right"].includes(item.position)
          );
        });
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 左侧工具
     */
    leftTools() {
      return this.tools.filter((item) => item.position === "left");
    },
    /**
     * @description 右侧工具
     */
    rightTools() {
      return this.tools.filter((item) => item.position === "right");
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.re-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .re-toolbar__left,
  .re-toolbar__right {
    display: flex;
    align-items: center;
  }

  .re-toolbar__right {
    justify-content: flex-end;

    .re-toolbar-tool {
      margin-left: 10px;
    }
  }

  .re-toolbar__left {
    justify-content: flex-start;

    .re-toolbar-tool {
      margin-right: 10px;
    }
  }
}

.is-shadow {
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
