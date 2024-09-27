<template>
  <div class="home">
    <el-row>
      <el-col>
        
      </el-col>
    </el-row>
    <re-detail title="测试详情" :data="detailData"></re-detail>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      detailData: [
        {
          name: 'baseInfo', // 区域名称
          label: '基础信息', // 区域标签
          type: 'descriptions', // 数据展示组件类型，descriptions, table， custom
          config: { column: 3, border: true },
          data: [{
            prop: 'name',
            label: '姓名',
            value: '张三',
            span: 1,
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
          }]
        },
        {
          name: 'contactInfo', // 区域名称
          label: '联系方式', // 区域标签
          type: 'table', // 数据展示组件类型，descriptions, table， custom
          config: {
            columns: [
              {
                prop: 'name',
                label: '姓名',
              },
              {
                prop: 'address',
                label: '地址',
              },
              {
                prop: 'phone',
                label: '电话',
              },
              {
                prop: 'email',
                label: '邮箱',
              },
            ]
          },
          data: [{
            name: '张三',
            address: '上海市浦东新区',
            phone: '13800138000',
            email: 'zhangsan@example.com',
          }, {
            name: '李四',
            address: '上海市浦东新区',
            phone: '13800138000',
            email: 'zhangsan@example.com',

          }, {
            name: '王五',
            address: '上海市浦东新区',
            phone: '13800138000',
            email: 'zhangsan@example.com',
          }]
        }
      ]
    }
  },
  methods: {
    mounted() {



    }


  }
};
</script>
<style lang="scss" scoped>
.home{
  padding: 20px 50px;
}
</style>
