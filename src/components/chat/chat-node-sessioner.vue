<script lang="tsx">
import { defineComponent, Fragment, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useStore } from '@/store'
import { useReduxtor } from '@/hooks/hook-reduxtor'
import { useMoment } from '@/hooks/hook-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeSessioner',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaSession>>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const { sid, fetchUpdateNodeSelector } = useReduxtor()
        const { divineDateMomentTransfor } = useMoment()
        const { uid } = useStore(useUser)
        const className = computed(() => ({
            'chat-node-sessioner n-chunk n-pointer': true,
            'chunk-present': sid.value === node.value.sid
        }))

        return () => (
            <div class={className.value} onClick={(evt: MouseEvent) => fetchUpdateNodeSelector(node.value.sid)}>
                {node.value.source === 'communit' ? (
                    <chat-avatar size={46} src={node.value.communit.poster.fileURL}></chat-avatar>
                ) : (
                    <Fragment>
                        {node.value.contact.userId === uid.value ? (
                            <chat-avatar size={46} src={node.value.contact.nive.avatar}></chat-avatar>
                        ) : (
                            <chat-avatar size={46} src={node.value.contact.user.avatar}></chat-avatar>
                        )}
                    </Fragment>
                )}
                <div class="chat-context n-chunk n-column n-auto n-disover" style={{ rowGap: '4px' }}>
                    <div class="chat-source n-chunk n-center" style={{ columnGap: '10px' }}>
                        <div class="n-chunk n-column n-auto n-disover">
                            {node.value.source === 'communit' ? (
                                <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                    <n-ellipsis tooltip={false}>{node.value.communit.name}</n-ellipsis>
                                </n-h2>
                            ) : (
                                <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                    {node.value.contact.userId === uid.value ? (
                                        <n-ellipsis tooltip={false}>{node.value.contact.nive.nickname}</n-ellipsis>
                                    ) : (
                                        <n-ellipsis tooltip={false}>{node.value.contact.user.nickname}</n-ellipsis>
                                    )}
                                </n-h2>
                            )}
                        </div>
                        {node.value.message && (
                            <n-text depth={3} style={{ fontSize: '12px', lineHeight: '14px' }}>
                                {divineDateMomentTransfor(node.value.message.createTime)}
                            </n-text>
                        )}
                    </div>
                    {node.value.message && (
                        <div class="chat-message n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                            <div class="n-chunk n-column n-auto n-disover" style={{ lineHeight: '20px', fontSize: '14px' }}>
                                {node.value.message.source === env.EnumMessagerSource.text ? (
                                    <n-text depth={3}>
                                        <n-ellipsis tooltip={false}>{node.value.message.text}</n-ellipsis>
                                    </n-text>
                                ) : (
                                    <n-text depth={3}>
                                        <n-ellipsis tooltip={false}>{`[${node.value.message.source}]`}</n-ellipsis>
                                    </n-text>
                                )}
                            </div>
                            {(node.value.unread ?? []).length > 0 && (
                                <div class="chat-badge n-chunk n-center n-middle">
                                    <span>{node.value.unread.length}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-node-sessioner {
    user-select: none;
    overflow: hidden;
    padding: 14px;
    column-gap: 14px;
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.chunk-present {
        background-color: var(--chat-column-hover-color);
    }
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
    &::before {
        content: '';
        position: absolute;
        left: 78px;
        right: 0;
        bottom: 0;
        border-top: 1px solid var(--chat-border-color);
        transition: border-top 0.3s var(--cubic-bezier-ease-in-out);
    }
    &:last-child {
        --chat-border-color: transparent;
    }
    .chat-badge {
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        box-sizing: border-box;
        font-size: 10px;
        line-height: 1;
        text-align: center;
        color: #ffffff;
        background-color: #25d366;
        border-radius: 99px;
        user-select: none;
        margin-top: 1px;
    }
}
</style>
