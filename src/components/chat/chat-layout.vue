<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useUser, useMessenger, useSession, useChat } from '@/store'
import { connectClient } from '@/utils/utils-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const { setState } = useChat()
        const { fetchSessionInitColumn, fetchNewServerMessager } = useSession()
        const { fetchSocketServerMessager } = useMessenger()
        const { fetchUserResolver } = useUser()

        onMounted(async () => {
            await fetchUserResolver()
            await divineConnectSocketClient()
            await fetchSessionInitColumn()
        })

        /**开启socket连接**/
        async function divineConnectSocketClient() {
            return await connectClient().then(client => {
                /**监听socket连接**/
                client.on('connect', async () => {
                    return await setState({ loading: false, failure: false })
                })
                /**监听socket断开连接**/
                client.on('disconnect', async reason => {
                    return await setState({ loading: false, failure: true })
                })
                /**监听socket错误**/
                client.on('connect_error', async err => {
                    return await setState({ loading: false, failure: true })
                })
                /**监听消息推送**/
                client.on('server-customize-messager', async (data: Omix<env.SchemaMessager>) => {
                    /**消息列表处理**/
                    await fetchSocketServerMessager(data)
                    /**会话列表**/
                    await fetchNewServerMessager(data)
                })
            })
        }

        return () => <chat-layer></chat-layer>
    }
})
</script>
