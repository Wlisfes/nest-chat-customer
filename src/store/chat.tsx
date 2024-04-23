import { toRefs, computed } from 'vue'
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

    const mobile = computed(() => state.width < 860)

    return { state, mobile, ...toRefs(state), setState }
})
