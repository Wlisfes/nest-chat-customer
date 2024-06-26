<script lang="tsx">
import { defineComponent, ref, PropType } from 'vue'
import { useUser, useChat, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import { Observer } from '@/utils/utils-observer'
import { stop, divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
import { fetchProfile } from '@/components/layer/layer.instance'

export default defineComponent({
    name: 'ChatCarte',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true },
        setState: { type: Function, required: true },
        profile: { type: Boolean, default: false }
    },
    setup(props) {
        const { state, setState } = useState({ visible: false, switch: false })
        const { inverted, fetchThemeUpdate } = useProvider()
        const { current, setState: setUpdate } = useStore(useChat)
        const { avatar, nickname, email, fetchUserSignout } = useStore(useUser)
        const dataSource = ref([
            { title: '', value: 'session', iconSize: 24, icon: <Iv-BsSession />, select: <Iv-RsSession /> },
            { title: '', value: 'contact', iconSize: 26, icon: <Iv-BsContact />, select: <Iv-BsContact /> },
            { title: '', value: 'communit', iconSize: 24, icon: <Iv-BsSociety />, select: <Iv-RsSociety /> },
            { title: '', value: 'chane', iconSize: 24, icon: <Iv-BsChane />, select: <Iv-RsChane /> },
            { title: '', value: 'dynamic', iconSize: 24, icon: <Iv-BsDynamic />, select: <Iv-RsDynamic /> }
        ])

        function divineCommonStyler(value: string) {
            return divineWherer(value === current.value, {
                '--n-color': 'var(--n-color-hover)',
                '--n-text-color': 'var(--primary-color)',
                '--n-text-color-hover': 'var(--primary-color)',
                '--n-text-color-pressed': 'var(--primary-color)'
            })
        }

        /**用户信息**/
        async function fetchUseProfile() {
            return await fetchClickoutside().then(async () => {
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
            })
        }

        /**登出**/
        async function fetchUseUserSignout() {
            return await fetchClickoutside().then(async () => {
                return await fetchUserSignout()
            })
        }

        /**异步关闭用户信息popover组件**/
        async function fetchClickoutside() {
            return await setState({ visible: false, switch: true }).then(async () => {
                await divineDelay(0)
                return await setState({ switch: false })
            })
        }

        /**异步开启用户信息popover组件**/
        async function fetchOpenCollapse(scope: { evt: MouseEvent }) {
            await stop(scope.evt)
            return await divineHandler(!state.visible && !state.switch, {
                handler: () => setState({ visible: true })
            })
        }

        /**切换左侧组件显示**/
        async function fetchUpdateCurrent(current: string) {
            await setUpdate({ current })
            return await fetchClickoutside()
        }

        return () => (
            <div class="chat-carte n-chunk n-column n-auto n-space">
                <n-space vertical wrap-item={false} size={[0, 14]}>
                    {dataSource.value.map(item => (
                        <common-icon
                            key={item.value}
                            circle
                            size={40}
                            icon-size={item.iconSize ?? 24}
                            component={item.icon}
                            common-style={divineCommonStyler(item.value)}
                            onClick={(evt: Event) => fetchUpdateCurrent(item.value)}
                        ></common-icon>
                    ))}
                </n-space>
                <n-space vertical wrap-item={false} size={[0, 14]}>
                    <common-icon
                        circle
                        size={40}
                        icon-size={22}
                        component={<Iv-RsSettings />}
                        common-style={divineCommonStyler('settings')}
                        onClick={(evt: MouseEvent) => fetchUpdateCurrent('settings')}
                    ></common-icon>
                    <n-popover
                        placement="right-end"
                        trigger="click"
                        style={{ '--n-space': '16px', '--n-padding': '0px' }}
                        width={260}
                        z-index={3000}
                        show-arrow={false}
                        show={state.visible}
                        onClickoutside={fetchClickoutside}
                        v-slots={{
                            trigger: () => (
                                <common-icon
                                    circle
                                    size={48}
                                    icon-size={38}
                                    component={
                                        <n-image
                                            preview-disabled
                                            src={avatar.value}
                                            fallback-src="https://chat-oss.lisfes.cn/chat/image/2161418838745382965.jpeg"
                                        />
                                    }
                                    common-style={divineCommonStyler('resolver')}
                                    onClick={fetchOpenCollapse}
                                ></common-icon>
                            )
                        }}
                    >
                        <n-element class="chat-resolver n-chunk n-column n-disover">
                            <div class="chunk-user n-chunk n-center n-disover n-pointer" onClick={fetchUseProfile}>
                                <chat-avatar size={40} radius={20} icon-size={20} src={avatar.value}></chat-avatar>
                                <div class="n-chunk n-column n-auto">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '22px' }}>
                                        <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '18px' }}>
                                        <n-ellipsis tooltip={false}>{email.value}</n-ellipsis>
                                    </n-text>
                                </div>
                            </div>
                            <div class="n-chunk n-column n-disover" style={{ padding: '10px' }}>
                                <div
                                    class="chunk-block n-chunk n-center n-disover n-pointer"
                                    onClick={(evt: MouseEvent) => fetchUpdateCurrent('settings')}
                                >
                                    <div class="n-chunk n-center n-middle" style={{ width: '40px' }}>
                                        <n-icon size={20} component={<Iv-RsSettings />}></n-icon>
                                    </div>
                                    <div class="n-chunk n-center n-auto n-disover">
                                        <n-text depth={2}>设置</n-text>
                                    </div>
                                </div>
                                <div class="chunk-block n-chunk n-center n-disover n-pointer" onClick={fetchThemeUpdate}>
                                    <div class="n-chunk n-center n-middle" style={{ width: '40px' }}>
                                        {inverted.value ? (
                                            <n-icon size={23} component={<Iv-BsDark />}></n-icon>
                                        ) : (
                                            <n-icon size={24} component={<Iv-BsLight />}></n-icon>
                                        )}
                                    </div>
                                    <div class="n-chunk n-center n-auto n-disover">
                                        <n-text depth={2}>
                                            {inverted.value ? (
                                                <n-ellipsis tooltip={false}>浅色模式</n-ellipsis>
                                            ) : (
                                                <n-ellipsis tooltip={false}>深色模式</n-ellipsis>
                                            )}
                                        </n-text>
                                    </div>
                                </div>
                                <div class="chunk-block n-chunk n-center n-disover n-pointer" onClick={fetchUseUserSignout}>
                                    <div class="n-chunk n-center n-middle" style={{ width: '40px' }}>
                                        <n-icon size={24} color="var(--error-color)" component={<Iv-BsExit />}></n-icon>
                                    </div>
                                    <div class="n-chunk n-center n-auto n-disover">
                                        <n-text depth={2} style={{ color: 'var(--error-color)' }}>
                                            登出
                                        </n-text>
                                    </div>
                                </div>
                            </div>
                        </n-element>
                    </n-popover>
                </n-space>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-carte {
    overflow: hidden;
    padding: 12px 10px 20px 10px;
    background-color: var(--chat-carte-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 1;
    }
    :deep(.n-image),
    :deep(.n-image > img) {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
    }
}

.chat-resolver {
    border-radius: var(--n-border-radius);
    background-color: var(--chat-carte-popover);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    .chunk-user {
        column-gap: 10px;
        padding: 16px;
        user-select: none;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background-color: var(--chat-border-color);
            transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
    .chunk-block {
        user-select: none;
        height: 40px;
        padding-right: 8px;
        border-radius: var(--n-border-radius);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &:hover {
            background-color: var(--divider-color);
        }
    }
}
</style>
