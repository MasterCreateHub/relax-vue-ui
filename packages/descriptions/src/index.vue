<template>
    <el-descriptions v-bind="$attrs" :class="['re-descriptions', { 'is-layout-fixed': layout === 'fixed' }]">
        <template slot="title">
            <slot name="title"></slot>
        </template>
        <template slot="extra">
            <slot name="extra"></slot>
        </template>

        <el-descriptions-item v-for="item in data" :key="item.prop" :label="item.label" :span="item.span"
            :labelClassName="item.labelClassName" :contentClassName="item.contentClassName" :labelStyle="item.labelStyle"
            :contentStyle="item.contentStyle">
            <template slot="label">
                <!-- 如果没有自定义的 label 插槽，则显示默认值 -->
                <slot name="label" :dataItem="item">
                    <span>{{ item.label }}</span>
                </slot>
            </template>
            <template slot="default">
                <!-- 如果没有自定义的 content 插槽，则显示 item.value -->
                <slot name="default" :dataItem="item">
                    <span>{{ item.value }}</span>
                </slot>
            </template>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>
export default {
    name: 'ReDescriptions',
    props: {
        /**
         * @data 描述列表数据
         * @type Array
         * @default []
         * @example
         * [
         *     {    
         *         prop: 'name',
         *         label: '姓名',
         *         value: '张三',
         *         span: 1,
         *         labelClassName: 'labelClassName',
         *         contentClassName: 'contentClassName',
         *         labelStyle: {
         *             color: 'red'
         *         },
         *         contentStyle: {
         *             color:'blue'
         *         },
         * ]
         */
        data: {
            type: Array,
            default: () => [],
            validator(value) {
                return value.every(item => {
                    return (
                        typeof item.prop === 'string' &&
                        typeof item.label === 'string' &&
                        (typeof item.value === 'string' || typeof item.value === 'number' || typeof item.value === 'boolean' || Array.isArray(item.value))
                    );
                });
            }
        },
        /**
         * @description 描述列表的布局方式，可选值：fixed、auto
         */
        layout: {
            type: String,
            default: 'fixed',
            validator(value) {
                return ['fixed', 'auto'].includes(value)
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
::v-deep.is-layout-fixed {
    .el-descriptions__body .el-descriptions__table {
        table-layout: fixed;
    }
}
</style>