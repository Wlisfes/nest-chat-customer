import { ref, Ref, onUnmounted } from 'vue'
import { useNotification } from 'naive-ui'
import { Peer } from 'peerjs'
import { useUser, useStore } from '@/store'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { Observer } from '@/utils/utils-observer'
import { divineHandler, divineWherer } from '@/utils/utils-common'
import { divineNotice } from '@/utils/utils-component'
import { fetchRemote } from '@/components/layer/layer.instance'
export { default as tipAudio } from '@/assets/audio/tip.wav'
export { default as callAudio } from '@/assets/audio/call.wav'

/**Peer连接实例**/
export const client = ref<Peer>() as Ref<Peer>

export function useSounder(src: string, scope: { loop: boolean }) {
    const audio = ref<HTMLAudioElement>(new Audio(src))
    audio.value.loop = scope.loop ?? false
    return {
        audio,
        remove: async () => audio.value.remove(),
        play: async () => audio.value.paused && audio.value.play(),
        pause: async () => !audio.value.paused && audio.value.pause()
    }
}

export function useCallRemote(option: Omix<{ unmounted?: boolean }> = {}) {
    const observer = new Observer()
    const notification = useNotification()

    onUnmounted(async () => {
        return await divineHandler((option.unmounted ?? false) && Boolean(client.value), {
            handler: () => fetchDestroyRemote()
        })
    })

    /**开启连接**/
    async function fetchConnectRemote(clientId: string) {
        const server = new Peer(clientId, {
            host: 'chat.lisfes.cn',
            path: '/web-peer-server',
            pingInterval: 10000,
            token: getStore<string>(APP_COMMON.CHAT_TOKEN)
        })

        /**收到呼叫**/
        server.on('call', async call => {
            return await fetchRemote({ observer, clientId, server: call, source: 'receiver' })
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

    /**远程呼叫**/
    async function fetchCallRemote(clientId: string, scope: { option: { video: boolean; audio: boolean }; metadata: Omix }) {
        try {
            await window.navigator.mediaDevices.getUserMedia(scope.option).then(async localStream => {
                const call = client.value.call(clientId, localStream, { metadata: scope.metadata })
                /**接收远程流**/
                // call.on('stream', remoteStream => {
                //     // remoteVideo.srcObject = remoteStream
                //     console.log({ localStream, remoteStream })
                // })

                return await fetchRemote({
                    localStream,
                    observer,
                    clientId,
                    server: call,
                    source: 'initiate',
                    onClose: async ({ unmount }: Omix<{ unmount: Function }>) => {
                        return await unmount()
                    }
                }).then(async app => {
                    console.log(app)
                })
            })
        } catch (e) {
            return await divineNotice({ type: 'error', title: '呼叫失败，请检查麦克风是否正常' })
        }
    }

    return {
        client,
        fetchConnectRemote,
        fetchDisconnectRemote,
        fetchDestroyRemote,

        fetchCallRemote
    }
}
