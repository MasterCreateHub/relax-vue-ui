<template>
  <div>
    <el-row>
      <el-col :span="12"> 展示对象键值 </el-col>
      <el-col :span="12">
        <re-converter
          target="gender"
          :source="{ name: 18, gender: '男' }"
          container="el-tag"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"> 映射字典 </el-col>
      <el-col :span="12">
        <re-converter target="1" :source="dict" container="el-tag" />
        <re-converter :target="['2', '5']" :source="dict" container="el-tag" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BaseConverterDemo",
  data() {
    return {
      dict: [
        { value: "1", label: "语文" },
        { value: "2", label: "数学" },
        { value: "3", label: "英语" },
        { value: "4", label: "物理" },
        { value: "5", label: "化学" },
        { value: "6", label: "生物" },
        { value: "7", label: "地理" },
      ],
    };
  },
  methods: {},
};
</script>
