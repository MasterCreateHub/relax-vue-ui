<template>
  <el-table class="editable-table" v-bind="$attrs" v-on="$listeners" ref="table" :data="modelValue">
    <el-table-column v-for="(column, index) in columns" :key="column.prop + index" v-bind="column">
      <template slot-scope="scope">
        <template v-if="!column.editable">
          <slot :name="`${column.prop}`" :row="scope.row" :index="scope.$index">
            {{ scope.row[column.prop] }}
          </slot>
        </template>
        <template v-else>
          <template v-if="activeRowKeys.includes(scope.row[rowKey])">
            <slot :name="`editing_${column.prop}`" :row="scope.row" :index="scope.$index">
              <template v-if="isInForm">
                <el-form-item :prop="column.prop" :rules="column.rules">
                  <component :is="column.editType || 'el-input'" v-model="scope.row[column.prop]"
                    v-bind="column.editConfig" class="editing-cell" />
                </el-form-item>
              </template>
              <template v-else>
                <component :is="column.editType || 'el-input'" v-model="scope.row[column.prop]" v-bind="column.editConfig"
                  class="editing-cell" />
              </template>
            </slot>
          </template>
          <template v-else>
            <slot :name="`normal_${column.prop}`" :row="scope.row" :index="scope.$index">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <slot name="action" :row="scope.row" :index="scope.$index">
          <el-button v-if="!activeRowKeys.includes(scope.row[rowKey])" type="text" size="small"
            @click="editRow(scope.row[rowKey])">编辑</el-button>
          <el-button v-else type="text" size="small" @click="saveRow(scope.row[rowKey])">保存</el-button>
          <el-button type="text" size="small" @click="delRow(scope.row[rowKey])">删除</el-button>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ReEditableTable",
  inject: ["elForm"],
  props: {
    /**
     * @description 表格数据
     * @type {Array}
     */
    value: {
      type: Array,
      required: true,
    },
    /**
     * @description 表格行唯一标识字段
     * @type {String}
     */
    rowKey: {
      type: String,
      default: "value",
    },
    /**
     * @description 表格列配置
     * @type {Array<Column>}
     * @property {Object} Column 列对象
     * @property {String} Column.label 列标签
     * @property {String} Column.prop 列key
     * @property {Boolean} Column.editable 是否可编辑
     * @property {String} Column.editComponent 编辑组件
     * @property {Object} Column.editComponentProps 编辑组件的属性
     * @property {Object} Column.editComponentEvents 编辑组件的事件
     * @property {Object} Column.rules 列校验规则
     *
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * @description 是否允许多行同时处于编辑状态
     * @type {Boolean}
     * @default false
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 正在编辑的行的key值数组
     * @type {Array<String>}
     * @default []
     */
    activeKeys: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    /**
     * @description 实现表格数据编辑的v-model
     */
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val, [...this.activeRowKeys]);
      },
    },
    /**
     * @description 表格行对象的键数组
     */
    rowObjectKeys() {
      if (Array.isArray(this.value) && this.value.length > 0) {
        return Object.keys(this.value[0]);
      } else {
        return this.columns.map((item) => item.prop);
      }
    },
    /**
     * @description 表格处于编辑状态的行
     */
    activeRowKeys: {
      get() {
        if (this.multiple) {
          return this.activeKeys;
        } else {
          return this.activeKeys.length === 1 ? this.activeKeys : [];
        }
      },
      set(val) {
        this.$emit("update:activeKeys", [...val]);
        this.$emit("active-change", val);
      },
    },
    /**
     * @description 表格行的校验规则
     */
    rowValidateRules() {
      return this.columns.map((column) => {
        return {
          field: column.prop,
          rules: column.rules
        };
      });
    },
    /**
     * @description 是否在el-form中使用
     */
    isInForm() {
      return new Boolean(this.elForm);
    },
  },
  methods: {
    // 新增行
    addRow(row) {
      if (row && Object.prototype.toString.call(row) === "[object Object]") {
        let data = { ...row };
        if (
          this.modelValue.some(
            (item) => item[this.rowKey] === data[this.rowKey]
          )
        ) {
          data[this.rowKey] = Date.now().toString();
          this.modelValue.push(data);
          this.editRow(data[this.rowKey]);
        } else {
          this.modelValue.push(data);
          this.editRow(data[this.rowKey]);
        }
      } else {
        let newRow = {};
        this.rowObjectKeys.forEach((key) => {
          newRow[key] = null;
        });
        newRow[this.rowKey] = Date.now().toString();
        this.modelValue.push(newRow);
        this.editRow(newRow[this.rowKey]);
      }
    },
    // 编辑行
    editRow(key) {
      if (this.multiple) {
        this.activeRowKeys.push(key);
      } else {
        this.activeRowKeys = [key];
      }
    },
    // 保存行
    saveRow(key) {
      if (this.multiple) {
        this.activeRowKeys = this.activeRowKeys.filter((item) => item !== key);
      } else {
        this.activeRowKeys = [];
      }
    },
    // 删除行
    delRow(key) {
      console.log('调用了');
      this.modelValue = this.modelValue.filter(
        (item) => item[this.rowKey] !== key
      );
    },
    // 校验行
    validate() {
      if (this.isInForm) {
        return this.elForm.validate();
      } else {
        return new Promise((resolve, reject) => {
          let valid = true;
          this.tableData.forEach(row => {
            for (const column of this.columns) {
              if (column.rules) {
                const ruleResults = column.rules.map(rule => rule.validator(row[column.prop]));
                if (ruleResults.some(result => result === false)) {
                  valid = false;
                }
              }
            }
          });
          valid ? resolve() : reject(new Error('表单校验失败'));
        });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.editing-cell {
  width: 100%;
}

.is-error {
  border: #ff4949 1px solid;
  border-radius: 4px;
}
</style>
