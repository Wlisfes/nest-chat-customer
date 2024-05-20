import { computed, ref, Ref, onUnmounted } from 'vue'
import { Peer } from 'peerjs'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import tip from '@/assets/audio/tip.wav'
import call from '@/assets/audio/call.wav'

/**Peer连接实例**/
const peer = ref<Peer>() as Ref<Peer>

export function useCallRemote(option: Omix<{ unmounted?: boolean }> = {}) {
    onUnmounted(async () => {
        return await divineHandler((option.unmounted ?? false) && Boolean(peer.value), {
            handler: () => {}
        })
    })

    /**开启连接**/
    async function fetchConnectRemote() {
        const IS_MODE = import.meta.env.MODE === 'development'
        const IS_SECURE = window.location.protocol === 'https:'
        const client = new Peer({
            host: IS_SECURE ? 'chat.lisfes.cn' : 'localhost',
            port: 34550,
            path: '/peer-server',
            debug: IS_MODE ? 3 : 1,
            pingInterval: 10000,
            token: getStore<string>(APP_COMMON.CHAT_TOKEN)
        })
        client.on('open', id => {
            console.log('connect client remote', id)
        })
        return (peer.value = client)
    }

    /**中断连接**/
    async function fetchDisconnectRemote() {
        return await divineHandler(Boolean(peer.value) && peer.value.disconnected, {
            handler: () => peer.value.disconnect()
        })
    }

    /**销毁连接**/
    async function fetchDestroyRemote() {
        return await divineHandler(Boolean(peer.value) && !peer.value.destroyed, {
            handler: () => peer.value.destroy()
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

    return {
        fetchConnectRemote,
        fetchDisconnectRemote,
        fetchDestroyRemote,
        fetchRemoteSounder
    }
}
