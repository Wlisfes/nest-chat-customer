<script lang="tsx">
import { defineComponent } from 'vue'
import { useSession } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { divineNotice } from '@/utils/utils-component'
import { fetchSociety } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    setup() {
        const session = useSession()
        const { observer } = useDrawer({ mount: true, unmount: true })

        /**新建社群**/
        async function fetchUseSociety() {
            return await fetchSociety({
                observer,
                onClose: async ({ unmount }: Omix<{ unmount: Function }>) => {
                    return await unmount(300)
                },
                onSubmit: async ({ done, message }: Omix<{ message: string; done: Function }>) => {
                    await session.fetchSessionInitColumn()
                    await divineNotice({ type: 'success', title: message })
                    return await done({ visible: false })
                }
            })
        }

        return () => (
            <div class="chat-contact n-chunk n-column n-auto n-disover n-pointer">
                <chat-compose title="联系人"></chat-compose>
                <div class="chunk-contact n-chunk n-center n-disover" onClick={fetchUseSociety}>
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
                            {session.loading && session.total === 0 && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '20px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {session.total > 0 && (
                                <div style={{ position: 'relative', paddingRight: '14px' }}>
                                    {session.dataSource.map(item => {
                                        if (item.source === env.EnumSessionSource.communit) {
                                            return <chat-node-sessioner key={item.keyId} v-model:node={item}></chat-node-sessioner>
                                        }
                                        return null
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

<style lang="scss" scoped>
.chunk-contact {
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