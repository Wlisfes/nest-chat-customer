<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useState } from '@/hooks/hook-state'
import { APP_COMMON, getCookie } from '@/utils/utils-cookie'

export default defineComponent({
    name: 'Home',
    setup(props) {
        const { state, setState } = useState({
            token: getCookie(APP_COMMON.CHAT_TOKEN)
        })

        return () => (
            <n-element class="layout-element">
                {state.token ? (
                    <Fragment>
                        <chat-layout></chat-layout>
                    </Fragment>
                ) : (
                    <auth-layout></auth-layout>
                )}
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
