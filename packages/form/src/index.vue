<template>
    <el-form :model="form" v-bind="$attrs" v-on="$listeners">
    </el-form>
</template>
<script>
export default {
    name: "ReForm",
    props: {
        formData: {
            type: Object,
            default: () => ({})
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        /**
         * @item Object，每个表单项的基本属性
         * type String，表单项类型，该表单项对应的组件名，input，inputNumber，select...
         * model String，表单项的v-model对应的属性名
         * span Number，表单项的宽度，值为 1-24
         * config Object，该表单项对应的组件的配置项
         * yield String，该表单项从属于哪个表单区域
         * custom Boolean，该表单项是否为自定义表单项
         */
        formItems: {
            type: Array,
            default: () => []
        },
        yieldConfig: {
            type: Object,
            default: () => ({})
        },
        yieldStyle: {
            type: String,
            default: 'card',
            validator(val) {
                return ["card", "collapse","table"].includes(val);
            }
        },
        errorScroll: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        form: {
            get() {
                return this.formData
            },
            set(val) {
                this.$emit("input", val)
            }
        }
    },
    mounted() {

    },
    methods: {

    },
}
</script>
<style lang="scss" scoped></style>