<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const { inverted } = useProvider()

        return () => <div class="chat-connect n-chunk n-column"></div>
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
