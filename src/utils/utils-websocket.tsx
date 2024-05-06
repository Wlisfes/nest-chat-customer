import { ref, Ref } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'
export type SocketClient = ReturnType<typeof io>

/**长连接实例**/
export const socket = ref<SocketClient>() as Ref<SocketClient>

/**开启连接**/
export async function connectClient(option: Omix<env.WebSocketConnectOption> = {}) {
    const IS_MODE = import.meta.env.MODE === 'development'
    const PROTOCOL = IS_MODE ? 'ws' : 'wss'
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

/**发送消息已读操作**/
export function divineSocketChangeMessager<T>(
    client: SocketClient,
    scope: env.BodySocketChangeMessager,
    callback?: Function
): Promise<Omix<T>> {
    return new Promise((resolve, reject) => {
        try {
            return client.emit('socket-change-messager', scope, (response: Omix<T>) => {
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
