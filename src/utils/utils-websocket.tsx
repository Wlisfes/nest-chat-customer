import { ref, computed, Ref } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'
export type SocketClient = ReturnType<typeof io>

/**长连接实例**/
export const socket = ref<SocketClient>() as Ref<SocketClient>

/**开启连接**/
export async function connectClient(option: Omix<env.WebSocketConnectOption> = {}) {
    const client = io(`ws://localhost:34571`, {
        extraHeaders: {
            authorization: getStore(APP_COMMON.CHAT_TOKEN)
        }
    })
    client.on('connect', () => {
        console.log(`connect:`, client)
        option.connect && option.connect()
    })
    client.on('disconnect', reason => {
        console.log(`disconnect:`, reason)
        option.disconnect && option.disconnect(reason)
    })
    client.on('connect_error', err => {
        console.log('connect_error:', err.message)
        option.connect_error && option.connect_error(err)
    })
    return (socket.value = client)
}

/**发送自定义消息**/
export function divineSocketCustomizeMessager<T>(
    client: SocketClient,
    scope: env.BodyCustomizeMessager,
    callback?: Function
): Promise<Omix<T>> {
    return new Promise((resolve, reject) => {
        try {
            return client.emit('socket-customize-messager', scope, (response: Omix<T>) => {
                if (typeof callback === 'function') {
                    callback(response)
                }
                return resolve(response)
            })
        } catch (e) {
            return reject(e)
        }
    })
}
