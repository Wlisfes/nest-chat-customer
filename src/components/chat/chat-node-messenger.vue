<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useSession } from '@/store'
import { socket, divineSocketCustomizeMessager, divineSocketChangeMessager } from '@/utils/utils-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeMessenger',
    props: {
        order: { type: Number, default: 0 },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const user = useUser()
        const session = useSession()
        const current = computed(() => user.uid === node.value.userId)
        const className = computed(() => ({
            'chunk-messenger n-chunk n-auto n-disover': true,
            'chunk-current n-end': current.value,
            'chunk-other': !current.value
        }))

        onMounted(async () => {
            if (props.node.status === env.EnumMessagerStatus.initialize) {
                /**消息初始化状态**/
                await fetchSocketInitialize(props.node)
            } else {
                await fetchSocketMonitor(props.node.sid)
                const read = props.node.reads.some(item => item.userId === user.uid)
                if (!read) {
                    /**消息未读状态**/
                    await fetcnSocketChangeMessager()
                }
            }
        })

        /**更新消息SID**/
        async function setNodeSid(sid: string) {
            node.value.sid = sid
        }

        /**更新消息状态**/
        async function setNodeStatus(status: env.EnumMessagerStatus, reason: string = '') {
            node.value.status = status
            node.value.reason = reason
        }

        /**消息已读操作**/
        async function fetcnSocketChangeMessager() {
            return await divineSocketChangeMessager(socket.value, {
                sid: node.value.sid,
                userId: user.uid,
                sessionId: node.value.sessionId
            })
        }

        /**Socket事件监听**/
        async function fetchSocketMonitor(sid: string) {
            return socket.value.on(sid, async (data: Omix<env.BodySocketChangeMessager>) => {
                await session.fetchSessionReadUpdate(data)
            })
        }

        /**初始化状态、socket发送消息**/
        async function fetchSocketInitialize(scope: Omix<env.SchemaMessager>) {
            try {
                const { sid } = await divineSocketCustomizeMessager(socket.value, {
                    sessionId: scope.sessionId,
                    source: scope.source,
                    text: scope.text
                })
                await setNodeSid(sid)
                await fetchSocketMonitor(sid)
                return await session.fetchSessionPushSidUpdate({ sid: sid, sessionId: scope.sessionId })
            } catch (e: any) {
                return await setNodeStatus(env.EnumMessagerStatus.failed, e.message)
            }
        }

        return () => (
            <div class="chat-node-messenger" style={{ order: props.order }}>
                {current.value ? (
                    <div class="n-chunk n-end n-disover" style={{ columnGap: '10px' }}>
                        <div class={className.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter current={current.value} node={node.value}></custom-texter>
                            ) : node.value.source === env.EnumMessagerSource.image ? (
                                <custom-image current={current.value} node={node.value}></custom-image>
                            ) : node.value.source === env.EnumMessagerSource.document ? (
                                <custom-document max-width={360} current={current.value} node={node.value}></custom-document>
                            ) : (
                                <custom-texter current={current.value} node={node.value}></custom-texter>
                            )}
                        </div>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                    </div>
                ) : (
                    <div class="n-chunk n-disover" style={{ columnGap: '10px' }}>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                        <div class={className.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter current={current.value} node={node.value}></custom-texter>
                            ) : node.value.source === env.EnumMessagerSource.image ? (
                                <custom-image current={current.value} node={node.value}></custom-image>
                            ) : node.value.source === env.EnumMessagerSource.document ? (
                                <custom-document max-width={360} current={current.value} node={node.value}></custom-document>
                            ) : (
                                <custom-texter current={current.value} node={node.value}></custom-texter>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-messenger {
    min-height: 40px;
    box-sizing: border-box;
    &.chunk-current {
        padding-right: 10px;
        &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-left: 10px solid var(--custom-element-current-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
    &.chunk-other {
        padding-left: 10px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-right: 10px solid var(--custom-element-other-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
}
</style>
