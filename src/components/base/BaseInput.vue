<template>
    <el-input v-model="modelValue" v-bind="$attrs" v-on="$listeners" :disabled="$attrs.disabled || readonly"
        :class="{ 'is-readonly': readonly }" @blur="onInputBlur">
        <template #prepend>
            <slot v-if="!readonly" name="prepend"></slot>
        </template>
        <template #prefix>
            <slot v-if="!readonly" name="prefix"></slot>
        </template>
        <template #suffix>
            <slot v-if="!readonly" name="suffix"></slot>
        </template>
        <template #append>
            <slot v-if="!readonly" name="append"></slot>
        </template>
    </el-input>
</template>
<script>
export default {
    name: "BaseInput",
    props: {
        value: [String, Number],
        trim: {
            type: Boolean,
            default: true
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
                    readonlyValue = this.readTextFormat(this.value)
                } else {
                    readonlyValue = this.value || this.readNullFill
                }
                return readonlyValue
            },
            set(val) {
                this.$emit("input", val)
            }
        }
    },
    methods: {
        onInputBlur($event) {
            this.trim && (this.modelValue = (this.value || '').trim())
            this.$emit("blur", $event)
        },
    },
}
</script>
<style lang="scss" scoped>
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
}
</style>