<template>
  <div class="print">
    <el-row>
      <el-col>
        <el-button v-print="print">打印</el-button>
      </el-col>
    </el-row>
    <div id="print-area">
      <h3 style="text-align: center; padding: 5px">产品装箱单</h3>
      <div style="text-align: right">流程编号：{{ "XXXXXXXXXXXXXX" }}</div>
      <table
        style="width: 100%; border: 1px solid black; border-collapse: collapse"
        class="border-table"
      >
        <tr>
          <td>密级</td>
          <td>一般</td>
          <td>编号</td>
          <td>zhaungxZZZZdadas</td>
        </tr>
        <tr>
          <td>合同号</td>
          <td>HT00023121546</td>
          <td>监管协议号</td>
          <td>56645LDSASLFAS</td>
        </tr>
        <tr>
          <td>顾客代表</td>
          <td>李云飞</td>
          <td>任务号</td>
          <td>HJ/56AS</td>
        </tr>
        <tr>
          <td>订货单位</td>
          <td>四川成都科技飞行公司</td>
          <td>装箱日期</td>
          <td>2024-12-18</td>
        </tr>
        <tr>
          <td>收货人地址</td>
          <td colspan="3">四川省成都市青羊区XXXXXXXXXXXXXXXX</td>
        </tr>
        <tr>
          <td>收货人</td>
          <td>龙三</td>
          <td>收货人联系方式</td>
          <td>18281739595</td>
        </tr>
        <tr>
          <td>是否最后一次发货</td>
          <td>否</td>
          <td>合同执行率</td>
          <td></td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">/</td>
        </tr>
        <tr>
          <td colspan="4">/</td>
        </tr>
      </table>
      <table
        style="
          width: 100%;
          border: 1px solid black;
          border-collapse: collapse;
          margin-top: -1px;
        "
        class="border-table"
      >
        <tr style="width: 100%;text-align: center;">
          <td style="width: 8%;text-align: center;">序号</td>
          <td style="width: 12%;text-align: center;">产品名称</td>
          <td style="width: 12%;text-align: center;">产品型号</td>
          <td style="width: 8%;text-align: center;">数量</td>
          <td style="width: 20%;text-align: center;">产品型号</td>
          <td style="width: 8%;text-align: center;">合同订货数量</td>
          <td style="width: 8%;text-align: center;">已交付数量</td>
          <td style="width: 8%;text-align: center;">未交付数量</td>
          <td style="width: 16%;text-align: center;">备注</td>
        </tr>
        <tr v-for="(item, index) in 5" :key="index">
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td style="text-align: center;">燃油测量器</td>
          <td style="text-align: center;">ZCKDAS</td>
          <td style="text-align: center;">4</td>
          <td style="text-align: center;">2024001</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">/</td>
        </tr>
        <tr>
          <td colspan="9">合计数量： 40</td>
        </tr>
        <tr>
          <td colspan="2">配套清单</td>
          <td colspan="7"></td>
        </tr>
      </table>
      <div style="padding: 5px 10px">
        注：收到产品请速开箱核对，如发现该装箱单与产品不符，请与售后联系（1810660002），如需退回，请在七日内将装箱单与产品一并退回我公司，以便处理
      </div>
      <div style="display: flex;flex-wrap: wrap;padding-top: 5px;">
        <div style="width: 50%;display: flex;">
          <div>装箱人：</div>
          <div>李云龙</div>
        </div>
        <div style="width: 50%;display: flex;">
          <div style="width: 100px;">发货单位：</div>
          <div>四川泛化航空仪表电器有限公司（205厂）成品库</div>
        </div>
        <div style="width: 50%;display: flex;">
          <div>代表室：</div>
          <div></div>
        </div>
        <div style="width: 50%;display: flex;">
          <div style="width: 100px;">发货地址：</div>
          <div>四川省成都市新都区兴业路389号（610500）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      print: {
        id: "print-area",
      },
      showType: "simple",
      detailData: [
        {
          name: "baseInfo", // 区域名称
          label: "基础信息", // 区域标签
          type: "descriptions", // 数据展示组件类型，descriptions, table， custom
          config: { column: 3, border: true },
          data: [
            {
              prop: "name",
              label: "姓名",
              value: "张三",
              span: 1,
            },
            {
              prop: "age",
              label: "年龄",
              value: 28,
              span: 1,
            },
            {
              prop: "gender",
              label: "性别",
              value: "男",
              span: 1,
            },
          ],
        },
        {
          name: "contactInfo", // 区域名称
          label: "联系方式", // 区域标签
          type: "table", // 数据展示组件类型，descriptions, table， custom
          config: {
            columns: [
              {
                prop: "name",
                label: "姓名",
              },
              {
                prop: "address",
                label: "地址",
              },
              {
                prop: "phone",
                label: "电话",
              },
              {
                prop: "email",
                label: "邮箱",
              },
            ],
          },
          data: [
            {
              name: "张三",
              address: "上海市浦东新区",
              phone: "13800138000",
              email: "zhangsan@example.com",
            },
            {
              name: "李四",
              address: "上海市浦东新区",
              phone: "13800138000",
              email: "zhangsan@example.com",
            },
            {
              name: "王五",
              address: "上海市浦东新区",
              phone: "13800138000",
              email: "zhangsan@example.com",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handlePrint() {
      console.log("打印");
      console.log(this.$print);
      // this.$print("#print-area");
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 20px 50px;
}
@media print {
  @page {
    size: auto;
    margin: 8mm;
  }
}
.table {
  width: 100%;
  .tbody {
    width: 100%;
  }
}
tr {
  width: 100%;
}
.border-table td {
  border: 1px solid black;
  padding: 5px;
}
</style>
