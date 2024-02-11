`
<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { ScrollbarInst } from 'naive-ui'
import { zh_CN, Faker } from '@faker-js/faker'
import { useState } from '@/hooks/hook-state'
export const faker = new Faker({
    locale: [zh_CN]
})

interface IState {
    loading: boolean
    dataSource: Array<
        Omix<{
            keyId: string
            uid: string
            avatar: string
            fullName: string
            phoneNumber: string
            email: string
            birthday: string
        }>
    >
}

/**延时方法**/
export function divineDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

export default defineComponent({
    name: 'Home',
    setup(props) {
        const element = useCurrentElement<HTMLElement>()
        const context = ref<HTMLElement>()
        const inst = ref<ScrollbarInst>()
        const scrollTop = ref<number>(0)
        const { state, setState } = useState<IState>({
            loading: true,
            dataSource: []
        })

        onMounted(async () => {
            await setState({
                dataSource: await fetchColumn(),
                loading: false
            })
            scrollTop.value = context.value!.clientHeight as number
            inst.value?.scrollTo({ top: scrollTop.value })
        })

        async function fetchColumn(): Promise<Array<any>> {
            await setState({ loading: true })
            await divineDelay(500)
            return Array.from({ length: 30 }, () => ({
                keyId: faker.string.uuid(),
                uid: faker.string.uuid(),
                avatar: faker.image.avatar(),
                fullName: faker.person.fullName(),
                phoneNumber: faker.phone.number(),
                email: faker.internet.email(),
                birthday: faker.date.birthdate().toLocaleDateString()
            }))
        }

        async function onScroller(evt: { target: HTMLElement }) {
            scrollTop.value = evt.target.scrollTop
            const scrollHeight = evt.target.scrollHeight
            if (evt.target.scrollTop <= evt.target.clientHeight * 2 && !state.loading) {
                const scrollbar = element.value.querySelector('.n-scrollbar-container') as HTMLElement
                const data = await fetchColumn()
                await setState({
                    dataSource: data.concat(state.dataSource),
                    loading: false
                })
                nextTick(() => {
                    inst.value?.scrollTo({
                        // scrollTop: scrollTop.value,
                        top: scrollbar.scrollHeight - scrollHeight + scrollTop.value
                    })
                })
            }
        }

        return () => (
            <div class="layout">
                <n-scrollbar
                    class="is-customize"
                    style={{ width: '400px', height: '600px', margin: '50px' }}
                    ref={inst}
                    size={60}
                    trigger="none"
                    on-scroll={onScroller}
                >
                    <div class="n-chunk n-center n-middle" style={{ padding: '20px' }}>
                        <common-loadiner></common-loadiner>
                    </div>
                    <div ref={context} class="scope-messager n-chunk n-column n-auto">
                        {state.dataSource.map((item, index) => {
                            if (index % 20 === 0) {
                                return (
                                    <Fragment>
                                        <div class="scope-sticky n-chunk n-center n-middle">
                                            <div>{item.birthday}</div>
                                        </div>
                                        <div class="scope-column" key={item.uid}>
                                            <n-image src={item.avatar}></n-image>
                                            <div>{item.uid}</div>
                                        </div>
                                    </Fragment>
                                )
                            }
                            return (
                                <div class="scope-column" key={item.uid}>
                                    <n-image src={item.avatar}></n-image>
                                    <div>{item.uid}</div>
                                </div>
                            )
                        })}
                    </div>
                </n-scrollbar>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    overflow: hidden;
}

.scope-messager {
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
}

.scope-sticky {
    position: sticky;
    top: 20px;
    z-index: 999;
    > div {
        background-color: #e3e3e3;
        padding: 0 10px;
        line-height: 24px;
        border-radius: 12px;
        font-size: 12px;
        color: #222222;
    }
}
.scope-column {
    height: 100px;
    margin: 0 20px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;

    :deep(.n-image) {
        width: 48px;
        height: 48px;
        img {
            width: 100%;
            display: block;
        }
    }
}
</style>
`
