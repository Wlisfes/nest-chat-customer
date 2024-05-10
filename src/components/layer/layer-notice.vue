<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'LayerNotice',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { sound, notify, setState: setUser, fetchUserUpdate } = useUser()
        const { state } = useState({ sound, notify })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**更新声音、消息通知**/
        async function fetchBasicUpdate(scope: { notify?: boolean; sound?: boolean }) {
            return await setUser(scope).then(async () => {
                return await fetchUserUpdate(scope)
            })
        }

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
                <n-element class="layer-notice n-chunk n-column n-auto n-disover">
                    <chat-header title="通知" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <div class="chunk-block n-chunk n-center n-disover n-pointer" style={{ columnGap: '20px' }}>
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        消息通知
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        有新消息时显示相关通知
                                    </n-text>
                                </div>
                                <n-checkbox
                                    size="large"
                                    focusable={false}
                                    v-model:checked={state.notify}
                                    onUpdateChecked={(checked: boolean) => fetchBasicUpdate({ notify: checked })}
                                />
                            </div>
                            <div class="chunk-block n-chunk n-center n-disover n-pointer" style={{ columnGap: '20px' }}>
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        声音
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        在接收消息时播放铃声
                                    </n-text>
                                </div>
                                <n-checkbox
                                    size="large"
                                    focusable={false}
                                    v-model:checked={state.sound}
                                    onUpdateChecked={(checked: boolean) => fetchBasicUpdate({ sound: checked })}
                                />
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
