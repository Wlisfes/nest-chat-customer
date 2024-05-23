<script lang="tsx">
import { defineComponent, ref, Ref, computed, onMounted, CSSProperties, Transition, Teleport } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useUser, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayerCallmer',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { avatar, nickname } = useStore(useUser)
        const { state, setState } = useState({ visible: false, zoom: false, width: 320, height: 250, right: 10, bottom: 10 })
        const element = ref<HTMLElement>() as Ref<HTMLElement>
        const position = useDraggable(element, {
            onMove: onMoveCallmer,
            containerElement: document.body,
            preventDefault: true,
            stopPropagation: true,
            initialValue: {
                x: document.body.clientWidth - state.width - 10,
                y: document.body.clientHeight - state.height - 10
            }
        })
        const chunk = computed<CSSProperties>(() => ({
            zIndex: 2000,
            position: 'fixed',
            right: state.right + 'px',
            bottom: state.bottom + 'px',
            '--chunk-width': state.width + 'px',
            '--chunk-height': state.height + 'px'
        }))

        onMounted(async () => {
            await setState({ visible: true })
        })

        /**设置样式位置**/
        async function onMoveCallmer(evt: { x: number; y: number }) {
            const right = document.body.clientWidth - (evt.x + state.width)
            const bottom = document.body.clientHeight - (evt.y + state.height)
            const distance = document.body.clientWidth - state.width - 61
            return await setState({ bottom, right: right > distance ? distance : right })
        }

        /**放大、或者缩小**/
        async function onZoomCallmer() {
            if (state.zoom) {
                await setState({ zoom: false, width: 320, height: 250 })
            } else {
                await setState({ zoom: true, width: 640, height: 500 })
            }
        }

        return () => (
            <Teleport to={document.body}>
                <Transition name="fade-callmer" appear>
                    {state.visible && (
                        <div ref={element} style={chunk.value}>
                            <n-element class="chunk-callmer n-chunk n-column">
                                <div style={{ height: '32px' }}></div>
                                <div class="n-chunk n-column n-center n-auto n-disover" style={{ gap: '14px' }}>
                                    <chat-avatar size={68} radius={34} src={avatar.value}></chat-avatar>
                                    <n-h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 500, margin: 0 }}>
                                        <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                                    </n-h2>
                                </div>
                                <div class="chunk-callmer__footer n-chunk n-middle n-center n-disover">
                                    <n-button circle color="#07c160" onClick={(evt: Event) => emit('submit', evt)}>
                                        <n-icon size={28} color="#ffffff" component={<Iv-BsCaller />}></n-icon>
                                    </n-button>
                                    <n-button circle color="#ff0000" onClick={(evt: Event) => emit('close', evt)}>
                                        <n-icon
                                            size={28}
                                            color="#ffffff"
                                            style={{ transform: 'rotate(134deg)' }}
                                            component={<Iv-BsCaller />}
                                        ></n-icon>
                                    </n-button>
                                </div>
                            </n-element>
                        </div>
                    )}
                </Transition>
            </Teleport>
        )
    }
})
</script>

<style lang="scss" scoped>
.fade-callmer-enter-active,
.fade-callmer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-callmer-enter-from,
.fade-callmer-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.chunk-callmer {
    cursor: all-scroll;
    width: var(--chunk-width);
    height: var(--chunk-height);
    padding: 0 24px 24px 24px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: var(--box-shadow-2);
    background-color: var(--chat-carte-popover);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out), box-shadow 0.3s var(--cubic-bezier-ease-in-out),
        width 0.3s var(--cubic-bezier-ease-in-out), height 0.3s var(--cubic-bezier-ease-in-out);
    &__footer {
        column-gap: 80px;
        padding-top: 20px;
        .n-button {
            --n-width: 48px;
            --n-height: 48px;
        }
    }
}
</style>
