<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { isNotEmpty } from 'class-validator'
import { useUser, useSession, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatSessioner',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })
        const { uid } = useStore(useUser)
        const { keyword, filter, loading, dataSource } = useStore(useSession)
        const total = computed(() => dataSource.value.map(item => divineSourceFilter(item)).length)

        function divineSearchKeyword(item: Omix<env.SchemaSession>) {
            if (item.source === env.EnumSessionSource.contact) {
                const { user, nive } = item.contact
                const name = user.uid === uid.value ? nive.nickname : user.nickname
                return isNotEmpty(keyword.value) ? name.includes(keyword.value) : true
            } else {
                return isNotEmpty(keyword.value) ? item.communit.name.includes(keyword.value) : true
            }
        }

        function divineSourceFilter(item: Omix<env.SchemaSession>): boolean {
            if (filter.value === 'entire') {
                return divineSearchKeyword(item)
            } else if (filter.value === 'unread' && item.unread.length > 0) {
                return divineSearchKeyword(item)
            } else if (filter.value === 'contact' && item.source === env.EnumSessionSource.contact) {
                return divineSearchKeyword(item)
            } else if (filter.value === 'communit' && item.source === env.EnumSessionSource.communit) {
                return divineSearchKeyword(item)
            }
            return false
        }

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            if (scrollTop + clientHeight * 3 >= scrollHeight && !loading.value) {
            }
        }

        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto n-disover">
                <chat-compose observer={props.observer} title="对话"></chat-compose>
                <div class="n-chunk n-column" style={{ padding: '0px 14px 14px', rowGap: '8px' }}>
                    <chat-searcher v-model:content={keyword.value}></chat-searcher>
                    <chat-filter></chat-filter>
                </div>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                        <n-element class="n-chunk n-column">
                            {loading.value && total.value === 0 && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '14px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {!loading.value && total.value === 0 && (
                                <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                    <n-empty description="暂无对话"></n-empty>
                                </div>
                            )}
                            {total.value > 0 && (
                                <div class="n-chunk n-column">
                                    {dataSource.value.map(item => {
                                        if (divineSourceFilter(item)) {
                                            return <chat-node-sessioner key={item.keyId} v-model:node={item}></chat-node-sessioner>
                                        } else {
                                            return null
                                        }
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
