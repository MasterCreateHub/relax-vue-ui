<template>
  <div class="re-detail">
    <header class="re-detail__header">
      <slot name="header">{{ title }}</slot>
    </header>
    <main class="re-detail__body">
      <section v-for="section in renderConfig" :key="section.name" :class="[
        're-detail-section',
        `is-${sectionShowType}`,
        {
          'is-collapse': collapsible
        },
        {
          'is-active': collapsible && currentActiveSections.includes(section.name),
        },
      ]" @click="collapsible ? handleActive(section.name) : null">
        <div class="re-detail-section__title">
          <slot :name="`${section.name}Title`">
            <i :class="[
              { 'el-icon-menu': !collapsible },
              { 'el-icon-caret-right': collapsible },
              're-detail-section__icon',
            ]" />
            {{ section.label }}
          </slot>
        </div>
        <div class="re-detail-section__content">
          <slot :name="`${section.name}Content`" :data="section.data">
            <component v-for="(comp, index) in section.components" :key="section.name + comp.dataKey + index"
              :is="comp.name" v-bind="comp.props" v-on="comp.events" />
          </slot>
        </div>
      </section>
    </main>
    <footer class="re-detail__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  name: "ReDetail",
  props: {
    /**
     * @description 标题
     * @type {string}
     * @default ''
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * @description 章节数组
     * @type {Array<Section>}
     * @property {Object} section 章节对象
     * @property {String} section.label 章节标签
     * @property {String} section.name 章节名称
     * @property {Array<Component>} section.components 章节所用的组件
     * @property {Object} component 组件对象
     * @property {String} component.name 组件的属性
     * @property {String} component.dataKey 组件获取从data中获取数据的标识
     * @property {Object} component.props 组件的属性
     * @property {Object} component.events 组件的事件
     * @property {String} component.dataInProps 为组件注入数据使用的属性名
     * @default []
     */
    sections: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 描述列表数据对象，对象的键为章节的name
     * @type {Object}
     */
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 章节的展现形式，简单、卡片
     * @type {'simple' | 'card'}
     * @default 'simple'
     */
    showType: {
      type: String,
      default: "simple",
      validator(value) {
        return ["simple", "bar", "card"].includes(value);
      },
    },
    /**
     * @description 章节是否可折叠
     * @type {Object}
     */
    collapsible: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 激活（展开）的章节
     * @type {Array<String>}
     */
    activeSections: Array,
  },
  data() {
    return {
      internalActiveSections: this.sections.map((section) => section.name) || [],
    };
  },
  computed: {
    /**
     * @description 章节的展现形式
     */
    sectionShowType() {
     return ["simple", "bar", "card"].includes(this.showType) ? this.showType : "simple";
    },
    /**
     * @description 当前展开的章节
     */
    currentActiveSections: {
      get() {
        return this.activeSections || this.internalActiveSections;
      },
      set(val) {
        if (this.activeSections) {
          this.$emit("update:activeSections", val);
        } else {
          this.internalActiveSections = val;
        }
      },
    },
    /**
     * @description 最终的渲染配置
     */
    renderConfig() {
      const sectionsClone = cloneDeep(this.sections);
      return sectionsClone.map((section) => {
        section.data = this.data[section.name] || {}
        section.components = (section.components || []).map(component => {
          component.props = component.props || {}
          component.events = component.events || {}
          component.props = {
            ...component.props,
            [component.dataInProps || 'data']: section.data[component.dataKey] || null
          }
          return component
        })
        return section;
      })
    },
  },
  methods: {
    handleActive(name) {
      this.$emit(
        "active-section",
        name,
        this.currentActiveSections.includes(name)
      );
      if (this.currentActiveSections.includes(name)) {
        this.currentActiveSections = this.currentActiveSections.filter(
          (sectionName) => sectionName !== name
        );
      } else {
        this.currentActiveSections.push(name);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.re-detail {
  padding: 15px 20px;
  border: 2px solid #ebeef5;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  .re-detail__header {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    padding: 5px 0px;
  }

  .re-detail__body {
    box-sizing: border-box;
    padding: 15px;
  }

  .re-detail__footer {
    width: 100%;
    text-align: center;
  }
}

.is-simple {
  width: 100%;

  .re-detail-section__title {
    color: #ebeef5;
    display: flex;
    background-color: #606266;
    align-items: center;
    padding: 10px 15px;

    .re-detail-section__icon {
      margin-right: 8px;
    }
  }

  .re-detail-section__content {
    padding: 15px;
    transition: all 0.3s;
  }
}

.is-bar {
  width: 100%;
  border-bottom: 2px solid #ebeef5;

  .re-detail-section__title {
    color: #303133;
    display: flex;
    align-items: center;
    padding: 10px 15px;

    .re-detail-section__icon {
      margin-right: 8px;
    }
  }

  .re-detail-section__content {
    padding: 5px 15px 15px 15px;
    transition: all 0.3s;
  }
}

.is-bar:first-of-type {
  border-top: 2px solid #ebeef5;
}

.is-bar:last-of-type {
  margin-bottom: 15px;
}

.is-card {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;

  .re-detail-section__title {
    color: #303133;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #ebeef5;

    .re-detail-section__icon {
      margin-right: 8px;
    }
  }

  .re-detail-section__content {
    padding: 15px;
    transition: all 0.3s;
  }
}

.is-collapse {
  width: 100%;
  border-bottom: 2px solid #ebeef5;

  .re-detail-section__content {
    display: none;
    transition: all 0.3s;
  }
}

.is-collapse.is-active {
  .re-detail-section__title .re-detail-section__icon {
    transform: rotate(90deg);
  }

  .re-detail-section__content {
    display: block;
  }
}

.is-collapse:first-of-type {
  border-top: 2px solid #ebeef5;
}

.is-collapse:last-of-type {
  margin-bottom: 15px;
}
</style>