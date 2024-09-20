<template>
    <re-searcher
      :default-expand="false"
      label-position="justify"
      :factors="seacherFactors"
      @search="handleSearch"
    />
  </template>
  
  <script>
    export default {
      name: "BaseDemo",
      data() {
        return {
          seacherFactors: [
            {
              label: "姓名",
              prop: "name",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "年龄",
              prop: "age",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "电话",
              prop: "tel",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "邮箱",
              prop: "email",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "爱好",
              prop: "happy",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "描述",
              prop: "desc",
              type: "el-input",
              valueType: "string",
            },
            {
              label: "等级",
              prop: "level",
              type: "el-select",
              valueType: "string",
              config: {
                placeholder: "",
                clearable: false,
              },
              options: [
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
              ],
            },
          ],
        };
      },
      methods: {
        handleSearch(val) {
          console.log(val);
        },
      },
    };
  </script>