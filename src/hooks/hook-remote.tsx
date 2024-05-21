import { ref, Ref, onUnmounted } from 'vue'
import { Peer } from 'peerjs'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { divineHandler } from '@/utils/utils-common'
import tip from '@/assets/audio/tip.wav'
import call from '@/assets/audio/call.wav'

/**Peer连接实例**/
export const client = ref<Peer>() as Ref<Peer>

export function useCallRemote(option: Omix<{ unmounted?: boolean }> = {}) {
    onUnmounted(async () => {
        return await divineHandler((option.unmounted ?? false) && Boolean(client.value), {
            handler: () => fetchDestroyRemote()
        })
    })

    /**开启连接**/
    async function fetchConnectRemote(clientId: string) {
        const server = new Peer(clientId, {
            host: '//chat.lisfes.cn',
            path: '/web-peer-server',
            pingInterval: 10000,
            token: getStore<string>(APP_COMMON.CHAT_TOKEN)
        })

        /**收到呼叫**/
        server.on('call', call => {
            console.log('call', call)
        })

        return (client.value = server)
    }

    /**中断连接**/
    async function fetchDisconnectRemote() {
        return await divineHandler(Boolean(client.value), {
            handler: async function () {
                return client.value.disconnect()
            }
        })
    }

    /**销毁连接**/
    async function fetchDestroyRemote() {
        return await divineHandler(Boolean(client.value), {
            handler: async function () {
                return client.value.destroy()
            }
        })
    }

    /**消息通知声音**/
    async function fetchRemoteSounder(scope: Omix<{ sound: boolean; type: 'tip' | 'call'; loop?: boolean; end?: Function }>) {
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

    /**远程呼叫**/
    async function fetchCallRemote(clientId: string) {
        window.navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            console.log(stream)
        })
    }

    return {
        fetchConnectRemote,
        fetchDisconnectRemote,
        fetchDestroyRemote,
        fetchRemoteSounder,
        fetchCallRemote
    }
}
