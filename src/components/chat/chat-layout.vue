<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useUser, useConfiger, useMessenger, useSession, useChat, useNotification, useContact, useCommunit, useStore } from '@/store'
import { useWebSocket } from '@/hooks/hook-websocket'
import { divineHandler } from '@/utils/utils-common'
import { fetchClosure } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const { connectClient, fetchSocketSounder } = useWebSocket({ unmounted: true })
        const { setState } = useStore(useChat)
        const { fetchCommonWallpaper } = useStore(useConfiger)
        const { fetchSessionInitColumn, fetchNewServerMessager } = useStore(useSession)
        const { fetchSocketServerMessager } = useStore(useMessenger)
        const { uid, sound, fetchUserResolver } = useStore(useUser)
        const { fetchNotificationColumn, fetchSocketServerNotification } = useStore(useNotification)
        const { fetchContactColumn, fetchContactColumnSearch } = useStore(useContact)
        const { fetchCommunitColumn, fetchCommunitColumnSearch } = useStore(useCommunit)

        onMounted(async () => {
            await fetchUserResolver()
            return await divineConnectSocketClient().then(async online => {
                await fetchCommonWallpaper()
                await fetchSessionInitColumn()
                await fetchNotificationColumn()
                await fetchContactColumn()
                await fetchContactColumnSearch()
                await fetchCommunitColumn()
                await fetchCommunitColumnSearch()
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

                    /**监听用户多端登录挤出**/
                    client.on('server-socket-closure', async data => {
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
                        await fetchSocketSounder({ sound: sound.value, type: 'tip' })
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

        return () => <chat-layer></chat-layer>
    }
})
</script>
