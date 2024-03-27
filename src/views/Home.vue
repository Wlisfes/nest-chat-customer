<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'
import { APP_COMMON, getCookie } from '@/utils/utils-cookie'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const { state, setState } = useState({
            token: true //getCookie(APP_COMMON.CHAT_TOKEN)
        })

        return () => (
            <n-element class="layout-element">
                {state.token ? (
                    <chat-layout>
                        {{
                            sider: () => <chat-sider></chat-sider>,
                            default: () => <chat-context></chat-context>
                        }}
                    </chat-layout>
                ) : null}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-element {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
