<template>
    <div v-if="!readonly" :class="[
        'base-input-number',
        inputSize && !readonly ? 'base-input--' + inputSize : '',
        { 'is-center': valueAlign === 'center' },
        { 'is-left': valueAlign === 'left' },
        { 'is-prefix': !!this.prefixText && !controls },
        { 'is-suffix': !!this.suffixText && !controls },
    ]">
        <template v-if="!controls">
            <slot v-if="$slots.prefix" name="prefix"></slot>
            <span class="base-input__prefix" v-if="!$slots.prefix && prefixText">{{ prefixText }}</span>
        </template>
        <el-input-number v-model="modelValue" v-bind="$attrs" v-on="$listeners" :controls="controls"
            :controls-position="controlsPosition" />
        <template v-if="!controls">
            <span class="base-input__suffix" v-if="!$slots.suffix && suffixText">{{ suffixText }}</span>
            <slot v-if="$slots.suffix" name="suffix"></slot>
        </template>
    </div>
    <el-input v-else v-model="modelValue" :disabled="$attrs.disabled || readonly"
        :class="{ 'is-readonly': readonly }"></el-input>
</template>
<script>
export default {
    name: "BaseInputNumber",
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    props: {
        value: Number,
        valueAlign: {
            type: String,
            default: "left"
        },
        controls: {
            type: Boolean,
            default: false
        },
        controlsPosition: {
            type: String,
            default: "right"
        },
        prefixText: {
            type: String,
            default: ""
        },
        suffixText: {
            type: String,
            default: ""
        },
        readonly: {
            type: Boolean,
            default: false
        },
        readNullFill: {
            type: String,
            default: "/"
        },
        readTextFormat: {
            type: Function,
            default: function () { }
        }
    },
    data() {
        return {}
    },
    computed: {
        modelValue: {
            get() {
                if (!this.readonly) {
                    return this.value;
                }

                let readonlyValue;
                // 读取格式化函数的优先级最高
                if (this.readTextFormat && typeof this.readTextFormat === 'function' && this.readTextFormat(this.value)) {
                    readonlyValue = this.readTextFormat(this.value);
                } else {
                    // 确保value为正常数字或处理非数字情况
                    const numberValue = Number(this.value);
                    if (isNaN(numberValue) || (typeof this.value !== 'number')) {
                        // 如果value不是正常的数字，使用readNullFill
                        readonlyValue = this.readNullFill;
                    } else {
                        // 否则，根据prefixText和suffixText拼接字符串
                        readonlyValue = [
                            this.prefixText || '',
                            numberValue,
                            this.suffixText || ''
                        ].join('');
                    }
                }

                return readonlyValue;
            },
            set(val) {
                this.$emit("input", val)
            }
        },
        inputSize() {
            return (this.elFormItem || this.elForm || {}).elFormItemSize || this.$ELEMENT.size
        }
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
::v-deep.base-input-number {
    height: 40px;
    background-color: #FFF;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: flex;
    align-items: center;

    .base-input__prefix,
    .base-input__suffix {
        padding: 0 7.5px;
    }

    .el-input-number {
        height: 100%;
        flex: 1;

        .el-input__inner {
            height: 100%;
            line-height: 38px;
            border: none;
        }
    }
}

::v-deep.is-prefix {
    .el-input__inner {
        padding-left: 0;
    }
}

::v-deep.is-suffix {
    .el-input__inner {
        padding-right: 0;
    }
}

::v-deep.is-left {
    .el-input__inner {
        text-align: left;
    }
}

::v-deep.is-center {
    .el-input__inner {

        text-align: center;
    }
}

::v-deep.base-input--medium {
    height: auto;

    .el-input__inner {
        height: 100%;
    }
}

::v-deep.base-input--small {
    height: auto;

    .el-input__inner {
        height: 100%;
    }
}

::v-deep.base-input--mini {
    height: auto;

    .el-input__inner {
        height: 100%;
    }
}

::v-deep.is-readonly {
    .el-textarea__inner::-webkit-input-placeholder {
        color: #FFF;
    }

    .el-textarea__inner:-ms-input-placeholder {
        color: #FFF;
    }

    .el-textarea__inner::-ms-input-placeholder {
        color: #FFF;
    }

    .el-textarea__inner::placeholder {
        color: #FFF;
    }

    .el-input__inner::-webkit-input-placeholder {
        color: #FFF;
    }

    .el-input__inner:-ms-input-placeholder {
        color: #FFF;
    }

    .el-input__inner::-ms-input-placeholder {
        color: #FFF;
    }

    .el-input__inner::placeholder {
        color: #FFF;
    }
}</style>