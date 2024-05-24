<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { useMessenger } from '@/store'
import { instance, element } from '@/store/messenger'
import { divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatMessenger',
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
            if (evt.target.scrollTop <= evt.target.clientHeight * 1.5 && !message.loading && message.next) {
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
                    <div class="n-chunk n-column n-auto">
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
                                    <next-column-messenger
                                        v-model:node={item}
                                        key={item.uuid ?? item.sid}
                                        order={message.dataSource.length - index}
                                    ></next-column-messenger>
                                ))}
                            </n-element>
                        )}
                    </div>
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.ctx-messenger {
    position: relative;
    padding: 60px 20px 60px;
    :deep(.chat-node-messenger) {
        margin-bottom: 24px;
        &:first-child {
            margin-bottom: 0px;
        }
    }
}
</style>
