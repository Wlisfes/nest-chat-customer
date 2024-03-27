<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatSearcher',
    setup(props) {
        return () => (
            <div class="chat-searcher n-chunk n-column">
                <div class="chat-searcher__wrapper">
                    <n-input placeholder="搜索对话">
                        {{
                            prefix: () => <n-icon size={18} component={<Iv-BsSearch />} style={{ marginRight: '10px' }}></n-icon>
                        }}
                    </n-input>
                </div>
                <div class="chat-searcher__element">
                    <n-space wrap-item={false}>
                        <n-button tertiary round>
                            所有
                        </n-button>
                        <n-button tertiary round>
                            未读
                        </n-button>
                        <n-button tertiary round>
                            联系人
                        </n-button>
                        <n-button tertiary round>
                            群组
                        </n-button>
                    </n-space>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-searcher {
    padding: 8px 12px;
    row-gap: 8px;
    background-color: var(--chat-searcher-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    border-bottom: 1px solid var(--chat-border-color);
    &__wrapper {
        position: relative;
        :deep(.n-input) {
            --n-border: none;
            --n-border-hover: none;
            --n-border-focus: none;
            --n-box-shadow-focus: none;
            --n-color-focus: transparent;
            --n-color: var(--chat-searcher-wrapper);
            --n-color-focus: var(--chat-searcher-wrapper);
            // --n-border-radius: 6px;
        }
    }
    &__element {
        position: relative;
    }
}
</style>
