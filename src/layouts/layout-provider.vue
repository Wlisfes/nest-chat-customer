<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { useCurrentElement, useElementSize } from '@vueuse/core'
import { useConfiger } from '@/store/configer'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutProvider',
    setup(props, { slots }) {
        const configer = useConfiger()
        const element = useCurrentElement<HTMLElement>()
        const { width } = useElementSize(element)
        const compute = computed<CSSProperties>(() => ({
            '--chat-layout-max-width': divineWherer(width.value > 2000, Math.floor(width.value * 0.8) + 'px', '1600px'),
            '--chat-layout-sider-width': divineWherer(width.value > 2000, '520px', divineWherer(width.value < 960, '0px', '420px')),
            '--chat-layout-sider-element-width': divineWherer(width.value > 2000, '520px', '420px')
        }))

        return () => (
            <n-element class="layout-provider" style={compute.value}>
                {width.value > 0 && (
                    <div class="layout-context n-chunk">
                        <div class="chunk-sider n-chunk n-column">
                            <div class="chunk-sider__element n-chunk n-column n-auto">{slots.sider && slots.sider()}</div>
                        </div>
                        <div class="chunk-context n-chunk n-column n-auto">{slots.default && slots.default()}</div>
                    </div>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-provider {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 24px;
    background-color: var(--chat-layout-color);
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 180px;
        background-color: var(--chat-layout-before);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    @media (max-width: 1440px) {
        padding: 0;
    }
    .layout-context {
        position: relative;
        width: 100%;
        max-width: var(--chat-layout-max-width);
        height: 100%;
        margin: auto;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-2);
        background-color: var(--chat-layout-context);
        transition: max-width 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}

.chunk-sider {
    overflow: hidden;
    width: var(--chat-layout-sider-width);
    transition: width 0.3s var(--cubic-bezier-ease-in-out);
    &__element {
        overflow: hidden;
        width: var(--chat-layout-sider-element-width);
        transition: width 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
