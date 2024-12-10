<template>
  <div class="table-view">

  </div>
</template>

<script>
export default {
  name: "TableView",
  components: {},
  data() {
    return {
    };
  },
  mounted() {
    
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.table-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // overflow: hidden;
}

::v-deep.tool-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-card__body {
    height: 300px;
    flex: 1;
  }
}
</style>
