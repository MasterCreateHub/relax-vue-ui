<template>
    <div :class="['base-converter', 'base-converter__wrapper', { 'is-targets': isTargets }]">
        <component v-for="(item, index) in target" :key="'key' + index" :is="container" v-bind="$attrs"
            class="base-converter-value">
            {{ item }}
        </component>
    </div>
</template>

<script>
export default {
    name: "ReConverter",
    props: {
        /**
         * @description 要转换的值
         */
        value: {
            type: [Number, String, Boolean, Array, Date],
            required: true,
        },
        /**
         * @description 与value相关联的根源数据，通常为数组，对象或者函数
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
         */
        container: {
            type: String,
            default: 'span',
        },
    },
    computed: {
        /**
         * @description 最终的渲染值
         */
        target() {
            let result = [];

            const sourceType = Object.prototype.toString.call(this.source);

            switch (sourceType) {
                case '[object Array]':
                    if (typeof this.value === 'number' || typeof this.value === 'string') {
                        const foundItem = this.source.find(item => item.value === this.value);
                        result = foundItem ? [foundItem.label] : [];
                    } else if (Array.isArray(this.value)) {
                        result = this.source.filter(item => this.value.includes(item.value)).map(item => item.label);
                    } else {
                        result = [this.value];
                    }
                    break;
                case '[object Object]':
                    if (typeof this.value === 'string') {
                        result = [this.source[this.value]];
                    } else if (Array.isArray(this.value)) {
                        result = this.value.map(item => this.source[item]);
                    } else {
                        result = [this.value];
                    }
                    break;
                case '[object Function]':
                    try {
                        const returnValue = this.source(this.value);
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
                    result = [this.value];
                    break;
            }

            return result;
        },
        /**
         * @description 是否有多个值
         */
        isTargets() {
            return this.target.length > 0;
        }
    },
    methods: {},
};
</script>

<!-- <style lang="scss" scoped>
.base-converter__wrapper {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;

    &>.base-converter-value:not(:last-child) {
        margin-right: 10px;
    }
}
</style> -->