<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { useMessenger } from '@/store'
import { instance, element } from '@/store/messenger'
import { divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        const message = useMessenger()

        /**获取滚动容器节点**/
        async function divineElementMomente(): Promise<HTMLElement> {
            const target = element.value.querySelector('.n-scrollbar-container')
            if (target) {
                return target as HTMLElement
            }
            await divineDelay(100)
            return element.value.querySelector('.n-scrollbar-container') as HTMLElement
        }

        /**上拉分页加载数据**/
        async function onScroller(evt: { target: HTMLElement }) {
            await message.setState({ distance: evt.target.scrollTop })
            const scrollHeight = evt.target.scrollHeight
            if (evt.target.scrollTop <= evt.target.clientHeight * 2 && !message.loading && message.next) {
                await message.fetchSessionColumnNextMessager(true)
                const target = await divineElementMomente()
                nextTick(async () => {
                    await instance.value.scrollTo({
                        top: target.scrollHeight - scrollHeight + message.distance,
                        behavior: 'auto'
                    })
                    await message.setState({ loading: false })
                })
            }
        }

        return () => (
            <div ref={element} class="chat-messenger n-chunk n-column n-auto n-disover">
                <n-scrollbar ref={instance} class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                    {((message.loading && message.total === 0) || message.next) && (
                        <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                            <common-loadiner size={32} size-border={4}></common-loadiner>
                        </div>
                    )}
                    {!message.loading && message.total === 0 && (
                        <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                            <n-empty description="无数据"></n-empty>
                        </div>
                    )}
                    {message.total > 0 && (
                        <n-element class="ctx-messenger n-chunk n-column n-auto">
                            {message.dataSource.map((item, index) => (
                                <chat-node-messenger
                                    key={item.sid}
                                    node={item}
                                    order={message.dataSource.length - index}
                                ></chat-node-messenger>
                            ))}
                        </n-element>
                    )}
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
        margin-bottom: 24px;
        &:first-child {
            margin-bottom: 0px;
        }
    }
}
</style>
