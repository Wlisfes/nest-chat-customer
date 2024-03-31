import { ref } from 'vue'
import { defineStore } from 'pinia'
import { APP_COMMON, getCookie, setCookie, delCookie } from '@/utils/utils-cookie'

export const useUser = defineStore('user', () => {
    const token = ref<string>(getCookie(APP_COMMON.CHAT_TOKEN, ''))

    return { token }
})
