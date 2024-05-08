<script lang="tsx">
import { defineComponent } from 'vue'
import { useChat } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'

export default defineComponent({
    name: 'ChatSider',
    setup() {
        const { element } = useDrawer()
        const chat = useChat()

        return () => (
            <div class="chat-sider n-chunk n-auto n-disover">
                <div class="n-chunk n-column n-disover" style={{ width: '60px' }}>
                    <chat-carte></chat-carte>
                </div>
                <div ref={element} class="n-chunk n-column n-auto n-disover">
                    {chat.current === 'session' ? (
                        <chat-sessioner></chat-sessioner>
                    ) : chat.current === 'contact' ? (
                        <chat-contact></chat-contact>
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
    background-color: var(--chat-sider-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
