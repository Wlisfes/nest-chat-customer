<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { faker } from '@/hooks/hook-common'
import { useMessenger } from '@/store'
import { socket, divineSocketCustomizeMessager } from '@/utils/utils-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const message = useMessenger()

        function onSender() {
            divineSocketCustomizeMessager(socket.value, {
                sessionId: message.sid,
                source: env.EnumMessagerSource.text,
                text: faker.lorem.text()
            }).then(response => {
                console.log(response)
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
                    v-model:value={message.comment}
                    autosize={{ minRows: 3, maxRows: 5 }}
                />
                <div class="chat-comment__footer n-chunk n-center n-end">
                    <n-text depth={3}>Ctrl + Enter 发送，Enter 换行</n-text>
                    <n-button type="info" size="small">
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
