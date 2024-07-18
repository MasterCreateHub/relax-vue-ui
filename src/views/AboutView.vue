<template>
  <div class="about" ref="aboutDivRef">
    <base-list ref="testRef" :height="containerHeight" :data="rows">
      <template slot-scope="row">
        <div class="item">
          <el-tag>标题：{{ row.data.id }}</el-tag>
        </div>
      </template>
    </base-list>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components: {},
  data() {
    return {
      once: 0,//每次插入的数量
      containerHeight: '100%',
      total: 0,//总条数
      countRender: 0,//已经渲染次数
      loopCount: 0,//需要插入的次数
      rows: []
    }
  },
  created() {
    // this.containerHeight = 300 + 'px';
  },
  mounted() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      setTimeout(() => {
        // 百万条数据
        this.total = 100;
        // 单次插入 可自定义
        this.once = 20;
        // 需要插入的次数 向上取整
        this.loopCount = Math.ceil(this.total / this.once);
        // 当前渲染次数
        this.countRender = 0;
        this.handleRender();
      }, 500)
    },
    //百万数据分段插入
    handleRender() {
      for (let i = 0; i < this.once; i++) {
        this.rows.push({ id: this.countRender + '-' + i })
      }
      // 渲染次数加1，控制递归的次数
      this.countRender++;

      if (this.countRender < this.loopCount) {
        window.requestAnimationFrame(this.handleRender);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.about {
  height: 100%;
  width: 100%;
}

.item{ 
  width: auto;
  height: 200px;
  border: 1px solid #ccc;
  margin: 8px 0px;
}
</style>
