<template>
  <div class="test-view">
    <re-detail title="合同详情" :sections="contractDetail" show-type="card" :data="contractDetailData"> 
      <template #askInfoContent="scope">
        <el-descriptions :column="2" :border="true">
          <el-descriptions-item label="批架次号">{{ scope.data.productInfo.batch }}</el-descriptions-item>
          <el-descriptions-item label="有无计划">{{ scope.data.productInfo.isNeedPlan }}</el-descriptions-item>
        </el-descriptions>
        <el-table :data="scope.data.systemModelTable">
          <el-table-column prop="systemModel" label="系统型号" align="center" />
                <el-table-column prop="systemModelName" label="型号名称" align="center" />
                <el-table-column prop="usageCount" label="数量" align="center" />
                <el-table-column prop="price" label="型号单价" align="center" />
                <el-table-column prop="totalPrice" label="总价" align="center" />
        </el-table>
        <el-table :data="scope.data.askTable">
          <el-table-column prop="systemModel" label="系统型号" align="center" />
          <el-table-column prop="model" label="产品型号" align="center" />
          <el-table-column prop="productName" label="产品名称" align="center" />
          <el-table-column prop="productType" label="生产分类" align="center" />
          <el-table-column prop="consumptionQuantity" label="产品数量" align="center" />
          <el-table-column prop="shippedQuantity" label="已发货数" align="center" />
          <el-table-column prop="unitPrice" label="含税单价" align="center" />
          <el-table-column prop="unit" label="单位" align="center" />
          <el-table-column prop="totalPrice" label="总价" align="center" />
          <el-table-column prop="services" label="军种" align="center" />
          <el-table-column prop="technicalConditions" label="阶段状态" align="center" />
          <el-table-column label="已入库数" align="center" />
        </el-table>
      </template>
      <template #deliveryInfoContent="scope">
        <el-table :data="scope.data.deliveryTable" border>
          <el-table-column prop="systemModel" label="系统型号" align="center" :resizable="false" />
          <el-table-column prop="productName" label="产品名称" align="center" :resizable="false" />
          <el-table-column prop="model" label="产品型号" align="center" :resizable="false" />
          <el-table-column prop="unitPrice" label="含税单价" align="center" :resizable="false" />
          <el-table-column prop="plannedDelivery" label="交付数量" align="center" width="50" :resizable="false" />
          <el-table-column prop="years" label="年份" align="center" width="60" :resizable="false" />
          <el-table-column prop="one" label="1月" align="center" width="50" :resizable="false" />
          <el-table-column prop="two" label="2月" align="center" width="50" :resizable="false" />
          <el-table-column prop="three" label="3月" align="center" width="50" :resizable="false" />
          <el-table-column prop="four" label="4月" align="center" width="50" :resizable="false" />
          <el-table-column prop="five" label="5月" align="center" width="50" :resizable="false" />
          <el-table-column prop="six" label="6月" align="center" width="50" :resizable="false" />
          <el-table-column prop="seven" label="7月" align="center" width="50" :resizable="false" />
          <el-table-column prop="eight" label="8月" align="center" width="50" :resizable="false" />
          <el-table-column prop="nine" label="9月" align="center" width="50" :resizable="false" />
          <el-table-column prop="ten" label="10月" align="center" width="50" :resizable="false" />
          <el-table-column prop="eleven" label="11月" align="center" width="50" :resizable="false" />
          <el-table-column prop="twelve" label="12月" align="center" width="50" :resizable="false" />
          <el-table-column prop="totalAmount" label="合计总价" align="center" :resizable="false" />
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
          components: [
            {
              name: "re-descriptions",
              dataKey: "baseInfoList",
              props: {
                column: 3,
                border: true,
                items: [
                  {
                    prop: "isStockContract",
                    label: "是否存量合同",
                    span: 1,
                  },
                  {
                    prop: "contractNumber",
                    label: "合同编号",
                    span: 1,
                  },
                  {
                    prop: "contractName",
                    label: "合同名称",
                    span: 1,
                  },
                  {
                    prop: "partyB",
                    label: "乙方",
                    span: 1,
                  },
                  {
                    prop: "classification",
                    label: "密级",
                    span: 1,
                  },

                  {
                    prop: "applicantDepartment",
                    label: "申请部门",
                    span: 1,
                  },
                  {
                    prop: "applicant",
                    label: "申请人",
                    span: 1,
                  },
                  {
                    prop: "contractType",
                    label: "合同类型",
                    span: 1,
                  },
                  {
                    prop: "category",
                    label: "计划类型",
                    span: 1,
                  },
                  {
                    prop: "incomeCategories",
                    label: "收入分类",
                    span: 1,
                  },
                  {
                    prop: "isSpecial",
                    label: "是否专项合同",
                    span: 1,
                  },
                  {
                    prop: "isDeposit",
                    label: "是否有保证金",
                    span: 1,
                  },
                  {
                    prop: "depositAmount",
                    label: "保证金金额",
                    span: 1,
                  },
                  {
                    prop: "depositTime",
                    label: "保证金时间",
                    span: 1,
                  },
                  {
                    prop: "isBatch",
                    label: "是否大批量",
                    span: 1,
                  },
                  {
                    prop: "batchAmount",
                    label: "大批量金额",
                    span: 1,
                  },
                  {
                    prop: "batchRatio",
                    label: "大批量比例",
                    span: 1,
                  },
                  {
                    prop: "contractAmount",
                    label: "合同总金额",
                    span: 1,
                  },
                  {
                    prop: "taxRate",
                    label: "税率",
                    span: 1,
                  },
                  {
                    prop: "effectiveAmount",
                    label: "有效金额",
                    span: 1,
                  },
                  {
                    prop: "isPrepayment",
                    label: "有无预付款",
                    span: 1,
                  },
                  {
                    prop: "paymentRatio",
                    label: "预付款比例",
                    span: 1,
                  },
                  {
                    prop: "suspendedAmount",
                    label: "暂停金额",
                    span: 1,
                  },
                  {
                    prop: "temporarilyNotAmount",
                    label: "暂不结算金额",
                    span: 1,
                  },
                  {
                    prop: "unpaidAmount",
                    label: "未收款金额",
                    span: 1,
                  },
                  {
                    prop: "contractSigningDate",
                    label: "合同签订日期",
                    span: 1,
                  },
                  {
                    prop: "betCompletionTime",
                    label: "预计完成时间",
                    span: 1,
                  },
                  {
                    prop: "customerFileTwo",
                    label: "合同双方附件",
                    span: 4,
                  },
                ],
              },
              dataInProps: "data",
            },
          ],
        },
        {
          name: "relateInfo",
          label: "相关方信息",
          components: [
            {
              name: "re-descriptions",
              dataKey: "relateInfoList",
              props: {
                column: 3,
                border: true,
                items: [
                  {
                    prop: "clientId",
                    label: "客户名称",
                    span: 1,
                  },
                  {
                    prop: "services",
                    label: "军种",
                    span: 1,
                  },
                  {
                    prop: "customerArea",
                    label: "所属片区",
                    span: 1,
                  },
                  {
                    prop: "salesperson",
                    label: "客户经理",
                    span: 1,
                  },
                  {
                    prop: "projectManager",
                    label: "项目经理",
                    span: 1,
                  },

                  {
                    prop: "taskNumber",
                    label: "任务号",
                    span: 1,
                  },
                  {
                    prop: "regulatoryAgreementNum",
                    label: "监管协议号",
                    span: 1,
                  },
                  {
                    prop: "complianceStatus",
                    label: "监管",
                    span: 1,
                  },
                  {
                    prop: "isOpen",
                    label: "是否开口",
                    span: 1,
                  },
                  {
                    prop: "armyProxy",
                    label: "顾客代表",
                    span: 1,
                  },
                  {
                    prop: "planner",
                    label: "计划员",
                    span: 1,
                  },
                ],
              },
              dataInProps: "data",
            },
          ],
        },
        {
          name: "askInfo",
          label: "产品信息",
          components: [],
        },
        {
          name: "deliveryInfo",
          label: "交付信息",
          components: [],
        }
      ],
      contractDetailData: {
        baseInfo: {
          baseInfoList: {
            contractNumber: "xxxx",
            contractType: "销售合同",
          },
        },
        relateInfo: {
          relateInfoList: {
            clientId: "北京航天航空",
          },
        },
        askInfo: {
          productInfo: {},
          systemModelTable: [],
          askTable: []

        },
        deliveryInfo: {
          deliveryTable: []

        },
      },
    };
  },
  mounted() {
    

  },
  methods: {},
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
