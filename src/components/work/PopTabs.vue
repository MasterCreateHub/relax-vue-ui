<template>
    <el-dialog :class="['pop-tabs', `pop-tabs-${container}`]" v-if="container === 'dialog'" :visible.sync="containershow"
        v-bind="$attrs" :width="$attrs.size || '80%'" v-on="$listeners">
        <template v-slot:title>
            <el-tabs v-if="visible" v-model="currentTab"  @tab-click="handleTabClick"  v-on="$listeners">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class="poptabs-action__wrapper">
                <slot name="action">
                    <el-button size="mini" icon="el-icon-close" circle @click="containershow = false" />
                </slot>
            </div>
        </template>
        <slot :name="currentTab"></slot>
    </el-dialog>
    <el-drawer v-else :class="['pop-tabs', `pop-tabs-${container}`]" :visible.sync="containershow" v-bind="$attrs"
        :with-header="false" :size="$attrs.size || '80%'"  v-on="$listeners">
        <header class="poptabs__header">
            <el-tabs v-model="currentTab" @tab-click="handleTabClick"  v-on="$listeners">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class="poptabs-action__wrapper">
                <slot name="action">
                    <el-button class="close-button" size="mini" icon="el-icon-close" circle
                        @click="containershow = false" />
                </slot>
            </div>
        </header>
        <main class="poptabs__body">
            <slot :name="currentTab"></slot>
        </main>
    </el-drawer>
</template>
<script>
export default {
    name: "PopTabs",
    props: {
        /**
         * @description 弹出框类型，可选值为drawer和dialog
         */
        container: {
            type: String,
            default: "drawer",
            validate: (val) => {
                return ["drawer", "dialog"].includes(val);
            }
        },
        /**
         * @description 弹川框隐藏或者显示
         */
        visible: {
            type: Boolean,
            default: false
        },
        /**
         * @description tabs数组
         */
        tabs: {
            type: Array,
            required: true,
            validate: (val) => {
                return val.length > 0 && val.every(item => item.name && item.label);
            }
        },
        /**
         * @description 每次打开时默认选中的tab
         */
        defaultTab: String,
        /**
         * @description 当前选中的tab
         */
        activeTab: {
            type: String,
            required: true,
            validate: (val) => {
                return this.tabs.map(item => item.name).includes(val);
            }
        },
    },
    data() {
        return {

        }
    },
    computed: {
        /**
         * @description 容器的标签
         */
        containerTag() {
            if (this.container === "drawer") {
                return "el-drawer";
            } else if (this.container === "dialog") {
                return "el-dialog";
            } else {
                return "el-drawer";
            }
        },
        /**
         * @description 容器的显示
         */
        containershow: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit("update:visible", val);
                if (this.defaultTab) {
                    this.$emit("update:activeTab", this.defaultTab);
                }
            },
        },
        /**
         * @description 当前显示的tab
         */
        currentTab: {
            get() {
                return this.activeTab;
            },
            set(val) {
                this.$emit("update:activeTab", val);
            },
        },
    },
    mounted() {
        this.onInit()
    },
    methods: {
        /**
         * @description 初始化
         */
        onInit() {
            if (this.defaultTab) {
                this.currentTab = this.defaultTab;
            }
        },
        /**
         * @description tab点击事件
         */
        handleTabClick(tab, event) {
            this.$emit("tab-click", tab.name, tab, event);
        },

    },
};
</script>
<style lang="scss" scoped>
::v-deep .el-drawer {
    .el-drawer__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .poptabs__header {
        color: #72767b;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 1px solid #e4e7ed;
        padding: 20px;
        padding-bottom: 0;
        position: sticky;
        top: 0;
        background-color: #fff;

        &> :first-child {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }

        & .el-tabs__item {
            font-size: 20px;
            color: #72767b;
        }

        & .el-tabs__nav-wrap::after {
            display: none;
        }

        .poptabs-action__wrapper {
            height: 40px;
            box-sizing: border-box;
            margin-left: 15px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
    }

    .poptabs__body {
        flex: 1;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 32px 20px 20px 20px;
        overflow-y: auto;
    }
}

::v-deep .el-dialog {
    .el-dialog__header {
        color: #72767b;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 1px solid #e4e7ed;
        padding: 20px;
        padding-bottom: 0;
        position: sticky;
        top: 0;
        background-color: #fff;

        &> :first-child {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }

        & .el-tabs__item {
            font-size: 20px;
            color: #72767b;
        }

        & .el-tabs__nav-wrap::after {
            display: none;
        }

        .poptabs-action__wrapper {
            height: 54px;
            box-sizing: border-box;
            padding-bottom: 15px;
            display: flex;
            align-items: center;
        }

        &>button {
            display: none;
        }
    }

    .el-dialog__body {
        padding: 32px 20px 20px 20px;
    }
}
</style>
  