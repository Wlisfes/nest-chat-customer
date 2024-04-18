<script lang="tsx">
import { defineComponent } from 'vue'
import { useChat } from '@/store'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        const chat = useChat()

        return () => (
            <div class="chat-sider n-chunk n-auto">
                <div class="chat-sider__carte n-chunk n-column">
                    <chat-carte></chat-carte>
                </div>
                <div class="chat-sider__container n-chunk n-column n-auto">
                    {chat.current === 'session' ? (
                        <chat-sessioner></chat-sessioner>
                    ) : chat.current === 'society' ? (
                        <chat-society></chat-society>
                    ) : chat.current === 'chane' ? (
                        <chat-chane></chat-chane>
                    ) : chat.current === 'dynamic' ? (
                        <chat-dynamic></chat-dynamic>
                    ) : chat.current === 'settings' ? (
                        <chat-settings></chat-settings>
                    ) : chat.current === 'resolver' ? (
                        <chat-resolver></chat-resolver>
                    ) : null}
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-sider {
    position: relative;
    overflow: hidden;
    &__carte {
        width: 60px;
        overflow: hidden;
    }
    &__container {
        position: relative;
        overflow: hidden;
        background-color: var(--chat-searcher-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
