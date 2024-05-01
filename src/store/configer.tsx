import { defineStore } from 'pinia'
import { APP_STORE } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'

export const useConfiger = defineStore(APP_STORE.STORE_CONFIGER, {
    persist: true,
    state: () => ({
        theme: env.EnumUserTheme.light,
        primaryColor: '#24B89E',
        authorize: 'login'
    }),
    actions: {
        async setTheme(theme: env.EnumUserTheme) {
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
