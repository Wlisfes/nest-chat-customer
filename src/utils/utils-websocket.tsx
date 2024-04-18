import { ref, computed, Ref } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'

/**长连接实例**/
export const socket = ref<ReturnType<typeof io>>() as Ref<ReturnType<typeof io>>

/**开启连接**/
export async function connectClient(option: Omix<env.WebSocketConnectOption> = {}) {
    const client = io(`ws://localhost:34571`, {
        extraHeaders: {
            authorization: getStore(APP_COMMON.CHAT_TOKEN)
        }
    })
    client.on('connect', () => {
        option.connect && option.connect()
    })
    client.on('disconnect', reason => {
        option.disconnect && option.disconnect(reason)
    })
    client.on('connect_error', err => {
        console.log('connect_error:', err.message)
        option.connect_error && option.connect_error(err)
    })
    return (socket.value = client)
}
