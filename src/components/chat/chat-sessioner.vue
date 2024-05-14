<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useUser, useSession, useStore } from '@/store'
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
        const { nickname } = useStore(useUser)
        const { filter, loading, total, dataSource } = useStore(useSession)

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            if (scrollTop + clientHeight * 3 >= scrollHeight && !loading.value) {
            }
        }

        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto n-disover">
                <chat-compose observer={props.observer} title={nickname.value}></chat-compose>
                <div class="n-chunk n-column" style={{ padding: '0px 14px 14px', rowGap: '8px' }}>
                    <chat-searcher></chat-searcher>
                    <chat-filter></chat-filter>
                </div>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                        <n-element class="n-chunk n-column">
                            {loading.value && dataSource.value.length === 0 && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '14px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {!loading.value && dataSource.value.length === 0 && (
                                <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                    <n-empty description="暂无对话"></n-empty>
                                </div>
                            )}
                            {dataSource.value.length > 0 && (
                                <div class="n-chunk n-column">
                                    {dataSource.value.map(item => {
                                        return <chat-node-sessioner key={item.keyId} v-model:node={item}></chat-node-sessioner>
                                    })}
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
