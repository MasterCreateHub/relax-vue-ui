<template>
    <div class="base-toolbar">
        <div class="base-toolbar__left">
            <span class="base-toolbar-tool is-left" :class="[`base-toolbar-${tool.name}`]" v-for="tool in leftTools"
                :key="tool.name">
                <el-tooltip :disabled="tool.useTip" :content="tool.tooltip || tool.label" placement="top">
                    <slot :name="tool.name" :config="tool.config">
                        <el-button v-bind="tool.config" size="mini" @click="$emit(tool.name)">{{ tool.label }}</el-button>
                    </slot>
                </el-tooltip>
            </span>
        </div>
        <div class="base-toolbar__right">
            <span class="base-toolbar-tool is-right" :class="[`base-toolbar-${tool.name}`]" v-for="tool in rightTools"
                :key="tool.name">
                <el-tooltip :disabled="tool.useTip" :content="tool.tooltip || tool.label" placement="top">
                    <slot :name="tool.name" :config="tool.config">
                        <el-button v-bind="tool.config" size="mini" @click="$emit(tool.name)" />
                    </slot>
                </el-tooltip>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseToolbar',
    props: {
        /**
         * @description 工具数组
         * @type {Array}
         * @property {Object} []
         * @property {String} [].name 工具描述，即工具触发的事件名称
         * @property {String} [].label 工具名称，用于显示在工具栏上
         * @property {Object} [].config 工具配置，用于el-button或者其他组件的配置
         * @property {Boolean} [].useTip 是否使用提示
         * @property {String} [].tooltip 提示内容
         * @property {String} [].position 工具位置，'left' 或 'right'
         * @default []
         * @example [{name: 'refresh',label: '刷新',config: {icon: 'el-icon-refresh', type: 'primary', size: 'mini'},useTip: true,tooltip: '刷新', position: 'left'}]
         */
        tools: {
            type: Array,
            default: () => [],
            validator(value) {
                return value.every(item => {
                    return item.name && item.label && ['left', 'right'].includes(item.position);
                });
            }
        },
    },
    data() {
        return {};
    },
    computed: {
        /**
         * @description 工具栏左边的工具
         * @returns {Array} 工具数组
         */
        leftTools() {
            return this.tools.filter(item => item.position === 'left');
        },
        /**
         * @description 工具栏右边的工具
         * @returns {Array} 工具数组
         */
        rightTools() {
            return this.tools.filter(item => item.position === 'right');
        },
    },
    methods: {},

}
</script>

<style lang="scss" scoped>
.base-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .base-toolbar__left,
    .base-toolbar__right {
        display: flex;
        align-items: center;
    }



    .base-toolbar__right {
        justify-content: flex-end;

        .base-toolbar-tool {
            margin-left: 5px;
        }
    }

    .base-toolbar__left {
        justify-content: flex-start;

        .base-toolbar-tool {
            margin-right: 5px;
        }
    }
}
</style>