<template>
    <el-descriptions v-bind="$attrs" :class="{ 'layout-fixed': layout === 'fixed' }">
        <template slot="title">
            <slot name="title"></slot>
        </template>
        <template slot="extra">
            <slot name="extra"></slot>
        </template>

        <el-descriptions-item v-for="item in data" :key="item.prop" :label="item.label" :span="item.span"
            :labelClassName="item.labelClassName" :contentClassName="item.contentClassName"
            :labelStyle="item.labelStyle" :contentStyle="item.contentStyle">
            <template slot="label">
                <slot name="label" :dataItem="item"></slot>
                <!-- 如果没有自定义的 label 插槽，则显示默认值 -->
                <span v-if="!$scopedSlots['label']">{{ item.label }}</span>
            </template>

            <template slot="default">
                <slot :dataItem="item"></slot>
                <!-- 如果没有自定义的默认插槽，则显示 item.value -->
                <span v-if="!$scopedSlots['default']">{{ item.value }}</span>
            </template>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>
export default {
    name: 'BaseDescriptions',
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
            default: () => {
                return []
            },
            validator(value) {
                return value.every(item => {
                    let keys = Object.keys(item)
                    return keys.includes('prop') && keys.includes('label') && keys.includes('value')
                })
            }
        },
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
    mounted() {
        console.log(this);
    },

    methods: {
    }
}
</script>
<style lang="scss" scoped>
::v-deep.el-descriptions.layout-fixed {
    .el-descriptions__body .el-descriptions__table {
        table-layout: fixed;
    }
}
</style>