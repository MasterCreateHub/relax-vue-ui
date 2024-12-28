<template>
  <el-radio-group v-model="modelValue" v-bind="$attrs" v-on="$listeners">
    <el-radio
      v-for="(option, index) in options"
      :key="option.value + index"
      :label="option.value"
    >
      <slot :option="option">
        {{ option.label }}
      </slot>
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "ConfigRadioGroup",
  props: {
    value: [String, Number, Array],
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
