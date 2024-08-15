<template>
  <div class="tool">
    <el-card header="通用搜索框">
      <base-searcher :show-all.sync="showAll" :factors="seacherFactors" @search="handleSearch" />
    </el-card>
    <el-card header="通用工具栏组件">
      <base-toolbar :actions="toolbarActions" :tools="toolbarTools" @refresh="handleRefresh" @export="handleExport" />
    </el-card>
    <el-card header="通用表格组件">
      <base-table :columns="tableColumns" :data="tableData">
        <template slot="header" slot-scope="scope">
          <span style="color: brown;">{{ scope.column?.label }}</span>
        </template>
        <template slot="emailLabel">
          <span>邮箱</span><i class="el-icon-info"></i>
        </template>
        <template slot="sexContent" slot-scope="scope">
          <el-tag>{{ scope.row.sex }}</el-tag>
        </template>
      </base-table>
    </el-card>
    <el-card header="通用列表组件"></el-card>
    <el-card header="通用分页器组件"></el-card>
    <el-card header="通用工作台组件">
      <el-row style="margin-bottom: 10px;">
        <el-col>
          <el-button size="small" @click="currentWork = 'addUser'">新增用户</el-button>
          <el-button size="small" @click="currentWork = 'viewUser'">查看用户</el-button>
          <el-button size="small" @click="layout = 'two'">上下布局</el-button>
          <el-button size="small" @click="layout = 'three'">上中下布局</el-button>
        </el-col>
      </el-row>
      <base-workbench :current-work="currentWork" :layout="layout" :works="works" :actions="actions"
        @submit="handleSubmit" @print="handlePrint">
        <el-form v-if="currentWork === 'addUser'" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <el-descriptions v-if="currentWork === 'viewUser'" class="margin-top" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              居住地
            </template>
            苏州市
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              备注
            </template>
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              联系地址
            </template>
            江苏省苏州市吴中区吴中大道 1188 号
          </el-descriptions-item>
        </el-descriptions>
      </base-workbench>
    </el-card>
    <el-card header="通用数据转换组件">
      <base-converter :value="['A', 'B']" :source="dict" container="el-tag" />
      <base-converter :value="['name', 'remark']" :source="student" />
      <base-converter :value="currentDate" :source="formatDate" />
    </el-card>
    <el-card header="通用描述列表组件">
      <base-descriptions :data="personalData" border :column="3" layout="auto">
        <template #label="scope">
          {{ scope.dataItem.label + ':' }}
        </template>
      </base-descriptions>
    </el-card>
    <el-card header="通用详情组件"></el-card>
  </div>
</template>

<script>
export default {
  name: "ToolView",
  components: {},
  data() {
    return {
      showAll: false,
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
      // 工具栏props
      toolbarActions: [
        { name: "add", label: "添加", config: { type: "primary", icon: "el-icon-plus" } },
        { name: "del", label: "删除", config: { type: "danger", icon: "el-icon-delete" } },
      ],
      toolbarTools: [
        {
          toolName: "refresh", label: "刷新", tooltip: true, tipContent: '刷新',
          config: { type: "info", plain: true, icon: "el-icon-refresh", circle: true },
          eventType: "click", eventName: "refresh",
        },
        {
          toolName: "export", label: "导出", tooltip: true, tipContent: '导出',
          config: { type: "info", plain: true, icon: "el-icon-download", circle: true },
          eventType: "click", eventName: "export",
        },
      ],
      // 表格组件props
      tableColumns: [
        { prop: "name", label: "姓名", align: "center" },
        { prop: "age", label: "年龄", align: "center" },
        { prop: "sex", label: "性别", align: "center" },
        { prop: "address", label: "地址", align: "center" },
        { prop: "phone", label: "电话", align: "center" },
        { prop: "email", label: "邮箱", align: "center" }
      ],
      tableData: [
        { name: "张三", age: 18, sex: "男", address: "北京", phone: "12345678901", email: "12345678901@qq.com" },
        { name: "李四", age: 19, sex: "女", address: "上海", phone: "12345678901", email: "12345678901@qq.com" },
        { name: "王五", age: 20, sex: "男", address: "广州", phone: "12345678901", email: "12345678901@qq.com" },
        { name: "赵六", age: 21, sex: "女", address: "深圳", phone: "12345678901", email: "12345678901@qq.com" }
      ],
      // 描述列表props
      student: {
        name: "张三",
        age: 18,
        sex: "男",
        address: "北京",
        phone: "12345678901",
        email: "12345678901@qq.com",
        remark: "这是一个备注",
      },
      currentDate: new Date(),
      currentWork: 'addUser',
      works: [{
        key: 'addUser',
        label: '新增用户',
        actions: ['submit', 'cancel']
      }, {
        key: 'viewUser',
        label: '查看用户',
        actions: ['print', 'cancel']
      }],
      actions: [
        { label: '提交', eventName: 'submit', type: 'primary', belong: ['addUser'] },
        { label: '打印', eventName: 'print', type: 'info', belong: ['viewUser'] },
        { label: '取消', eventName: 'cancel' },
      ],
      layout: 'two',
      form: {
        name: "",
        age: "",
        tel: "",
        email: "",
      },

      personalData: [
        {
          prop: 'name',
          label: '姓名',
          value: '张三',
          span: 1,
          labelClassName: 'labelClassName',
          contentClassName: 'contentClassName',
          labelStyle: {
            color: 'red'
          },
          contentStyle: {
            color: 'blue'
          }
        },
        {
          prop: 'age',
          label: '年龄',
          value: 28,
          span: 1,
        },
        {
          prop: 'gender',
          label: '性别',
          value: '男',
          span: 1,
        },
        {
          prop: 'phone',
          label: '电话',
          value: '13800138000',
          span: 1,
        },
        {
          prop: 'address',
          label: '地址',
          value: '上海市浦东新区',
          span: 1,
        },
        {
          prop: 'education',
          label: '学历',
          value: '本科',
          span: 1,
        },
        {
          prop: 'company',
          label: '公司',
          value: '阿里巴巴集团',
          span: 1,
        },
        {
          prop: 'email',
          label: '邮箱',
          value: 'zhangsan@example.com',
          span: 1,
        },
        {
          prop: 'position',
          label: '职位',
          value: '软件工程师',
          span: 1,
        },
        {
          prop: 'hobbies',
          label: '爱好',
          value: '编程, 阅读, 游泳',
          span: 1,
        },

      ]

    };
  },
  methods: {
    handleSearch(val) {
      console.log(val);
    },
    handleRefresh() {
      console.log('工具栏刷新');
    },
    handleExport() {
      console.log('工具栏导出');
    },
    handleSubmit() {
      console.log("新增用户并提交");
    },
    handlePrint() {
      console.log("查看用户并打印");
    },
    // 格式化日期，Date对象，变为YYYY-MM-DD HH:mm:ss的字符串
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
