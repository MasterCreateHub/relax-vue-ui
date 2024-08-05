<template>
    <el-time-select v-model="modelValue" v-bind="$attrs" v-on="$listeners" :disabled="$attrs.disabled || readonly" :class="[
        'base-time-select',
        { 'is-readonly': readonly }
    ]"></el-time-select>
</template>

<script>
export default {
    name: 'BaseTimeSelect',
    props: {
        value: String,
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
.base-time-select {
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