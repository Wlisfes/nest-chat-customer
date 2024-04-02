import { defineStore } from 'pinia'
import { APP_STORE } from '@/utils/utils-storage'

export const useConfiger = defineStore(APP_STORE.STORE_CONFIGER, {
    persist: true,
    state: () => ({
        theme: 'light',
        primaryColor: '#24B89E',
        authorize: 'login'
    }),
    actions: {
        async setTheme(theme: 'light' | 'dark') {
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            return (this.primaryColor = primaryColor)
        },
        async setAuthorize(authorize: 'login' | 'register') {
            return (this.authorize = authorize)
        }
    }
})
