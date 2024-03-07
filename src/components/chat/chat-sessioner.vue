<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { faker } from '@/hooks/hook-common'
import { divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSessioner',
    setup(props) {
        const { state, setState } = useState({ loading: true, dataSource: [] })

        onMounted(async () => {
            await setState({
                dataSource: (await fetchColumn()) as any,
                loading: false
            })
        })

        async function fetchColumn(): Promise<Array<any>> {
            await setState({ loading: true })
            await divineDelay(500)
            return Array.from({ length: 30 }, () => ({
                keyId: faker.string.uuid(),
                uid: faker.string.uuid(),
                // avatar: faker.image.avatar(),
                avatar: `https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg?x-oss-process=style/resize-1-1`,
                fullName: faker.person.fullName(),
                phoneNumber: faker.phone.number(),
                email: faker.internet.email(),
                birthday: faker.date.birthdate().toLocaleDateString(),
                content: faker.lorem.text()
            }))
        }

        async function onScroller(evt: { target: HTMLElement }) {
            const { scrollTop, clientHeight, scrollHeight } = evt.target
            if (scrollTop + clientHeight * 3 >= scrollHeight && !state.loading) {
                const data = await fetchColumn()
                return await setState({
                    dataSource: state.dataSource.concat(data as any) as any,
                    loading: false
                })
            }
        }

        return () => (
            <div class="chat-sessioner n-chunk n-column n-auto">
                <n-scrollbar class="is-customize" trigger="none" size={60} on-scroll={onScroller}>
                    <n-element class="n-chunk n-column">
                        <div style={{ position: 'relative' }}>
                            {state.dataSource.map((item: Omix) => (
                                <chat-node-sessioner key={item.keyId} node={item}></chat-node-sessioner>
                            ))}
                        </div>
                        <div class="n-chunk n-middle" style={{ padding: '15px 20px' }}>
                            <common-loadiner size={32}></common-loadiner>
                        </div>
                    </n-element>
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-sessioner {
    overflow: hidden;
    :deep(.n-scrollbar.is-customize) {
        --n-scrollbar-width: 7px;
    }
}
</style>
