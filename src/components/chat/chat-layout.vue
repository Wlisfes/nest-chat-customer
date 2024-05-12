<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useUser, useConfiger, useMessenger, useSession, useChat, useNotification, useContact, useCommunit } from '@/store'
import { useWebSocket } from '@/hooks/hook-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const { connectClient } = useWebSocket({ unmounted: true })
        const { setState } = useChat()
        const { fetchCommonWallpaper } = useConfiger()
        const { fetchSessionInitColumn, fetchNewServerMessager } = useSession()
        const { fetchSocketServerMessager } = useMessenger()
        const { fetchUserResolver } = useUser()
        const { fetchNotificationColumn } = useNotification()
        const { fetchContactColumn, fetchContactSearch } = useContact()
        const { fetchCommunitColumn } = useCommunit()

        onMounted(async () => {
            await fetchUserResolver()
            return await divineConnectSocketClient().then(async online => {
                await fetchCommonWallpaper()
                await fetchSessionInitColumn()
                await fetchNotificationColumn()
                await fetchContactColumn()
                await fetchContactSearch()
                await fetchCommunitColumn()
                return await setState({ online, loading: false })
            })
        })

        /**开启socket连接**/
        function divineConnectSocketClient(): Promise<boolean> {
            return new Promise(resolve => {
                connectClient().then(client => {
                    /**监听socket连接**/
                    client.on('connect', () => resolve(true))
                    /**监听socket断开连接**/
                    client.on('disconnect', reason => resolve(false))
                    /**监听socket错误**/
                    client.on('connect_error', err => resolve(false))
                    /**监听消息推送**/
                    client.on('server-customize-messager', async (data: Omix<env.SchemaMessager>) => {
                        /**消息列表处理**/
                        await fetchSocketServerMessager(data)
                        /**会话列表**/
                        return await fetchNewServerMessager(data)
                    })
                })
            })
        }

        return () => <chat-layer></chat-layer>
    }
})
</script>
