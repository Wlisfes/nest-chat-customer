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
        const current = computed<boolean>(() => user.uid === node.value.userId)

        onMounted(async () => {
            if (props.node.status === env.EnumMessagerStatus.initialize) {
                /**消息初始化状态**/
                return await fetchSocketInitialize(props.node)
            }
            /**Socket事件监听已读状态推送**/
            await fetchSocketMonitor()
            // await fetcnSocketChangeMessager()
        })

        /**更新节点相关信息**/
        async function fetchNodeUpdate(scope: Partial<env.SchemaMessager> = {}) {
            return Object.assign(node.value, scope)
        }

        /**Socket事件监听**/
        async function fetchSocketMonitor() {
            return socket.value.on(node.value.sid, async (data: Omix<{ type: string; state: Omix }>) => {
                console.log(data)
                if (data.type === 'server-change-messager') {
                    return await fetchNodeUpdate({
                        status: env.EnumMessagerStatus.sending
                    })
                }
                // await session.fetchSessionReadUpdate(data)
            })
        }

        /**消息已读操作**/
        async function fetcnSocketChangeMessager() {
            return await divineSocketChangeMessager(socket.value, {
                userId: user.uid,
                sid: node.value.sid,
                sessionId: node.value.sessionId
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
