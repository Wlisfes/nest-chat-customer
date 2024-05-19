<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { useCurrentElement, useElementSize } from '@vueuse/core'
import { useChat, useConfiger, useStore } from '@/store'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatLayer',
    setup() {
        const layer = useCurrentElement<HTMLElement>()
        const { isPwa } = useStore(useConfiger)
        const { loading, percentage } = useStore(useChat)
        const { width } = useElementSize(layer)
        const compute = computed<CSSProperties>(() => ({
            '--chat-layer-width': isPwa.value ? '100%' : divineWherer(width.value > 2000, Math.floor(width.value * 0.8) + 'px', '1600px'),
            '--chat-layer-sider-width': divineWherer(width.value > 2000, '520px', '420px')
        }))

        return () => (
            <n-element class={{ 'chat-layer n-chunk n-column n-auto': true, 'chat-pwa': isPwa.value }} style={compute.value}>
                {loading.value ? (
                    <div class="chat-loadiner n-chunk n-auto n-center n-middle">
                        <div class="chat-loadiner__container n-chunk n-column n-center n-middle">
                            <n-icon size={56} color="var(--text-color-3)" style={{ opacity: 0.2 }} component={<Iv-BsChat />}></n-icon>
                            <div
                                class={{ 'chunk-bar': true, 'is-finish': percentage.value >= 100 }}
                                style={{ '--bar-max-width': percentage.value + '%' }}
                            ></div>
                            <n-text depth={3} style={{ opacity: 0.5, fontSize: '16px' }}>
                                Chat 盒子
                            </n-text>
                        </div>
                    </div>
                ) : (
                    <div class="chat-element n-chunk n-column n-auto n-disover">
                        <div class="chat-element__container n-chunk n-auto n-disover">
                            <div class="chunk-sider n-chunk n-column">
                                <div class="chunk-sider__element n-chunk n-column n-auto">
                                    <chat-sider></chat-sider>
                                </div>
                            </div>
                            <div class="chunk-context n-chunk n-column n-auto n-disover">
                                <div class="n-chunk n-column n-auto n-disover" style={{ minWidth: '450px' }}>
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
    &:not(.chat-pwa) {
        padding: 24px;
        @media (max-width: 1440px) {
            padding: 0;
        }
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
    .chunk-bar {
        --bar-max-width: 0%;
        position: relative;
        width: 100%;
        height: 4px;
        overflow: hidden;
        border-radius: 2px;
        background-color: var(--progress-rail-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &.is-finish::before {
            transition: max-width 0.2s linear, background-color 0.2s linear;
        }
        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            max-width: var(--bar-max-width);
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            transition: max-width 2s linear, background-color 0.2s linear;
        }
    }
}

.chat-element {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    max-width: var(--chat-layer-width);
    animation: zoom-scale 0.3s var(--cubic-bezier-ease-in-out);
    @keyframes zoom-scale {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }
    &__container {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-2);
    }
}

.chunk-context {
    background-color: var(--chat-context-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}

.chunk-sider {
    overflow: hidden;
    width: var(--chat-layer-sider-width);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 1;
    }
    &__element {
        overflow: hidden;
        width: 100%;
        transition: width 0.3s;
    }
}
</style>
