<template>
  <el-popover ref="popover">
    <template #reference>
      <slot name="reference"></slot>
    </template>
    <div
      class="base-list-container"
      :style="{ height: visibleHeight + 'px' }"
      @scroll="handleScroll($event)"
    >
      <div
        class="base-list-phantom"
        :style="{ height: listHeight + 'px' }"
      ></div>
      <ul
        class="base-list"
        ref="infiniteListRef"
        :style="{ transform: viewportTransform }"
      >
        <li
          ref="items"
          class="base-list-item"
          :class="{'is-selected': selectedArr.includes(item.value)}"
          v-for="(item, index) in visibleData"
          :key="'option-' + index"
          @click="handleSelect(item)"
        >
          <slot v-if="$scopedSlots.default" :data="item" />
          <template v-else>
            {{ item.label }}
          </template>
        </li>
      </ul>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "BasePopselect",
  props: {
    /**
     * @description 选中的值
     */
    value: [String, Number, Boolean, Array],
    /**
     * @description 列表数据
     */
    /**
     * @description 是否多选
     */
    multiple: {
        type: Boolean,
        default: false,
     },
    /**
     * @description 列表数据
     */
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedArr: [],
      /**
       * @description 列表项高度，数字，px
       */
      itemHeight: 20,
      /**
       * @description 列表在容器中的偏移量，数字，px
       */
      offset: 0,
      /**
       * @description 起始索引
       */
      start: 0,
      /**
       * @description 结束索引
       */
      end: null,
    };
  },
  computed: {
    /**
     * @description 列表视口高度，数字，px
     */
    visibleHeight() {
      return Math.min(this.options.length * this.itemHeight, 120);
    },
    /**
     * @description 列表总高度
     */
    listHeight() {
      return BigInt(this.options.length * this.itemHeight);
    },
    /**
     * @description 视口可容纳的列表项(包括缓冲区)
     */
    renderCount() {
      return Math.ceil(this.visibleHeight / this.itemHeight) + 6;
    },
    /**
     * @description 可见的列表数据
     */
    visibleData() {
      return this.options.slice(
        this.start,
        Math.min(this.end, this.options.length)
      );
    },
    /**
     * @description 视口偏移量
     */
    viewportTransform() {
      //   return `translate3d(0,${this.offset}px,0)`;
      return `translate3d(0,0px,0)`;
    },
  },

  methods: {
    /**
     * @description 组件初始化
     */
    handleInit() {
      this.start = 0; //列表开始索引
      this.end = this.start + this.renderCount; //列表结束索引
    },
    /**
     * @description 处理列表容器滚动事件
     */
    handleScroll() {
      //当前滚动位置
      let scrollTop = this.$el.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemHeight);
      //此时的结束索引
      this.end = this.start + this.renderCount;
      //此时的偏移量
      this.offset = scrollTop - (scrollTop % this.itemHeight);
    },

    handleSelect(item) {
        if(this.selectedArr.includes(item.value)){
            this.selectedArr = this.selectedArr.filter(val => val!== item.value);
        }else{
            this.selectedArr.push(item.value);
        }
    },
  },
  mounted() {
    this.handleInit();
  },
};
</script>
<style scoped lang="scss">
.base-list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;

  .base-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }

  .base-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    list-style-type: none;
    padding: 0px;

    .base-list-item {
      color: #606266;
      border-radius: 4px;
      padding: 0px 8px;
      box-sizing: border-box;
      position: relative;
    }
    .base-list-item.is-selected {
      color: #409eff;
      &::after {
        content: "\2713"; /* Unicode for checkmark */
        font-size: 12px; /* 设置字体大小 */
        color: #409eff; /* 设置颜色 */
        position: absolute;
        right: 0; /* 定位到左边 */
        top: 50%; /* 垂直居中 */
        transform: translateY(-50%); /* 垂直居中调整 */
        margin-right: 8px; /* 与文本之间留出空间 */
      }
    }
    .base-list-item:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
