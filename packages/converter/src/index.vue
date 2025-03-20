<template>
  <div :class="['re-converter', { 'is-Multiple': hasMultipleValues }]">
    <component
      v-for="(item, index) in convertedValues"
      :key="'key' + index"
      :is="container"
      v-bind="formatContainerProps(item)"
      v-on="formatContainerEvents(item)"
      class="re-converter-value"
    >
      {{ item || defaultValue }}
    </component>
  </div>
</template>

<script>
import { formatEvents } from '/src/utils/index';
export default {
  name: 'ReConverter',
  props: {
    /**
     * @description 要转换的目标值
     * @type {Any}
     * @default null
     */
    target: {
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
          return value.every(
            (item) =>
              typeof item === 'object' && item !== null && 'value' in item && 'label' in item
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
     * @description 默认值，当转换失败或转换后值为`null`、`undefined`、''、NaN时使用
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
     * @description 最终的渲染值数组，如果转换后值为`null`、`undefined`、''、NaN，如果`defaultValue`合法则使用，否则不渲染
     */
    convertedValues() {
      const sourceType = Object.prototype.toString.call(this.source);
      const validValue = (value) =>
        value !== null && value !== undefined && value !== '' && !Number.isNaN(value);
      const validType = (value) =>
        ['string', 'number', 'boolean'].includes(typeof value) || Array.isArray(value);
      const hasDefault = validValue(this.defaultValue);

      // 统一处理空目标值逻辑
      if (!validValue(this.target)) {
        return hasDefault ? [this.defaultValue] : [];
      }

      // 通用数组处理逻辑
      const processArrayTarget = (getValue) => {
        return this.target.reduce((acc, cur) => {
          const value = getValue(cur);
          validValue(value) ? acc.push(value) : hasDefault && acc.push(this.defaultValue);
          return acc;
        }, []);
      };

      switch (sourceType) {
        case '[object Array]': {
          if (
            typeof this.target === 'number' ||
            typeof this.target === 'string' ||
            typeof this.target === 'boolean'
          ) {
            const item = this.source.find((i) => i.value === this.target);
            return validValue(item?.label) ? [item.label] : hasDefault ? [this.defaultValue] : [];
          }
          return processArrayTarget((cur) => this.source.find((i) => i.value === cur)?.label);
        }

        case '[object Object]': {
          if (typeof this.target === 'string') {
            const value = this.source[this.target];
            return validValue(value) ? [value] : hasDefault ? [this.defaultValue] : [];
          }
          return processArrayTarget((cur) => this.source[cur]);
        }

        case '[object Function]':
        case '[object String]': {
          try {
            const result =
              sourceType === '[object Function]'
                ? this.source(this.target)
                : new Function(['$targetValue'], 'return ' + this.source)(this.target);

            const processResult = (value) => {
              if (!validType(value) || !validValue(value))
                return hasDefault ? [this.defaultValue] : [];
              return Array.isArray(value)
                ? value
                    .map((v) => (validValue(v) ? v : hasDefault ? this.defaultValue : undefined))
                    .filter(Boolean)
                : [value];
            };

            return processResult(result);
          } catch (error) {
            console.error('Source processing error:', error);
            return hasDefault ? [this.defaultValue] : [];
          }
        }

        default:
          // 当source类型未知时直接返回target的合理形式
          return Array.isArray(this.target)
            ? this.target
                .filter(validValue)
                .map((v) => (validValue(v) ? v : hasDefault ? this.defaultValue : undefined))
                .filter(Boolean)
            : validValue(this.target)
            ? [this.target]
            : hasDefault
            ? [this.defaultValue]
            : [];
      }
    },
    /**
     * @description 是否有多个值
     */
    hasMultipleValues() {
      return this.convertedValues.length > 1;
    },
    /**
     * @description 最终计算得出的各个容器的props
     */
    formatContainerProps() {
      return (item) => {
        const props = {};
        if (Array.isArray(this.source)) {
          const foundItem = this.source.find((sourceItem) => sourceItem.label === item);
          foundItem?.containerProps &&
            Object.keys(foundItem.containerProps).forEach((key) => {
              props[key] = foundItem.containerProps[key];
            });
        }
        return { ...this.containerProps, ...props };
      };
    },
    /**
     * @description 最终计算得出的容器的events，为事件新增一个参数，为当前渲染的值
     */
    formatContainerEvents() {
      return (params) => {
        return formatEvents({ events: this.containerEvents }, params);
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.re-converter {
  box-sizing: border-box;
  display: inline-block;

  & > .re-converter-value:not(:last-child) {
    margin-right: 10px;
  }
}

.re-converter + .re-converter {
  margin-left: 10px;
}
</style>
