<template>
    <div class="base-workbench">
        <div class="base-workbench__header">
            <div class="base-workbench-title">{{ currentWorkLabel }}</div>
            <div class="base-workbench-action">
                <template v-if="!$slots.action">
                    <el-button v-for="action in currentWorkActions" :key="action.event" size="small" v-bind="action"
                        @click="$emit(action.event)">
                        {{ action.label }}
                    </el-button>
                </template>
                <slot v-else name="action"></slot>
            </div>
        </div>
        <div class="base-workbench__body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "BaseWorkbench",
    props: {
        /**
         * @description 当前工作台的任务，值为works中任务的key
         */
        currentWork: {
            type: String,
            required: true
        },
        /**
        * @description 工作台配置，一个工作台可配置多个任务，不同任务有可能对应不同的操作按钮，
        * 该组件会根据当前处理不同的任务来显示不同的操作按钮
        * @label 任务名称
        * @key 任务标识 
        * @actions 任务可执行的动作，字符串数组，元素为actions的事件，如果不传则默认所有动作
        */
        works: {
            type: Array,
            required: true
        },
        /**
         * @description 工作台所有可执行动作
         * @label 动作名称
         * @event 动作触发的事件
         * @icon 动作图标
         */
        actions: {
            type: Array,
            default: () => {
                return []
            },
            validator(value) {
                return value.every(item => {
                    return item.label && item.event
                })
            }
        },
    },
    data() {
        return {

        }
    },
    computed: {
        /**
         * @description 工作台的当前任务配置信息
         */
        currentWorkConfig() {
            return this.works.find(item => item.key === this.currentWork)
        },
        /**
         * @description 工作台的当前任务名称
         */
        currentWorkLabel() {
            return this.currentWorkConfig.label || ''
        },
        /**
         * @description 工作台的当前任务的可执行动作
         */
        currentWorkActions() {
            return this.actions.filter(item => {
                return ((this.currentWorkConfig.actions) && Array.isArray(this.currentWorkConfig.actions)) ? this.currentWorkConfig.actions.includes(item.event) : true
            })
        }
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
.base-workbench {
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    overflow: hidden;
    color: #303133;
    transition: .3s;

    .base-workbench__header {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border-bottom: 1px #EBEEF5 solid;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .base-workbench-title {}

        .base-workbench-action {}
    }

    .base-workbench__body {
        padding: 20px;
        height: auto;
    }
}
</style>