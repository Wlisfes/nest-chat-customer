<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'
import { useConfiger } from '@/store/configer'

export default defineComponent({
    name: 'ChatContext',
    setup(props) {
        const configer = useConfiger()

        return () => (
            <div class="chat-context n-chunk n-column n-auto">
                <div>chat-context</div>
                <div class="chat-context__scrollbar">
                    <n-scrollbar>
                        <n-card>card</n-card>
                        <n-button onClick={() => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}>Click</n-button>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-context {
    position: relative;
    overflow: hidden;
    &__scrollbar {
        flex: 1;
        position: relative;
        overflow: hidden;
    }
}
</style>
