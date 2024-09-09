<template>
    <el-date-picker v-model="modelValue" v-bind="$attrs" v-on="$listeners" 
    :disabled="$attrs.disabled || readonly" 
    :class="[
        'base-date-picker',
        { 'is-readonly': readonly }
    ]"></el-date-picker>
</template>

<script>
export default {
    name: 'BaseDatePicker',
    props: {
        value: [Date, Array],
        readonly: {
            type: Boolean,
            default: false
        }
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
                this.$emit("input", val)
            }
        }
    },

    methods: {
    },
}
</script>
<style lang="scss" scoped>
.base-date-picker {
    width: 100%;
}

::v-deep.is-readonly {
    .el-input__inner {
        padding: 0 15px;
        background-color: #FFF;
        border-color: #DCDFE6;
        color: #606266;
        cursor: auto;
    }
    .el-input__prefix {
        display: none;

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