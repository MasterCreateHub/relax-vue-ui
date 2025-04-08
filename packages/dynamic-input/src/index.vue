<template>
    <div :class="['dynamic-input', `is-${mode}`, componentSize ? `dynamic-input--${componentSize}` : '',
        { 'is-disabled': disabled },
        { 'is-readonly': readonly }]">
        <template v-if="mode === 'form'">
            <div class="dynamic-input__inner dynamic-input-item-forms">
                <el-row class="dynamic-input-item" v-for="(item, index) in modelValue" :key="String(item) + index"
                    :gutter="10">
                    <el-col class="dynamic-input-item-component__wrapper" v-for="field in fields" :key="field.model + index"
                        :span="field.span">
                        <slot name="default" :field="field" :item="item">
                            <el-form-item v-if="inElForm" :label="field.label" :prop="`${prop}.${index}.${field.model}`"
                                :rules="rules[field.model]">
                                <component class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                    v-model="item[field.model]" :size="componentSize" />
                            </el-form-item>
                            <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                v-model="item[field.model]" :size="componentSize" />
                        </slot>
                    </el-col>
                    <el-col v-if="mutable" class="dynamic-input-item-actions__wrapper">
                        <slot name="actions">
                            <el-button-group class="dynamic-input-item-actions">
                                <el-button class="dynamic-input-remove" :size="componentSize"
                                    :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                    @click="handleRemove(index)"></el-button>
                                <el-button class="dynamic-input-add" :size="componentSize"
                                    :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                    @click="handleAdd(index)"></el-button>
                                <template v-if="sortable">
                                    <el-button class="dynamic-input-move-up" :size="componentSize" :disabled="index === 0"
                                        icon="el-icon-top" @click="handleMoveUp(index)"></el-button>
                                    <el-button class="dynamic-input-move-down" :size="componentSize"
                                        :disabled="index === modelValue.length - 1" icon="el-icon-bottom"
                                        @click="handleMoveDown(index)"></el-button>
                                </template>
                            </el-button-group>
                        </slot>
                    </el-col>
                </el-row>
            </div>
        </template>
        <template v-else-if="mode === 'table'">
            <table class="dynamic-input__inner dynamic-input-item-table">
                <thead>
                    <tr class="dynamic-input-item-table-header">
                        <th v-for="field in fields" :key="field.model + 'label'">
                            {{ field.label }}
                        </th>
                        <th v-if="mutable">
                            <i class="el-icon-menu"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="dynamic-input-item" v-for="(item, index) in modelValue" :key="String(item) + index">
                        <td class="dynamic-input-item-component__wrapper" v-for="field in fields"
                            :key="field.model + index">
                            <slot name="default" :field="field" :item="item">
                                <el-form-item v-if="inElForm" :prop="`${prop}.${index}.${field.model}`"
                                    :rules="rules[field.model]">
                                    <component class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                        v-model="item[field.model]" :size="componentSize" />
                                </el-form-item>
                                <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                    v-model="item[field.model]" :size="componentSize" />
                            </slot>
                        </td>
                        <td v-if="mutable" class="dynamic-input-item-actions__wrapper">
                            <slot name="actions">
                                <el-button-group class="dynamic-input-item-actions">
                                    <el-button class="dynamic-input-remove" :size="componentSize"
                                        :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                        @click="handleRemove(index)"></el-button>
                                    <el-button class="dynamic-input-add" :size="componentSize"
                                        :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                        @click="handleAdd(index)"></el-button>
                                    <template v-if="sortable">
                                        <el-button class="dynamic-input-move-up" :size="componentSize"
                                            :disabled="index === 0" icon="el-icon-top"
                                            @click="handleMoveUp(index)"></el-button>
                                        <el-button class="dynamic-input-move-down" :size="componentSize"
                                            :disabled="index === modelValue.length - 1" icon="el-icon-bottom"
                                            @click="handleMoveDown(index)"></el-button>
                                    </template>
                                </el-button-group>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template v-else>
            <div class="dynamic-input__inner dynamic-input-item-lines">
                <div class="dynamic-input-item" v-for="(item, index) in modelValue" :key="String(item) + index">
                    <div class="dynamic-input-item-component__wrapper" v-for="field in fields" :key="field.model + index">
                        <slot name="default" :field="field" :item="item">
                            <el-form-item v-if="inElForm" :label="field.label" :prop="`${prop}.${index}.${field.model}`"
                                :rules="rules[field.model]">
                                <component class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                    v-model="item[field.model]" :size="componentSize" />
                            </el-form-item>
                            <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                v-model="item[field.model]" :size="componentSize" />
                        </slot>
                    </div>
                    <div v-if="mutable" class="dynamic-input-item-actions__wrapper">
                        <slot name="actions">
                            <el-button-group class="dynamic-input-item-actions">
                                <el-button class="dynamic-input-remove" :size="componentSize"
                                    :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                    @click="handleRemove(index)"></el-button>
                                <el-button class="dynamic-input-add" :size="componentSize"
                                    :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                    @click="handleAdd(index)"></el-button>
                                <template v-if="sortable">
                                    <el-button class="dynamic-input-move-up" :size="componentSize" :disabled="index === 0"
                                        icon="el-icon-top" @click="handleMoveUp(index)"></el-button>
                                    <el-button class="dynamic-input-move-down" :size="componentSize"
                                        :disabled="index === modelValue.length - 1" icon="el-icon-bottom"
                                        @click="handleMoveDown(index)"></el-button>
                                </template>
                            </el-button-group>
                        </slot>
                    </div>
                </div>
            </div>
        </template>
        <div v-if="modelValue.length === 0" class="dynamic-input-adder" @click="handleAdd()">
            <slot name="adder">
                <el-button type="text" icon="el-icon-plus" />
            </slot>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ReDynamicInput',
    props: {
        /**
         * @description 双向绑定的数组
         * @type {Array}
         * @default []
         */
        value: {
            type: Array,
            default: () => []
        },
        /**
         * @description 对象的字段数组
         * @type {Array}
         * @default []
         */
        fields: {
            type: Array,
            default: () => []
        },
        /**
         * @description 显示模式
         * @type {String}
         * @default 'inline'
         */
        mode: {
            type: String,
            default: 'inline',
            validator(val) {
                return ['inline', 'table', 'form'].includes(val)
            }
        },
        /**
         * @description 该组件数据在表单对象的字段名
         * @type {String}
         * @default ''
         */
        prop: {
            type: String,
            default: ''
        },
        /**
         * @description 是否禁用
         * @type {Boolean}
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description 是否只读
         * @type {Boolean}
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description 数据数组最小长度
         * @type {Number}
         */
        min: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        /**
         * @description 数据数组最大长度
         * @type {Number}
         */
        max: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        /**
         * @description 数据数组固定长度
         * @type {Number}
         */
        ration: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        /**
         * @description 是否开启排序按钮
         * @type {Boolean}
         */
        sortable: {
            type: Boolean,
            default: false
        },
        /**
         * @description 尺寸
         * @type {String}
         */
        size: String,
    },
    inject: {
        elForm: {
            default: null
        },

        elFormItem: {
            default: null
        }
    },
    data() {
        return {

        }
    },
    computed: {
        /**
         * @description 绑定值
         * @type {Boolean}
         */
        modelValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        /**
         * @description 是否在 el-form 内
         * @type {Boolean}
         */
        inElForm() {
            return !!this.elForm
        },
        /**
         * @description 校验规则
         * @type {Object}
         */
        rules() {
            if (!this.inElForm) {
                return {}
            }
            if ((this.elForm.rules || this.elFormItem.rules) && this.prop) {
                return (this.elForm.rules || this.elFormItem.rules)[this.prop] || {}
            }
            return {}
        },
        /**
         * @description 组件尺寸
         * @type {String}
         */
        componentSize() {
            return this.size || this.elFormItem?.size || this.elForm?.size || (this.$ELEMENT || {}).size;
        },
        /**
         * @description 是否可增减
         * @type {Boolean}
         */
        mutable() {
            if (this.ration && this.ration > 0) {
                return false
            }
            if ((this.min && this.max) && this.min === this.max) {
                return false
            }
            return true
        }
    },
    mounted() {
        this.onInit()
    },
    methods: {
        /**
         * @description 组件初始化
         */
        onInit() {
            if (this.ration && this.ration > 0) {
                for (let i = 0; i < Math.floor(this.ration); i++) {
                    this.modelValue.push(this.onCreateItem())
                }
                return
            }
            if (this.min && this.modelValue.length < this.min) {
                const need = Math.floor(this.min - this.modelValue.length)
                for (let i = 0; i < need; i++) {
                    this.modelValue.push(this.onCreateItem())
                }
                return
            }
        },
        /**
         * @description 创建项
         */
        onCreateItem() {
            const item = {}
            this.fields.forEach(field => {
                item[field.model] = field.defaultValue || null
            })
            return item
        },
        /**
        * @description 新增项
        */
        handleAdd(index = -1) {
            const newItem = this.onCreateItem()
            if (index === -1) {
                this.modelValue.push(newItem)
            } else {
                this.modelValue.splice(index + 1, 0, newItem)
            }
            this.$emit('item-added', newItem)
        },
        /**
         * @description 删除项
         */
        handleRemove(index) {
            const oldItem = this.modelValue[index]
            this.modelValue.splice(index, 1)
            this.$emit('item-removed', oldItem)
        },
        /**
         * @description 上移项
         */
        handleMoveUp(index) {
            if (index > 0) {
                const oldRow = this.modelValue[index - 1]
                const newRow = this.modelValue[index]
                this.$set(this.modelValue, index - 1, newRow)
                this.$set(this.modelValue, index, oldRow)
            }
        },
        /**
         * @description 下移项
         */
        handleMoveDown(index) {
            if (index < this.modelValue.length - 1) {
                const oldRow = this.modelValue[index + 1]
                const newRow = this.modelValue[index]
                this.$set(this.modelValue, index + 1, newRow)
                this.$set(this.modelValue, index, oldRow)
            }
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep.dynamic-input {
    background-color: #FFFFFF;
    padding: 15px 15px 0;
    border: 1px solid #e6ebf5;
    border-radius: 4px;

    .dynamic-input-adder {
        text-align: center;
        border: 1px dashed #409eff;
        border-radius: 4px;
        margin-bottom: 15px;
    }

    .dynamic-input-item-actions {
        .el-button {
            padding: 7px 10px;
        }
    }

    .dynamic-input-item-forms {
        .dynamic-input-item {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 10px 0px 10px;
            border: 1px solid #e6ebf5;
            border-radius: 4px;
            margin-bottom: 10px;

            .dynamic-input-item-actions__wrapper {
                flex: 1;
                text-align: right;
            }

        }

        .dynamic-input-item:nth-last-child(1) {
            margin-bottom: 15px;
        }

        .dynamic-input-item:focus-within {
            border: 1px solid #409EFF;
        }
    }

    .dynamic-input-item-table {
        width: 100%;
        border-radius: 4px;
        border-collapse: collapse;

        .dynamic-input-item-table-header {
            border-bottom: 1px solid #DCDFE6;
            background-color: #FAFAFA;

            th {
                text-align: center;
                color: #515A6E;
                padding: 10px 10px;
                font-size: 14px;
            }
        }

        .dynamic-input-item {
            border-bottom: 1px solid #DCDFE6;

            .dynamic-input-item-component__wrapper {
                padding: 20px 10px;
                text-align: center;

                .el-form-item,
                .el-form-item--medium.el-form-item,
                .el-form-item--mini.el-form-item,
                .el-form-item--small.el-form-item {
                    margin-bottom: 0px;
                }
            }

            .dynamic-input-item-actions__wrapper {
                text-align: center;
            }
        }

        .dynamic-input-item:nth-last-child(1) {
            border-bottom: none;
        }
    }

    .dynamic-input-item-lines {
        .dynamic-input-item {
            display: flex;

            .dynamic-input-item-component__wrapper {
                margin-right: 10px;
                flex: 1;

                .el-form-item {
                    display: flex;
                    .el-form-item__label {
                        padding: 0px 10px;
                        flex-shrink: 0;
                    }
                }
            }
        }
    }

}

.dynamic-input__medium {}

.dynamic-input__small {}

.dynamic-input__mini {}

.is-readonly {}

.is-disabled {}

.is-inline {}

.is-form {}

.is-table {}
</style>