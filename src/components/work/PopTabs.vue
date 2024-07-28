<template>
    <el-dialog v-if="container === 'dialog'" :visible.sync="containershow" v-bind="$attrs" :width="$attrs.size || '80%'">
        <template v-slot:title>
            <el-tabs v-if="visible" v-model="currentTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class="base-poptabs-header-action">
                <template v-if="$slots.action">
                    <slot name="action"></slot>
                </template>
                <template v-else>
                    <el-button class="close-button" size="mini" icon="el-icon-close" circle
                        @click="handleClose"></el-button>
                </template>
            </div>
        </template>
        <slot :name="currentTab"></slot>
    </el-dialog>
    <el-drawer v-else :visible.sync="containershow" v-bind="$attrs" :with-header="false" :size="$attrs.size || '80%'"
        :width="$attrs.size || '80%'">
        <header class="base-poptabs-header">
            <el-tabs v-model="currentTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div class="base-poptabs-header-action">
                <template v-if="$slots.action">
                    <slot name="action"></slot>
                </template>
                <template v-else>
                    <el-button class="close-button" size="mini" icon="el-icon-close" circle
                        @click="handleClose"></el-button>
                </template>
            </div>
        </header>
        <main class="base-poptabs-body">
            <slot :name="currentTab"></slot>
        </main>
    </el-drawer>
</template>
<script>
export default {
    name: "PopTabs",
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
            this.$emit("update:visible", false);
            this.$emit("close")
        }
    },
};
</script>
<style lang="scss" scoped>
::v-deep .el-drawer {

    .base-poptabs-header {
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

        .base-poptabs-header-action {
            height: 54px;
            box-sizing: border-box;
            padding-bottom: 15px;
            display: flex;
            align-items: center;

        }

    }

    .base-poptabs-body {
        width: 100%;
        margin: 0 auto;
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
        margin-bottom: 32px;
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

        .base-poptabs-header-action {
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
}
</style>
  