<template>
    <div class="re-list" :style="{ height: height }" @scroll="handleScroll($event)">
        <div class="re-list__phantom" :style="{ height: listHeight + 'px' }"></div>
        <ul class="re-list__body" :class="[listClass, { 'is-columns': isMultiColumn }]" ref="infiniteListRef"
            :style="{ transform: viewportTransform }">
            <li ref="items" :style="{ width: columnWidth }" class="re-list-item" :class="itemClass"
                v-for="(item, key) in visibleData" :key="key + '-' + item?.id">
                <slot :data="item" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ReList",
    props: {
        /**
         * @description 列表数据
         */
        data: {
            type: Array,
            default: () => [],
        },
        /**
         * @description 列表高度，必须是px、vh或者%
         */
        height: {
            type: String,
            default: "100%",
            validator: (value) => {
                const regex = /^(?:\d+\.?\d*(?:px|vh|%))$/;
                return regex.test(value);
            }
        },
        /**
         * @description 列表类名
         */
        listClass: String,
        /**
        * @description 列表项类名
        */
        itemClass: String,
        /**
         * @description 列数
         */
        column: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            /**
             * @description 列表可见高度，数字，px
             */
            visibleHeight: 0,
            /**
             * @description 列表项高度，数字，px
             */
            itemHeight: 1,
            /**
             * @description 列表在容器中的偏移量，数字，px
             */
            offset: 0,
            /**
             * @description 起始索引
             */
            start: 0,
            /**
             * @description 结束索引
             */
            end: null,
            /**
             * @description 是否正在滚动
             */
            scrolling: false,
        };
    },
    watch: {
        //监听列表数据
        data: {
            handler() {
                //修改每一个列的高度
                this.$nextTick(() => {
                    //获取每个列表高度
                    this.itemHeight = this.$refs.items
                        ? this.$refs.items[0].offsetHeight
                        : 1;
                    this.end = this.start + this.renderCount;
                });
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        /*
        * @description 是否多列
        */
        isMultiColumn() {
            return this.column > 1
        },
        columnWidth() {
            return `${(100 / this.column)}%`
        },
        /**
         * @description 列表总高度
         */
        listHeight() {
            return BigInt(Math.ceil(this.data.length / this.column) * this.itemHeight);
        },
        /**
         * @description 视口可容纳的列表项(包括缓冲区，缓冲区大小为6行)
         */
        renderCount() {
            return Math.min((Math.ceil(this.visibleHeight / this.itemHeight) + 6) * this.column, this.data.length)
        },
        /**
         * @description 可见的列表数据
         */
        visibleData() {
            return this.data.slice(
                this.start,
                Math.min(this.end, this.data.length)
            );
        },
        /**
         * @description 视口偏移量
         */
        viewportTransform() {
            return `translate3d(0,${this.offset}px,0)`;
        },
    },
    methods: {
        /**
         * @description 组件初始化
         */
        handleInit() {
            this.visibleHeight = this.$el.clientHeight; //根节点高度
            this.start = 0; //列表开始索引
            this.end = this.start + this.renderCount; //列表结束索引
        },
        /**
         * @description 处理列表容器滚动事件
         */
        handleScroll() {
            //当前滚动位置
            let scrollTop = this.$el.scrollTop;
            //此时的开始索引
            this.start = Math.floor(scrollTop / this.itemHeight) * this.column;
            //此时的结束索引
            this.end = this.start + this.renderCount;
            //此时的偏移量
            this.offset = scrollTop - (scrollTop % this.itemHeight);
            // if (!this.scrolling) {
            //     window.requestAnimationFrame(() => {
            //         //当前滚动位置
            //         let scrollTop = this.$el.scrollTop;
            //         //此时的开始索引
            //         this.start = Math.floor(scrollTop / this.itemHeight) * this.column;
            //         //此时的结束索引
            //         this.end = this.start + this.renderCount;
            //         //此时的偏移量
            //         this.offset = scrollTop - (scrollTop % this.itemHeight);
            //         this.scrolling = false
            //     })
            //     this.scrolling = true
            // }

        },

    },
    mounted() {
        this.handleInit()
        this.resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === this.$el) {
                    this.handleInit();
                }
            })
        })
        this.resizeObserver.observe(this.$el);
    },
    beforeDestroy() {
        this.resizeObserver.disconnect();
    },
};
</script>
<style scoped lang="scss">
.re-list {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;

    .re-list__phantom {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: -1;
    }

    .re-list__body {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
        list-style-type: none;
        padding: 0px;
        .re-list-item {
            color: #555;
            box-sizing: border-box;
        }
    }

    .is-columns {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
