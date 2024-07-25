<template>
    <el-radio-group v-bind="$attrs" v-model="modelValue" :class="[
        'base-radio-group',
        groupSize ? 'base-radio-group--' + groupSize : '',
        { 'is-bordered': groupBorder },
        { 'is-neat': neat },
        { 'is-readonly': readonly }
    ]" :disabled="$attrs.disabled || readonly">
        <el-radio v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled"
            :border="itemBorder">{{ item.label }}</el-radio>
    </el-radio-group>
</template>
<script>
export default {
    name: "BaseRadioGroup",
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    props: {
        value: [String, Number],
        options: {
            type: Array,
            default: () => []
        },
        readonly: {
            type: Boolean,
            default: false
        },
        neat: {
            type: Boolean,
            default: false
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
                return this.value
            },
            set(val) {
                this.$emit("input", val)
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
};
</script>
<style lang="scss" scoped>
::v-deep.base-radio-group {
    width: 100%;
    height: 40px;
    line-height: inherit;
    overflow: hidden;
    display: flex;
    align-items: center;

    .el-radio {
        line-height: inherit;
    }
}

.base-radio-group--medium {
    height: 40px;
}

.base-radio-group--small {
    height: 32px;
}

.base-radio-group--mini {
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
    .el-radio.is-bordereded.is-disabled {
        cursor: auto;
        border-color: #DCDFE6;
    }

    .el-radio__input.is-disabled+span.el-radio__label {
        color: #606266;
        cursor: auto;
    }

    .el-radio__input.is-disabled .el-radio__inner {
        border: 1px solid #DCDFE6;
        background-color: #FFF;
        cursor: auto;
    }

    .el-radio__input.is-disabled .el-radio__inner::after {
        cursor: auto;
        background-color: #F5F7FA
    }

    .el-radio__input.is-disabled .el-radio__inner+.el-radio__label {
        cursor: auto
    }

    .el-radio__input.is-disabled.is-checked .el-radio__inner {
        border-color: #409EFF;
        background-color: #409EFF;
    }

    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
        background-color: #FFF;
    }

    .el-radio__input.is-disabled.is-checked+span.el-radio__label {
        color: #409EFF;
        cursor: auto;
    }
}
</style>