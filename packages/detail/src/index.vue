<template>
  <div class="re-detail">
    <header class="re-detail__header">
      <slot name="header">{{ title }}</slot>
    </header>
    <main class="re-detail__body">
      <section
        v-for="item in data"
        :key="item.name"
        :class="[
          're-detail-section',
          `is-${finallyShowType}`,
          {
            'is-active':
              finallyShowType === 'collapse' &&
              finallyActiveSection.includes(item.name),
          },
        ]"
        @click="finallyShowType === 'collapse' ? handleActive(item.name) : null"
      >
        <div class="re-detail-section__title">
          <slot :name="`${item.name}Title`">
            <i
              :class="[
                { 'el-icon-caret-right': finallyShowType === 'collapse' },
                're-detail-section__icon',
              ]"
            />
            {{ item.label }}
          </slot>
        </div>
        <div class="re-detail-section__content">
          <slot :name="`${item.name}Content`" :data="item.data">
            <component
              :is="item.component"
              v-bind="item.props"
              :[item.dataForProps]="item.data"
            ></component>
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
     * @description 详情章节内容
     * @type {Array}
     * @property {Object} [] 章节对象
     * @property {String} [].label 区域标签
     * @property {String} [].name 区域名称
     * @property {String} [].component 组件名
     * @property {Object} [].props 组件的属性
     * @property {Object} [].data 章节详情数据
     * @property {String} [].dataForProps 为组件注入数据使用的属性名
     * @default []
     */
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 区域的展现形式，简单、卡片、折叠面板
     * @type {'simple' | 'card' | 'collapse'}
     * @default 'simple'
     */
    showType: {
      type: String,
      default: "simple",
      validator(value) {
        return ["simple", "card", "collapse"].includes(value);
      },
    },
    /**
     * @description 激活的区域，只当 showType 的值为 'collapse' 时生效
     * @type {Array<String>}
     */
    activeSection: Array,
  },
  data() {
    return {
      localActiveSection: [],
    };
  },
  computed: {
    /**
     * @description 最终的展现形式
     */
    finallyShowType() {
      switch (this.showType) {
        case "simple":
          return "simple";
        case "card":
          return "card";
        case "collapse":
          return "collapse";
        default:
          return "simple";
      }
    },
    /**
     * @description 最终激活的区域
     */
    finallyActiveSection: {
      get() {
        return this.activeSection || this.localActiveSection;
      },
      set(val) {
        if (this.activeSection) {
          this.$emit("update:activeSection", val);
        } else {
          this.localActiveSection = val;
        }
      },
    },
  },
  methods: {
    handleActive(name) {
      this.$emit(
        "active-section",
        name,
        this.finallyActiveSection.includes(name)
      );
      if (this.finallyActiveSection.includes(name)) {
        this.finallyActiveSection = this.finallyActiveSection.filter(
          (item) => item !== name
        );
      } else {
        this.finallyActiveSection.push(name);
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
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .re-detail__header {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    padding: 5px 0px;
  }

  .re-detail__body {
    box-sizing: border-box;
    padding: 15px;
    flex: 1;
  }

  .re-detail__footer {
    width: 100%;
    text-align: center;
  }
}

.is-simple {
  width: 100%;
  margin-bottom: 15px;

  .re-detail-section__title {
    color: #303133;
    padding: 0px;
    display: flex;
    align-items: center;
    .re-detail-section__icon {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
      background-color: #515a6e;
    }
  }

  .re-detail-section__content {
    padding: 15px 15px 0px 15px;
    transition: all 0.3s;
  }
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
      width: 4px;
      height: 20px;
      margin-right: 8px;
      background-color: #515a6e;
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

  .re-detail-section__title {
    color: #303133;
    display: flex;
    align-items: center;
    padding: 10px 0px;

    .re-detail-section__icon {
      margin-right: 4px;
    }
  }

  .re-detail-section__content {
    display: none;
    padding: 5px 15px 15px 15px;
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
