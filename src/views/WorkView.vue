<template>
  <div class="tool">
    <el-card header="弹出Tab页">
      <el-row>
        <el-col>
          <el-button size="small" @click="dialogTabsShow = true">
            打开弹窗tab
          </el-button>
          <el-button size="small" @click="drawerTabsShow = true">
            打开抽屉tab
          </el-button>
        </el-col>
      </el-row>
      <pop-tabs
        :visible.sync="dialogTabsShow"
        :tabs="tabsArr"
        container="dialog"
        :activeTab.sync="dialogActiveTab"
      ></pop-tabs>
      <pop-tabs
        :visible.sync="drawerTabsShow"
        :tabs="tabsArr"
        :activeTab.sync="drawerActiveTab"
      ></pop-tabs>
    </el-card>
    <el-card header="弹出临时工作台">
      <el-row>
        <el-col>
          <el-button size="small" @click="popStagingShow = true">
            打开临时工作台
          </el-button>
        </el-col>
      </el-row>
      <pop-staging
        :visible.sync="popStagingShow"
        :title="popStagingtitle"
        :columns="columns"
        :tableData="tableData"
        multiple
      ></pop-staging>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ToolView",
  components: {},
  data() {
    return {
      dialogTabsShow: false,
      drawerTabsShow: false,
      dialogActiveTab: "detail",
      drawerActiveTab: "test",
      tabsArr: [
        { label: "详情", name: "detail" },
        { label: "测试", name: "test" },
      ],
      popStagingShow: false,
      popStagingtitle: "临时工作台",
      columns: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "tel", label: "电话" },
        { prop: "email", label: "邮箱" },
        { prop: "happy", label: "爱好" },
        { prop: "desc", label: "描述" },
        { prop: "level", label: "等级" },
      ],
      tableData: [
        {
          name: "张三",
          age: 18,
          tel: "12345678901",
          email: "12345678901@qq.com",
          happy: "打游戏",
          desc: "我是一个程序员",
          level: "A",
        },
        {
          name: "李四",
          age: 19,
          tel: "12345678902",
          email: "12345678902@qq.com",
          happy: "打游戏",
          desc: "我是一个程序员",
          level: "B",
        },
        {
          name: "王五",
          age: 20,
          tel: "12345678903",
          email: "12345678903@qq.com",
          happy: "打游戏",
          desc: "我是一个程序员",
          level: "C",
        },
        {
          name: "赵六",
          age: 21,
          tel: "12345678904",
          email: "12345678904@qq.com",
          happy: "打游戏",
          desc: "我是一个程序员",
          level: "A",
        },
        {
          name: "钱七",
          age: 22,
          tel: "12345678905",
          email: "12345678905@qq.com",
          happy: "打游戏",
          desc: "我是一个程序员",
          level: "B",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
