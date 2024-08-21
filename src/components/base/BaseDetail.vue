<template>
    <div class="base-detail" :class="{ ['is-' + showType]: true }">
        <header class="base-detail__header">
            <slot name="header">{{ title }}</slot>
        </header>
        <main class="base-detail__body">
            <template v-if="showType === 'simple'">
                <el-row class="base-detail-content is-simple">
                    <el-col v-for="section in data" :key="section.name" :span="24">
                        <el-divider content-position="left">{{ section.label }}</el-divider>
                        <BaseDetailSection :type="section.type" :config="section.config" :data="section.data" />
                    </el-col>
                </el-row>
            </template>
            <template v-else-if="showType === 'card'">
                <el-card v-for="section in data" :key="section.name" :header="section.label" v-bind="sectionConfig">
                    <BaseDetailSection :type="section.type" :config="section.config" :data="section.data" />
                </el-card>
            </template>
            <template v-else-if="showType === 'collapse'">
                <el-collapse v-model="activeValue">
                    <el-collapse-item v-for="section in data" :key="section.name" :title="section.label" :name="section.name"
                        v-bind="sectionConfig">
                        <BaseDetailSection :type="section.type" :config="section.config" :data="section.data" />
                    </el-collapse-item>
                </el-collapse>
            </template>
            <template v-else-if="showType === 'tabs'">
                <el-tabs v-model="activeValue">
                    <el-tab-pane v-for="section in data" :key="section.name" :label="section.label" :name="section.name"
                        v-bind="sectionConfig">
                        <template v-if="section.name === activeValue">
                            <BaseDetailSection :type="section.type" :config="section.config" :data="section.data" />
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </main>
        <footer class="base-detail__footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BaseDetail',
    props: {
        /**
         * @description 详情标题
         */
        title: {
            type: String,
            default: ''
        },
        /**
         * @description 详情数据
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
         * @description 详情分组区域的展现形式，简单，卡片、tab页、折叠面板
         */
        showType: {
            type: String,
            default: 'simple',
            validator(value) {
                return ['simple', 'card', 'collapse', 'tabs'].includes(value)
            }
        },
        /**
         * @description 详情区域的统一配置
         */
        sectionConfig: {
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
    components: {
        BaseDetailSection: {
            template: `<div class="base-detail-section">
                    <template v-if="type === 'descriptions'">
                        <el-descriptions v-bind="config">
                            <el-descriptions-item v-for="item in data" :key="item.prop" :label="item.label">
                                {{ item.value }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </template>
                    <template v-else-if="type === 'table'">
                        <el-table v-bind="config" :data="data">
                            <el-table-column v-for="item in config.columns" :key="item.prop" :label="item.label" :prop="item.prop" />
                        </el-table>
                    </template>
                    <template v-else-if="type === 'custom'">
                        <slot :name="section.name" :data="section.data"></slot>
                    </template>
                </div>`,
            props: {
                type: {
                    type: String,
                    required: true,
                    validator(value) {
                        return ['descriptions', 'table', 'custom'].includes(value)
                    }
                },
                config: {
                    type: Object,
                    default: () => ({}),
                },
                data: {
                    type: Array,
                    default: () => []
                }
            }
        }
    },
    watch: {
        showType: {
            handler(newVal) {
                switch (newVal) {
                    case 'tabs':
                        this.activeValue = this.data[0]?.name;
                        break;
                    case 'collapse':
                        this.activeValue = this.data.map(item => item.name);
                        break;
                    default:
                        this.activeValue = null;
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.base-detail {
    padding: 15px 20px;
    border: 2px solid #EBEEF5;
    border-radius: 5px;
    overflow-y: auto;

    .base-detail__header {
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