<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useUser } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { useProvider } from '@/hooks/hook-provider'
import { Observer } from '@/utils/utils-observer'
import { fetchResolver, fetchProfile, fetchRespon, fetchNotice, fetchSafety } from '@/components/layer/layer.instance'

export default defineComponent({
    name: 'ChatSettings',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true },
        setState: { type: Function, required: true },
        profile: { type: Boolean, default: false }
    },
    setup(props) {
        const user = useUser()
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })
        const { inverted, fetchThemeUpdate } = useProvider()

        /**登出**/
        async function fetchUserSignout() {
            return await user.fetchUserSignout()
        }

        /**用户信息**/
        async function fetchUseProfile() {
            if (props.profile) {
                return props.observer.emit('layer-unmounted')
            } else {
                await props.setState({ profile: true })
                return await fetchProfile({
                    observer: props.observer,
                    onClose: async ({ unmount }: Omix<{ unmount: Function }>) => {
                        await props.setState({ profile: false })
                        return await unmount(300)
                    }
                })
            }
        }

        /**账号设置**/
        async function fetchUseResolver() {
            return await fetchResolver({
                observer,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(300)
            })
        }

        /**安全设置**/
        async function fetchUseSafety() {
            return await fetchSafety({
                observer,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(300)
            })
        }

        /**对话设置**/
        async function fetchUseRespon() {
            return await fetchRespon({
                observer,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(300)
            })
        }

        /**通知设置**/
        async function fetchUseNotice() {
            return await fetchNotice({
                observer,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(300)
            })
        }

        return () => (
            <div class="chat-settings n-chunk n-column n-auto n-disover">
                <chat-compose observer={props.observer} title="设置"></chat-compose>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize">
                        <div class="chunk-user n-chunk n-center n-disover n-pointer" onClick={fetchUseProfile}>
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
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchUseResolver}>
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsUser />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>账号</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchUseSafety}>
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={25} color="var(--text-color-1)" component={<Iv-BsOckes />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>安全</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchUseRespon}>
                                <div class="n-chunk n-center n-middle" style={{ width: '70px' }}>
                                    <n-icon size={26} color="var(--text-color-1)" component={<Iv-BsSession />}></n-icon>
                                </div>
                                <div class="n-chunk n-center n-auto n-disover">
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>对话</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="chunk-block n-chunk n-disover n-pointer" onClick={fetchUseNotice}>
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
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
}
.chunk-block {
    user-select: none;
    height: 60px;
    font-size: 16px;
    padding-right: 16px;
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
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
