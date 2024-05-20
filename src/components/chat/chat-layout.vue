<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useUser, useConfiger, useMessenger, useSession, useChat, useNotification, useContact, useCommunit, useStore } from '@/store'
import { useWebSocket } from '@/hooks/hook-websocket'
import { useCallRemote } from '@/hooks/hook-remote'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import { fetchClosure } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const { setState } = useStore(useChat)
        const { fetchCommonWallpaper } = useStore(useConfiger)
        const { fetchSessionInitColumn, fetchNewServerMessager } = useStore(useSession)
        const { fetchSocketServerMessager } = useStore(useMessenger)
        const { uid, sound, fetchUserResolver } = useStore(useUser)
        const { fetchNotificationColumn, fetchSocketServerNotification } = useStore(useNotification)
        const { fetchContactColumn, fetchContactColumnSearch } = useStore(useContact)
        const { fetchCommunitColumn, fetchCommunitColumnSearch } = useStore(useCommunit)
        const { connectClient } = useWebSocket({ unmounted: true })
        const { fetchConnectRemote, fetchDisconnectRemote, fetchDestroyRemote, fetchRemoteSounder } = useCallRemote({ unmounted: true })

        onMounted(async () => {
            await setState({ percentage: 80 })
            await fetchUserResolver()
            return await divineConnectSocketClient().then(async online => {
                await Promise.all([
                    fetchCommonWallpaper(),
                    fetchSessionInitColumn(),
                    fetchNotificationColumn(),
                    fetchContactColumn(),
                    fetchContactColumnSearch(),
                    fetchCommunitColumn(),
                    fetchCommunitColumnSearch()
                ])
                return await setState({ percentage: 100 }).then(async () => {
                    await divineDelay(220)
                    return await setState({ online, loading: false })
                })
            })
        })

        /**开启socket连接**/
        function divineConnectSocketClient(): Promise<boolean> {
            return new Promise(resolve => {
                connectClient().then(client => {
                    /**监听socket连接**/
                    client.on('connect', async () => {
                        await fetchConnectRemote()
                        return resolve(true)
                    })
                    /**监听socket断开连接**/
                    client.on('disconnect', async reason => {
                        await fetchDisconnectRemote()
                        return resolve(false)
                    })
                    /**监听socket错误**/
                    client.on('connect_error', async err => {
                        await fetchDestroyRemote()
                        return resolve(false)
                    })

                    /**监听用户多端登录挤出**/
                    client.on('server-socket-closure', async data => {
                        await fetchDisconnectRemote()
                        return await fetchClosure({
                            onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(),
                            onSubmit: async ({ done }: Omix<{ unmount: Function; done: Function }>) => {
                                window.close()
                                await done({ visible: false })
                                return await divineConnectSocketClient()
                            }
                        })
                    })

                    /**监听消息推送**/
                    client.on('server-customize-messager', async (data: Omix<env.SchemaMessager>) => {
                        await fetchRemoteSounder({ sound: sound.value, type: 'tip' })
                        /**消息列表处理**/
                        await fetchSocketServerMessager(data)
                        /**会话列表**/
                        return await fetchNewServerMessager(uid.value, data)
                    })

                    /**监听操作通知消息推送**/
                    client.on('server-notification-messager', async (data: Omix<env.SchemaNotification>) => {
                        await fetchSocketServerNotification(data)
                        return await divineHandler(data.status !== env.EnumNotificationStatus.waitze, {
                            handler: async () => {
                                if (data.source === env.EnumNotificationSource.contact) {
                                    return await fetchContactColumn()
                                } else {
                                    return await fetchCommunitColumn()
                                }
                            }
                        })
                    })
                })
            })
        }

        return () => (
            <n-notification-provider container-class="is-customize-remote-provider" placement="bottom-right">
                <chat-layer></chat-layer>
            </n-notification-provider>
        )
    }
})
</script>
