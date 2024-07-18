<template>
  <div class="form">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-card header="BasePopselect">
        <base-popselect :options="options">
          <el-button slot="reference" type="primary">点击选择</el-button>
        </base-popselect>        
      </el-card>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "FormView",
  components: {},
  data() {
    return {
      form: {
        name: "",
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
      ]
    };
  },
};
</script>
