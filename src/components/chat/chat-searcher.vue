<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useSession, useStore } from '@/store'

export default defineComponent({
    name: 'ChatSearcher',
    setup(props) {
        const { filter, setState } = useStore(useSession)
        const buttons = ref([
            { name: '所有', value: 'entire' },
            { name: '未读', value: 'unread' },
            { name: '好友', value: 'contact' },
            { name: '群组', value: 'communit' }
        ])

        return () => (
            <div class="chat-searcher n-chunk n-column">
                <div class="chat-searcher__wrapper">
                    <n-input
                        placeholder="搜索对话"
                        v-slots={{
                            prefix: () => <n-icon size={18} component={<Iv-BsSearch />} style={{ marginRight: '10px' }}></n-icon>
                        }}
                    ></n-input>
                </div>
                <n-space wrap-item={false} size={[10, 8]}>
                    {buttons.value.map(item => (
                        <n-button
                            size="small"
                            focusable={false}
                            round
                            secondary
                            type={filter.value === item.value ? 'success' : 'default'}
                            onClick={(evt: MouseEvent) => setState({ filter: item.value })}
                        >
                            {item.name}
                        </n-button>
                    ))}
                </n-space>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-searcher {
    position: relative;
    overflow: hidden;
    padding: 0px 14px 14px;
    row-gap: 8px;
    background-color: var(--chat-searcher-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
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
        }
    }
}
</style>
