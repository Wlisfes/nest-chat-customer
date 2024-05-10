<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'LayerResolver',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { sound, notify, email, setState: setUser, fetchUserUpdate } = useUser()
        const { state } = useState({ email, notify })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        return () => (
            <n-drawer
                v-model:show={visible.value}
                to={element.value}
                content-style={chunkContent.value}
                width="100%"
                placement="right"
                show-mask="transparent"
                auto-focus={false}
                mask-closable={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-resolver n-chunk n-column">
                    <chat-header title="账号" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <div class="chunk-block n-chunk n-center n-disover" style={{ columnGap: '16px' }}>
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        邮箱
                                    </n-text>
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        <n-ellipsis tooltip={false}>{state.email}</n-ellipsis>
                                    </n-text>
                                </div>
                                <div class="n-chunk n-center n-end">
                                    <n-button text focusable={false}>
                                        <n-icon size={22} component={<Iv-BsEdit />}></n-icon>
                                    </n-button>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-center n-disover" style={{ columnGap: '16px' }}>
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        密码
                                    </n-text>
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        {Array.from({ length: 10 }, () => (
                                            <n-icon size={12} component={<Iv-BsAsterisk />} />
                                        ))}
                                    </n-text>
                                </div>
                                <div class="n-chunk n-center n-end">
                                    <n-button text focusable={false}>
                                        <n-icon size={22} component={<Iv-BsEdit />}></n-icon>
                                    </n-button>
                                </div>
                            </div>
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-block {
    user-select: none;
    padding: 20px 24px;
    transition: opacity 0.3s var(--cubic-bezier-ease-in-out);
    &:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 0;
        height: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
