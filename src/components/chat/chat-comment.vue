<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const { inverted } = useProvider()

        return () => <div class="chat-comment n-chunk n-column"></div>
    }
})
</script>

<style lang="scss" scoped>
.chat-comment {
    overflow: hidden;
    height: 64px;
    background-color: var(--chat-comment-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
