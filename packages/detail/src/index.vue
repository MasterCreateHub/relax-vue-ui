<template>
  <div class="re-detail">
    <header class="re-detail__header">
      <slot name="header">{{ title }}</slot>
    </header>
    <aside class="re-detail__aside">
        <div class="re-detail-anchor">
            <el-link :underline="false" v-for="item in anchorList" :key="item">{{ item }}</el-link>
        </div>
    </aside>
    <main class="re-detail__body">
      <div class="re-detail-nav"></div>
      <section
        v-for="item in data"
        :key="item.name"
        :class="[
          're-detail-section',
          `is-${showType}`,
          { 'is-active': activeSection.includes(item.name) },
        ]"
      >
        <div class="re-detail-section__title" @click="handleActive(item.name)">
          <i
            :class="[
              { 'el-icon-caret-right': showType === 'collapse' },
              're-detail-section__icon',
            ]"
          />
          {{ item.label }}
        </div>
        <div class="re-detail-section__content"></div>
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
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * @description 详情数据
     */
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description 区域的展现形式，卡片、折叠面板
     */
    showType: {
      type: String,
      default: "collapse",
      validator(value) {
        return ["simple", "card", "collapse"].includes(value);
      },
    },
    /**
     * @description 区域的统一配置
     */
    sectionConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      activeSection: [],
    };
  },
  computed: {
    anchorList(){
        return this.data.map(item => item.label)
    }
  },
  methods: {
    handleActive(name) {
      if (this.activeSection.includes(name)) {
        this.activeSection = this.activeSection.filter((item) => item !== name);
      } else {
        this.activeSection.push(name);
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
  
  .re-detail__aside{
    padding: 15px 0px;
    width: 100px;
    height: 100%;
    border-right: 1px solid #ebeef5;
    .re-detail-anchor{
        width: 90%;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        .el-link{
            display: block;
            line-height: 30px;
            text-align: right;
        }
    }
  }

  .re-detail__body {
    box-sizing: border-box;
    padding: 15px;
    flex: 1;

    .re-detail-section {
      .el-descriptions {
        .el-descriptions__body .el-descriptions__table {
          table-layout: fixed;
        }
      }

      .el-table {
        .el-table__header-wrapper,
        .el-table__fixed-header-wrapper {
          th {
            word-break: break-word;
            background-color: #f8f8f9;
            color: #515a6e;
            height: 40px;
            font-size: 13px;
          }
        }
      }
    }

    .re-detail-section:last-child {
      margin-bottom: 0;
    }
  }

  .re-detail__footer {
    width: 100%;
    text-align: center;
  }
}

.is-simple {
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;

  .re-detail-section__title {
    color: #303133;
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
    padding: 15px;
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
    padding: 15px;
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
    padding: 8px 0px;

    .re-detail-section__icon {
      margin-right: 4px;
    }
  }

  .re-detail-section__content {
    display: none;
    padding: 15px;
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
</style>
