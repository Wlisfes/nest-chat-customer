import { computed, ref, Ref, onUnmounted } from 'vue'
import { io } from 'socket.io-client'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import tip from '@/assets/audio/tip.wav'
import call from '@/assets/audio/call.wav'
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

    /**消息通知声音**/
    async function fetchSocketSounder(scope: Omix<{ sound: boolean; type: 'tip' | 'call'; loop?: boolean; end?: Function }>) {
        const src = { tip: tip, call: call }
        const audio = new Audio(src[scope.type])
        audio.loop = scope.loop ?? false
        audio.onended = evt => scope.end && scope.end(evt)
        scope.sound && audio.play()
        return {
            audio,
            remove: audio.remove.bind(audio),
            pause: audio.pause.bind(audio)
        }
    }

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
    function divineSocketCustomizeMessager<T>(
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
    function divineSocketChangeMessager<T>(
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

    return { socket, connected, connectClient, fetchSocketSounder, divineSocketCustomizeMessager, divineSocketChangeMessager }
}
