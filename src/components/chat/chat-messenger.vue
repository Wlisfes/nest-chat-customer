<script lang="tsx">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useMessenger } from '@/store'
import { instance, element } from '@/store/messenger'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer, divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        const message = useMessenger()
        const { inverted } = useProvider()
        const chunk = computed(() => ({
            '--chat-messenger-opacity': divineWherer(inverted.value, 0.1, 0.6)
        }))

        // onMounted(() => {
        //     messenger.observer.on(
        //         'scrollBottom',
        //         async (scope: MixType<{ behavior: 'auto' | 'instant' | 'smooth' }> = { behavior: 'smooth' }) => {
        //             const target = await divineElementMomente()
        //             if (scrollbar.value && target) {
        //                 scrollbar.value.scrollTo({
        //                     top: target.scrollHeight,
        //                     behavior: scope.behavior ?? 'smooth'
        //                 })
        //             }
        //         }
        //     )
        // })

        /**获取滚动容器节点**/
        async function divineElementMomente(): Promise<HTMLElement> {
            const target = element.value.querySelector('.n-scrollbar-container')
            if (target) {
                return target as HTMLElement
            }
            await divineDelay(100)
            return element.value.querySelector('.n-scrollbar-container') as HTMLElement
        }

        async function onScroller(evt: { target: HTMLElement }) {
            // const { scrollTop, clientHeight, scrollHeight } = evt.target
            // if (scrollTop + clientHeight * 2 >= scrollHeight && !state.loading) {
            //     const data = await fetchColumn()
            //     return await setState({
            //         dataSource: state.dataSource.concat(data as any) as any,
            //         loading: false
            //     })
            // }
            // scrollTop.value = evt.target.scrollTop
            // const scrollHeight = evt.target.scrollHeight
            // if (evt.target.scrollTop <= evt.target.clientHeight * 2 && !messenger.messager.loading && messenger.messager.isMore) {
            //     await messenger.setMessagerLoadiner(true)
            //     await messenger.fetchChannelColumnMessenger({
            //         type: 'loadiner',
            //         page: messenger.messager.page + 1,
            //         closure: false
            //     })
            //     const target = await divineElementMomente()
            //     nextTick(async () => {
            //         await scrollbar.value.scrollTo({
            //             top: target.scrollHeight - scrollHeight + scrollTop.value,
            //             behavior: 'auto'
            //         })
            //         await messenger.setMessagerLoadiner(false)
            //     })
            // }
        }

        return () => (
            <div ref={element} class="chat-messenger n-chunk n-column n-auto n-disover" style={chunk.value}>
                <n-scrollbar ref={instance} class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                    {((message.loading && message.total === 0) || message.next) && (
                        <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                            <common-loadiner size={32} size-border={4}></common-loadiner>
                        </div>
                    )}
                    {!message.loading && message.total === 0 ? (
                        <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                            <n-empty description="无数据"></n-empty>
                        </div>
                    ) : !message.loading && message.total > 0 ? (
                        <n-element class="ctx-messenger n-chunk n-column n-auto">
                            {message.dataSource.map((item, index) => (
                                <chat-node-messenger node={item} order={message.dataSource.length - index}></chat-node-messenger>
                            ))}
                        </n-element>
                    ) : null}
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-messenger {
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
}

.ctx-messenger {
    position: relative;
    padding: 40px 20px 60px;
    :deep(.chat-node-messenger) {
        margin-bottom: 20px;
        &:first-child {
            margin-bottom: 0px;
        }
    }
}
</style>
