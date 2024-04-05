import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore } from '@/utils/utils-storage'
import * as http from '@/api/instance.service'

export const useChat = defineStore(APP_STORE.STORE_CHAT, () => {
    const { state, setState } = useState({
        dataCommunit: [],
        dataSession: []
    })

    /**会话列表**/
    async function fetchSessionColumner() {
        try {
            const { data } = await http.httpSessionColumner()

            console.log(data)
        } catch (e) {}
    }

    return { state, ...toRefs(state), fetchSessionColumner }
})
