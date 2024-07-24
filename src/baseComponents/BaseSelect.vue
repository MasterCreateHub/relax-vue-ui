<template>
    <el-select v-model="modelValue" :multiple="multiple"
        :value-key="optionConfig.key ? optionConfig.key : optionConfig.value" filterable clearable default-first-option
        :disabled="readonly || $attrs.disabled" :class="{ 'is-readonly': readonly }" v-bind="$attrs" v-on="$listeners">
        <slot name="prefix"></slot>  
        <el-option v-for="item in options" :key="item[optionConfig.key ? optionConfig.key : optionConfig.value]"
            :value="item[optionConfig.value]" :label="item[optionConfig.label]">
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'BaseSelect',
    props: {
        value: [String, Number, Array],
        multiple: {
            type: Boolean,
            default: false
        },
        valueFormat: {
            type: String,
            default: 'Array',
            validator(value) {
                return ['Array', 'String'].includes(value)
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
        optionConfig: {
            type: Object,
            default: () => {
                return {
                    key: null, // option 的key值对应的属性名
                    value: 'value', // option 的value值对应的属性名
                    label: 'label', // option 的label值对应的属性名
                };
            },
        },
        options: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
        }
    },
    watch: {
        value(newVal) {
            // 如果是多选且期望字符串格式，确保值始终为字符串
            if (this.multiple && this.valueFormat === 'String') {
                this.$emit("input", Array.isArray(newVal) ? newVal.join(this.valueSeparator) : newVal);
            }
        },
    },
    computed: {
        modelValue: {
            get() {
                if (this.multiple && this.valueFormat === 'String') {
                    return (typeof this.value === 'string' && this.value) ? this.value.split(this.valueSeparator) : []
                } else {
                    return this.value
                }
            },
            set(val) {
                if (this.multiple && this.valueFormat === 'String') {
                    this.$emit("input", val.join(this.valueSeparator))
                } else {
                    this.$emit("input", val)
                }
            }
        }
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
::v-deep.is-readonly {
    .el-input.is-disabled .el-input__inner {
        background-color: #FFF;
        border-color: #DCDFE6;
        color: #606266;
        cursor: auto;
    }

    .el-input__suffix {
        display: none;
    }

    .el-select__tags span.el-tag {
        cursor: default;
    }

    .el-input.is-disabled .el-input__inner::-webkit-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner:-ms-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner::-ms-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner::placeholder {
        color: #FFF;
    }
}
</style>