import { ref, Ref } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'

/**长连接实例**/
export const client = ref<ReturnType<typeof io>>() as Ref<ReturnType<typeof io>>

/**开启连接**/
export async function connectClient(option: Omix<env.WebSocketConnectOption> = {}) {
    const socket = io(`ws://localhost:34571`, {
        extraHeaders: {
            authorization: getStore(APP_COMMON.CHAT_TOKEN)
        }
    })
    socket.on('connect', () => {
        option.connect && option.connect()
    })
    socket.on('disconnect', reason => {
        option.disconnect && option.disconnect(reason)
    })
    socket.on('connect_error', err => {
        option.connect_error && option.connect_error(err)
    })
    return (client.value = socket)
}
