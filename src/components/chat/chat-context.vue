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
        background-color: var(--chat-context-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5) url('@/assets/images/chat-messager.png');
            // background-size: 540px 981px;
            opacity: 0.06;
        }
    }
}
</style>
