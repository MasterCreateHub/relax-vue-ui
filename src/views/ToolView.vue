<template>
    <div class="tool">
        <el-card header="通用搜索框">
            <base-searcher :span="4" :factors="seacherFactors" @search="handleSearch"/>
        </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "ToolView",
    components: {},
    data() {
      return {
        seacherFactors: [
            {
                label: "姓名",
                prop: "name",
                type: "el-input",
            },
            {
                label: "年龄",
                prop: "age",
                type: "el-input",
            },
            {
                label: "电话",
                prop: "tel",
                type: "el-input",
            },
            {
                label: "邮箱",
                prop: "email",
                type: "el-input",
            },
            {
                label: "爱好",
                prop: "happy",
                type: "el-input",
            },
            {
                label: "描述",
                prop: "desc",
                type: "el-input",
            },
            {
                label: "等级",
                prop: "level",
                type: "el-select",
                config: {
                    placeholder: '',
                    clearable: false
                },
                options: [
                    {label: 'A', value: 'A'},
                    {label: 'B', value: 'B'},
                    {label: 'C', value: 'C'},
                ]
            }
        ]

      }
    },
    methods: {
        handleSearch(val){
            console.log(val);
        }
    }
  }
  </script>
  