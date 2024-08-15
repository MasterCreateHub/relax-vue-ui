<template>
    <div class="base-toolbar">
        <div class="base-toolbar-actions">
            <slot name="actions">
                <el-button v-for="action in actions" :key="action.name" size="small" v-bind="action.config"
                    @click="$emit(action.name, action.name)">
                    {{ action.label }}
                </el-button>
            </slot>
        </div>
        <div class="base-toolbar-tools">
            <slot name="tools">
                <span class="base-toolbar-tool" v-for="tool in tools" :key="tool.toolName">
                    <template v-if="tool.tooltip">
                        <el-tooltip :content="tool.tipContent" placement="top">
                            <component :is="tool.renderType || 'el-button'" v-bind="tool.config"
                                v-on:[tool.eventType]="$emit(tool.eventName)" size="small"></component>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <component :is="tool.renderType || 'el-button'" v-bind="tool.config" size="small"></component>
                    </template>
                </span>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseToolbar',
    props: {
        actions: {
            type: Array,
            default: () => { return [] }
        },
        tools: {
            type: Array,
            default: () => { return [] }
        },
    },
    data() {
        return {
        }
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
    .base-toolbar{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .base-toolbar-actions {
      }
      .base-toolbar-tools {
        text-align: right;

        .el-button {
          margin: 0px 6px;
        }
      }
      
    }
</style>