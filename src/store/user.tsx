import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_COMMON, getCookie, setCookie, delCookie } from '@/utils/utils-cookie'
import { httpUserResolver } from '@/api/instance.service'

export const useUser = defineStore('user', () => {
    const { state, setState } = useState({
        token: getCookie(APP_COMMON.CHAT_TOKEN, ''),
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

    return { state, ...toRefs(state), setState, fetchUserResolver }
})
