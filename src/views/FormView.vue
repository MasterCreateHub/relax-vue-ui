<template>
  <div class="form">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-card header="BasePopselect">
        <el-row>
          <el-col :span="6">
            <el-form-item label="BasePopselect">
              <base-popselect v-model="popValue" :options="options" multiple>
                <el-input slot="reference" readonly :value="showPopLabel"></el-input>
              </base-popselect>
            </el-form-item>         
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
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
      popValue: [],
      options: []
    };
  },
  computed:{
    showPopLabel(){
      return this.options.filter(item => this.popValue.includes(item.value)).map(item => item.label).join(",");
    }
  },
  mounted() {
    for (let i = 0; i < 5000; i++) {
      this.options.push({
        value: i,
        label: `选项${i}`
      })
    }
  }
};
</script>
