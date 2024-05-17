<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useChat, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'

export default defineComponent({
    name: 'ChatSider',
    setup() {
        const { state, setState } = useState({ profile: false })
        const { current } = useStore(useChat)
        const { element, observer } = useDrawer({ mount: true, unmount: true })

        return () => (
            <div class="chat-sider n-chunk n-auto n-disover">
                <div class="n-chunk n-column n-disover" style={{ width: '60px' }}>
                    <chat-carte observer={observer} profile={state.profile} set-state={setState}></chat-carte>
                </div>
                <div ref={element} class="n-chunk n-column n-auto n-disover">
                    {current.value === 'session' ? (
                        <chat-sessioner observer={observer}></chat-sessioner>
                    ) : current.value === 'contact' ? (
                        <chat-contact observer={observer}></chat-contact>
                    ) : current.value === 'communit' ? (
                        <chat-communit observer={observer}></chat-communit>
                    ) : current.value === 'chane' ? (
                        <chat-chane observer={observer}></chat-chane>
                    ) : current.value === 'dynamic' ? (
                        <chat-dynamic observer={observer}></chat-dynamic>
                    ) : current.value === 'settings' ? (
                        <chat-settings observer={observer} profile={state.profile} set-state={setState}></chat-settings>
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
