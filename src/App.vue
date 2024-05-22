<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useUser, useStore } from '@/store'

export default defineComponent({
    name: 'App',
    setup() {
        const { token } = useStore(useUser)

        return () => (
            <n-scrollbar
                class="root-scrollbar"
                content-class="n-chunk n-column n-disover"
                trigger="none"
                content-style={{ height: '100%', maxHeight: '100%' }}
                horizontal-rail-style={{ zIndex: 99 }}
                x-scrollable
            >
                <n-element class="n-chunk n-column n-auto n-disover">
                    {token.value ? (
                        <n-notification-provider container-class="is-customize-remote-provider" placement="bottom-right">
                            <chat-layout></chat-layout>
                        </n-notification-provider>
                    ) : (
                        <auth-layout></auth-layout>
                    )}
                </n-element>
            </n-scrollbar>
        )
    }
})
</script>
