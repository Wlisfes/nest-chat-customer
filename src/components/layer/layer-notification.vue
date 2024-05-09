<script lang="tsx">
import { defineComponent, computed, onMounted, Fragment, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { divineWherer } from '@/utils/utils-common'
import { fetchCompadre } from '@/components/layer/layer.instance'
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
        const { uid } = useStore(useUser)
        const { state, fetchNotificationColumn } = useStore(useNotification)
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const dataSource = computed(() => {
            return state.value.dataSource.filter(item => item.source === props.source)
        })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**联系人申请操作**/
        async function fetchUseCompadre(scope: env.SchemaNotification) {
            // const own = scope.userId === uid.value
            // const { uid: userId, nickname } = divineWherer(own, scope.nive, scope.user)
            // const comment = divineWherer(own, `我：${scope.comment}`, `${nickname}：${scope.comment}`)
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
                    <chat-header title={props.title} onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="chunk-operate n-chunk n-column n-disover">
                        {props.source === env.EnumNotificationSource.contact ? (
                            <div class="chunk-column n-chunk n-center n-disover n-pointer">
                                <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    新增联系人
                                </n-text>
                            </div>
                        ) : (
                            <div class="chunk-column n-chunk n-center n-disover n-pointer">
                                <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                                    <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                                </n-icon-wrapper>
                                <n-text depth={1} style={{ fontSize: '18px' }}>
                                    新增联系人
                                </n-text>
                            </div>
                        )}
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            {dataSource.value.length > 0 && (
                                <div class="n-chunk n-column n-auto n-disover">
                                    {dataSource.value.map(item => {
                                        if (item.source === env.EnumNotificationSource.communit) {
                                            return (
                                                <div class="chunk-block n-chunk n-pointer" key={item.keyId}>
                                                    <chat-avatar size={42} src={item.communit.poster.fileURL}></chat-avatar>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                class="chunk-block n-chunk n-center n-pointer"
                                                key={item.keyId}
                                                onClick={(evt: MouseEvent) => fetchUseCompadre(item)}
                                            >
                                                <Fragment>
                                                    {item.userId === uid.value ? (
                                                        <chat-avatar size={42} src={item.nive.avatar}></chat-avatar>
                                                    ) : (
                                                        <chat-avatar size={42} src={item.user.avatar}></chat-avatar>
                                                    )}
                                                </Fragment>
                                                <div class="n-chunk n-column n-auto n-disover">
                                                    <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                                        {item.userId === uid.value ? (
                                                            <n-ellipsis tooltip={false}>{item.nive.nickname}</n-ellipsis>
                                                        ) : (
                                                            <n-ellipsis tooltip={false}>{item.user.nickname}</n-ellipsis>
                                                        )}
                                                    </n-h2>
                                                    <n-text style={{ fontSize: '13px', lineHeight: '20px' }}>
                                                        {item.userId === uid.value ? (
                                                            <n-ellipsis tooltip={false}>{`我：${item.comment}`}</n-ellipsis>
                                                        ) : (
                                                            <n-ellipsis tooltip={false}>{item.nive.comment}</n-ellipsis>
                                                        )}
                                                    </n-text>
                                                </div>
                                                <Fragment>
                                                    {item.status === env.EnumNotificationStatus.waitze ? (
                                                        <n-button size="small" tertiary focusable={false}>
                                                            查看
                                                        </n-button>
                                                    ) : item.status === env.EnumNotificationStatus.resolve ? (
                                                        <n-button text size="small" type="success" focusable={false}>
                                                            已添加
                                                        </n-button>
                                                    ) : (
                                                        <n-button text size="small" type="error" focusable={false}>
                                                            已拒绝
                                                        </n-button>
                                                    )}
                                                </Fragment>
                                            </div>
                                        )
                                    })}
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
