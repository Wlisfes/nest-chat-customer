<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useConfiger } from '@/store/configer'
import { useUser } from '@/store/user'

export default defineComponent({
    name: 'App',
    setup(props) {
        const configer = useConfiger()
        const user = useUser()

        return () => (
            <n-element id="app-element">
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

<style lang="scss" scoped>
#app-element {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
