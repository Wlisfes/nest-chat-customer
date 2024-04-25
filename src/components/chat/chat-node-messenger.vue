<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useSession } from '@/store'
import { socket, divineSocketCustomizeMessager } from '@/utils/utils-websocket'
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
                await fetchSocketInitialize(props.node)
            } else {
                /**Socket事件监听已读状态推送**/
                await fetchSocketMonitor(props.node.sid)
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
