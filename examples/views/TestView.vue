<template>
  <div class="test-view">
    <re-detail title="合同详情" :data="contractDetail" show-type="card">
      <template #askInfoContent="scope">
        <el-table :data="scope.data">
          <el-table-column prop="systemModel" label="系统型号" align="center" />
          <el-table-column prop="model" label="产品型号" align="center" />
          <el-table-column prop="productName" label="产品名称" align="center" />
          <el-table-column prop="productType" label="生产分类" align="center" />
          <el-table-column prop="consumptionQuantity" label="产品数量" align="center" />
          <el-table-column prop="shippedQuantity" label="已发货数量" align="center" />
          <el-table-column prop="unitPrice" label="含税单价" align="center" />
          <el-table-column prop="unit" label="单位" align="center" />
          <el-table-column prop="totalPrice" label="总价" align="center" />
          <el-table-column prop="services" label="军种" align="center" />
          <el-table-column prop="technicalConditions" label="阶段状态" align="center" />
          <el-table-column label="入库绑定数量" align="center" />
        </el-table>
      </template>
      <template #deliveryInfoContent="scope">
        <el-table :data="scope.data">
          <el-table-column prop="productName" label="产品名称" align="center" />
          <el-table-column prop="model" label="产品型号" align="center" />
          <el-table-column prop="unitPrice" label="含税单价" align="center" />
          <el-table-column prop="plannedDelivery" label="计划交付数量" align="center" />
          <el-table-column prop="yearAndMoon" label="日期" align="center" />
        </el-table>
      </template>
    </re-detail>

  </div>
</template>

<script>
export default {
  name: "TestView",
  components: {},
  data() {
    return {
      contractDetail: [
        {
          name: "baseInfo",
          label: "基础信息",
          components: [{
            name: "re-descriptions",
            props: { column: 3, border: true },
            dataForProps: "data",
            data: [
              {
                prop: "isStockContract",
                label: "是否存量合同",
                value: "1",
                span: 1,
              },
              {
                prop: "contractNumber",
                label: "合同编号",
                value: "XXXXXXXXXXXXXXX",
                span: 1,
              },
              {
                prop: "contractName",
                label: "合同名称",
                value: "XXX合同",
                span: 1,
              },
              {
                prop: "partyB",
                label: "乙方",
                value: "泛华",
                span: 1,
              },
              {
                prop: "classification",
                label: "密级",
                value: "公开",
                span: 1,
              },

              {
                prop: "applicantDepartment",
                label: "申请部门",
                value: "",
                span: 1,
              },
              {
                prop: "applicant",
                label: "申请人",
                value: "本科",
                span: 1,
              },
              {
                prop: "contractType",
                label: "合同类型",
                value: "销售合同",
                span: 1,
              },
              {
                prop: "category",
                label: "计划类型",
                value: "北京大学",
                span: 1,
              },
              {
                prop: "incomeCategories",
                label: "收入分类",
                value: "",
                span: 1,
              },
              {
                prop: "isSpecial",
                label: "是否专项合同",
                value: "",
                span: 1,
              },
              {
                prop: "isDeposit",
                label: "是否有保证金",
                value: "",
                span: 1,
              },
              {
                prop: "depositAmount",
                label: "保证金金额",
                value: "",
                span: 1,
              },
              {
                prop: "depositTime",
                label: "保证金时间",
                value: "",
                span: 1,
              },
              {
                prop: "isBatch",
                label: "是否大批量",
                value: "",
                span: 1,
              },
              {
                prop: "batchAmount",
                label: "大批量金额",
                value: "",
                span: 1,
              },
              {
                prop: "batchRatio",
                label: "大批量比例",
                value: "",
                span: 1,
              },
              {
                prop: "contractAmount",
                label: "合同总金额",
                value: "",
                span: 1,
              },
              {
                prop: "taxRate",
                label: "税率",
                value: "",
                span: 1,
              },
              {
                prop: "effectiveAmount",
                label: "有效金额",
                value: "",
                span: 1,
              },
              {
                prop: "isPrepayment",
                label: "有无预付款",
                value: "",
                span: 1,
              },
              {
                prop: "paymentRatio",
                label: "预付款比例",
                value: "",
                span: 1,
              },
              {
                prop: "suspendedAmount",
                label: "暂停金额",
                value: "",
                span: 1,
              },
              {
                prop: "temporarilyNotAmount",
                label: "暂不结算金额",
                value: "",
                span: 1,
              },
              {
                prop: "unpaidAmount",
                label: "未收款金额",
                value: "",
                span: 1,
              },
              {
                prop: "contractSigningDate",
                label: "合同签订日期",
                value: "",
                span: 1,
              },
              {
                prop: "betCompletionTime",
                label: "预计完成时间",
                value: "",
                span: 1,
              },
              {
                prop: "customerFileTwo",
                label: "合同双方附件",
                value: "",
                span: 4,
              },

            ],
          }],
        },
        {
          name: "relateInfo",
          label: "相关方信息",
          components: [{
            name: "re-descriptions",
            props: { column: 3, border: true },
            dataForProps: "data",
            data: [
              {
                prop: "clientId",
                label: "客户名称",
                value: "",
                span: 1,
              },
              {
                prop: "services",
                label: "军种",
                value: "",
                span: 1,
              },
              {
                prop: "customerArea",
                label: "所属片区",
                value: "",
                span: 1,
              },
              {
                prop: "salesperson",
                label: "客户经理",
                value: "",
                span: 1,
              },
              {
                prop: "projectManager",
                label: "项目经理",
                value: "公开",
                span: 1,
              },

              {
                prop: "taskNumber",
                label: "任务号",
                value: "",
                span: 1,
              },
              {
                prop: "regulatoryAgreementNum",
                label: "监管协议号",
                value: "本科",
                span: 1,
              },
              {
                prop: "complianceStatus",
                label: "监管",
                value: "本科",
                span: 1,
              },
              {
                prop: "isOpen",
                label: "是否开口",
                value: "",
                span: 1,
              },
              {
                prop: "armyProxy",
                label: "顾客代表",
                value: "",
                span: 1,
              },
              {
                prop: "planner",
                label: "计划员",
                value: "",
                span: 1,
              },
            ],
          }]
        },
        {
          name: "askInfo",
          label: "产品要求",
          data: [
            {
              productName: '测速器',
              model: 'ACKDL',
              unitPrice: 1000,
              plannedDelivery: 5,
              yearAndMoon: '2020-05',
            }
          ],
        },
        {
          name: "deliveryInfo",
          label: "产品要求",
          data: [
            {
              productName: '测速器',
              model: 'ACKDL',
              unitPrice: 1000,
              plannedDelivery: 5,
              yearAndMoon: '2020-05',
            }
          ],
        },
      ],
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.test-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.el-table {
  width: 100%;
  flex: 1;
}
</style>
