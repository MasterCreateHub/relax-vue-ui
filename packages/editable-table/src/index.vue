<template>
  <el-table
    class="editable-table"
    v-bind="$attrs"
    v-on="$listeners"
    ref="table"
    :data="modelValue"
  >
    <el-table-column
      v-for="(column, index) in columns"
      :key="column.prop + index"
      v-bind="column"
    >
      <template slot-scope="scope">
        <template v-if="!column.editable">
          <slot :name="`${column.prop}`" :row="scope.row" :index="scope.$index">
            {{ scope.row[column.prop] }}
          </slot>
        </template>
        <template v-else>
          <template v-if="activeRowKeys.includes(scope.row[rowKey])">
            <slot
              :name="`editing_${column.prop}`"
              :row="scope.row"
              :index="scope.$index"
            >
              <component
                :is="column.editType || 'el-input'"
                v-model="scope.row[column.prop]"
                v-bind="column.editConfig"
                class="base-editing-cell"
              >
              </component>
            </slot>
          </template>
          <template v-else>
            <slot
              :name="`normal_${column.prop}`"
              :row="scope.row"
              :index="scope.$index"
            >
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <slot name="action" :row="scope.row" :index="scope.$index">
          <el-button
            v-if="!activeRowKeys.includes(scope.row[rowKey])"
            type="text"
            size="small"
            @click="editRow(scope.row[rowKey])"
            >编辑</el-button
          >
          <el-button
            v-else
            type="text"
            size="small"
            @click="saveRow(scope.row[rowKey])"
            >保存</el-button
          >
          <el-button type="text" size="small" @click="delRow(scope.row[rowKey])"
            >删除</el-button
          >
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ReEditableTable",
  props: {
    /**
     * @description 表格数据
     */
    value: {
      type: Array,
      required: true,
    },
    /**
     * @description 表格行唯一标识字段
     */
    rowKey: {
      type: String,
      default: "value",
    },
    /**
     * 表格列配置
     * @type {Array<Object>}
     * @property {String} label 列名
     * @property {String} prop 列值
     * @property {Object} rules 列校验规则
     * {
     *     required: true,
     *     type: 'string',
     *     pattern: /^[0-9]*$/,
     *     min: 3,
     *     max: 5,
     *     minLength: 'blur'
     *     maxLength: '请输入数字',
     *     length: 3,
     *     validator: fn
     * }
     *
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * @description 是否允许多行同时处于编辑状态
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * 正在编辑的行的key值数组
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
     * 实现表格数据编辑的v-model
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
     * 表格行对象的键数组
     */
    rowObjectKeys() {
      if (Array.isArray(this.value) && this.value.length > 0) {
        return Object.keys(this.value[0]);
      } else {
        return this.columns.map((item) => item.prop);
      }
    },
    /**
     * 表格处于编辑状态的行
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
     * 表格行的校验规则
     */
    rowValidateRules() {
      return this.columns.map((item) => {
        return {
          field: item.prop,
          ...item.rules,
        };
      });
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
    // 编辑
    editRow(key) {
      if (this.multiple) {
        this.activeRowKeys.push(key);
      } else {
        this.activeRowKeys = [key];
      }
    },
    // 保存
    saveRow(key) {
      if (this.multiple) {
        this.activeRowKeys = this.activeRowKeys.filter((item) => item !== key);
      } else {
        this.activeRowKeys = [];
      }
    },
    // 删除
    delRow(key) {
      this.modelValue = this.modelValue.filter(
        (item) => item[this.rowKey] !== key
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.base-editing-cell {
  width: 100%;
}

.is-error {
  border: #ff4949 1px solid;
  border-radius: 4px;
}
</style>
