import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'

export const useChat = defineStore(APP_STORE.STORE_CHAT, () => {
    const { state, setState } = useState({
        current: 'session',
        percentage: 0,
        loading: true,
        online: false
    })

    return { state, ...toRefs(state), setState }
})
