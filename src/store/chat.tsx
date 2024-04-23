import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'

export const useChat = defineStore(APP_STORE.STORE_CHAT, () => {
    const { state, setState } = useState({
        current: 'session',
        loading: true,
        failure: false,
        width: 1600
    })

    return { state, ...toRefs(state), setState }
})
