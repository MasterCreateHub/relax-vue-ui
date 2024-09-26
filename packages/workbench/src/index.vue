<template>
    <div class="re-workbench" :class="[`is-${layout}`]">
        <header class="re-workbench__header">
            <slot name="title">
                <span class="re-workbench-title">{{ currentWorkLabel }}</span>
            </slot>
            <div class="re-workbench-action__wrapper" v-if="layout === 'two'">
                <slot name="action" :currentWork="currentWork">
                    <el-button v-for="action in currentWorkActions" :key="action.eventName" size="small"
                        class="re-workbench-action" v-bind="action" @click="$emit(action.eventName, currentWork)">
                        {{ action.label }}
                    </el-button>
                </slot>
            </div>
        </header>
        <main class="re-workbench__body">
            <slot :currentWork="currentWork"></slot>
        </main>
        <div class="re-workbench__footer" v-if="layout === 'three'">
            <div class="re-workbench-action__wrapper">
                <slot name="action" :currentWork="currentWork">
                    <el-button v-for="action in currentWorkActions" :key="action.eventName" size="small"
                        class="re-workbench-action" v-bind="action" @click="$emit(action.eventName, currentWork)">
                        {{ action.label }}
                    </el-button>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ReWorkbench",
    props: {
        /**
         * @description 布局方式，可选值为two和three,two表示header和body，three表示header和body和footer
         */
        layout: {
            type: String,
            default: 'two',
            validator(value) {
                return ['two', 'three'].includes(value)
            }
        },
        /**
         * @description 当前工作台的任务，值为works中任务的key
         */
        currentWork: {
            type: String,
            required: true
        },
        /**
        * @description 工作台任务配置，一个工作台可配置多个任务，不同任务有可能对应不同的操作按钮，
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
         * @eventName 动作触发的事件
         * @icon 动作图标
         */
        actions: {
            type: Array,
            default: () => {
                return []
            },
            validator(value) {
                return value.every(item => {
                    return item.label && item.eventName
                })
            }
        },
    },
    data() {
        return {};
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
                return ((this.currentWorkConfig.actions) && Array.isArray(this.currentWorkConfig.actions)) ? this.currentWorkConfig.actions.includes(item.eventName) : true
            })
        }
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
.re-workbench {
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    overflow: hidden;
    color: #303133;
    transition: .3s;

    .re-workbench__header {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border-bottom: 1px #EBEEF5 solid;
        display: flex;
        align-items: center;

        .re-workbench-title {
            color: #72767b;
            font-size: 16px;
        }
    }

    .re-workbench__body {
        padding: 20px;
        height: auto;
    }

    .re-workbench__footer {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border-top: 1px #EBEEF5 solid;
        display: flex;
        justify-content: center;
        align-items: center;
    }


}

.is-two {
    .re-workbench__header {
        justify-content: space-between;
    }
}

.is-three {
    .re-workbench__header {
        justify-content: center;
    }
}
</style>