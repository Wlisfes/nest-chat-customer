<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'

export default defineComponent({
    name: 'ChatSessioner',
    setup(props) {
        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto">
                <n-scrollbar class="is-customize" trigger="none">
                    {Array.from({ length: 30 }, (x, i) => (
                        <chat-node-sessioner key={i}></chat-node-sessioner>
                    ))}
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-sessioner {
    overflow: hidden;
    :deep(.n-scrollbar.is-customize) {
        --n-scrollbar-width: 7px;
    }
}
</style>
