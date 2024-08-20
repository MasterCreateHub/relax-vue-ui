<template>
  <div class="home">
    <el-card>
      <el-table :show-summary="true" :data="tableData" :summary-method="onSummary">
        <el-table-column prop="contractNumber" label="合同号" align="center">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"  align="center">
        </el-table-column>
        <el-table-column prop="model" label="产品型号"  align="center">
        </el-table-column>
        <el-table-column prop="year" label="年"  align="center">
        </el-table-column>
        <el-table-column label="一月"  align="center">
          <el-table-column prop="onePlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="one" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="二月"  align="center">
          <el-table-column prop="twoPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="two" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="三月"  align="center">
          <el-table-column prop="threePlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="three" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="四月"  align="center">
          <el-table-column prop="fourPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="four" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="五月"  align="center">
          <el-table-column prop="fivePlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="five" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="六月"  align="center">
          <el-table-column prop="sixPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="six" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="七月"  align="center">
          <el-table-column prop="sevenPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="seven" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="八月"  align="center">
          <el-table-column prop="eightPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="eight" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="九月"  align="center">
          <el-table-column prop="ninePlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="nine" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="十月"  align="center">
          <el-table-column prop="tenPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="ten" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="十一月"  align="center">
          <el-table-column prop="elevenPlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="eleven" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="十二月"  align="center">
          <el-table-column prop="twelvePlan" label="计划"  align="center">
          </el-table-column>
          <el-table-column prop="twelve" label="实际"  align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data(){
    return {
      tableData: [
        {
          contractNumber: "2021-0001",
          productName: "产品1",
          model: "型号1",
          year: "2024",
          onePlan: 100,
          one: 100,
          twoPlan: 100,
          two: 100,
          threePlan: 100,
          three: 100,
          fourPlan: 100,
          four: 100,
          fivePlan: 100,
          five: 100,
          sixPlan: 100,
          six: 100,
          sevenPlan: 100,
          seven: 100,
          eightPlan: 100,
          eight: 100,
          ninePlan: 100,
          nine: 100,
          tenPlan: 100,
          ten: 100,
          elevenPlan: 100,
          eleven: 100,
          twelvePlan: 100,
          twelve: 100
        },
        {
          contractNumber: "2021-0002",
          productName: "产品2",
          model: "型号2",
          year: "2024",
          onePlan: 100,
          one:100,
          twoPlan: 100,
          two: 100,
          threePlan: 100,
          three: 100,
          fourPlan: 100,
          four: 100,
          fivePlan: 100,
          five: 100,
          sixPlan: 100,
          six: 100,
          sevenPlan: 100,
          seven: 100,
          eightPlan: 100,
          eight: 100,
          ninePlan: 100,
          nine: 100,
          tenPlan: 100,
          ten: 100,
          elevenPlan: 100,
          eleven: 100,
          twelvePlan: 100,
          twelve: 100
        },
      ]
    }
  },
  methods:{
    onSummary(params){
      let sums = []
      const { columns, data } = params;
      // console.log(columns, data);
      columns.forEach((column, index) => {
        if (['contractNumber','productName','model'].includes(column.property)) {
          sums[index] = null;
          return;
        }
        if(column.property === 'year'){
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            return value + prev
          })
        }
      })
      return sums
    }
  }
};
</script>
