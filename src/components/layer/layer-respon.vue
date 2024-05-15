<script lang="tsx">
import { defineComponent, computed, onMounted, PropType, CSSProperties } from 'vue'
import { useUser, useConfiger, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerRespon',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { wallpaper, theme } = useStore(useConfiger)
        const { visible, loading, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { paint, light, dark, waid, setState: setUser, fetchUserUpdate } = useStore(useUser)
        const { state, setState } = useState({
            paint: paint.value,
            light: light.value,
            dark: dark.value,
            waid: waid.value
        })
        const inverted = computed(() => theme.value === env.EnumUserTheme.light)

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**样式变量聚合**/
        function divineChunkClassName(scope: env.RestCommonWallpaper): Omix {
            return {
                'chunk-column': true,
                'chunk-current': state.waid === scope.waid
            }
        }

        /**样式变量聚合**/
        function divineChunkStyle(scope: env.RestCommonWallpaper): CSSProperties {
            return {
                '--chat-respon-border-color': divineWherer(inverted.value, '#009de2', '#667781'),
                '--chat-respon-color': divineWherer(inverted.value, scope.light, scope.dark)
            }
        }

        /**鼠标移入**/
        async function onMouseover(scope: env.RestCommonWallpaper) {
            return await divineHandler(!loading.value, {
                handler: async () => {
                    return await setUser({ light: scope.light, dark: scope.dark })
                }
            })
        }

        /**鼠标移出**/
        async function onMouseout(scope: env.RestCommonWallpaper) {
            return await divineHandler(!loading.value, {
                handler: async () => {
                    return await setUser({ light: state.light, dark: state.dark })
                }
            })
        }

        /**涂鸦设置切换**/
        async function fetchPaintUpdate(paint: boolean) {
            return await setUser({ paint }).then(async () => {
                return await fetchUserUpdate({ paint })
            })
        }

        /**更新壁纸背景**/
        async function fetchBasicUpdate(scope: env.RestCommonWallpaper, done: Function) {
            return await divineHandler(!loading.value && state.waid !== scope.waid, {
                handler: async () => {
                    await fetchState({ loading: true })
                    await done({ loading: true })
                    return await fetchUserUpdate({ color: scope.waid }, {}, async () => {
                        await setState({ waid: scope.waid, light: scope.light, dark: scope.dark })
                        await done({ loading: false })
                        return await fetchState({ loading: false })
                    })
                }
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
                <n-element class="layer-respon n-chunk n-column n-auto n-disover">
                    <chat-header title="对话" onClose={(evt: MouseEvent) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <div class="n-chunk n-column n-center n-middle n-disover" style={{ padding: '10px 24px 24px' }}>
                                <n-checkbox
                                    size="large"
                                    label="新增 Chat 涂鸦背景"
                                    focusable={false}
                                    disabled={loading.value}
                                    v-model:checked={state.paint}
                                    onUpdateChecked={(checked: boolean) => fetchPaintUpdate(checked)}
                                />
                            </div>
                            {wallpaper.value.length > 0 && (
                                <div class="n-chunk n-column n-disover" style={{ padding: '0 24px 24px' }}>
                                    <n-grid cols={3} x-gap={16} y-gap={16}>
                                        {wallpaper.value.map(item => (
                                            <n-grid-item key={item.keyId}>
                                                <common-state>
                                                    {{
                                                        default: (scope: Omix<{ loading: boolean }>, done: Function) => (
                                                            <div
                                                                class={divineChunkClassName(item)}
                                                                style={divineChunkStyle(item)}
                                                                onMouseover={(evt: MouseEvent) => onMouseover(item)}
                                                                onMouseout={(evt: MouseEvent) => onMouseout(item)}
                                                                onClick={(evt: MouseEvent) => fetchBasicUpdate(item, done)}
                                                            >
                                                                <div class="chunk-pointer n-chunk n-column n-center n-middle n-disover">
                                                                    {scope.loading && (
                                                                        <common-loadiner size={36} size-border={4}></common-loadiner>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </common-state>
                                            </n-grid-item>
                                        ))}
                                    </n-grid>
                                </div>
                            )}
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-column {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    padding-bottom: 100%;
    background-color: var(--chat-respon-color);
    transition: transform 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:not(.chunk-current):hover {
        transform: scale(0.9);
    }
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 5px solid transparent;
        transition: border 0.3s var(--cubic-bezier-ease-in-out);
    }
    &.chunk-current::before {
        border: 5px solid var(--chat-respon-border-color);
    }
    .chunk-pointer {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
}
</style>
