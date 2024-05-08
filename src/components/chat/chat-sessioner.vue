<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useUser, useSession } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSessioner',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })
        const user = useUser()
        const session = useSession()

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            if (scrollTop + clientHeight * 3 >= scrollHeight && !session.loading) {
            }
        }

        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto n-disover">
                <chat-compose title={user.nickname}></chat-compose>
                <chat-searcher></chat-searcher>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                        <n-element class="n-chunk n-column">
                            {session.loading && session.total === 0 && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {session.total > 0 && (
                                <div style={{ position: 'relative', paddingRight: '14px' }}>
                                    {session.dataSource.map(item => (
                                        <chat-node-sessioner key={item.keyId} v-model:node={item}></chat-node-sessioner>
                                    ))}
                                </div>
                            )}
                        </n-element>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>
