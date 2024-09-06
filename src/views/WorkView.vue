<template>
  <div class="tool">
    <el-card header="信箱、消息中心">
      <el-row>
        <el-col>
          <letter-box :activeTab.sync="letterBoxActiveTab" :tabs="letterTabs">
            <template #reference>
              <el-button circle size="small" icon="el-icon-message" type="warning" />
            </template>
            <template #notice="scope">
              <div>{{ scope.data.content }}</div>
            </template>
          </letter-box>

        </el-col>
      </el-row>
    </el-card>
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
      <pop-tabs :visible.sync="dialogTabsShow" :tabs="tabsArr" container="dialog"
        :activeTab.sync="dialogActiveTab"></pop-tabs>
      <pop-tabs :visible.sync="drawerTabsShow" :tabs="tabsArr" :activeTab.sync="drawerActiveTab" defaultTab="detail"
        @tabClick="handleTabClick">
        <template #detail>
          <span>这是详情数据</span>
        </template>
        <template #test>
          <span>这是测试数据</span>
        </template>
      </pop-tabs>
    </el-card>
    <el-card header="临时工作台">
      <el-row>
        <el-col>
          <el-button size="small" @click="popStagingShow = true">
            打开临时工作台
          </el-button>
        </el-col>
      </el-row>
      <pop-staging :visible.sync="popStagingShow" :title="popStagingtitle" :columns="columns" :tableData="tableData">
        <template #tableBody="scope">
          <template v-if="scope.column.property === 'level'">
            <el-tag>{{ scope.row.level }}</el-tag>
          </template>
        </template>
        <template #operate>
          <div class="operate">
            <el-form>
              <el-form-item label="将所选数据发送给">
                <el-input v-model="name" placeholder="请输入目的地" />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </pop-staging>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "WorkView",
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
        { label: "提交", name: "submit" },
        { label: "金额", name: "amount" }
      ],
      popStagingShow: false,
      popStagingtitle: "临时工作台",
      name: null,
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
      letterTabs: [
        {
          name: 'notice',
          label: "通知",
          list: [
            {
              id: 1,
              title: "通知1",
              content: "通知内容1",
              time: "2020-01-01",
            },
            {
              id: 2,
              title: "通知2",
              content: "通知内容2",
              time: "2020-01-02",
            },
            {
              id: 3,
              title: "通知3",
              content: "通知内容3",
              time: "2020-01-03",
            },
            {
              id: 4,
              title: "通知4",
              content: "通知内容4",
              time: "2020-01-04",
            },
            {
              id: 5,
              title: "通知5",
              content: "通知内容5",
              time: "2020-01-05",
            }
          ],
        },
        {
          name: 'message',
          label: "私信",
          list: [],
        },
        {
          name: 'wait',
          label: "代办",
          list: [],
        }
      ],
      letterBoxActiveTab: 'notice',
    };
  },
  methods: {
    handleTabClick(value) {
      console.log('测试', value);

    },
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}

.operate {
  width: 100%;
  height: 100px;
}
</style>
