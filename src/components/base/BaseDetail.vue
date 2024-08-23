<template>
    <div :class="['base-detail', { ['is-' + showType]: true }]">
        <header class="base-detail__header" :class="{ ['is-' + showType]: true }">
            <slot name="header">{{ title }}</slot>
        </header>
        <main class="base-detail__body">
            <template v-if="showType === 'simple'">
                <div v-for="section in data" :key="section.name" class="base-detail-section">
                    <div classs="base-detail-section__title">
                        <slot name="sectionTitle" :section="section">
                            <el-divider content-position="left">{{ section.label }}</el-divider>
                        </slot>
                    </div>
                    <div class="base-detail-section__content">
                        <slot :name="section.name" :data="section.data">
                            <el-descriptions v-if="section.type === 'descriptions'" v-bind="section.config">
                                <el-descriptions-item v-for="item in section.data" :key="item.prop" :label="item.label">
                                    {{ item.value }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-table v-else-if="section.type === 'table'" v-bind="section.config" :data="section.data">
                                <el-table-column v-for="item in section.config.columns" :key="item.prop" :label="item.label"
                                    :prop="item.prop" />
                            </el-table>
                        </slot>
                    </div>
                </div>
            </template>
            <template v-else-if="showType === 'card'">
                <el-card v-for="section in data" :key="section.name" :header="section.label" v-bind="sectionConfig"
                    class="base-detail-section">
                    <template #header>
                        <slot name="sectionTitle" :section="section">{{ section.label }}</slot>
                    </template>
                    <slot :name="section.name" :data="section.data">
                        <el-descriptions v-if="section.type === 'descriptions'" v-bind="section.config">
                            <el-descriptions-item v-for="item in section.data" :key="item.prop" :label="item.label">
                                {{ item.value }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-table v-else-if="section.type === 'table'" v-bind="section.config" :data="section.data">
                            <el-table-column v-for="item in section.config.columns" :key="item.prop" :label="item.label"
                                :prop="item.prop" />
                        </el-table>
                    </slot>
                </el-card>
            </template>
            <template v-else-if="showType === 'collapse'">
                <el-collapse v-model="activeValue">
                    <el-collapse-item v-for="section in data" :key="section.name" :title="section.label"
                        :name="section.name" v-bind="sectionConfig" class="base-detail-section">
                        <template #title>
                            <slot name="sectionTitle" :section="section">
                                {{ section.label }}
                            </slot>
                        </template>
                        <slot :name="section.name" :data="section.data">
                            <el-descriptions v-if="section.type === 'descriptions'" v-bind="section.config">
                                <el-descriptions-item v-for="item in section.data" :key="item.prop" :label="item.label">
                                    {{ item.value }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-table v-else-if="section.type === 'table'" v-bind="section.config" :data="section.data">
                                <el-table-column v-for="item in section.config.columns" :key="item.prop" :label="item.label"
                                    :prop="item.prop" />
                            </el-table>
                        </slot>
                    </el-collapse-item>
                </el-collapse>
            </template>
            <template v-else-if="showType === 'tab'">
                <el-tabs v-model="activeValue">
                    <el-tab-pane v-for="section in data" :key="section.name" :label="section.label" :name="section.name"
                        v-bind="sectionConfig" class="base-detail-section">
                        <template #label>
                            <slot name="sectionTitle" :section="section">
                                {{ section.label }}
                            </slot>
                        </template>
                        <template v-if="section.name === activeValue">
                            <slot :name="section.name" :data="section.data">
                                <el-descriptions v-if="section.type === 'descriptions'" v-bind="section.config">
                                    <el-descriptions-item v-for="item in section.data" :key="item.prop" :label="item.label">
                                        {{ item.value }}
                                    </el-descriptions-item>
                                </el-descriptions>
                                <el-table v-else-if="section.type === 'table'" v-bind="section.config" :data="section.data">
                                    <el-table-column v-for="item in section.config.columns" :key="item.prop"
                                        :label="item.label" :prop="item.prop" />
                                </el-table>
                            </slot>
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
         * @description 标题
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
         *          type: 'descriptions', // 数据展示组件类型，descriptions, table
         *          config: {},           // 数据展示组件的配置，el-descriptions，el-table的配置
         *          data: [],             // 区域数据
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
         * @description 区域的展现形式，卡片、tab页、折叠面板
         */
        showType: {
            type: String,
            default: 'simple',
            validator(value) {
                return ['simple', 'card', 'collapse', 'tab'].includes(value)
            }
        },
        /**
         * @description 区域的统一配置，即el-card，el-collapse-item、el-tab-pane的配置，
         * simple风格时该prop无效
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
            /**
             * @description 激活的tab页或者折叠面板的name
             */
            activeValue: null
        }
    },
    watch: {
        /**
         * @description 根据showType的值，设置activeValue的值
         */
        showType: {
            handler(newVal) {
                if (newVal === 'tab') {
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
::v-deep.base-detail {
    padding: 15px 20px;
    border: 2px solid #EBEEF5;
    border-radius: 5px;
    overflow-y: auto;

    .base-detail__header {
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        padding: 5px 0px;
    }

    .base-detail__body {
        padding: 15px;

        .base-detail-section {
            margin-bottom: 10px;

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

        .base-detail-section:last-child {
            margin-bottom: 0;
        }

        .el-card {
            margin-bottom: 10px;

            .el-card__header {
                padding: 10px 15px;
            }

            .el-card__body {
                padding: 15px;
            }
        }
    }

    .base-detail__footer {
        text-align: center;
    }
}

.is-tab {
    .base-detail__body {
        padding-top: 5px;
    }
}

.is-simple {
    .base-detail__body {
        padding-top: 0px;
    }
}
</style>