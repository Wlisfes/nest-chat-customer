import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'

export const useComment = defineStore(APP_STORE.STORE_COMMENT, () => {
    const { state, setState } = useState({
        message: '',
        loading: false
    })

    /**发送自定义消息**/
    async function fetchSocketCustomizeMessager() {}

    return { state, ...toRefs(state), setState, fetchSocketCustomizeMessager }
})
