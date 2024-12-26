<template>
  <el-select v-model="modelValue" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="(option, index) in options"
      :key="option.value + index"
      :label="option.label"
      :value="option.value"
      ><slot :option="option"></slot
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "BaseSelect",
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
