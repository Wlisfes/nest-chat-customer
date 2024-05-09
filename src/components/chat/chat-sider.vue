<script lang="tsx">
import { defineComponent } from 'vue'
import { useChat } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'

export default defineComponent({
    name: 'ChatSider',
    setup() {
        const chat = useChat()
        const { element, observer } = useDrawer({ mount: true, unmount: true })

        return () => (
            <div class="chat-sider n-chunk n-auto n-disover">
                <div class="n-chunk n-column n-disover" style={{ width: '60px' }}>
                    <chat-carte observer={observer}></chat-carte>
                </div>
                <div ref={element} class="n-chunk n-column n-auto n-disover">
                    {chat.current === 'session' ? (
                        <chat-sessioner observer={observer}></chat-sessioner>
                    ) : chat.current === 'contact' ? (
                        <chat-contact observer={observer}></chat-contact>
                    ) : chat.current === 'society' ? (
                        <chat-society observer={observer}></chat-society>
                    ) : chat.current === 'chane' ? (
                        <chat-chane observer={observer}></chat-chane>
                    ) : chat.current === 'dynamic' ? (
                        <chat-dynamic observer={observer}></chat-dynamic>
                    ) : chat.current === 'settings' ? (
                        <chat-settings observer={observer}></chat-settings>
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
