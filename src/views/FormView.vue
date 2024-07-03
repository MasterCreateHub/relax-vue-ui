<template>
  <div class="form">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col> -->
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
    };
  },
};
</script>
