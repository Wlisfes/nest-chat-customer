<script lang="tsx">
import { defineComponent, ComputedRef } from 'vue'
import { injectLocal } from '@vueuse/core'
import { useConfiger } from '@/store/configer'
import { fetchResolver } from '@/components/layer/instance.layer'
import * as vide from '@/utils/utils-provide'

export default defineComponent({
    name: 'ChatCompose',
    setup(props) {
        const configer = useConfiger()
        const element = injectLocal(vide.APP_CHAT_PROVIDE_ELEMENT) as ComputedRef<HTMLElement>

        async function fetchUseResolver() {
            const { unmount } = await fetchResolver({
                element: element.value
                // title: titles[source],
                // source: source,
                // node: scope,
                // onClose: () => unmount(300),
                // onSubmit: async (done: Function) => {
                //     await done(false)
                //     return await fetchUpdate().finally(() => {
                //         return unmount(300)
                //     })
                // }
            })
        }

        return () => (
            <div class="chat-compose n-chunk n-center n-space">
                <n-avatar
                    round
                    size={40}
                    src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg?x-oss-process=style/resize-1-1"
                    onClick={fetchUseResolver}
                />
                <n-space wrap-item={false} size={[16, 0]}>
                    <common-icon size={34} component={<Iv-BsSociety />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsDynamic />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsChane />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsDialog />} spin={<common-loadiner />}></common-icon>
                    <common-icon
                        size={34}
                        component={<Iv-BsMore />}
                        spin={<common-loadiner />}
                        onClick={(scope: Omix) => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}
                        //onClick={(scope: Omix) => scope.done({ loading: true })}
                    ></common-icon>
                </n-space>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 16px;
    box-sizing: border-box;
    background-color: var(--chat-compose-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
