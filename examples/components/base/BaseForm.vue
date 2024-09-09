<template>
    <el-date-picker v-model="modelValue" v-bind="$attrs" v-on="$listeners"></el-date-picker>
</template>

<script>
export default {
    name: 'BaseSwitch',
    props: {
        value: [String, Date, Array]      
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
</style>