<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useSession, useStore } from '@/store'

export default defineComponent({
    name: 'ChatFilter',
    setup() {
        const { filter, setState } = useStore(useSession)
        const buttons = ref([
            { name: '所有', value: 'entire' },
            { name: '未读', value: 'unread' },
            { name: '好友', value: 'contact' },
            { name: '群组', value: 'communit' }
        ])

        return () => (
            <n-space class="chat-filter" wrap-item={false} size={[10, 8]}>
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
        )
    }
})
</script>
