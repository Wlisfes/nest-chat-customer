<script lang="tsx">
import { defineComponent, ref, computed, watch, CSSProperties } from 'vue'
import { useCurrentElement, useElementSize } from '@vueuse/core'
import { useChat } from '@/store'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatLayer',
    setup() {
        const layer = useCurrentElement<HTMLElement>()
        const element = ref<HTMLElement>()
        const chat = useChat()
        const { width } = useElementSize(layer)
        const compute = computed<CSSProperties>(() => ({
            '--chat-layer-width': divineWherer(width.value > 2000, Math.floor(width.value * 0.8) + 'px', '1600px'),
            '--chat-layer-sider-width': divineWherer(width.value > 2000, '520px', '420px'),
            '--chat-layer-sider-shrink': divineWherer(width.value < 860, width.value + 'px', 'var(--chat-layer-sider-width)'),
            '--chat-layer-context': 'calc(100% - var(--chat-layer-sider-shrink)'
        }))

        watch(
            () => width.value,
            () => chat.setState({ width: width.value }),
            { immediate: true }
        )

        return () => (
            <n-element class="chat-layer" style={compute.value}>
                {chat.loading || chat.failure ? (
                    <div class="chat-loadiner n-chunk n-center n-middle">
                        <div class="chat-loadiner__container n-chunk n-column n-center n-middle">
                            <n-icon size={56} color="var(--text-color-3)" style={{ opacity: 0.2 }} component={<Iv-BsChat />}></n-icon>
                            <n-skeleton height="4px" round />
                            <n-text depth={3} style={{ opacity: 0.5, fontSize: '16px' }}>
                                Chat 盒子
                            </n-text>
                        </div>
                    </div>
                ) : (
                    <div ref={element} class="chat-element">
                        <div class="chat-element__container n-chunk">
                            <div class="chunk-sider n-chunk n-column">
                                <div class="chunk-sider__element n-chunk n-column n-auto">
                                    <chat-sider></chat-sider>
                                </div>
                            </div>
                            <div
                                class="chunk-context n-chunk n-column n-auto n-disover"
                                style={{ width: 'var(--chat-layer-context)', transition: 'width 0.3s var(--cubic-bezier-ease-in-out)' }}
                            >
                                <div class="n-chunk n-column n-auto n-disover" style={{ minWidth: '540px' }}>
                                    <chat-context></chat-context>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-layer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 24px;
    background-image: url('@/assets/images/auth-layout.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--chat-layout-before);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    @media (max-width: 1440px) {
        padding: 0;
    }
}

.chat-loadiner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: var(--chat-layout-loadiner);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    z-index: 9;
    &__container {
        width: 90%;
        max-width: 350px;
        margin: auto;
        row-gap: 24px;
    }
}

.chat-element {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: auto;
    box-sizing: border-box;
    max-width: var(--chat-layer-width);
    transition: max-width 0.3s var(--cubic-bezier-ease-in-out);
    &__container {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-2);
    }
}

.chunk-context {
    width: var(--chat-layer-context);
    transition: width 0.3s var(--cubic-bezier-ease-in-out);
}

.chunk-sider {
    overflow: hidden;
    width: var(--chat-layer-sider-shrink);
    transition: width 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 1px solid var(--chat-border-color);
        transition: border-right 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 1;
    }
    &__element {
        overflow: hidden;
        width: 100%;
        transition: width 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
