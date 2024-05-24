import { ref, Ref, toRefs, computed, onUnmounted, CSSProperties } from 'vue'
import { useDraggable, useIntervalFn } from '@vueuse/core'
import { Peer, DataConnection } from 'peerjs'
import { useState } from '@/hooks/hook-state'
import { moment } from '@/hooks/hook-common'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { Observer } from '@/utils/utils-observer'
import { divineHandler } from '@/utils/utils-common'
import { divineNotice } from '@/utils/utils-component'
import { fetchRemote } from '@/components/layer/layer.instance'
export { default as tipAudio } from '@/assets/audio/tip.wav'
export { default as callAudio } from '@/assets/audio/call.wav'

/**Peer连接实例**/
export const client = ref<Peer>() as Ref<Peer>

/**创建peer实例**/
export function useCallRemote(option: Omix<{ unmounted?: boolean }> = {}) {
    const observer = new Observer()

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
            return await fetchRemote({
                observer,
                server: call,
                source: 'receiver',
                onClose: async (evt: Omix<{ unmount: Function }>) => evt.unmount()
            })
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
                return await fetchRemote({
                    localStream,
                    observer,
                    source: 'initiate',
                    server: client.value.call(clientId, localStream, { metadata: scope.metadata }),
                    onClose: async (evt: Omix<{ unmount: Function }>) => evt.unmount()
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

/**
 * 创建连接实例
 * @param clientId 发起者ID
 */
export function useConnection(clientId: string, option: Omix<{ source: 'initiate' | 'receiver'; callback: Function }>) {
    const connection = ref<DataConnection>() as Ref<DataConnection>
    const stream = ref<Array<MediaStream>>([])
    if (option.source === 'initiate') {
        client.value.on('connection', conn => {
            conn.on('data', data => option.callback(data))
            connection.value = conn
        })
    } else {
        connection.value = client.value.connect(clientId, { reliable: true })
        connection.value.on('data', data => option.callback(data))
    }

    async function close() {
        return await connection.value.close()
    }

    async function setStream(nodeStream: Array<MediaStream>) {
        return (stream.value = nodeStream)
    }

    async function fetchSender<T>(data: Omix<T>) {
        return await connection.value.send({ source: option.source, data })
    }

    return { connection, stream, close, setStream, fetchSender }
}

/**呼叫弹窗交互控制器**/
export function useCallController() {
    const root = ref<HTMLElement>() as Ref<HTMLElement>
    const { state, setState } = useState({ date: 0, width: 320, height: 300, right: 10, bottom: 10 })
    const { pause: stop, resume: start } = useIntervalFn(() => setState({ date: state.date + 1 }), 1000, { immediate: false })
    const position = useDraggable(root, {
        containerElement: document.body,
        preventDefault: true,
        stopPropagation: true,
        initialValue: {
            x: document.body.clientWidth - state.width - 10,
            y: document.body.clientHeight - state.height - 10
        },
        onMove: async function (evt: { x: number; y: number }) {
            const right = document.body.clientWidth - (evt.x + state.width)
            const bottom = document.body.clientHeight - (evt.y + state.height)
            const distance = document.body.clientWidth - state.width - 61
            return await setState({ bottom, right: right > distance ? distance : right })
        }
    })
    const style = computed<CSSProperties>(() => ({
        zIndex: 2000,
        position: 'fixed',
        right: state.right + 'px',
        bottom: state.bottom + 'px',
        '--chunk-width': state.width + 'px',
        '--chunk-height': state.height + 'px'
    }))
    const dateUnit = computed(() => {
        if (state.date > 3600) {
            return moment.duration(state.date, 'seconds').format('HH:mm:ss')
        }
        return moment.duration(state.date, 'seconds').format('mm:ss')
    })

    return { root, state, position, style, dateUnit, ...toRefs(state), setState, start, stop }
}

/**创建铃声实例**/
export function useSounder(src: string, option: { loop: boolean; volume?: number }) {
    const audio = ref<HTMLAudioElement>(new Audio(src))

    audio.value.volume = option.volume ?? 1
    if (option.loop) {
        audio.value.loop = option.loop ?? false
    }

    async function setStream(stream: MediaStream) {
        return (audio.value.srcObject = stream)
    }

    async function play() {
        return await divineHandler(Boolean(audio.value) && audio.value.paused, {
            handler: audio.value.play.bind(audio.value)
        })
    }

    async function pause() {
        return await divineHandler(Boolean(audio.value) && !audio.value.paused, {
            handler: audio.value.pause.bind(audio.value)
        })
    }

    async function mute(muted: boolean = !audio.value.muted) {
        return await divineHandler(Boolean(audio.value), {
            handler: () => (audio.value.muted = muted ?? !audio.value.muted)
        })
    }

    async function remove() {
        return await divineHandler(Boolean(audio.value), {
            handler: audio.value.remove.bind(audio.value)
        })
    }

    return { audio, setStream, remove, play, pause, mute }
}
