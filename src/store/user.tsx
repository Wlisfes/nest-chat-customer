import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_COMMON, getStore, setStore, delStore } from '@/utils/utils-storage'
import { httpUserResolver } from '@/api/instance.service'

export const useUser = defineStore('user', () => {
    const { state, setState } = useState({
        token: getStore(APP_COMMON.CHAT_TOKEN, ''),
        uid: '',
        nickname: ''
    })

    /**拉取账号信息**/
    async function fetchUserResolver() {
        return await httpUserResolver().then(async ({ data }) => {
            return setState({
                uid: data.uid,
                nickname: data.nickname
            })
        })
    }

    async function setToken(token: string) {
        return await setStore(APP_COMMON.CHAT_TOKEN, token).then(async () => {
            return await setState({ token })
        })
    }

    return { state, ...toRefs(state), setState, setToken, fetchUserResolver }
})
