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
         * @example [{name: 'refresh',label: '刷新',config: {icon: 'el-icon-refresh', type: 'primary', size: 'mini'},useTip: true,tooltip: '刷新', position: 'left'}]
         * @item.name {String} 工具名称，工具的表示，用于触发事件
         * @item.label {String} 工具名称，用于显示在工具栏上
         * @item.config {Object} 工具配置，用于el-button或者其他组件的配置
         * @item.useTip {Boolean} 是否使用提示，对应el-tooltip组件的disabled属性
         * @item.tooltip {String} 提示内容
         * @item.position {String} 工具位置，'left' 或 'right'
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
        leftTools() {
            return this.tools.filter(item => item.position === 'left');
        },
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