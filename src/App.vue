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
                        <Fragment>
                            <chat-layout></chat-layout>
                        </Fragment>
                    ) : (
                        <auth-layout></auth-layout>
                    )}
                </n-element>
            </n-scrollbar>
        )
    }
})
</script>
