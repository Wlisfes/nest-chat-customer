<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useConfiger, useUser, useChat } from '@/store'
import { useState } from '@/hooks/hook-state'
import { stop, divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
import { divineDiscover } from '@/utils/utils-component'

export default defineComponent({
    name: 'ChatCarte',
    setup() {
        const { state, setState } = useState({ visible: false, switch: false })
        const configer = useConfiger()
        const chat = useChat()
        const user = useUser()
        const dataSource = ref([
            { title: '', value: 'session', icon: <Iv-BsSession />, select: <Iv-RsSession /> },
            { title: '', value: 'society', icon: <Iv-BsSociety />, select: <Iv-RsSociety /> },
            { title: '', value: 'chane', icon: <Iv-BsChane />, select: <Iv-RsChane /> },
            { title: '', value: 'dynamic', icon: <Iv-BsDynamic />, select: <Iv-RsDynamic /> }
        ])

        function divineCommonStyleWherer(value: string) {
            return divineWherer(value === chat.current, { '--n-color': 'var(--n-color-hover)' }, {})
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
            await chat.setState({ current })
            return await fetchClickoutside()
        }

        /**切换主题模式**/
        async function fetchUpdateTheme() {
            return await divineHandler(configer.theme === 'light', {
                handler: () => configer.setTheme('dark'),
                failure: () => configer.setTheme('light')
            })
        }

        /**登出**/
        async function fetchSignout() {
            return await divineDiscover({
                icon: 'BsMistake',
                title: '确定要登出吗？',
                negativeText: '取消',
                positiveText: '确定登出',
                content: `登出后会中断连接、并且无法接收和发送消息。`,
                onAfterEnter: fetchClickoutside,
                onPositiveClick: async (evt, vm, done) => {
                    await done(true)
                    await divineDelay(500)
                    return await user.fetchReset().then(async () => {
                        await chat.setState({ current: 'session' })
                        return true
                    })
                }
            })
        }

        return () => (
            <div class="chat-carte n-chunk n-column n-auto n-space">
                <n-space vertical wrap-item={false} size={[0, 14]}>
                    {dataSource.value.map(item => (
                        <common-icon
                            key={item.value}
                            circle
                            size={40}
                            icon-size={24}
                            component={item.icon}
                            common-style={divineCommonStyleWherer(item.value)}
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
                        common-style={divineCommonStyleWherer('settings')}
                        onClick={(evt: MouseEvent) => fetchUpdateCurrent('settings')}
                    ></common-icon>
                    <n-popover
                        placement="right-end"
                        trigger="click"
                        style={{ '--n-space': '16px', '--n-padding': '0px' }}
                        width={260}
                        show-arrow={false}
                        show={state.visible}
                        onClickoutside={fetchClickoutside}
                        v-slots={{
                            trigger: () => (
                                <common-icon
                                    circle
                                    size={40}
                                    icon-size={30}
                                    component={<n-image preview-disabled src={user.avatar} />}
                                    common-style={divineCommonStyleWherer('resolver')}
                                    onClick={fetchOpenCollapse}
                                ></common-icon>
                            )
                        }}
                    >
                        <n-element class="chat-resolver n-chunk n-column n-disover">
                            <div class="chunk-user n-chunk n-center n-disover">
                                <chat-avatar size={40} radius={20} src={user.avatar}></chat-avatar>
                                <div class="n-chunk n-column n-auto">
                                    <n-text depth={1} style={{ fontSize: '16px', lineHeight: '22px' }}>
                                        <n-ellipsis tooltip={false}>{user.nickname}</n-ellipsis>
                                    </n-text>
                                    <n-text depth={3} style={{ lineHeight: '18px' }}>
                                        <n-ellipsis tooltip={false}>{user.email}</n-ellipsis>
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
                                <div class="chunk-block n-chunk n-center n-disover n-pointer" onClick={fetchUpdateTheme}>
                                    <div class="n-chunk n-center n-middle" style={{ width: '40px' }}>
                                        {configer.theme === 'light' ? (
                                            <n-icon size={24} component={<Iv-BsLight />}></n-icon>
                                        ) : (
                                            <n-icon size={22} component={<Iv-BsDark />}></n-icon>
                                        )}
                                    </div>
                                    <div class="n-chunk n-center n-auto n-disover">
                                        {configer.theme === 'light' ? (
                                            <n-text depth={2}>深色模式</n-text>
                                        ) : (
                                            <n-text depth={2}>浅色模式</n-text>
                                        )}
                                    </div>
                                </div>
                                <div class="chunk-block n-chunk n-center n-disover n-pointer" onClick={fetchSignout}>
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
        border-right: 1px solid var(--chat-border-color);
        transition: border-right 0.3s var(--cubic-bezier-ease-in-out);
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
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-top: 1px solid var(--chat-border-color);
            transition: border-top 0.3s var(--cubic-bezier-ease-in-out);
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
