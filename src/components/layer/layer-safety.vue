<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { divineRender, divineNotice, divineDiscover } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'LayerSafety',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { factor, limit, setState: setUser, fetchUserUpdate } = useUser()
        const { state, setState } = useState({
            factor,
            limit,
            options: [
                { label: '1天', value: 1 },
                { label: '3天', value: 3 },
                { label: '7天', value: 7 },
                { label: '10天', value: 10 },
                { label: '15天', value: 15 },
                { label: '30天', value: 20 }
            ]
        })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**更新双因子认证、双因子间隔时间**/
        async function fetchBasicUpdate(scope: { factor?: boolean; limit?: number }, option?: Omix) {
            return await setUser(scope).then(async () => {
                return await fetchUserUpdate(scope, option)
            })
        }

        /**双因子认证间隔时间配置**/
        async function fetchBasicDiscover() {
            const cache = state.limit
            return await divineDiscover({
                icon: 'BsMistake',
                title: '修改双因子认证间隔时间',
                negativeText: '取消',
                positiveText: '保存',
                positiveButtonProps: { type: 'success' },
                content: (
                    <n-form-item show-label={false} style={{ paddingTop: '10px' }}>
                        <n-select size="large" placeholder="请选择间隔时间" v-model:value={state.limit} options={state.options} />
                    </n-form-item>
                ),
                onNegativeClick: async evt => Boolean(await setState({ limit: cache })),
                onPositiveClick: async (evt, vm) => {
                    try {
                        vm.loading = true
                        return Boolean(await fetchBasicUpdate({ limit: state.limit }, { notice: true }))
                    } catch (e) {
                        return (vm.loading = false)
                    }
                }
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
                            <div
                                style={{ opacity: state.factor ? 1 : 0.5 }}
                                class={{
                                    'chunk-block n-chunk n-center n-disover': true,
                                    'n-pointer': state.factor,
                                    'n-disabled': !state.factor
                                }}
                            >
                                <div class="n-chunk n-column n-auto n-disover">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                        {`双因子认证间隔时间：${state.limit}天`}
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                                        在双因子认证间隔时间内的白名单设备可直接登录
                                    </n-text>
                                </div>
                                <div class="n-chunk n-center n-end" style={{ width: '38px' }}>
                                    <n-button text focusable={false} disabled={!state.factor} onClick={fetchBasicDiscover}>
                                        <n-icon size={22} color="var(--text-color-2)" component={<Iv-BsEdit />}></n-icon>
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
