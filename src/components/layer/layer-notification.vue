<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { fetchJoiner } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerNotification',
    emits: ['close', 'submit'],
    props: {
        title: { type: String, default: '新对话' },
        source: { type: String as PropType<env.EnumNotificationSource>, required: true },
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { dataContact, dataCommunit } = useStore(useNotification)
        const { observer, visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**联系人、社群申请操作**/
        async function fetchUseJoiner() {
            return await fetchJoiner({
                observer,
                title: '查找联系人',
                placeholder: 'UID/邮箱/用户昵称',
                source: env.EnumNotificationSource.contact,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
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
                <n-element class="layer-notification n-chunk n-column n-auto n-disover">
                    <chat-header title={props.title} onClose={(evt: MouseEvent) => fetchState({ visible: false })}></chat-header>
                    <Fragment>
                        {props.source === env.EnumNotificationSource.contact ? (
                            <common-element
                                class="n-chunk n-center n-disover n-pointer"
                                chunk-before={{ left: 0, right: 0 }}
                                onClick={fetchUseJoiner}
                            >
                                <n-icon-wrapper size={42} color="#f0a020" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    查找联系人
                                </n-text>
                            </common-element>
                        ) : (
                            <common-element
                                class="n-chunk n-center n-disover n-pointer"
                                chunk-before={{ left: 0, right: 0 }}
                                onClick={fetchUseJoiner}
                            >
                                <n-icon-wrapper size={42} color="#f0a020" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsCommunit />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    查找社群
                                </n-text>
                            </common-element>
                        )}
                    </Fragment>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            {props.source === env.EnumNotificationSource.contact ? (
                                <Fragment>
                                    {dataContact.value.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无对话通知"></n-empty>
                                        </div>
                                    )}
                                    <div class="n-chunk n-column n-auto n-disover">
                                        {dataContact.value.map(item => (
                                            <next-notify-contact key={item.keyId} node={item}></next-notify-contact>
                                        ))}
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {dataCommunit.value.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无社群通知"></n-empty>
                                        </div>
                                    )}
                                    <div class="n-chunk n-column n-auto n-disover">
                                        {dataCommunit.value.map(item => (
                                            <next-notify-communit key={item.keyId} node={item}></next-notify-communit>
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
