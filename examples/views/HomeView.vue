<template>
  <div class="home">
    <el-row>
      <el-col>
        
        
      </el-col>
    </el-row>
    <re-form :form-data.sync="formData" :form-items="formItems" label-position="top"></re-form>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      formData: {
        name: null,
        words: null,
        age: null,
        money: null
      },
      formItems: [
        {
          label: "姓名",
          model: "name",
          type: "el-input",
          span: 8
        },
        {
          label: "年龄",
          model: "age",
          type: "el-input-number",
          span: 8,
          change: [
            {
              target: "money",
              value: "{{$values.age*2}}"
            }
          ]
        },
        {
          label: "金钱",
          model: "money",
          type: "el-input-number",
          span: 8
        },
        {
          label: "座右铭",
          model: "words",
          type: "el-input",
          span: 24,
          config: {
            disabled: "{{!$values.name}}",
            type: "textarea",
            rows: 5,
            placeholder: "{{'请输入'+($values.name ? $values.name : '您')+'的座右铭'}}"
          }
        }
      ]
      

    }
  },
  methods: {


  }
};
</script>
<style lang="scss" scoped>
.home{
  padding: 20px 50px;
}
</style>
