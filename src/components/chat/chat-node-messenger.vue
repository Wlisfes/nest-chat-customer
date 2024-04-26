<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useSession } from '@/store'
import { divineHandler } from '@/utils/utils-common'
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
        const current = computed<boolean>(() => user.uid === node.value.userId)

        onMounted(async () => {
            if (props.node.status === env.EnumMessagerStatus.initialize) {
                /**消息初始化状态**/
                return await fetchSocketInitialize(props.node)
            }
            /**Socket事件监听推送**/
            return await fetchSocketMonitor().then(async () => {
                const read = props.node.reads.some(item => item.userId === user.uid)
                return await divineHandler(props.node.userId !== user.uid && !read, {
                    handler: fetcnSocketChangeMessager
                })
            })
        })

        /**更新节点相关信息**/
        async function fetchNodeUpdate(scope: Partial<env.SchemaMessager> = {}) {
            return Object.assign(node.value, scope)
        }

        /**Socket事件监听**/
        async function fetchSocketMonitor() {
            return socket.value.on(node.value.sid, async (scope: Omix<{ type: string; state: Omix }>) => {
                if (scope.type === 'server-change-messager') {
                    /**消息状态变更推送**/
                    return await fetchNodeUpdate({ status: scope.state.status, reason: scope.state.reason })
                } else if (scope.type === 'server-read-messager') {
                    /**消息已读推送**/
                    await fetchNodeUpdate({
                        reads: node.value.reads.concat(scope.state as never)
                    })
                    return await session.fetchSessionReadUpdate(scope.state as env.BodySocketChangeMessager)
                }
            })
        }

        /**消息已读操作**/
        async function fetcnSocketChangeMessager() {
            return await divineSocketChangeMessager(socket.value, {
                userId: user.uid,
                sid: node.value.sid,
                sessionId: node.value.sessionId
            }).then(async () => {
                return await session.fetchSessionUnreadUpdate(node.value.sessionId, node.value.sid)
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
                await fetchNodeUpdate({ status: env.EnumMessagerStatus.sending, sid })
                await fetchSocketMonitor()
                return await session.fetchSessionPushSidUpdate({ sid: sid, sessionId: scope.sessionId })
            } catch (e: any) {
                return await fetchNodeUpdate({
                    status: env.EnumMessagerStatus.failed,
                    reason: e.message
                })
            }
        }

        return () => (
            <div class="chat-node-messenger" style={{ order: props.order }}>
                {current.value ? (
                    <div class="n-chunk n-end n-disover" style={{ columnGap: '10px' }}>
                        <custom-component current node={node.value}></custom-component>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                    </div>
                ) : (
                    <div class="n-chunk n-disover" style={{ columnGap: '10px' }}>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                        <custom-component current={false} node={node.value}></custom-component>
                    </div>
                )}
            </div>
        )
    }
})
</script>
