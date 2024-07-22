<template>
  <div class="tool">
    <el-card header="通用搜索框">
      <base-searcher :span="6" :factors="seacherFactors" @search="handleSearch" />
    </el-card>
    <el-card header="通用数据转换器">
      <base-converter :value="['A', 'B']" :source="dict" container="el-tag"></base-converter>
    </el-card>
    <el-card header="通用弹出Tab">
      <el-row>
        <el-col>
          <el-button size="small" @click="dialogTabsShow = true">打开弹窗tab</el-button>
          <el-button size="small" @click="drawerTabsShow = true">打开抽屉tab</el-button>
        </el-col>
      </el-row>
      <base-poptabs :visible.sync="dialogTabsShow" :tabs="tabsArr" container="dialog" :activeTab.sync="dialogActiveTab"></base-poptabs>
      <base-poptabs :visible.sync="drawerTabsShow" :tabs="tabsArr" :activeTab.sync="drawerActiveTab"></base-poptabs>
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
      dict: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
      ],
      dialogTabsShow: false,
      drawerTabsShow: false,
      dialogActiveTab: 'detail',
      drawerActiveTab: 'test',
      tabsArr: [
        { label: '详情', name: 'detail' },
        { label: '测试', name: 'test' }
      ]
    };
  },
  methods: {
    handleSearch(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
