<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerSafety',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { factor, limit, setState: setUser, fetchUserUpdate } = useUser()
        const { state, setState } = useState({ factor, limit })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**更新双因子认证、双因子间隔时间**/
        async function fetchBasicUpdate(scope: { factor?: boolean; limit?: number }) {
            return await setUser(scope).then(async () => {
                return await fetchUserUpdate(scope)
            })
        }

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width="100%"
                to={element.value ?? document.body}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-safety n-chunk n-column">
                    <chat-header title="安全" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <div class="chunk-block n-chunk n-center n-disover n-pointer" style={{ columnGap: '20px' }}>
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        双因子认证
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        陌生设备登录、超出双因子间隔时间登录时需双因子认证方可登录
                                    </n-text>
                                </div>
                                <n-checkbox
                                    size="large"
                                    focusable={false}
                                    v-model:checked={state.factor}
                                    onUpdateChecked={(checked: boolean) => fetchBasicUpdate({ factor: checked })}
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
    height: 60px;
    padding: 10px 24px;
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
