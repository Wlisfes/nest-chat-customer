<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useUser, useMessenger, useSession, useChat } from '@/store'
import { connectClient } from '@/utils/utils-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const chat = useChat()
        const user = useUser()
        const session = useSession()
        const messenge = useMessenger()
        onMounted(async () => {
            await user.fetchUserResolver()
            await session.fetchSessionInitColumn()
            await divineConnectSocketClient()
        })

        /**开启socket连接**/
        async function divineConnectSocketClient() {
            return await connectClient().then(client => {
                /**监听socket连接**/
                client.on('connect', async () => {
                    return await chat.setState({ loading: false, failure: false })
                })
                /**监听socket断开连接**/
                client.on('disconnect', async reason => {
                    console.log(`disconnect:`, reason)
                    return await chat.setState({ loading: false, failure: true })
                })
                /**监听socket错误**/
                client.on('connect_error', async err => {
                    console.log(`connect_error:`, err)
                    return await chat.setState({ loading: false, failure: true })
                })
                /**监听消息推送**/
                client.on('server-customize-messager', async (data: Omix<env.SchemaMessager>) => {
                    /**消息列表处理**/
                    await messenge.fetchSessionServerMessager(session.sid, data)
                    /**会话列表**/
                    await session.fetchSessionServerMessager(data)
                })
            })
        }

        return () => <chat-layer></chat-layer>
    }
})
</script>
