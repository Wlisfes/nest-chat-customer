<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useUser, useMessenger } from '@/store'
import { instance } from '@/store/messenger'
import { useProvider } from '@/hooks/hook-provider'
import { useMoment } from '@/hooks/hook-common'
import { divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeSessioner',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaSession>>, required: true }
    },
    setup(props) {
        const user = useUser()
        const message = useMessenger()
        const { inverted } = useProvider()
        const { divineDateMomentTransfor } = useMoment()
        const chunk = computed(() => ({
            '--chat-hover-node-sessioner': divineWherer(inverted.value, '#202c33', '#f0f2f5'),
            '--chat-active-node-sessioner': divineWherer(message.sessionId === props.node.sid, 'var(--chat-hover-node-sessioner)', '#0000')
        }))

        /**选择、切换会话**/
        async function onSessionSelector(node: Omix<env.SchemaSession>, evt: Event) {
            return await divineHandler(message.sessionId !== node.sid, async () => {
                await message.fetchSessionColumnInitMessager(node.sid)
                await divineHandler(Boolean(instance.value), () => {
                    return instance.value.scrollTo({
                        top: 999999,
                        behavior: 'auto'
                    })
                })
            })
        }

        return () => (
            <div
                class="chat-node-sessioner n-chunk n-pointer"
                style={chunk.value}
                onClick={(evt: Event) => onSessionSelector(props.node, evt)}
            >
                <div class="chat-avatar">
                    {props.node.source === 'communit' ? (
                        <n-image preview-disabled src={props.node.communit.poster.fileURL} />
                    ) : (
                        <Fragment>
                            {props.node.contact.userId === user.uid ? (
                                <n-image preview-disabled src={props.node.contact.nive.avatar} />
                            ) : (
                                <n-image preview-disabled src={props.node.contact.user.avatar} />
                            )}
                        </Fragment>
                    )}
                </div>
                <div class="chat-context n-chunk n-column n-auto" style={{ overflow: 'hidden', rowGap: '4px' }}>
                    <div class="chat-source n-chunk n-center" style={{ columnGap: '10px' }}>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            {props.node.source === 'communit' ? (
                                <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                    <n-ellipsis tooltip={false}>{props.node.communit.name}</n-ellipsis>
                                </n-h2>
                            ) : (
                                <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                    {props.node.contact.userId === user.uid ? (
                                        <n-ellipsis tooltip={false}>{props.node.contact.nive.nickname}</n-ellipsis>
                                    ) : (
                                        <n-ellipsis tooltip={false}>{props.node.contact.user.nickname}</n-ellipsis>
                                    )}
                                </n-h2>
                            )}
                        </div>
                        {props.node.message && (
                            <n-text depth={3} style={{ fontSize: '12px', lineHeight: '14px' }}>
                                {divineDateMomentTransfor(props.node.message.createTime)}
                            </n-text>
                        )}
                    </div>
                    {props.node.message && (
                        <div class="chat-message n-chunk n-center" style={{ columnGap: '10px', overflow: 'hidden' }}>
                            <div style={{ flex: 1, overflow: 'hidden', lineHeight: '20px', fontSize: '14px' }}>
                                {props.node.message.source === env.EnumMessagerSource.text ? (
                                    <n-text depth={3}>
                                        <n-ellipsis tooltip={false}>{props.node.message.text}</n-ellipsis>
                                    </n-text>
                                ) : (
                                    <n-text depth={3}>
                                        <n-ellipsis tooltip={false}>{`[${props.node.message.source}]`}</n-ellipsis>
                                    </n-text>
                                )}
                            </div>
                            {props.node.unread.length > 0 && props.node.source === env.EnumSessionSource.contact && (
                                <div class="chat-badge n-chunk n-center n-middle">
                                    <span>{props.node.unread.length}</span>
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
    background-color: var(--chat-active-node-sessioner);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-hover-node-sessioner);
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
    .chat-avatar {
        width: 46px;
        height: 46px;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        :deep(.n-image),
        :deep(img) {
            width: 100%;
            height: 100%;
            display: block;
        }
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
