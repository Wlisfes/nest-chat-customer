<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useUser, useConfiger } from '@/store'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const configer = useConfiger()
        const user = useUser()
        const { inverted } = useProvider()

        return () => (
            <div class="chat-connect n-chunk n-column n-center n-middle">
                <n-button type="primary" onClick={(scope: Omix) => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}>
                    {configer.theme}
                </n-button>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-connect {
    overflow: hidden;
    height: 60px;
    background-color: var(--chat-connect-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
