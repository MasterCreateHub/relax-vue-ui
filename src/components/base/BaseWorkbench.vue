<template>
    <div class="base-workbench">
        <div class="base-workbench-action">
            <div class="base-workbench-title">{{ title }}</div>
            <slot name="action"></slot>
        </div>
        <div class="base-workbench-form">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "BaseWorkbench",
    props: {
        layout: {
            type: String,
            default: "top-bottom",
            validator(value) {
                return ['top-bottom', 'left-right'].includes(value)
            }
        },
        /**
         * @actions 操作行为数组
         * @label 操作名称
         * @type 操作类型
         * @icon 操作图标
         * @handler 操作方法
         */
        actions: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {
        visible: {
            get() {
                return this.show
            },
            set(val) {
                this.$emit("update:show", val)
            }
        },
        actionList: {
        }
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped></style>