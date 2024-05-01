<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useMessenger, useSession, useComment } from '@/store'
import { instance } from '@/store/messenger'
import { useMoment } from '@/hooks/hook-common'
import { socket } from '@/utils/utils-websocket'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeSessioner',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaSession>>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const { divineDateMomentTransfor } = useMoment()
        const user = useUser()
        const session = useSession()
        const message = useMessenger()
        const comment = useComment()

        onMounted(async () => {
            return await divineHandler(!node.value.mounted, {
                handler: async () => {
                    socket.value.on('server-customize-messager', fetchUpdateNodeMessager)
                    node.value.mounted = true
                }
            })
        })

        /**更新最新消息数据**/
        async function fetchUpdateNodeMessager(scope: Omix<env.SchemaMessager>) {
            return await divineHandler(scope.sessionId === node.value.sid, {
                handler: async function () {
                    node.value.message.keyId = scope.keyId
                    node.value.message.sid = scope.sid
                    node.value.message.createTime = scope.createTime
                    node.value.message.source = scope.source
                    node.value.message.status = scope.status
                    node.value.message.text = scope.text
                    node.value.message.userId = scope.userId
                    return await divineHandler(scope.userId !== user.uid, {
                        handler: async () => {
                            return (node.value.unread = node.value.unread.concat(scope))
                        }
                    })
                }
            })
        }

        /**更新会话未读列表**/
        async function fetchUpdateNodeUnread(unread: Array<env.SchemaMessager>) {
            return (node.value.unread = unread)
        }

        /**选择、切换会话**/
        async function fetchSessionSelector(evt: Event) {
            return await divineHandler(message.sid !== node.value.sid, {
                handler: async () => {
                    const limit = divineWherer(node.value.unread.length < message.limit, message.limit, node.value.unread.length)
                    await session.setState({ sid: node.value.sid })
                    await session.fetchSessionOneResolver()
                    await comment.setState({ message: '' })
                    return await message.fetchSessionColumnInitMessager(node.value.sid, limit).then(async ({ compared }) => {
                        return await divineHandler(compared && Boolean(instance.value), {
                            handler: async () => {
                                await fetchUpdateNodeUnread([])
                                return instance.value.scrollTo({
                                    top: 999999,
                                    behavior: 'auto'
                                })
                            }
                        })
                    })
                }
            })
        }

        return () => (
            <div
                class={{ 'chat-node-sessioner n-chunk n-pointer': true, 'chunk-present': session.sid === node.value.sid }}
                onClick={fetchSessionSelector}
            >
                {node.value.source === 'communit' ? (
                    <chat-avatar size={46} src={node.value.communit.poster.fileURL}></chat-avatar>
                ) : (
                    <Fragment>
                        {node.value.contact.userId === user.uid ? (
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
                                    {node.value.contact.userId === user.uid ? (
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
                            {(node.value.unread ?? []).length > 0 && node.value.source === env.EnumSessionSource.contact && (
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
