<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        const { inverted } = useProvider()
        const chunk = computed(() => ({
            '--chat-messenger-opacity': divineWherer(inverted.value, 0.1, 0.6)
        }))

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            // if (scrollTop + clientHeight * 2 >= scrollHeight && !state.loading) {
            //     const data = await fetchColumn()
            //     return await setState({
            //         dataSource: state.dataSource.concat(data as any) as any,
            //         loading: false
            //     })
            // }
        }

        return () => (
            <div class="chat-messenger n-chunk n-column n-auto" style={chunk.value}>
                <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                    大撒大撒
                    <n-button>dsada</n-button>
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-messenger {
    overflow: hidden;
    background-color: var(--chat-messenger-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: url('@/assets/images/chat-messager.png');
        opacity: var(--chat-messenger-opacity);
        transition: opacity 0.3s var(--cubic-bezier-ease-in-out);
    }
    :deep(.n-scrollbar.is-customize) {
        --n-scrollbar-width: 7px;
    }
}
</style>
