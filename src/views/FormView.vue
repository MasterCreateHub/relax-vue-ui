<template>
  <div class="form">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-card header="BasePopselect">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="BasePopselect">
              <base-popselect v-model="popValue" :options="options" multiple>
                <el-input slot="reference" readonly :value="showPopLabel"></el-input>
              </base-popselect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseInput">
              <base-input v-model="form.name"></base-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseInputNumber">
              <base-input-number v-model="form.age" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseRadioGroup">
              <base-radio-group v-model="form.level" neat :options="radioOptions" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseCheckboxGroup">
              <base-checkbox-group v-model="form.happy" neat :options="checkOptions" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="ElCheckboxGroup" size="small">
              <el-radio-group v-model="form.happy">
                <el-radio v-for="item in radioOptions" :key="item.value" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
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
        name: "aa",
        age: null,
        level: "",
        happy: []
      },
      popValue: [],
      options: [],
      radioOptions: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" }
      ],
      checkOptions: [
        { label: "游戏", value: "A" },
        { label: "健身", value: "B" },
        { label: "设计", value: "C" }
      ]
    };
  },
  computed: {
    showPopLabel() {
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
<style lang="scss" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
