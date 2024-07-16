<template>
    <div>
        <div ref="listRef" :style="{ height: containerHeight }" class="listContainer" @scroll="scrollEvent($event)">
            <div class="listPhantom" :style="{ height: computedListHeight + 'px' }"></div>
            <div class="list" ref="infiniteListRef" :style="{ transform: computedGetTransform }">
                <div ref="items" class="listItem" v-for="(item, key) in computedVisibleData" :key="key + '-' + item?.id"
                    :style="{ height: '100%' }">
                    <slot :data="item" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'BaseList',
    props: {
        //所有列表数据
        listData: {
            type: Array,
            default: () => []
        },
        //容器高度
        containerHeight: {
            type: String,
            default: "100%"
        }
    },
    watch: {
        //监听列表数据
        listData: {
            handler() {
                //修改每一个列的高度
                this.$nextTick(() => {
                    //获取每个列表高度
                    this.itemHeight = this.$refs.items ? this.$refs.items[0].offsetHeight : 1
                    this.end = this.start + this.computedVisibleCount;
                })
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        //获取真实显示列表数据
        computedVisibleData() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
        },
        //列表总高度
        computedListHeight() {
            return BigInt(this.listData.length * this.itemHeight);
        },
        //可显示的列表项数
        computedVisibleCount() {
            return Math.ceil(this.screenHeight / this.itemHeight)
        },
        //偏移量对应的style
        computedGetTransform() {
            return `translate3d(0,${this.startOffset}px,0)`;
        }
    },
    data() {
        return {
            //每列高度
            itemHeight: 1,
            //可视区域高度
            screenHeight: 0,
            //偏移量
            startOffset: 0,
            //起始索引
            start: 0,
            //结束索引
            end: null,
        };
    },
    methods: {
        scrollEvent() {
            //当前滚动位置
            let scrollTop = this.$refs.listRef.scrollTop;
            //此时的开始索引
            this.start = Math.floor(scrollTop / this.itemHeight);
            //此时的结束索引
            this.end = this.start + this.computedVisibleCount;
            //此时的偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemHeight);

        },
        //页面初始化
        handleInit() {
            this.screenHeight = this.$el.clientHeight;//客户端高度
            this.start = 0;//列表开始索引
            this.end = this.start + this.computedVisibleCount;//列表结束索引
        }
    },
    mounted() {
        this.handleInit()
    },
}
</script>
<style scoped lang="scss">
.listContainer {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.listPhantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
    z-index: 10;
}

.listItem {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
}
</style> 
  
