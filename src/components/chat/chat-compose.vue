<script lang="tsx">
import { defineComponent, ComputedRef } from 'vue'
import { injectLocal } from '@vueuse/core'
import { useUser } from '@/store'
import { fetchResolver, fetchSociety, fetchSettings, fetchAnnotate, fetchAnswer, fetchDynamic } from '@/components/layer/instance.layer'
import { divineHandler } from '@/utils/utils-common'
import * as vide from '@/utils/utils-provide'

export default defineComponent({
    name: 'ChatCompose',
    setup(props) {
        const user = useUser()
        const element = injectLocal(vide.APP_CHAT_PROVIDE_ELEMENT) as ComputedRef<HTMLElement>

        /**用户信息**/
        async function fetchUseResolver() {
            const { unmount } = await fetchResolver({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        /**新对话**/
        async function fetchUseAnswer() {
            const { unmount } = await fetchAnswer({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        /**新建社群**/
        async function fetchUseSociety() {
            const { unmount } = await fetchSociety({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        /**已标注的消息**/
        async function fetchUseAnnotate() {
            const { unmount } = await fetchAnnotate({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        /**动态**/
        async function fetchUseDynamic() {
            const { unmount } = await fetchDynamic({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        /**设置**/
        async function fetchUseSettings() {
            const { unmount } = await fetchSettings({
                element: element.value,
                width: 'var(--chat-layout-sider-element-width)',
                onClose: () => unmount(300)
            })
        }

        async function onSelectHandler(key: string) {
            /**新对话**/
            await divineHandler(key === 'answer', fetchUseAnswer)
            /**新建社群**/
            await divineHandler(key === 'society', fetchUseSociety)
            /**已标注的消息**/
            await divineHandler(key === 'annotate', fetchUseAnnotate)
            /**动态**/
            await divineHandler(key === 'dynamic', fetchUseDynamic)
            /**设置**/
            await divineHandler(key === 'settings', fetchUseSettings)
            /**登出**/
            return await divineHandler(key === 'signout', async () => {
                console.log('signout')
            })
        }

        return () => (
            <div class="chat-compose n-chunk n-center n-space">
                <n-avatar class="n-pointer" round size={40} src={user.avatar} onClick={fetchUseResolver} />
                <n-space wrap-item={false} size={[16, 0]}>
                    <common-icon size={34} component={<Iv-BsSociety />} spin={<common-loadiner />} onClick={fetchUseSociety}></common-icon>
                    <common-icon size={34} component={<Iv-BsDynamic />} spin={<common-loadiner />} onClick={fetchUseDynamic}></common-icon>
                    <common-icon size={34} component={<Iv-BsChane />} spin={<common-loadiner />} onClick={fetchUseAnnotate}></common-icon>
                    <common-icon size={34} component={<Iv-BsDialog />} spin={<common-loadiner />} onClick={fetchUseAnswer}></common-icon>

                    <n-dropdown
                        trigger="click"
                        size="large"
                        width={200}
                        placement="bottom-end"
                        on-select={onSelectHandler}
                        options={[
                            { label: '新对话', key: 'answer' },
                            { label: '新建社群', key: 'society' },
                            { label: '已标注的消息', key: 'annotate' },
                            { label: '动态', key: 'dynamic' },
                            { label: '设置', key: 'settings' },
                            { label: '登出', key: 'signout' }
                        ]}
                    >
                        <div class="n-chunk n-center n-middle">
                            <common-icon size={34} component={<Iv-BsMore />} spin={<common-loadiner />}></common-icon>
                        </div>
                    </n-dropdown>
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
