<script lang="tsx">
import { defineComponent } from 'vue'
import { useMessenger } from '@/store'

export default defineComponent({
    name: 'ChatContext',
    setup(props) {
        const message = useMessenger()

        return () => (
            <n-element class="chat-context n-chunk n-column n-auto n-disover">
                {message.sid ? (
                    <div class="n-chunk n-column n-auto n-disover">
                        <chat-connect></chat-connect>
                        <div class="chat-context__messenger n-chunk n-column n-auto n-disover">
                            <chat-messenger></chat-messenger>
                        </div>
                        <chat-comment></chat-comment>
                    </div>
                ) : (
                    <div class="n-chunk n-center n-middle n-auto n-disover">
                        <n-icon size={84} color="var(--text-color-3)" style={{ opacity: 0.2 }} component={<Iv-BsChat />}></n-icon>
                    </div>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-context {
    background-color: var(--chat-context-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &__messenger {
        background-color: var(--chat-messenger-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-image: url('@/assets/images/chat-messager.png');
            opacity: var(--chat-messenger-opacity);
            transition: opacity 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
}
</style>
