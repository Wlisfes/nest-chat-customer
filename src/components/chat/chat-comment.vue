<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { moment } from '@/hooks/hook-common'
import { v4 } from 'uuid'
import { cloneDeep } from 'lodash'
import { instance } from '@/store/messenger'
import { useUser, useSession, useMessenger, useComment } from '@/store'
import { socket, divineSocketCustomizeMessager } from '@/utils/utils-websocket'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const user = useUser()
        const session = useSession()
        const messenge = useMessenger()
        const comment = useComment()

        // function onSender() {
        //     divineSocketCustomizeMessager(socket.value, {
        //         sessionId: message.sid,
        //         source: env.EnumMessagerSource.text,
        //         text: faker.lorem.text()
        //     }).then(response => {
        //         console.log(response)
        //     })
        // }

        /**组合发送数据**/
        async function fetchComposeMessager(scope: env.BodyComposeMessager) {
            return {
                source: scope.source,
                medias: scope.medias,
                text: scope.text,
                referrer: env.EnumMessagerReferrer.socket,
                status: env.EnumMessagerStatus.sending,
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
        async function fetchSocketCustomizeMessager(done: Function) {
            await done({ loading: true })
            await fetchComposeMessager({
                source: env.EnumMessagerSource.text,
                text: comment.message,
                medias: []
            }).then(async compose => {
                return await messenge.fetchSessionPushMessager(compose as never)
            })
            await divineHandler(Boolean(instance.value), () => {
                return instance.value.scrollTo({ top: 999999, behavior: 'smooth' })
            })
            return comment.setState({ message: '' }).then(async () => {
                return await done({ loading: false })
            })
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
                />
                <div class="chat-comment__footer n-chunk n-center n-end">
                    <n-text depth={3}>Ctrl + Enter 发送，Enter 换行</n-text>
                    <common-state
                        data-render={(scope: Omix<{ loading: boolean }>, done: Function) => (
                            <n-button
                                type="info"
                                size="small"
                                disabled={scope.loading || !comment.message}
                                onClick={(evt: Event) => fetchSocketCustomizeMessager(done)}
                            >
                                <div class="n-chunk n-center" style={{ columnGap: '5px' }}>
                                    <n-icon size={16} component={<Iv-BsSender />}></n-icon>
                                    <span>发送</span>
                                </div>
                            </n-button>
                        )}
                    ></common-state>
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
