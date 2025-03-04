<template>
  <div class="re-workbench" :class="[`is-${layout}`]">
    <header class="re-workbench__header">
      <div class="re-workbench-title">
        <slot
          name="title"
          :currentWork="currentWork"
          :config="currentWorkConfig"
        >
          {{ currentWorkLabel }}
        </slot>
      </div>
      <div v-if="layout === 'two'" class="re-workbench-action__wrapper">
        <slot
          name="action"
          :currentWork="currentWork"
          :config="currentWorkConfig"
        >
          <component
            v-for="action in currentWorkActions"
            :is="action.component || 'el-button'"
            :key="action.name"
            class="re-workbench-action"
            v-bind="action.props || {}"
            v-on="action.events || {}"
            @click="$emit(action.name, currentWork, $event)"
          >
            {{ action.label }}
          </component>
        </slot>
      </div>
    </header>
    <main class="re-workbench__body">
      <slot
        :name="currentWork"
        :currentWork="currentWork"
        :config="currentWorkConfig"
      >
        <component ref="workComponentRef"
          :key="currentWork + '-workComponent'"
          :is="currentWorkConfig.component || null"
          v-bind="currentWorkConfig.props || {}"
          v-on="currentWorkConfig.events || {}"
        />
      </slot>
    </main>
    <footer v-if="layout === 'three'" class="re-workbench__footer">
      <div class="re-workbench-action__wrapper">
        <slot
          name="action"
          :currentWork="currentWork"
          :config="currentWorkConfig"
        >
          <component
            v-for="action in currentWorkActions"
            :is="action.component || 'el-button'"
            :key="action.name"
            class="re-workbench-action"
            v-bind="action.props || {}"
            v-on="action.events || {}"
            @click="$emit(action.name, currentWork, $event)"
          >
            {{ action.label }}
          </component>
        </slot>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "ReWorkbench",
  props: {
    /**
     * @description 布局方式，可选值为two和three,two表示header和body，three表示header和body和footer
     * @type {String}
     * @default 'two'
     */
    layout: {
      type: String,
      default: "two",
      validator(value) {
        return ["two", "three"].includes(value);
      },
    },
    /**
     * @description 当前工作台的任务，值为works中任务的key
     * @type {String}
     */
    currentWork: {
      type: String,
      required: true,
    },
    /**
     * @description 工作台任务配置，一个工作台可配置多个任务，不同任务有可能对应不同的操作按钮，该组件会根据当前处理不同的任务来显示不同的操作按钮
     * @type {Array<Work>}
     * @property {Object} Work 工作任务对象
     * @property {String} Work.label 工作任务标签文本
     * @property {String} Work.key 工作任务标识
     * @property {String} Work.component 工作任务组件
     * @property {String} Work.props 工作任务组件`props`
     * @property {String} Work.events 工作任务组件`events`
     * @property {Array<Action | String>} Work.actions 该任务可执行的操作
     * @property {String} Action.label 操作的文本标签
     * @property {String} Action.name  操作标识，也是`el-button`默认触发的事件
     * @property {String} Action.component 操作使用的组件，默认为`el-button`
     * @property {Object} Action.props 工作台操作组件的`props`
     * @property {Object} Action.events 工作台操作组件的`events`
     * @default []
     */
    works: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((work) => {
          let workActionsValid =
            Array.isArray(work.actions) &&
            work.actions.every((action) => {
              return (
                (!!action && typeof action === "string") ||
                (Object.prototype.toString.call(action) === "[object Object]" &&
                  action.label &&
                  action.name)
              );
            });
          return (
            Object.prototype.toString.call(work) === "[object Object]" &&
            work.label &&
            work.key &&
            workActionsValid
          );
        });
      },
    },
    /**
     * @description 可执行的操作 
     * @type {Array<Action>}
     * @property {String} Action.label 操作的文本标签
     * @property {String} Action.name  操作标识，也是`el-button`默认触发的事件
     * @property {String} Action.component 操作使用的组件，默认为`el-button`
     * 
     */
    actions: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.every((action) => {
          return (
            Object.prototype.toString.call(action) === "[object Object]" &&
            action.label &&
            action.name
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
     * @description 工作台的当前任务配置信息
     */
    currentWorkConfig() {
      return this.works.find((work) => work.key === this.currentWork);
    },
    /**
     * @description 工作台的当前任务名称
     */
    currentWorkLabel() {
      return this.currentWorkConfig.label || "";
    },
    /**
     * @description 工作台的当前任务的可执行操作
     */
    currentWorkActions() {
      return Array.isArray(this.currentWorkConfig.actions)
        ? this.currentWorkConfig.actions
            .map((action) => {
              if (typeof action === "string") {
                return this.actions.find((act) => act.name === action) || {};
              }
              return action;
            })
            .filter((action) => !!action.label || !!action.name)
        : [];
    },
  },
  methods: {
    /**
     * @description 调用工作组件自身的方法
     * @param {String} name - 方法名
     * @param {Any} args - 参数
     */
     workFunction(name, ...args) {
      // 参数校验
      if (!name || typeof name !== "string") {
        console.error("Invalid method name:", name);
        return;
      }

      // 获取 work-component 实例
      const workComponentRef = this.$refs['workComponentRef'];
      if (!workComponentRef) {
        console.error("workComponent reference not found");
        return;
      }

      // 检查方法是否存在
      const workComponenMethod = workComponentRef[name];
      if (typeof workComponenMethod !== "function") {
        console.error(`Method ${name} does not exist on workComponent`);
        return;
      }

      // 调用方法
      try {
        workComponenMethod(...args);
      } catch (error) {
        console.error(`Error calling method ${name}:`, error);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.re-workbench {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #303133;
  background-color: #fff;
  border: 2px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  transition: 0.3s;

  .re-workbench__header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 20px;
    border-bottom: 2px #ebeef5 solid;

    .re-workbench-title {
      font-size: 18px;
      font-weight: 600;
      color: #72767b;
    }
  }

  .re-workbench__body {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    padding: 20px;
    overflow-y: auto;
  }

  .re-workbench__footer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 20px;
    border-top: 2px #ebeef5 solid;
  }
}

.is-two {
  .re-workbench__header {
    justify-content: space-between;
  }
}

.is-three {
  .re-workbench__header {
    justify-content: center;
  }
}
</style>
