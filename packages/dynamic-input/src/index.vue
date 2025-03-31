<template>
    <div :class="['dynamic-input', `is-${mode}`,
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
                                    v-model="item[field.model]" :size="size" />
                            </el-form-item>
                            <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                v-model="item[field.model]" :size="size" />
                        </slot>
                    </el-col>
                    <el-col v-if="mutable" class="dynamic-input-item-actions__wrapper">
                        <slot name="actions">
                            <el-button-group class="dynamic-input-item-actions">
                                <el-button class="dynamic-input-remove" :size="size"
                                    :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                    @click="handleRemove(index)"></el-button>
                                <el-button class="dynamic-input-add" :size="size"
                                    :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                    @click="handleAdd(index)"></el-button>
                                <template v-if="sortable">
                                    <el-button class="dynamic-input-move-up" :size="size" :disabled="index === 0"
                                        icon="el-icon-top" @click="handleMoveUp(index)"></el-button>
                                    <el-button class="dynamic-input-move-down" :size="size"
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
                                        v-model="item[field.model]" :size="size" />
                                </el-form-item>
                                <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                    v-model="item[field.model]" :size="size" />
                            </slot>
                        </td>
                        <td v-if="mutable" class="dynamic-input-item-actions__wrapper">
                            <slot name="actions">
                                <el-button-group class="dynamic-input-item-actions">

                                    <el-button class="dynamic-input-remove" :size="size"
                                        :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                        @click="handleRemove(index)"></el-button>
                                    <el-button class="dynamic-input-add" :size="size"
                                        :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                        @click="handleAdd(index)"></el-button>
                                    <template v-if="sortable">
                                        <el-button class="dynamic-input-move-up" :size="size" :disabled="index === 0"
                                            icon="el-icon-top" @click="handleMoveUp(index)"></el-button>
                                        <el-button class="dynamic-input-move-down" :size="size"
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
                                    v-model="item[field.model]" :size="size" />
                            </el-form-item>
                            <component v-else class="dynamic-input-item-component" :is="field.component || 'el-input'"
                                v-model="item[field.model]" :size="size" />
                        </slot>
                    </div>
                    <div v-if="mutable" class="dynamic-input-item-actions__wrapper">
                        <slot name="actions">
                            <el-button-group class="dynamic-input-item-actions">
                                <el-button class="dynamic-input-remove" :size="size"
                                    :disabled="min && modelValue.length <= min" icon="el-icon-minus"
                                    @click="handleRemove(index)"></el-button>
                                <el-button class="dynamic-input-add" :size="size"
                                    :disabled="max && modelValue.length === max" icon="el-icon-plus"
                                    @click="handleAdd(index)"></el-button>
                                <template v-if="sortable">
                                    <el-button class="dynamic-input-move-up" :size="size" :disabled="index === 0"
                                        icon="el-icon-top" @click="handleMoveUp(index)"></el-button>
                                    <el-button class="dynamic-input-move-down" :size="size"
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
        value: {
            type: Array,
            default: () => []
        },
        fields: {
            type: Array,
            default: () => []
        },
        mode: {
            type: String,
            default: 'inline',
            validator(val) {
                return ['inline', 'table', 'form'].includes(val)
            }
        },
        prop: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        max: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        ration: {
            type: Number,
            validator(val) {
                return Number.isInteger(val) && val >= 0
            }
        },
        sortable: {
            type: Boolean,
            default: false
        }
    },
    inject: {
        elForm: { default: null }
    },
    data() {
        return {

        }
    },
    computed: {
        modelValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        inElForm() {
            return !!this.elForm
        },
        rules() {
            if (!this.inElForm) {
                return {}
            } else {
                return this.elForm.rules[this.prop]
            }
        },
        size() {
            return this.elForm?.size || ''
        },
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
        onInit() {
            if (this.ration && this.ration > 0) {
                for (let i = 0; i < Math.floor(this.ration); i++) {
                    this.modelValue.push(this.handleCreateItem())
                }
                return
            }
            if (this.min && this.modelValue.length < this.min) {
                const need = Math.floor(this.min - this.modelValue.length)
                for (let i = 0; i < need; i++) {
                    this.modelValue.push(this.handleCreateItem())
                }
                return
            }
        },
        handleCreateItem() {
            const item = {}
            this.fields.forEach(field => {
                item[field.model] = field.defaultValue || null
            })
            return item
        },
        handleAdd(index = -1) {
            if (index === -1) {
                this.modelValue.push(this.handleCreateItem())
            } else {
                this.modelValue.splice(index + 1, 0, this.handleCreateItem())
            }
        },
        handleRemove(index) {
            this.modelValue.splice(index, 1)
        },
        handleMoveUp(index) {
            if (index > 0) {
                const oldRow = this.modelValue[index - 1]
                const newRow = this.modelValue[index]
                this.$set(this.modelValue, index - 1, newRow)
                this.$set(this.modelValue, index, oldRow)
            }
        },
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
.dynamic-input {
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
            }
        }
    }
}

.dynamic-input__medium {

}
.dynamic-input__small {
    
}
.dynamic-input__mini {

}

.is-readonly {}

.is-disabled {}

.is-inline {}

.is-form {}

.is-table {}
</style>