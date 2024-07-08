<template>
    <div v-if="hasTargets" class="base-converter-values">
        <component v-for="item in target" :key="item" :is="container"  v-bind="$attrs" class="base-converter-value">{{ item }}</component>
    </div>
    <div v-else class="base-converter-value">
        <component :is="container" v-bind="$attrs">{{ target }}</component>
    </div>
</template>
<script>
export default {
    name: "BaseConverter",
    props: {
        /**
         * @description 要转换的值
         */
        value: {
            type: [Number, String, Boolean, Array],
            required: true,
        },
        /**
         * @description 与value相关联的根源数据，通常为数组，对象或者函数
         * @array 如果是数组，要求每个元素必须是一个带有value属性和label属性的对象[{value: '1', label: '级别A'}]
         * @object 如果是对象，则要求this.value必须是对象中的key
         * @function 如果是函数，则要求该函数必须由返回值
         */
        source: {
            type: [Array, Object, Function],
            required: true,
        },
        /**
         * @description 最终的渲染容器
         */
        container: {
            type: String,
            default: 'span',
        },
    },
    data() {
        return {

        }
    },
    computed: {
        /**
         * @description 最终的渲染值
         */
        target() {
            if (Object.prototype.toString.call(this.source) === '[object Array]') {
                if (typeof this.value === 'number' || typeof this.value === 'string') {
                    return (this.source.find(item => item.value === this.value) || {}).label
                } else if (Array.isArray(this.value)) {
                    return this.source.filter(item => this.value.includes(item.value)).map(item => item.label)
                } else {
                    return this.value
                }
            } else if (Object.prototype.toString.call(this.source) === '[object Object]') {
                if (this.value) {
                    return this.source[this.value]
                } else if (Array.isArray(this.value)) {
                    return this.value.map(item => this.source[item])
                } else {
                    return this.value
                }
            } else if (Object.prototype.toString.call(this.source) === '[object Function]') {
                return this.source(this.value) || this.value
            } else {
                return this.value
            }
        },
        /**
         * @description 是否有多个值
         */
        hasTargets() {
            return (Array.isArray(this.target) || this.target.length > 0)
        }

    },
    methods: {


    },
};
</script>
<style lang="scss" scoped>
.base-converter-values {
    display: inline-block;
    &>.base-converter-value {
        margin: 10px;
    }

}
.base-converter-value {
    display: inline-block;
}
</style>