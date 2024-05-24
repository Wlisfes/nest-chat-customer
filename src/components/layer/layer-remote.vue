<script lang="tsx">
import { defineComponent, ref, Ref, onMounted, Fragment, PropType, Transition, Teleport } from 'vue'
import { MediaConnection } from 'peerjs'
import { useState } from '@/hooks/hook-state'
import { useCallController, useConnection, useSounder, callAudio } from '@/hooks/hook-remote'
import { Observer } from '@/utils/utils-observer'
import { divineNotice } from '@/utils/utils-component'
import { divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayerCallmer',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true },
        server: { type: Object as PropType<MediaConnection>, required: true },
        source: { type: String as PropType<'initiate' | 'receiver'>, required: true },
        localStream: { type: Object as PropType<MediaStream> }
    },
    setup(props, { emit }) {
        const localStream = ref(props.localStream) as Ref<MediaStream>
        const local = useSounder('', { loop: false })
        const { play, pause, mute } = useSounder(callAudio, { loop: true })
        const { state, setState } = useState({ visible: false, mike: true, mute: true, connect: false })
        const { root, style, dateUnit, start, stop } = useCallController()
        const { stream, close, fetchSender, setStream } = useConnection(props.server.metadata.initiate.socketId, {
            source: props.source,
            callback: fetchCallback
        })

        onMounted(async () => {
            return await setState({ visible: true }).then(async () => {
                await play()
                return await divineHandler(Boolean(localStream.value), {
                    handler: async function () {
                        await local.setStream(localStream.value)
                        await local.play()
                        return await fetchRemoteStream()
                    }
                })
            })
        })

        /**麦克风切换**/
        async function fetchMike() {
            return setState({ mike: !state.mike }).then(() => {})
        }

        /**静音切换**/
        async function fetchMute() {
            return setState({ mute: !state.mute }).then(async () => {
                await local.mute()
                return mute()
            })
        }

        /**关闭流推送**/
        async function fetchStreamClosure() {
            return await divineHandler(Boolean(localStream.value), {
                handler: async function () {
                    return await localStream.value.getTracks().forEach(track => track.stop())
                }
            })
        }

        /**接收远程流**/
        async function fetchRemoteStream() {
            props.server.on('stream', async remoteStream => {
                console.log('接收远程流:', remoteStream)
                await setStream(stream.value.concat(remoteStream))
                return await setState({ connect: true }).then(async () => {
                    await pause()
                    return await start()
                })
            })
        }

        /**远程消息回调**/
        async function fetchCallback(scope: { data: Omix; source: typeof props.source }) {
            console.log(scope)
            if (scope.source === 'receiver' && scope.data.type === 'reject') {
                /**接收端拒接**/
                return await setState({ visible: false }).then(async () => {
                    await pause()
                    await stop()
                    await close()
                    await fetchStreamClosure()
                    return emit('close', { done: setState })
                })
            } else if (scope.source === 'initiate' && scope.data.type === 'closure') {
                /**发起端挂断**/
                return await setState({ visible: false }).then(async () => {
                    await pause()
                    await stop()
                    await close()
                    await fetchStreamClosure()
                    return emit('close', { done: setState })
                })
            }
        }

        /**挂断**/
        async function fetchClosure() {
            return await fetchSender({ type: 'closure' }).then(async () => {
                await setState({ visible: false })
                await pause()
                await stop()
                await close()
                await fetchStreamClosure()
                return emit('close', { done: setState })
            })
        }

        /**拒接呼叫**/
        async function fetchReject() {
            return await fetchSender({ type: 'reject' }).then(async () => {
                await setState({ visible: false })
                await pause()
                await stop()
                await close()
                await fetchStreamClosure()
                return emit('close', { done: setState })
            })
        }

        /**接收呼叫**/
        async function fetchSubmit() {
            try {
                return await window.navigator.mediaDevices.getUserMedia(props.server.metadata.option).then(async stream => {
                    localStream.value = stream
                    await local.setStream(stream)
                    await local.play()
                    await fetchRemoteStream()
                    return await props.server.answer(stream)
                })
            } catch (e) {
                console.log(e)
                return await divineNotice({ type: 'error', title: '呼叫失败，请检查麦克风是否正常' })
            }
        }

        return () => (
            <Teleport to={document.body}>
                <Transition name="fade-callmer" appear>
                    {state.visible && (
                        <div ref={root} style={style.value}>
                            <n-element class="chunk-callmer n-chunk n-column">
                                <div style={{ height: '32px' }}></div>
                                {props.source === 'initiate' ? (
                                    <div class="n-chunk n-column n-center n-auto n-disover">
                                        <chat-avatar size={68} radius={34} src={props.server.metadata.receiver.avatar}></chat-avatar>
                                        <n-h2 class="chunk-nickname">
                                            <n-ellipsis tooltip={false}>{props.server.metadata.receiver.nickname}</n-ellipsis>
                                        </n-h2>
                                        <div class="n-chunk n-column" style={{ height: '22px', lineHeight: '22px' }}>
                                            {state.connect ? (
                                                <n-text depth={3}>已接听</n-text>
                                            ) : (
                                                <n-text depth={3}>正在等待对方接受邀请...</n-text>
                                            )}
                                        </div>
                                        <div style={{ marginTop: 'auto', height: '20px', lineHeight: '20px' }}>
                                            {state.connect && <n-text>{dateUnit.value}</n-text>}
                                        </div>
                                    </div>
                                ) : (
                                    <div class="n-chunk n-column n-center n-auto n-disover">
                                        <chat-avatar size={68} radius={34} src={props.server.metadata.initiate.avatar}></chat-avatar>
                                        <n-h2 class="chunk-nickname">
                                            <n-ellipsis tooltip={false}>{props.server.metadata.initiate.nickname}</n-ellipsis>
                                        </n-h2>
                                        <div class="n-chunk n-column" style={{ height: '22px', lineHeight: '22px' }}>
                                            {state.connect ? (
                                                <n-text depth={3}>已接听</n-text>
                                            ) : props.server.metadata.callType === 'audio' ? (
                                                <n-text depth={3}>邀请你进行语音通话...</n-text>
                                            ) : (
                                                <n-text depth={3}>邀请你进行视频通话...</n-text>
                                            )}
                                        </div>
                                        <div style={{ marginTop: 'auto', height: '20px', lineHeight: '20px' }}>
                                            {state.connect && <n-text>{dateUnit.value}</n-text>}
                                        </div>
                                    </div>
                                )}
                                <div class="chunk-callmer__footer n-chunk n-middle n-center n-disover">
                                    {props.source === 'initiate' ? (
                                        <n-space wrap-item={false} size={[40, 0]}>
                                            <n-button circle secondary onClick={fetchMike}>
                                                {state.mike ? (
                                                    <n-icon size={28} color="#ffffff" component={<Iv-RsVoice />}></n-icon>
                                                ) : (
                                                    <n-icon size={28} color="var(--text-color-3)" component={<Iv-BsVoice />}></n-icon>
                                                )}
                                            </n-button>
                                            <n-button circle color="#ff0000" onClick={fetchClosure}>
                                                <n-icon class="is-closure" size={28} color="#ffffff" component={<Iv-BsCaller />}></n-icon>
                                            </n-button>
                                            <n-button circle secondary onClick={fetchMute}>
                                                {state.mute ? (
                                                    <n-icon size={28} color="#ffffff" component={<Iv-RsSpeaker />}></n-icon>
                                                ) : (
                                                    <n-icon size={28} color="var(--text-color-3)" component={<Iv-BsSpeaker />}></n-icon>
                                                )}
                                            </n-button>
                                        </n-space>
                                    ) : (
                                        <Fragment>
                                            {state.connect ? (
                                                <n-space wrap-item={false} size={[40, 0]}>
                                                    <n-button circle secondary onClick={fetchMike}>
                                                        {state.mike ? (
                                                            <n-icon size={28} color="#ffffff" component={<Iv-RsVoice />}></n-icon>
                                                        ) : (
                                                            <n-icon
                                                                size={28}
                                                                color="var(--text-color-3)"
                                                                component={<Iv-BsVoice />}
                                                            ></n-icon>
                                                        )}
                                                    </n-button>
                                                    <n-button circle color="#ff0000" onClick={fetchReject}>
                                                        <n-icon
                                                            class="is-closure"
                                                            size={28}
                                                            color="#ffffff"
                                                            component={<Iv-BsCaller />}
                                                        ></n-icon>
                                                    </n-button>
                                                    <n-button circle secondary onClick={fetchMute}>
                                                        {state.mute ? (
                                                            <n-icon size={28} color="#ffffff" component={<Iv-RsSpeaker />}></n-icon>
                                                        ) : (
                                                            <n-icon
                                                                size={28}
                                                                color="var(--text-color-3)"
                                                                component={<Iv-BsSpeaker />}
                                                            ></n-icon>
                                                        )}
                                                    </n-button>
                                                </n-space>
                                            ) : (
                                                <n-space wrap-item={false} size={[80, 0]}>
                                                    <n-button circle color="#07c160" onClick={fetchSubmit}>
                                                        <n-icon size={28} color="#ffffff" component={<Iv-BsCaller />}></n-icon>
                                                    </n-button>
                                                    <n-button circle color="#ff0000" onClick={fetchReject}>
                                                        <n-icon
                                                            class="is-closure"
                                                            size={28}
                                                            color="#ffffff"
                                                            component={<Iv-BsCaller />}
                                                        ></n-icon>
                                                    </n-button>
                                                </n-space>
                                            )}
                                        </Fragment>
                                    )}
                                </div>
                            </n-element>
                        </div>
                    )}
                </Transition>
            </Teleport>
        )
    }
})
</script>

<style lang="scss" scoped>
.fade-callmer-enter-active,
.fade-callmer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-callmer-enter-from,
.fade-callmer-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.chunk-callmer {
    cursor: all-scroll;
    width: var(--chunk-width);
    height: var(--chunk-height);
    padding: 0 24px 24px 24px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: var(--box-shadow-2);
    background-color: var(--chat-carte-popover);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out), box-shadow 0.3s var(--cubic-bezier-ease-in-out),
        width 0.3s var(--cubic-bezier-ease-in-out), height 0.3s var(--cubic-bezier-ease-in-out);
    &__footer {
        padding-top: 10px;
        .n-button {
            --n-width: 48px;
            --n-height: 48px;
        }
        .n-icon.is-closure {
            transform: rotate(134deg);
        }
    }
    .chunk-nickname {
        font-size: 18px;
        line-height: 26px;
        font-weight: 500;
        margin: 16px 0 0;
    }
}
</style>
