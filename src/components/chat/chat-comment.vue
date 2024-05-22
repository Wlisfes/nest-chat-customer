<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { moment } from '@/hooks/hook-common'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash'
import { instance } from '@/store/messenger'
import { useUser, useSession, useMessenger, useComment } from '@/store'
import { divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const user = useUser()
        const session = useSession()
        const messenge = useMessenger()
        const comment = useComment()

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
                reads: [{ sid: session.sid, userId: user.uid }],
                userId: user.uid,
                user: { avatar: user.avatar, nickname: user.nickname, status: user.status, uid: user.uid },
                sessionId: session.sid,
                contactId: session.schema.contactId,
                contact: cloneDeep(session.schema.contact ?? null),
                communitId: session.schema.communitId,
                communit: cloneDeep(session.schema.communit ?? null)
            }
        }

        /**发送自定义消息**/
        async function fetchSocketCustomizeSender() {
            await comment.setState({ loading: true })
            await fetchComposeMessager({
                source: env.EnumMessagerSource.text,
                text: comment.message,
                medias: []
            }).then(async (compose: Omix<any>) => {
                await messenge.fetchSessionPushMessager(compose)
                return await session.fetchSessionPushUpdate(compose)
            })
            await divineHandler(Boolean(instance.value), {
                handler: () => {
                    return instance.value.scrollTo({ top: 999999, behavior: 'smooth' })
                }
            })
            return await comment.setState({ message: '', loading: false })
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
                    await comment.setState({ message })
                    nextTick(() => {
                        target.focus()
                        target.setSelectionRange(end + '\n'.length, end + '\n'.length)
                    })
                } else {
                    return await comment.setState({ message: target.value + '\n' })
                }
            } else if (evt.key === 'Enter') {
                evt.preventDefault()
                evt.stopPropagation()
                return await divineHandler(Boolean(comment.message), {
                    handler: fetchSocketCustomizeSender
                })
            }
        }

        return () => (
            <div class="chat-comment n-chunk n-column">
                {/* <n-button onClick={onSender}>Sender</n-button> */}
                <div class="chat-comment__operate n-chunk n-center">
                    <n-button text focusable={false}>
                        <n-icon size={20} component={<Iv-BsEmoji />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={20} component={<Iv-BsImage />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={20} component={<Iv-BsVideo />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={20} component={<Iv-BsAudio />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={19} component={<Iv-BsFile />}></n-icon>
                    </n-button>
                </div>
                <n-input
                    class="chat-comment__input"
                    placeholder="输入消息"
                    type="textarea"
                    v-model:value={comment.message}
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeydown={onKeydownSubmit}
                />
                <div class="chat-comment__footer n-chunk n-center n-end">
                    <n-text depth={3}>Enter 发送，Ctrl+Enter 换行</n-text>
                    <n-button type="info" size="small" disabled={comment.loading || !comment.message} onClick={fetchSocketCustomizeSender}>
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
