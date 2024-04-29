import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useChat } from '@/store'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore, delStore } from '@/utils/utils-storage'
import { divineHandler, divineDelay } from '@/utils/utils-common'
import { divineDiscover } from '@/utils/utils-component'
import * as api from '@/api/instance.service'

export const useUser = defineStore(APP_STORE.STORE_USER, () => {
    const chat = useChat()
    const { state, setState } = useState({
        token: getStore(APP_COMMON.CHAT_TOKEN, ''),
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        status: '',
        comment: ''
    })

    /**拉取账号信息**/
    async function fetchUserResolver() {
        return await api.httpUserResolver().then(async ({ data }) => {
            return setState({
                uid: data.uid,
                nickname: data.nickname,
                avatar: data.avatar,
                email: data.email,
                status: data.status,
                comment: data.comment
            })
        })
    }

    /**重置store**/
    async function fetchReset() {
        await delStore(APP_COMMON.CHAT_TOKEN)
        return await setState({ token: '', uid: '', nickname: '', avatar: '', email: '', status: '', comment: '' })
    }

    /**存储token**/
    async function setToken(token: string, expire: number) {
        return await setStore(APP_COMMON.CHAT_TOKEN, token, expire).then(async () => {
            return await setState({ token })
        })
    }

    /**退出登录**/
    async function fetchUserSignout(scope?: { onAfterEnter?: Function; onPositiveClick?: Function }) {
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
                    return await chat.setState({ current: 'session' }).then(() => {
                        return true
                    })
                })
            }
        })
    }

    return { state, ...toRefs(state), setState, setToken, fetchReset, fetchUserResolver, fetchUserSignout }
})
