<template>
    <div :class="['re-converter', { 'is-Multiple': hasMultipleValues }]">
        <component v-for="(item, index) in convertedValues" :key="'key' + index" :is="container" v-bind="formatContainerProps(item)"
            v-on="formatContainerEvents(item)" class="re-converter-value">
            {{ item || defaultValue }}
        </component>
    </div>
</template>

<script>
export default {
    name: "ReConverter",
    props: {
        /**
         * @description 要转换的目标值
         * @type {Number | String | Boolean | Array | Date}
         */
        target: {
            type: [Number, String, Boolean, Array, Date],
            required: true,
            default: null,
        },
        /**
         * @description 与目标相关联的根源数据，通常为数组，对象或者函数;
         * 如果是数组，要求每个元素必须是一个带有value属性和label属性的对象;
         * 如果是函数，则要求该函数必须有返回值;
         * 如果是字符串，要求是一个表达式，可使用变量$targetValue,表示要转换的数据
         * @type {Array | Object | Function | String}
         */
        source: {
            type: [Array, Object, Function, String],
            required: true,
            validator(value) {
                if (Array.isArray(value)) {
                    return value.every(item =>
                        typeof item === 'object' &&
                        item !== null &&
                        'value' in item &&
                        'label' in item
                    );
                }
                return true; // 对于对象或函数不做额外检查
            },
        },
        /**
         * @description 渲染容器的标签
         * @type {String}
         */
        container: {
            type: String,
            default: 'span',
        },
        /**
         * @description 容器的props
         * @type {Object}
         */
        containerProps: {
            type: Object,
            default: () => {
                return {};
            },
        },
        /**
         * @description 容器的events
         * @type {Object}
         */
        containerEvents: {
            type: Object,
            default: () => {
                return {};
            },
        },
        /**
         * @description 默认渲染的值
         * @type {String | Number}
         */
        defaultValue: {
            type: [String, Number],
            default: null,
        },
    },
    data() {
        return {};
    },
    computed: {
        /**
         * @description 最终的渲染值
         */
        convertedValues() {
            const sourceType = Object.prototype.toString.call(this.source);
            switch (sourceType) {
                case '[object Array]':
                    if (this.target === null || this.target === undefined || this.target === '') {
                        return this.defaultValue ? [this.defaultValue] : []
                    }
                    if (Boolean(this.target) && typeof this.target === 'number' || typeof this.target === 'string') {
                        const foundItem = this.source.find(item => item.value === this.target);
                        return foundItem ? [foundItem.label] : [];
                    }
                    if (Array.isArray(this.target)) {
                        return this.source.filter(item => this.target.includes(item.value)).map(item => item.label);
                    }
                    return [this.target]

                case '[object Object]':
                    if (this.target === null || this.target === undefined || this.target === '') {
                        return this.defaultValue ? [this.defaultValue] : []
                    }
                    if (Boolean(this.target) && typeof this.target === 'string') {
                        return [this.source[this.target]];
                    }
                    if (Array.isArray(this.target)) {
                        return this.target.map(item => this.source[item]);
                    }
                    return [this.target]

                case '[object Function]':
                    try {
                        const returnValue = this.source(this.target);
                        const isAllowType = Boolean(typeof returnValue === 'string' ||
                            typeof returnValue === 'number' ||
                            typeof returnValue === 'boolean' ||
                            Array.isArray(returnValue))
                        const isAllowValue = Boolean(returnValue !== null && returnValue !== undefined && returnValue !== '')
                        if (isAllowValue && isAllowType) {
                            return Array.isArray(returnValue) ? returnValue : [returnValue];
                        } else {
                            return this.defaultValue ? [this.defaultValue] : []
                        }
                    } catch (error) {
                        console.error('An error occurred while calling the source function:', error);
                        return this.defaultValue ? [this.defaultValue] : []
                    }

                case '[object String]':
                    try {
                        const func = new Function(['$targetValue'], 'return ' + this.source)
                        const returnValue = func(this.target)
                        const isAllowType = Boolean(typeof returnValue === 'string' ||
                            typeof returnValue === 'number' ||
                            typeof returnValue === 'boolean' ||
                            Array.isArray(returnValue))
                        const isAllowValue = Boolean(returnValue !== null && returnValue !== undefined && returnValue !== '')

                        if (isAllowValue && isAllowType) {
                            return Array.isArray(returnValue) ? returnValue : [returnValue];
                        } else {
                            return this.defaultValue ? [this.defaultValue] : []
                        }
                    } catch (error) {
                        console.error('An error occurred while evaluating the source expression:', error);
                        return this.defaultValue ? [this.defaultValue] : []
                    }
                default:
                    if (this.target === null || this.target === undefined || this.target === '') {
                        return this.defaultValue ? [this.defaultValue] : []
                    }
                    return Array.isArray(this.target) ? this.target : [this.target];
            }
        },
        /**
         * @description 是否有多个值
         */
        hasMultipleValues() {
            return this.convertedValues.length > 0;
        },
        /**
         * @description 最终计算得出的各个容器的props
         */
        formatContainerProps() {
            return (item) => {
                const props = {};
                if(Array.isArray(this.source)){
                    const foundItem = this.source.find(sourceItem => sourceItem.label === item);
                    (foundItem.containerProps) && Object.keys(foundItem.containerProps).forEach((key) => {
                        props[key] = foundItem.containerProps[key];
                    })
                }
                return { ...this.containerProps, ...props };
            };
        },
        /**
         * @description 最终计算得出的容器的events，为事件新增一个参数，为当前渲染的值
         */
        formatContainerEvents() {
            return (item) => {
                const events = {};
                Object.keys(this.containerEvents).forEach((event) => {
                    events[event] = (...args) => {
                        this.containerEvents[event](item, ...args);
                    };
                })
                return { ...events };
            };
        }
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.re-converter {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;

    &>.re-converter-value:not(:last-child) {
        margin-right: 10px;
    }
}
</style>