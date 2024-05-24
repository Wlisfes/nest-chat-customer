<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash'
import { moment } from '@/hooks/hook-common'
import { useCallRemote } from '@/hooks/hook-remote'
import { useWebSocket } from '@/hooks/hook-websocket'
import { instance } from '@/store/messenger'
import { useUser, useSession, useMessenger, useComment, useStore } from '@/store'
import { divineHandler, divineWherer } from '@/utils/utils-common'
import { divineNotice } from '@/utils/utils-component'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const { uid, nickname, avatar } = useStore(useUser)
        const { sid, schema, fetchSessionPushUpdate } = useStore(useSession)
        const { fetchSessionPushMessager } = useStore(useMessenger)
        const { message, loading, setState } = useStore(useComment)
        const { fetchCallRemote } = useCallRemote()
        const { socket, fetchSocketCallRemoteResolver } = useWebSocket()

        /**远程呼叫**/
        async function fetchUseCallRemote(callType: 'audio' | 'video') {
            const { code, data } = await fetchSocketCallRemoteResolver(socket.value, {
                sid: sid.value,
                source: schema.value.source,
                contactId: schema.value.contactId,
                communitId: schema.value.communitId
            })
            if (schema.value.source === env.EnumSessionSource.contact) {
                /**私聊通话**/
                const initiate = divineWherer(uid.value === data.user.uid, data.user, data.nive)
                const receiver = divineWherer(uid.value === data.user.uid, data.nive, data.user)
                const option = { audio: true, video: callType === 'video' }
                return await divineHandler(receiver.online && Boolean(receiver.socketId), {
                    failure: async function () {
                        return await divineNotice({ type: 'warning', title: '当前用户不在线，呼叫失败！' })
                    },
                    handler: async function () {
                        return await fetchCallRemote(receiver.socketId, {
                            option: option,
                            metadata: { option, callType, initiate, receiver }
                        })
                    }
                })
            } else if (schema.value.source === env.EnumSessionSource.communit) {
                /**群聊通话**/
            }
        }

        /**组合发送数据**/
        async function fetchComposeMessager(scope: env.BodyComposeMessager) {
            return {
                source: scope.source,
                medias: scope.medias,
                text: scope.text,
                referrer: env.EnumMessagerReferrer.socket,
                status: env.EnumMessagerStatus.initialize,
                keyId: Date.now(),
                uuid: v4(),
                sid: '',
                reason: '',
                createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                reads: [{ sid: sid.value, userId: uid.value }],
                userId: uid.value,
                user: { avatar: avatar.value, nickname: nickname.value, uid: uid.value },
                sessionId: sid.value,
                contactId: schema.value.contactId,
                contact: cloneDeep(schema.value.contact ?? null),
                communitId: schema.value.communitId,
                communit: cloneDeep(schema.value.communit ?? null)
            }
        }

        /**发送自定义消息**/
        async function fetchSocketCustomizeSender() {
            await setState({ loading: true })
            await fetchComposeMessager({
                source: env.EnumMessagerSource.text,
                text: message.value,
                medias: []
            }).then(async (compose: Omix<any>) => {
                await fetchSessionPushMessager(compose)
                return await fetchSessionPushUpdate(compose)
            })
            await divineHandler(Boolean(instance.value), {
                handler: () => {
                    return instance.value.scrollTo({ top: 999999, behavior: 'smooth' })
                }
            })
            return await setState({ message: '', loading: false })
        }

        /**键盘回车事件处理**/
        async function onKeydownSubmit(evt: KeyboardEvent) {
            if (evt.key === 'Enter' && evt.ctrlKey) {
                evt.preventDefault()
                evt.stopPropagation()
                const target = evt.target as HTMLInputElement
                if ((target && target.selectionStart) || target.selectionStart === 0) {
                    const start = target.selectionStart as number
                    const end = target.selectionEnd as number
                    const message = target.value.substring(0, start) + '\n' + target.value.substring(end, target.value.length)
                    await setState({ message })
                    nextTick(() => {
                        target.focus()
                        target.setSelectionRange(end + '\n'.length, end + '\n'.length)
                    })
                } else {
                    return await setState({ message: target.value + '\n' })
                }
            } else if (evt.key === 'Enter') {
                evt.preventDefault()
                evt.stopPropagation()
                return await divineHandler(Boolean(message.value), {
                    handler: fetchSocketCustomizeSender
                })
            }
        }

        return () => (
            <div class="chat-comment n-chunk n-column">
                {/* <n-button onClick={onSender}>Sender</n-button> */}
                <div class="chat-comment__operate n-chunk n-center">
                    <n-button text focusable={false}>
                        <n-icon size={22} component={<Iv-BsEmoji />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={22} component={<Iv-BsImage />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={22} component={<Iv-BsVideo />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={22} component={<Iv-BsAudio />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={23} component={<Iv-BsFile />}></n-icon>
                    </n-button>
                    <n-divider vertical style={{ margin: '0 0px 0 6px' }} />
                    <n-button text focusable={false}>
                        <n-icon size={22} component={<Iv-RsVoice />}></n-icon>
                    </n-button>
                    <n-button text focusable={false} onClick={(evt: MouseEvent) => fetchUseCallRemote('audio')}>
                        <n-icon size={22} component={<Iv-RsCall />}></n-icon>
                    </n-button>
                    <n-button text focusable={false} onClick={(evt: MouseEvent) => fetchUseCallRemote('video')}>
                        <n-icon size={24} component={<Iv-RsVideo />}></n-icon>
                    </n-button>
                </div>
                <n-input
                    class="chat-comment__input"
                    placeholder="输入消息"
                    type="textarea"
                    v-model:value={message.value}
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeydown={onKeydownSubmit}
                />
                <div class="chat-comment__footer n-chunk n-center n-end">
                    <n-text depth={3}>Enter 发送，Ctrl+Enter 换行</n-text>
                    <n-button type="info" size="small" disabled={loading.value || !message.value} onClick={fetchSocketCustomizeSender}>
                        <div class="n-chunk n-center" style={{ columnGap: '5px' }}>
                            <n-icon size={16} component={<Iv-BsSender />}></n-icon>
                            <span>发送</span>
                        </div>
                    </n-button>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-comment {
    background-color: var(--chat-comment-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    z-index: 10;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        border-top: 1px solid var(--chat-border-color);
        transition: border-top 0.3s var(--cubic-bezier-ease-in-out);
    }
    &__operate {
        padding: 10px 16px 10px;
        column-gap: 16px;
        .n-button {
            --n-width: 20px;
            --n-height: 20px;
            --n-text-color: var(--text-color-3);
        }
    }
    &__footer {
        padding: 5px 16px 16px;
        column-gap: 10px;
        .n-text {
            opacity: 0.7;
            font-size: 12px;
            line-height: 20px;
            padding-top: 5px;
        }
    }
    &__input {
        --n-border: none;
        --n-border-disabled: none;
        --n-border-hover: none;
        --n-border-focus: none;
        --n-box-shadow-focus: none;
        --n-color: transparent;
        --n-color-focus: transparent;
        --n-color-disabled: transparent;
        --n-line-height-textarea: 1.5;
        --n-padding-left: 14px;
        --n-padding-right: 14px;
        --n-padding-vertical: 0;
    }
}
</style>
