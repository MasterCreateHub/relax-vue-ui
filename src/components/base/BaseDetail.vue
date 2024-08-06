<template>
    <div class="base-detail-container">
        <header class="base-detail-header" :class="{ ['is-' + showType]: true }">
            <template v-if="$slots.header">
                <slot name="header"></slot>
            </template>
            <template v-else>{{ title }}</template>
        </header>
        <main class="base-detail-main">
            <template v-if="showType === 'simple'">
                <el-row class="base-detail-content is-simple">
                    <el-col v-for="area in data" :key="area.name" :span="24">
                        <el-divider content-position="left">{{ area.label }}</el-divider>
                        <el-descriptions v-if="area.type === 'descriptions'" v-bind="area.config">
                            <el-descriptions-item v-for="item in area.data" :key="item.prop" :label="item.label">
                                {{ item.value }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-table v-else-if="area.type === 'table'" v-bind="area.config">
                            <el-table-column v-for="item in area.data" :key="item.prop" :label="item.label"
                                :prop="item.prop" />
                        </el-table>
                        <slot v-else-if="area.type === 'custom'" :name="area.name" :data="area.data"></slot>
                    </el-col>
                </el-row>
            </template>
            <template v-else-if="showType === 'card'">
                <el-card v-for="area in data" :key="area.name" :header="area.label" v-bind="areaConfig">
                    <el-descriptions v-if="area.type === 'descriptions'" v-bind="area.config">
                        <el-descriptions-item v-for="item in area.data" :key="item.prop" :label="item.label">
                            {{ item.value }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-table v-else-if="area.type === 'table'" v-bind="area.config">
                        <el-table-column v-for="item in area.data" :key="item.prop" :label="item.label"
                            :prop="item.prop" />
                    </el-table>
                    <slot v-else-if="area.type === 'custom'" :name="area.name" :data="area.data"></slot>
                </el-card>
            </template>
            <template v-else-if="showType === 'tabs'">
                <el-tabs v-model="activeValue">
                    <el-tab-pane v-for="area in data" :key="area.name" :label="area.label" :name="area.name"
                        v-bind="areaConfig">
                        <template v-if="area.name === activeValue">
                            <el-descriptions v-if="area.type === 'descriptions'" v-bind="area.config">
                                <el-descriptions-item v-for="item in area.data" :key="item.prop" :label="item.label">
                                    {{ item.value }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-table v-else-if="area.type === 'table'" v-bind="area.config">
                                <el-table-column v-for="item in area.data" :key="item.prop" :label="item.label"
                                    :prop="item.prop" />
                            </el-table>
                            <slot v-else-if="area.type === 'custom'" :name="area.name" :data="area.data"></slot>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <template v-else-if="showType === 'collapse'">
                <el-collapse v-model="activeValue">
                    <el-collapse-item v-for="area in data" :key="area.name" :title="area.label" :name="area.name"
                        v-bind="areaConfig">
                        <el-descriptions v-if="area.type === 'descriptions'" v-bind="area.config">
                            <el-descriptions-item v-for="item in area.data" :key="item.prop" :label="item.label">
                                {{ item.value }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-table v-else-if="area.type === 'table'" v-bind="area.config">
                            <el-table-column v-for="item in area.data" :key="item.prop" :label="item.label"
                                :prop="item.prop" />
                        </el-table>
                        <slot v-else-if="area.type === 'custom'" :name="area.name" :data="area.data"></slot>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </main>
        <footer class="base-detail-footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BaseDetail',
    props: {
        title: {
            type: String,
            default: ''
        },
        /**
         * @data 详情数据
         * @type Array
         * @default []
         * @example
         * [
         *     {
         *          name: 'baseInfo',     // 区域名称
         *          label: '基础信息',     // 区域标签
         *          type: 'descriptions', // 数据展示组件类型，descriptions, table， custom
         *          config: {},           // 数据展示组件的配置，el-descriptions，el-table的配置，（el-table的配置包含了表格要展示的data)
         *          data: [],             // 区域数据，对于el-descriptions来说，是要展示的label和value，对于el-table来说，是el-table-column的配置数组
         *      }            
         * ]
         */
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
        /**
         * @showType 区域的展现形式，卡片、tab页、折叠面板
         */
        showType: {
            type: String,
            default: 'simple',
            validator(value) {
                return ['simple', 'card', 'collapse', 'tabs'].includes(value)
            }
        },
        /**
         * 区域的统一配置
         */
        areaConfig: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            activeValue: null
        }
    },
    watch: {
        showType: {
            handler(newVal) {
                if (newVal === 'tabs') {
                    this.activeValue = this.data[0] ? this.data[0].name : null
                } else if (newVal === 'collapse') {
                    this.activeValue = this.data.map(item => item.name)
                } else if (newVal === 'card' || newVal === 'simple') {
                    this.activeValue = null
                }
            },
            immediate: true
        }
    },
}
</script>
<style lang="scss" scoped>
.base-detail-container {
    padding: 15px 20px;
    border: 2px solid #EBEEF5;
    border-radius: 5px;
    overflow-y: auto;

    .base-detail-header {
        text-align: center;
        font-size: 16px;
        margin-bottom: 15px;
    }

    .is-tabs {
        text-align: left;
    }
}

::v-deep.base-detail-content.is-simple {
    .el-descriptions {
        .el-descriptions__body .el-descriptions__table {
            table-layout: fixed;
        }
    }

    .el-table {

        .el-table__header-wrapper,
        .el-table__fixed-header-wrapper {
            th {
                word-break: break-word;
                background-color: #f8f8f9;
                color: #515a6e;
                height: 40px;
                font-size: 13px;
            }
        }
    }
}

::v-deep.el-card {
    margin-bottom: 10px;

    .el-card__header {
        padding: 10px 12px;
    }

    .el-card__body {
        padding: 15px;

        .el-descriptions {
            .el-descriptions__body .el-descriptions__table {
                table-layout: fixed;
            }
        }

        .el-table {

            .el-table__header-wrapper,
            .el-table__fixed-header-wrapper {
                th {
                    word-break: break-word;
                    background-color: #f8f8f9;
                    color: #515a6e;
                    height: 40px;
                    font-size: 13px;
                }
            }
        }
    }
}

::v-deep.el-collapse {
    .el-collapse-item .el-collapse-item__wrap {
        .el-table {

            .el-table__header-wrapper,
            .el-table__fixed-header-wrapper {
                th {
                    word-break: break-word;
                    background-color: #f8f8f9;
                    color: #515a6e;
                    height: 40px;
                    font-size: 13px;
                }
            }
        }
    }
}

::v-deep.el-tabs {
    .el-tab-pane {
        .el-table {

            .el-table__header-wrapper,
            .el-table__fixed-header-wrapper {
                th {
                    word-break: break-word;
                    background-color: #f8f8f9;
                    color: #515a6e;
                    height: 40px;
                    font-size: 13px;
                }
            }
        }
    }
}
</style>