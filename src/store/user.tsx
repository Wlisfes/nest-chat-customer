import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useChat, useMessenger, useSession, useComment, useConfiger } from '@/store'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore, delStore } from '@/utils/utils-storage'
import { divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
import { divineDiscover, divineNotice } from '@/utils/utils-component'
import { httpUserResolver, httpUserUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

/**初始化user store字段**/
export function initState(state: Omix<Partial<env.SchemaUser>> = {}) {
    return {
        token: getStore(APP_COMMON.CHAT_TOKEN, ''),
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        status: '',
        comment: '',
        light: '#efeae2',
        dark: '#0c141a',
        waid: '2163890933907652608',
        paint: true,
        sound: true,
        notify: true,
        factor: true,
        limit: 7,
        ...state
    }
}

export const useUser = defineStore(APP_STORE.STORE_USER, () => {
    const configer = useConfiger()
    const chat = useChat()
    const session = useSession()
    const message = useMessenger()
    const comment = useComment()
    const { state, setState } = useState(initState())

    /**拉取账号信息**/
    async function fetchUserResolver() {
        return await httpUserResolver().then(async ({ data }) => {
            await configer.setTheme(data.theme)
            return await setState({
                uid: data.uid,
                nickname: data.nickname,
                avatar: data.avatar,
                email: data.email,
                status: data.status,
                comment: data.comment,
                light: data.color.light,
                dark: data.color.dark,
                waid: data.color.waid,
                paint: data.paint,
                sound: data.sound,
                notify: data.notify,
                factor: data.factor,
                limit: data.limit
            })
        })
    }

    /**重置store**/
    async function fetchReset() {
        await delStore(APP_COMMON.CHAT_TOKEN)
        return await setState(initState())
    }

    /**存储token**/
    async function setToken(token: string, expire: number) {
        return await setStore(APP_COMMON.CHAT_TOKEN, token, expire).then(async () => {
            return await setState({ token })
        })
    }

    /**切换主题模式**/
    async function fetchThemeUpdate(scope: Omix<{ message?: string; notice?: boolean }> = {}, done: Function = Function) {
        try {
            const theme = divineWherer(configer.theme === 'light', env.EnumUserTheme.dark, env.EnumUserTheme.light)
            await configer.setTheme(theme)
            return await httpUserUpdate({ theme }).then(async ({ message }) => {
                await divineHandler(Boolean(scope.notice), {
                    handler: async () => {
                        return await divineNotice({ type: 'success', title: scope.message ?? message })
                    }
                })
                return await divineHandler(Boolean(done), {
                    handler: done
                })
            })
        } catch (e) {
            return await divineNotice({ type: 'error', title: e.message })
        }
    }

    /**更新基础信息**/
    async function fetchUserUpdate(
        scope: env.BodyUserUpdate,
        option: Omix<{ refresh?: boolean; message?: string; notice?: boolean }> = {},
        done: Function = Function
    ) {
        try {
            return await httpUserUpdate(scope).then(async ({ message }) => {
                await divineHandler(Boolean(option.refresh), {
                    handler: fetchUserResolver
                })
                await divineHandler(Boolean(option.notice), {
                    handler: async () => {
                        return await divineNotice({ type: 'success', title: option.message ?? message })
                    }
                })
                return await divineHandler(Boolean(done), {
                    handler: done
                })
            })
        } catch (e) {
            await divineNotice({ type: 'error', title: e.message })
            return await divineHandler(Boolean(done), {
                handler: done
            })
        }
    }

    /**退出登录**/
    async function fetchUserSignout(scope?: Omix<{ onAfterEnter?: Function; onPositiveClick?: Function }>) {
        return await divineDiscover({
            icon: 'BsMistake',
            title: '确定要登出吗？',
            negativeText: '取消',
            positiveText: '确定登出',
            content: `登出后会中断连接、并且无法接收和发送消息。`,
            onAfterEnter: async () => {
                return await divineHandler(Boolean(scope?.onAfterEnter), {
                    handler: () => scope!.onAfterEnter!()
                })
            },
            onPositiveClick: async (evt, vm, done) => {
                await done(true)
                await divineDelay(500)
                return await fetchReset().then(async () => {
                    await scope?.onPositiveClick?.()
                    await comment.setState({ message: '' })
                    await session.setState({ sid: '', dataSource: [], total: 0 })
                    await message.setState({ sid: '', dataSource: [], total: 0, limit: 30, distance: 0 })
                    return await chat.setState({ current: 'session', loading: true, online: false }).then(() => {
                        return true
                    })
                })
            }
        })
    }

    return {
        state,
        ...toRefs(state),
        setState,
        setToken,
        fetchReset,
        fetchUserResolver,
        fetchThemeUpdate,
        fetchUserUpdate,
        fetchUserSignout
    }
})
