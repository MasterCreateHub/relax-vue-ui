<template>
    <div :class="['re-converter', 're-converter__wrapper', { 'is-Multiple': isMultipleValues }]">
        <component v-for="(item, index) in convertedValues" :key="'key' + index" :is="container" v-bind="$attrs" v-on="$listeners"
            class="re-converter-value">
            {{ item }}
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
        },
        /**
         * @description 与目标相关联的根源数据，通常为数组，对象或者函数
         * @type {Array | Object | Function}
         * @array 如果是数组，要求每个元素必须是一个带有value属性和label属性的对象[{value: '1', label: '级别A'}]
         * @object 如果是对象，则要求this.value必须是对象中的key
         * @function 如果是函数，则要求该函数必须有返回值
         */
        source: {
            type: [Array, Object, Function],
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
         * @description 最终的渲染容器
         * @type {String}
         */
        container: {
            type: String,
            default: 'span',
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
            let result = [];

            const sourceType = Object.prototype.toString.call(this.source);

            switch (sourceType) {
                case '[object Array]':
                    if (typeof this.target === 'number' || typeof this.target === 'string') {
                        const foundItem = this.source.find(item => item.value === this.target);
                        result = foundItem ? [foundItem.label] : [];
                    } else if (Array.isArray(this.target)) {
                        result = this.source.filter(item => this.target.includes(item.value)).map(item => item.label);
                    } else {
                        result = [this.target];
                    }
                    break;
                case '[object Object]':
                    if (typeof this.target === 'string') {
                        result = [this.source[this.target]];
                    } else if (Array.isArray(this.target)) {
                        result = this.target.map(item => this.source[item]);
                    } else {
                        result = [this.target];
                    }
                    break;
                case '[object Function]':
                    try {
                        const returnValue = this.source(this.target);
                        if (typeof returnValue === 'string' ||
                            typeof returnValue === 'number' ||
                            typeof returnValue === 'boolean' ||
                            Array.isArray(returnValue)) {
                            result = Array.isArray(returnValue) ? returnValue : [returnValue];
                        } else {
                            result = [];
                        }
                    } catch (error) {
                        console.error('An error occurred while calling the source function:', error);
                        result = [];
                    }
                    break;
                default:
                    result = [this.target];
                    break;
            }

            return result;
        },
        /**
         * @description 是否有多个值
         */
        isMultipleValues() {
            return this.convertedValues.length > 0;
        }
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.re-converter__wrapper {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;

    &>.re-converter-value:not(:last-child) {
        margin-right: 10px;
    }
}
</style>