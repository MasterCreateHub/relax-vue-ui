<template>
    <el-checkbox-group v-bind="$attrs" v-model="modelValue" :class="[
        'base-checkbox-group',
        groupSize ? 'base-checkbox-group--' + groupSize : '',
        { 'is-bordered': groupBorder },
        { 'is-neat': neat },
        { 'is-readonly': readonly }
    ]" :disabled="$attrs.disabled || readonly">
        <el-checkbox v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled"
            :border="itemBorder">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
</template>
<script>
export default {
    name: "BaseCheckboxGroup",
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    props: {
        value: [String, Array],
        valueFormat: {
            type: String,
            default: 'array',
            validator(value) {
                return ['array', 'string'].includes(value)
            }
        },
        valueSeparator: {
            type: String,
            default: ',',
            validator(value) {
                return value.length !== 0
            }
        },
        readonly: {
            type: Boolean,
            default: false
        },
        neat: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => [],
        },
        groupBorder: {
            type: Boolean,
            default: true
        },
        itemBorder: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        modelValue: {
            get() {
                if (this.valueFormat === 'string') {
                    return (typeof this.value === 'string' && this.value) ? this.value.split(this.valueSeparator) : []
                } else {
                    return this.value
                }
            },
            set(val) {
                if (this.valueFormat === 'string') {
                    this.$emit("input", val.join(this.valueSeparator))
                } else {
                    this.$emit("input", val)
                }
            }
        },
        groupSize() {
            return (this.elFormItem || this.elForm || {}).elFormItemSize || this.$ELEMENT.size
        }
    },
    methods: {
        handleChange(value) {
            this.$emit("input", value)
            this.$emit("change", value)
        }
    },
}
</script>
<style lang="scss" scoped>
.base-checkbox-group {
    width: 100%;
    height: 40px;
    line-height: inherit;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.base-checkbox-group--medium {
    height: 36px;
}

.base-checkbox-group--small {
    height: 32px;
}

.base-checkbox-group--mini {
    height: 28px;
}

.is-bordered {
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
}


.is-neat {
    justify-content: space-around;
}

::v-deep.is-readonly {

    .el-checkbox.is-bordereded.is-disabled {
        border-color: #DCDFE6;
        cursor: auto
    }

    .el-checkbox__input.is-disabled+span.el-checkbox__label {
        cursor: auto;
        color: #606266;
    }

    .el-checkbox__input.is-disabled .el-checkbox__inner {
        background-color: #FFF;
        border-color: #DCDFE6;
        cursor: auto;
    }

    .el-checkbox__input.is-disabled .el-checkbox__inner::after {
        cursor: auto;
        border-color: #FFF;
    }

    .el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label {
        cursor: auto;
        color: #606266;
    }

    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
        background-color: #409EFF;
        border-color: #409EFF;
    }

    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
        border-color: #FFF;
    }

    .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
        color: #409EFF
    }
}
</style>