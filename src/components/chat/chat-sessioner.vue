<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useConfiger, useUser, useChat, useSession } from '@/store'
import { useState } from '@/hooks/hook-state'
import { faker } from '@/hooks/hook-common'
import { divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSessioner',
    setup(props) {
        const session = useSession()

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            if (scrollTop + clientHeight * 3 >= scrollHeight && !session.loading) {
                // const data = await fetchColumn()
                // return await setState({
                //     dataSource: state.dataSource.concat(data as any) as any,
                //     loading: false
                // })
            }
        }

        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto n-disover">
                <chat-compose title="Chats"></chat-compose>
                <chat-searcher></chat-searcher>
                <div class="n-chunk n-column n-auto" style={{ overflow: 'hidden' }}>
                    <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                        <n-element class="n-chunk n-column">
                            <div style={{ position: 'relative', paddingRight: '14px' }}>
                                {session.dataSource.map((item: Omix) => (
                                    <chat-node-sessioner key={item.keyId} node={item}></chat-node-sessioner>
                                ))}
                            </div>
                            {/* <div class="n-chunk n-middle" style={{ padding: '15px 20px' }}>
                            <common-loadiner size={32}></common-loadiner>
                        </div> */}
                        </n-element>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>
