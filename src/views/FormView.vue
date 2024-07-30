<template>
  <div class="form">
    <el-card header="二次封装表单组件">
      <el-card header="表单配置">
        <el-form inline>
          <el-form-item label="表单大小">
            <el-radio-group v-model="formSize" size="small">
              <el-radio-button label="medium">medium</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="mini">mini</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否只读">
            <el-switch v-model="formReadonly" size="small"></el-switch>
          </el-form-item>
        </el-form>
      </el-card>
      <el-form :model="form" label-width="120px" label-position="top" :size="formSize">
        <el-row :gutter="30">
          <el-col :span="24">
            <el-divider>输入型组件</el-divider>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseInput">
              <base-input v-model="form.name" :readonly="formReadonly"></base-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseInputNumber">
              <base-input-number v-model="form.age" :readonly="formReadonly" prefixText="￥" suffixText="元" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>点击勾选型组件</el-divider>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseRadioGroup">
              <base-radio-group v-model="form.level" :readonly="formReadonly" neat :options="radioOptions" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseCheckboxGroup">
              <base-checkbox-group v-model="form.happy" :readonly="formReadonly" neat :options="checkOptions"
                value-format="string" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>下拉选择型组件</el-divider>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BasePopselect">
              <base-popselect v-model="form.popValue" :readonly="formReadonly" :options="options" multiple>
                <el-input slot="reference" readonly :value="showPopLabel"></el-input>
              </base-popselect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseSelect">
              <base-select v-model="form.baseSelect" :readonly="formReadonly" :options="selectOptions" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider>时间选择型组件</el-divider>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseTimePicker">
              <base-time-picker v-model="form.baseTimePicker" :readonly="formReadonly" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BaseDatePicker">
              <base-date-picker v-model="form.baseDatePicker" :readonly="formReadonly" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "FormView",
  components: {},
  data() {
    return {
      formSize: 'medium',
      formReadonly: false,
      form: {
        popValue: [],
        name: "aa",
        age: null,
        level: "",
        happy: 'A,B',
        baseSelect: '0',
        baseTimePicker: new Date(2016, 9, 10, 18, 40),
        baseDatePicker: new Date(2016, 9, 10),
      },
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
      ],
      selectOptions: [
        { label: "数学", value: "0" },
        { label: "英语", value: "1" },
        { label: "语文", value: "2" }
      ],

    };
  },
  computed: {
    showPopLabel() {
      return this.options.filter(item => this.form.popValue.includes(item.value)).map(item => item.label).join(",");
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
