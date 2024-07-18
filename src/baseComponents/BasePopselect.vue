<template>
    <el-popover ref="popover">
        <template #reference>
            <slot></slot>
        </template>
        <div class="base-list-container" @scroll="handleScroll($event)">
            <div class="base-list-phantom" :style="{ height: listHeight + 'px' }"></div>
            <ul class="base-list" :class="listClass" ref="infiniteListRef" :style="{ transform: viewportTransform }">
                <li ref="items" class="base-list-item" :class="itemClass" v-for="(item, index) in visibleData"
                    :key="'option-' + index">
                    <slot :data="item" />
                </li>
            </ul>
        </div>
    </el-popover>
</template>

<script>
export default {
    name: "BasePopselect",
    props: {
        /**
         * @description 列表数据
         */
        options: {
            type: Array,
            default: () => [],
        },
        /**
         * @description 列表类名
         */
        listClass: String,
        /**
        * @description 列表项类名
        */
        itemClass: String,
    },
    data() {
        return {


            /**
             * @description 列表项高度，数字，px
             */
            itemHeight: 20,
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
        };
    },
    computed: {
        /**
             * @description 列表视口高度，数字，px
             */
        visibleHeight() {
            return Math.min(this.options.length * this.itemHeight, 100)

        },
        /**
         * @description 列表总高度
         */
        listHeight() {
            return BigInt(this.options.length * this.itemHeight);
        },
        /**
         * @description 视口可容纳的列表项(包括缓冲区)
         */
        renderCount() {
            return Math.ceil(this.visibleHeight / this.itemHeight) + 6;
        },
        /**
         * @description 可见的列表数据
         */
        visibleData() {
            return this.options.slice(
                this.start,
                Math.min(this.end, this.options.length)
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
            this.visibleHeight = this.$el.clientHeight; //客户端高度
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
            this.start = Math.floor(scrollTop / this.itemHeight);
            //此时的结束索引
            this.end = this.start + this.renderCount;
            //此时的偏移量
            this.offset = scrollTop - (scrollTop % this.itemHeight);

        },

    },
    mounted() {
        this.handleInit()
    },
};
</script>
<style scoped lang="scss">
.base-list-container {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;

    .base-list-phantom {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: -1;
    }

    .base-list {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
        list-style-type: none;
        padding: 0px;

        .base-list-item {
            color: #555;
            box-sizing: border-box;
        }
    }
}
</style>
