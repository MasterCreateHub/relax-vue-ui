<template>
    <el-popover popper-class="letter-box" :width="$attrs.width || 320" v-bind="$attrs">
        <template #reference>
            <slot name="reference"></slot>
        </template>
        <el-tabs v-model="currentTab" stretch>
            <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
                <template #label>
                    <slot name="label" :label="tab.label">
                        <span>{{ tab.label + `(${tab.list.length})` }}</span>
                    </slot>
                </template>
                <div class="letter-list__wrapper">
                    <template v-if="tab.list.length === 0">
                        <el-empty class="letter-list__empty" />
                    </template>
                    <template v-else>
                        <div class="letter-list__phantom"></div>
                        <ul class="letter-list">
                            <li class="letter-list-item" v-for="(item, index) in tab.list"
                                :key="tab.name + '-item-' + index">
                                <slot :name="tab.name" :data="item" />
                            </li>
                        </ul>
                    </template>
                </div>
                <div v-if="tab.list.length > 0" class="letter__footer">
                    <slot name="footer" :tab="tab.name">
                        <span>全部清空</span>
                        <el-divider direction="vertical" />
                        <span>查看更多</span>
                    </slot>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-popover>
</template>
<script>
export default {
    name: "ReLetterBox",
    props: {
        /**
         * @description 信箱当前激活的tab
         */
        activeTab: {
            type: String,
            required: true
        },
        tabs: {
            type: Array,
            required: true,
            validate(val) {
                return val.every(item => item.name && item.label && item.list);
            }
        },
        list: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {

        }
    },
    computed: {
        currentTab: {
            get() {
                return this.activeTab;
            },
            set(val) {
                this.$emit("update:activeTab", val);
            }
        }


    },
    mounted() {

    },
    methods: {

    },
};
</script>
<!-- <style lang="scss" scoped>
.letter-list__wrapper {
    max-height: 500px;
    overflow: auto;

    .letter-list {
        padding: 0px;

        .letter-list-item {
            padding: 14px 24px;
            border-bottom: 1px solid #eee;
            min-height: 60px;
        }
    }
}

.letter__footer {
    display: flex;
    align-items: center;

    span {
        line-height: 35px;
        text-align: center;
        flex: 1;
    }
}
</style>
<style lang="scss">
.letter-box {
    padding: 12px 0px 0px;
}
</style> -->
  