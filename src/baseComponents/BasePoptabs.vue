<template>
    <el-dialog v-if="container === 'dialog'" :visible.sync="containershow" v-bind="$attrs" :width="$attrs.size || '80%'">
        <header class="base-poptabs-header">
            <el-tabs v-model="currentTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <template v-if="$slots.action">
                <div class="base-poptabs-header-action">
                    <slot name="action"></slot>
                </div>
            </template>
            <template v-else>
                <div class="base-poptabs-header-action">
                    <template v-if="!$scopedSlots.default">
                        <el-button icon="el-icon-close" @click="handleClose">关闭</el-button>
                    </template>
                </div>
            </template>
        </header>
        <main class="base-poptabs-body">
            <slot :name="currentTab"></slot>
        </main>
    </el-dialog>
    <el-drawer v-else :visible.sync="containershow" v-bind="$attrs" :with-header="false" :size="$attrs.size || '80%'"
        :width="$attrs.size || '80%'">
        <header class="base-poptabs-header">
            <el-tabs v-model="currentTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <template v-if="$slots.action">
                <div class="base-poptabs-header-action">
                    <slot name="action"></slot>
                </div>
            </template>
            <template v-else>
                <div class="base-poptabs-header-action">
                    <template v-if="!$scopedSlots.default">
                        <el-button icon="el-icon-close" @click="handleClose">关闭</el-button>
                    </template>
                </div>
            </template>
        </header>
        <main class="base-poptabs-body">
            <slot :name="currentTab"></slot>
        </main>
    </el-drawer>
</template>
<script>
export default {
    name: "BasePoptabs",
    props: {
        container: {
            type: String,
            default: "drawer",
            validate: (val) => {
                return ["drawer", "dialog"].includes(val);
            }
        },
        visible: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Array,
            required: true,
            validate: (val) => {
                return val.length > 0 && val.every(item => item.name && item.label);
            }
        },
        priorTab: [String, Number],
        activeTab: {
            type: [String, Number],
            default: null,
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
        containerTag() {
            if (this.container === "drawer") {
                return "el-drawer";
            } else if (this.container === "dialog") {
                return "el-dialog";
            } else {
                return "el-drawer";
            }
        },
        containershow: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit("update:visible", val);
            },
        },
        currentTab: {
            get() {
                return this.activeTab;
            },
            set(val) {
                this.$emit("update:activeTab", val);
            },
        },
    },
    methods: {
        handleTabClick() {
            this.$emit("tabClick", this.activeTab);
        },
        handleClose() {
            this.$emit("close")
        }
    },
};
</script>
<style lang="scss" scoped>
::v-deep section.el-drawer__body {
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .base-poptabs-header {
        // -webkit-box-align: center;
        // -ms-flex-align: center;
        // align-items: center;
        color: #72767b;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 1px solid #e4e7ed;
        margin-bottom: 32px;
        padding: 20px;
        padding-bottom: 0;
        position: sticky;
        top: 0;
        background-color: #fff;

        & .el-tabs__item {
            font-size: 20px;
            color: #72767b;
        }

        & .el-tabs__nav-wrap::after {
            display: none;
        }

        .close-button {
            border: none;
            cursor: pointer;
            font-size: 20px;
            color: inherit;
            background-color: transparent;
            padding: 10px 0px;
        }

    }

    .base-poptabs-header> :first-child,
    .base-poptabs-header> :first-child {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .base-poptabs-body {
        width: 100%;
        height: 600px;
        flex: 1;
        margin: 0 auto;
        overflow-y: auto;
    }
}

::v-deep section.el-dialog__body {
    display: flex;
    flex-direction: column;

    .base-poptabs-header {
        // -webkit-box-align: center;
        // -ms-flex-align: center;
        // align-items: center;
        color: #72767b;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 1px solid #e4e7ed;
        margin-bottom: 32px;
        padding: 20px;
        padding-bottom: 0;
        position: sticky;
        top: 0;
        background-color: #fff;

        & .el-tabs__item {
            font-size: 20px;
            color: #72767b;
        }

        & .el-tabs__nav-wrap::after {
            display: none;
        }

        .close-button {
            border: none;
            cursor: pointer;
            font-size: 20px;
            color: inherit;
            background-color: transparent;
            padding: 10px 0px;
        }

    }

    .base-poptabs-header> :first-child,
    .base-poptabs-header> :first-child {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .base-poptabs-body {
        width: 100%;
        height: 600px;
        flex: 1;
        margin: 0 auto;
        overflow-y: auto;
    }
}
</style>
  