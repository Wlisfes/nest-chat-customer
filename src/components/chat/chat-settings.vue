<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser } from '@/store'
import { useLayer } from '@/hooks/hook-layer'
import { useProvider } from '@/hooks/hook-provider'
import { fetchResolver } from '@/components/layer/layer.instance'

export default defineComponent({
    name: 'ChatSettings',
    setup() {
        const user = useUser()
        const { observer } = useLayer(true)
        const { inverted, fetchThemeUpdate } = useProvider()

        /**登出**/
        async function fetchUserSignout() {
            return await user.fetchUserSignout()
        }

        async function fetchUseResolver() {
            const { unmount } = await fetchResolver({
                observer,
                onClose: () => unmount(300)
            })
        }

        return () => (
            <div class="chat-settings n-chunk n-column n-auto n-disover">
                <chat-compose title="设置"></chat-compose>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize">
                        <div class="chunk-user n-chunk n-center n-disover n-pointer" onClick={fetchUseResolver}>
                            <chat-avatar size={80} radius={40} src={user.avatar}></chat-avatar>
                            <div class="n-chunk n-column n-auto">
                                <n-text depth={1} style={{ fontSize: '20px', lineHeight: '28px' }}>
                                    {user.nickname}
                                </n-text>
                                <n-text depth={3} style={{ lineHeight: '24px' }}>
                                    你好，我正在使用Chat盒子
                                </n-text>
                            </div>
                        </div>
                        <div class="n-chunk n-column n-auto n-disover">
                            <div class="chunk-block n-chunk n-disover n-pointer">
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsUser />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>账号</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer">
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={25} color="var(--text-color-1)" component={<Iv-BsOckes />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>安全</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer">
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsSession />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>对话</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer">
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsAlert />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>通知</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchThemeUpdate}>
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    {inverted.value ? (
                                        <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsDark />}></n-icon>
                                    ) : (
                                        <n-icon size={27} color="var(--text-color-1)" component={<Iv-BsLight />}></n-icon>
                                    )}
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        {inverted.value ? (
                                            <n-ellipsis tooltip={false}>浅色模式</n-ellipsis>
                                        ) : (
                                            <n-ellipsis tooltip={false}>深色模式</n-ellipsis>
                                        )}
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchUserSignout}>
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={27} color="var(--error-color)" component={<Iv-BsExit />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1} style={{ color: 'var(--error-color)' }}>
                                        <n-ellipsis tooltip={false}>登出</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-user {
    user-select: none;
    padding: 10px 16px;
    column-gap: 10px;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--divider-color);
    }
}
.chunk-block {
    user-select: none;
    height: 60px;
    font-size: 16px;
    padding-right: 16px;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--divider-color);
    }
    &::before {
        content: '';
        position: absolute;
        left: 70px;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
