<script lang="tsx">
import { defineComponent, ComputedRef } from 'vue'
import { injectLocal } from '@vueuse/core'
import { useUser } from '@/store/instance.store'
import { fetchResolver } from '@/components/layer/instance.layer'
import * as vide from '@/utils/utils-provide'

export default defineComponent({
    name: 'ChatCompose',
    setup(props) {
        const user = useUser()
        const element = injectLocal(vide.APP_CHAT_PROVIDE_ELEMENT) as ComputedRef<HTMLElement>

        async function fetchUseResolver() {
            const { unmount } = await fetchResolver({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        return () => (
            <div class="chat-compose n-chunk n-center n-space">
                <n-avatar class="n-pointer" round size={40} src={user.avatar} onClick={fetchUseResolver} />
                <n-space wrap-item={false} size={[16, 0]}>
                    <common-icon size={34} component={<Iv-BsSociety />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsDynamic />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsChane />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsDialog />} spin={<common-loadiner />}></common-icon>
                    <common-icon size={34} component={<Iv-BsMore />} spin={<common-loadiner />}></common-icon>
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
