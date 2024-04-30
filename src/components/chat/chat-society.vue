<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export default defineComponent({
    name: 'ChatSociety',
    setup() {
        const { state, setState } = useState({
            dataSource: [] as Array<env.SchemaSession>,
            total: 0,
            loading: true
        })

        onMounted(() => fetchSessionInitColumn())

        /**会话列表**/
        async function fetchSessionInitColumn() {
            try {
                const { data } = await api.httpSessionColumn()
                return await setState({ loading: false, total: data.total ?? 0, dataSource: data.list ?? [] })
            } catch (e) {
                return await setState({ loading: false, total: 0, dataSource: [] })
            }
        }

        return () => (
            <div class="chat-society n-chunk n-column n-auto n-disover n-pointer">
                <chat-compose title="社群"></chat-compose>
                <div class="chunk-society n-chunk n-center n-disover">
                    <n-icon-wrapper size={46} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-NsSociety />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        新建社群
                    </n-text>
                </div>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60}>
                        <n-element class="n-chunk n-column">
                            {state.loading && state.total === 0 && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {state.total > 0 && (
                                <div style={{ position: 'relative', paddingRight: '14px' }}>
                                    {state.dataSource.map((item: Omix) => (
                                        <chat-node-society key={item.keyId} v-model:node={item}></chat-node-society>
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

<style lang="scss" scoped>
.chunk-society {
    user-select: none;
    overflow: hidden;
    padding: 14px;
    column-gap: 14px;
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
}
</style>
