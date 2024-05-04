<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useUser } from '@/store/user'

export default defineComponent({
    name: 'App',
    setup() {
        const user = useUser()
        return () => (
            <n-element class="n-chunk n-column n-disover" style={{ height: '100%' }}>
                {user.token ? (
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
