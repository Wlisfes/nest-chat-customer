<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { fetchJoiner, fetchCompadre } from '@/components/layer/layer.instance'
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
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**联系人、社群申请操作**/
        async function fetchUseJoiner() {
            // return await fetchJoiner({
            //     observer: props.observer,
            //     onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            // })
        }

        /**联系人申请验证操作**/
        async function fetchUseCompadre(scope: env.SchemaNotification) {
            return await fetchCompadre({
                node: scope,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width="100%"
                to={element.value}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-notification n-chunk n-column n-auto n-disover">
                    <chat-header title={props.title} onClose={(evt: MouseEvent) => fetchState({ visible: false })}></chat-header>
                    <div class="chunk-operate n-chunk n-column n-disover">
                        {props.source === env.EnumNotificationSource.contact ? (
                            <div class="chunk-column n-chunk n-center n-disover n-pointer" onClick={fetchUseJoiner}>
                                <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    新增联系人
                                </n-text>
                            </div>
                        ) : (
                            <div class="chunk-column n-chunk n-center n-disover n-pointer" onClick={fetchUseJoiner}>
                                <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsCommunit />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    查找社群
                                </n-text>
                            </div>
                        )}
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            {props.source === env.EnumNotificationSource.contact ? (
                                <Fragment>
                                    <div class="n-chunk n-column n-auto n-disover">
                                        {dataContact.value.map(item => (
                                            <chat-notify-contact key={item.keyId} node={item}></chat-notify-contact>
                                        ))}
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div class="n-chunk n-column n-auto n-disover">
                                        {dataCommunit.value.map(item => (
                                            <chat-notify-communit key={item.keyId} node={item}></chat-notify-communit>
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

<style lang="scss" scoped>
.chunk-operate {
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        z-index: 1;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    .chunk-column {
        user-select: none;
        overflow: hidden;
        padding: 14px;
        column-gap: 14px;
        background-color: var(--chat-column-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &:hover {
            background-color: var(--chat-column-hover-color);
        }
    }
}
.chunk-block {
    user-select: none;
    padding: 14px;
    column-gap: 10px;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
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
