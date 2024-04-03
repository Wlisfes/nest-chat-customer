import { ref, Ref } from 'vue'
import { io } from 'socket.io-client'
import * as env from '@/interface/instance.resolver'

/**长连接实例**/
export const client = ref<ReturnType<typeof io>>() as Ref<ReturnType<typeof io>>

/**开启连接**/
export async function connectClient(option: Partial<Omix<env.WebSocketConnectOption>>) {
    const socket = io(`ws://localhost:34571`)
}
