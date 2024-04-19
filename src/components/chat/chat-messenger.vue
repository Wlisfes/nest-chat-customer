<script lang="tsx">
import { defineComponent, computed, onMounted } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { useMessenger } from '@/store'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        const element = useCurrentElement<HTMLElement>()
        const message = useMessenger()
        const { inverted } = useProvider()
        const chunk = computed(() => ({
            '--chat-messenger-opacity': divineWherer(inverted.value, 0.1, 0.6)
        }))

        onMounted(() => {})

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
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar
                        class="is-customize"
                        trigger="none"
                        size={60}
                        style={{ transform: 'rotate(0deg)', 'writing-mode': 'vertical-rl' }}
                    >
                        <div class="n-chunk n-column n-auto">
                            {Array.from({ length: 50 }, (x, i) => (
                                <n-h2>{i}</n-h2>
                            ))}
                        </div>
                    </n-scrollbar>
                </div>
                {/* <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                    <n-element class="n-chunk n-column n-auto">
                        <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                            <common-loadiner size={32} size-border={4}></common-loadiner>
                        </div>
                        {message.dataSource.map(item => (
                            <chat-node-messenger node={item}></chat-node-messenger>
                        ))}
                    </n-element>
                </n-scrollbar> */}
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
    &::before {
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
    // :deep(.is-customize.n-scrollbar > .n-scrollbar-rail--vertical) {
    //     right: inherit;
    //     left: 4px;
    // }
}
</style>
