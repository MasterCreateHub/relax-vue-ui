<template>
    <div class="re-workbench" :class="[`is-${layout}`]">
        <header class="re-workbench__header">
            <div class="re-workbench-title">
                <slot name="title" :currentWork="currentWork" :config="currentWorkConfig">
                    {{ currentWorkLabel }}
                </slot>
            </div>
            <div v-if="layout === 'two'" class="re-workbench-action__wrapper">
                <slot name="action" :currentWork="currentWork" :config="currentWorkConfig">
                    <component v-for="action in currentWorkActions" :is="action.component || 'el-button'" :key="action.name"
                        class="re-workbench-action" v-bind="action.props || {}" v-on="action.events || {}"
                        @click="$emit(action.name, currentWork, $event)">
                        {{ action.label }}
                    </component>
                </slot>
            </div>
        </header>
        <main class="re-workbench__body">
            <slot :name="currentWork" :currentWork="currentWork" :config="currentWorkConfig">
                <component :is="currentWorkConfig.component || null" v-model="currentWorkConfig.model"
                    v-bind="currentWorkConfig.props || {}">
                </component>
            </slot>
        </main>
        <footer v-if="layout === 'three'" class="re-workbench__footer">
            <div class="re-workbench-action__wrapper">
                <slot name="action" :currentWork="currentWork" :config="currentWorkConfig">
                    <component v-for="action in currentWorkActions" :is="action.component || 'el-button' "
                        :key="action.name" class="re-workbench-action" v-bind="action.props || {}"
                        v-on="action.events || {}" @click="$emit(action.name, currentWork, $event)">
                        {{ action.label }}
                    </component>
                </slot>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: "ReWorkbench",
    props: {
        /**
         * @description 布局方式，可选值为two和three,two表示header和body，three表示header和body和footer
         * @type {String}
         * @default 'two'
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
         * @type {String}
         */
        currentWork: {
            type: String,
            required: true
        },
        /**
        * @description 工作台任务配置，一个工作台可配置多个任务，不同任务有可能对应不同的操作按钮，该组件会根据当前处理不同的任务来显示不同的操作按钮
        * @type {Array<Work>}
        * @property {Object} Work 工作任务对象
        * @property {String} Work.label 工作任务标签文本
        * @property {String} Work.key 工作任务标识 
        * @property {Array} Work.actions 该任务可执行的操作，字符串数组，元素为action的name，如果不传则默认所有操作
        * @property {String} Action.label 操作的文本标签
        * @property {String} Action.name  操作标识，也是`el-button`默认触发的事件 
        * @property {String} Action.component 操作使用的组件，默认为 el-button
        * @property {Object} Action.props 工作台操作组件的props
        * @property {Object} Action.events 工作台操作组件的events
        * @default []
        */
        works: {
            type: Array,
            required: true,
            validator(value) {
                return value.every((work) => {
                    return (
                        Object.prototype.toString.call(work) === "[object Object]" &&
                        work.label &&
                        work.key
                    );
                });
            },
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
            return this.works.find(work => work.key === this.currentWork)
        },
        /**
         * @description 工作台的当前任务名称
         */
        currentWorkLabel() {
            return this.currentWorkConfig.label || ''
        },
        /**
         * @description 工作台的当前任务的可执行操作
         */
        currentWorkActions() {
            return Array.isArray(this.currentWorkConfig.actions) ? this.currentWorkConfig.actions : []
        }
    },
    methods: {},
}
</script>
<style lang="scss" scoped>
.re-workbench {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 2px solid #EBEEF5;
    background-color: #FFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #303133;
    transition: .3s;
    display: flex;
    flex-direction: column;

    .re-workbench__header {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border-bottom: 2px #EBEEF5 solid;
        display: flex;
        align-items: center;

        .re-workbench-title {
            color: #72767b;
            font-weight: 600;
            font-size: 18px;
        }
    }

    .re-workbench__body {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        flex: 1;
        overflow-y: auto;
    }

    .re-workbench__footer {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border-top: 2px #EBEEF5 solid;
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