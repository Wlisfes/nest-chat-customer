import { computed, ref, Ref, onUnmounted } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export type SocketClient = ReturnType<typeof io>

/**长连接实例**/
const socket = ref<SocketClient>() as Ref<SocketClient>

export function useWebSocket(option: Omix<{ unmounted?: boolean }> = {}) {
    const connected = computed<boolean>(() => socket.value.connected)

    onUnmounted(async () => {
        return await divineHandler(option.unmounted ?? false, {
            handler: () => {
                socket.value.disconnect()
                return console.log('[socket] 主动销毁断开连接')
            }
        })
    })

    /**开启连接**/
    async function connectClient(scope: Omix<env.WebSocketConnectOption> = {}) {
        const IS_MODE = import.meta.env.MODE === 'development'
        const IS_SECURE = window.location.protocol === 'https:'
        const PROTOCOL = IS_SECURE ? 'wss' : 'ws'
        const DEV_URL = `${PROTOCOL}://localhost:34571`
        const PROD_URL = `${PROTOCOL}://chat.lisfes.cn`
        const client = io(IS_MODE ? DEV_URL : PROD_URL, {
            path: '/web-socket',
            extraHeaders: {
                authorization: getStore(APP_COMMON.CHAT_TOKEN)
            }
        })
        return (socket.value = client)
    }

    /**发送自定义消息**/
    function fetchSocketCustomizeMessager<T>(
        client: SocketClient,
        scope: env.BodyCustomizeMessager,
        callback?: Function
    ): Promise<Omix<T>> {
        return new Promise(resolve => {
            return client.emit('socket-customize-messager', scope, (response: Omix<T>) => {
                if (typeof callback === 'function') {
                    callback(response)
                }
                return resolve(response)
            })
        })
    }

    /**发送消息已读操作**/
    function fetchSocketChangeMessager<T>(
        client: SocketClient,
        scope: env.BodySocketChangeMessager,
        callback?: Function
    ): Promise<Omix<T>> {
        return new Promise(resolve => {
            return client.emit('socket-change-messager', scope, (response: Omix<T>) => {
                if (typeof callback === 'function') {
                    callback(response)
                }
                return resolve(response)
            })
        })
    }

    /**远程呼叫查询**/
    function fetchSocketCallRemoteResolver(
        client: SocketClient,
        scope: env.BodySocketCallRemote,
        callback?: Function
    ): Promise<env.ResultResolver<Omix<env.RestSocketCallRemoteResolver>>> {
        return new Promise(resolve => {
            return client.emit('socket-call-resolver', scope, (response: env.ResultResolver<Omix<env.RestSocketCallRemoteResolver>>) => {
                if (typeof callback === 'function') {
                    callback(response)
                }
                return resolve(response)
            })
        })
    }

    /**查询会话消息列表**/
    function fetchSocketSessionColumnMessager(
        client: SocketClient,
        scope: env.QuerySessionColumnMessager,
        callback?: Function
    ): Promise<env.ResultResolver<Omix<env.ColumnResolver<env.SchemaMessager>>>> {
        return new Promise(resolve => {
            return client.emit(
                'socket-session-column-messager',
                scope,
                (response: env.ResultResolver<Omix<env.ColumnResolver<env.SchemaMessager>>>) => {
                    if (typeof callback === 'function') {
                        callback(response)
                    }
                    return resolve(response)
                }
            )
        })
    }

    return {
        socket,
        connected,
        connectClient,
        fetchSocketCustomizeMessager,
        fetchSocketChangeMessager,
        fetchSocketCallRemoteResolver,
        fetchSocketSessionColumnMessager
    }
}
