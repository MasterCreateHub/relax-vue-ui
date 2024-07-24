<template>
    <el-select v-model="modelValue" :filter-method="onFilterOptions" :multiple="multiple"
        :value-key="optionConfig.key ? optionConfig.key : optionConfig.value" @visible-change="onSelectVisible"
        filterable clearable default-first-option :disabled="readonly || $attrs.disabled"
        :class="{ 'is-readonly': readonly }" v-bind="$attrs" v-on="$listeners" ref="customSelect">
        <slot name="prefix"></slot>
        <el-option v-for="item in selectList" :key="item[optionConfig.key ? optionConfig.key : optionConfig.value]"
            :value="item[optionConfig.value]" :label="item[optionConfig.label]">
        </el-option>
    </el-select>
</template>

<script>
import { throttle } from '@/utils/common';
export default {
    name: 'BaseLazySelect',
    props: {
        value: [String, Number, Array],
        multiple: {
            type: Boolean,
            default: false
        },
        valueFormat: {
            type: String,
            default: 'Array',
            validator(value) {
                return ['Array', 'String'].includes(value)
            }
        },
        valueSeparator: {
            type: String,
            default: ',',
            validator(value) {
                return value.length !== 0
            }
        },
        readonly: {
            type: Boolean,
            default: false
        },
        optionConfig: {
            type: Object,
            default: () => {
                return {
                    key: null, // option 的key值对应的属性名
                    value: 'value', // option 的value值对应的属性名
                    label: 'label', // option 的label值对应的属性名
                };
            },
        },
        options: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            // 滚动容器
            scrollDom: null,
            // 选项列表
            selectList: [],
            // 筛选列表
            filterList: [],
            // 当前页码
            page: 1,
            // 每页数量
            size: 20,
        };
    },
    computed: {
        modelValue: {
            get() {
                if (this.multiple && this.valueFormat === 'String') {
                    return (typeof this.value === 'string' && this.value) ? this.value.split(this.valueSeparator) : []
                } else {
                    return this.value
                }
            },
            set(val) {
                if (this.multiple && this.valueFormat === 'String') {
                    this.$emit("input", val.join(this.valueSeparator))
                } else {
                    this.$emit("input", val)
                }
            }
        }
    },
    watch: {
        // 监听options的变化，并初始化选择器
        options: {
            immediate: true,
            handler(val) {
                val.length && this.onInitSelect();
            },
        },
        // 监听value的变化
        value(newVal) {
            // 如果是多选且期望字符串格式，确保值始终为字符串
            if (this.multiple && this.valueFormat === 'String') {
                this.$emit("input", Array.isArray(newVal) ? newVal.join(this.valueSeparator) : newVal);
            }
            this.onInitSelect()
        },
    },
    mounted() {
        this.scrollDom = this.$refs.customSelect.$refs.scrollbar.$refs.wrap;
        this.scrollDom.addEventListener('scroll', throttle(this.onOptionsScroll, 200));
    },
    beforeDestroy() {
        this.scrollDom.removeEventListener('scroll', throttle(this.onOptionsScroll, 200));
    },
    methods: {
        // 初始化选择器，根据绑定值调整options的排列并赋值给filterList
        onInitSelect() {
            if (Array.isArray(this.modelValue)) {
                let selected = this.options.filter(item => this.modelValue.includes(item[this.optionConfig.value]))
                this.filterList = [...selected, ...this.options.filter(item => !this.modelValue.includes(item[this.optionConfig.value]))]
                this.onLoadFirstPage();
            } else if (this.modelValue) {
                let selected = this.options.filter(item => this.modelValue === item[this.optionConfig.value])
                this.filterList = [...selected, ...this.options.filter(item => this.modelValue !== item[this.optionConfig.value])]
                this.onLoadFirstPage();
            }
        },
        // 下拉列表打开与关闭时的回调
        onSelectVisible(val) {
            // 下拉列表打开时，如果绑定值为null或者undefined，就刷新选项排列
            if (val) {
                if (this.modelValue === undefined || this.modelValue === null) {
                    this.onFilterOptions('');
                } else {
                    this.onInitSelect();
                }
            }
            if (!val) {
                // 下拉列表关闭时，将选项列表重置为前二十条，减少dom数量
                this.page = -1
                this.selectList = [...this.filterList.slice(0, this.size)]
            }
        },
        // 根据输入值筛选选项
        onFilterOptions(str) {
            this.filterList = this.options.filter(item => {
                return item[this.optionConfig.label] && item[this.optionConfig.label].indexOf(str) > -1;
            });
            this.onLoadFirstPage();
        },
        // 监听下拉列表滚动
        onOptionsScroll() {
            if (this.scrollDom.scrollHeight - this.scrollDom.scrollTop - 1 <= this.scrollDom.clientHeight) {
                this.onLoadNextPage();
            }
        },
        // 加载第一页
        onLoadFirstPage() {
            this.page = 1;
            const length = this.filterList.length;
            if (length <= this.size) {
                this.selectList = this.filterList;
            } else {
                this.selectList = this.filterList.slice(0, this.size);
            }
        },
        // 加载下一页
        onLoadNextPage() {
            if (this.filterList.length <= this.page * this.size) {
                return;
            }
            ++this.page;
            const length = this.page * this.size;
            if (this.filterList.length <= length) {
                this.selectList = this.filterList;
            } else {
                this.selectList = this.filterList.slice(0, length);
            }
        },
    },
}
</script>
<style lang="scss" scoped>
::v-deep.is-readonly {
    .el-input.is-disabled .el-input__inner {
        background-color: #FFF;
        border-color: #DCDFE6;
        color: #606266;
        cursor: auto;
    }

    .el-input__suffix {
        display: none;
    }

    .el-select__tags span.el-tag {
        cursor: default;
    }

    .el-input.is-disabled .el-input__inner::-webkit-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner:-ms-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner::-ms-input-placeholder {
        color: #FFF
    }

    .el-input.is-disabled .el-input__inner::placeholder {
        color: #FFF;
    }
}
</style>