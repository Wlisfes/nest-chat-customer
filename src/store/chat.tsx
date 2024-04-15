import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore } from '@/utils/utils-storage'
import * as http from '@/api/instance.service'

export const useChat = defineStore(APP_STORE.STORE_CHAT, () => {
    const { state, setState } = useState({})

    return { state, ...toRefs(state) }
})
