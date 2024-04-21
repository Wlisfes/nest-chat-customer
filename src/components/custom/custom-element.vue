<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useMessenger } from '@/store'
import { useProvider } from '@/hooks/hook-provider'
import { useMoment } from '@/hooks/hook-common'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomElement',
    props: {
        current: { type: Boolean, required: true },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { slots }) {
        const className = computed(() => divineWherer(props.current, 'chunk-current', 'chunk-other'))

        return () => (
            <div class={{ 'custom-element n-chunk n-column n-disover': true, [className.value]: true }}>
                <div class={{ 'n-chunk n-disover': true, 'n-end': props.current }}>
                    <div class={{ 'custom-content': true, [className.value]: true }}>{slots.default && slots.default()}</div>
                </div>
                <div class="element-date n-chunk n-center n-end">
                    <n-text depth={3}>{props.node.createTime}</n-text>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-date {
    height: 24px;
    padding: 0 2px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1;
    user-select: none;
}

.custom-content {
    user-select: none;
    padding: 10px;
    border-radius: 4px;
    &.chunk-current {
        background-color: #b9ffda;
    }
    &.chunk-other {
        background-color: #ffffff;
    }
}
.custom-element {
    position: relative;
    min-height: 42px;
    box-sizing: border-box;
    &.chunk-current {
        padding-right: 10px;
        &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 16px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-left: 10px solid #b9ffda;
            border-bottom: 7px solid transparent;
        }
    }
    &.chunk-other {
        padding-left: 10px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 16px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-right: 10px solid #ffffff;
            border-bottom: 7px solid transparent;
        }
    }
}
</style>
