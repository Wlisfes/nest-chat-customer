import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore } from '@/utils/utils-storage'
import { httpUserResolver } from '@/api/instance.service'

export const useUser = defineStore(APP_STORE.STORE_USER, () => {
    const { state, setState } = useState({
        token: getStore(APP_COMMON.CHAT_TOKEN, ''),
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        status: ''
    })

    /**拉取账号信息**/
    async function fetchUserResolver() {
        return await httpUserResolver().then(async ({ data }) => {
            return setState({
                uid: data.uid,
                nickname: data.nickname,
                avatar: data.avatar,
                email: data.email,
                status: data.status
            })
        })
    }

    async function setToken(token: string, expire: number) {
        return await setStore(APP_COMMON.CHAT_TOKEN, token, expire).then(async () => {
            return await setState({ token })
        })
    }

    return { state, ...toRefs(state), setState, setToken, fetchUserResolver }
})
