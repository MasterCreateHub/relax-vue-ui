<template>
  <div class="tool">
    <el-card header="通用搜索框">
      <base-searcher :span="6" :factors="seacherFactors" @search="handleSearch" />
    </el-card>
    <el-card header="通用数据转换器">
      <base-converter :value="['A', 'B']" :source="dict" container="el-tag"></base-converter>
    </el-card>
    <el-card header="通用工作台">
      <el-row style="margin-bottom: 10px;">
        <el-col>
          <el-button size="small" @click="currentWork = 'addUser'">新增用户</el-button>
          <el-button size="small" @click="currentWork = 'viewUser'">查看用户</el-button>
          <el-button size="small" @click="layout = 'two'">上下布局</el-button>
          <el-button size="small" @click="layout = 'three'">上中下布局</el-button>
        </el-col>
      </el-row>
      <base-workbench :current-work="currentWork" :layout="layout" :works="works" :actions="actions" @submit="handleSubmit"
        @print="handlePrint">
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
        { label: '提交', event: 'submit', type: 'primary', belong: ['addUser'] },
        { label: '打印', event: 'print', type: 'info', belong: ['viewUser'] },
        { label: '取消', event: 'cancel' },
      ],
      layout: 'two',
      form: {
        name: "",
        age: "",
        tel: "",
        email: "",
      },

    };
  },
  methods: {
    handleSearch(val) {
      console.log(val);
    },
    handleSubmit() {
      console.log("新增用户并提交");
    },
    handlePrint() {
      console.log("查看用户并打印");
    }
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
