import { defineStore } from 'pinia'
import { APP_COMMON, getCookie, setCookie, delCookie } from '@/utils/utils-cookie'

export const useConfiger = defineStore('configer', {
    persist: true,
    state: () => ({
        loading: true,
        collapsed: false,
        theme: 'light',
        primaryColor: '#24B89E',
        authorize: getCookie(APP_COMMON.CHAT_AUTH_LAYOUT, 'login')
    }),
    actions: {
        async setLoadiner(loading: boolean) {
            return (this.loading = loading)
        },
        async setCollapsed(collapsed: boolean) {
            return (this.collapsed = collapsed)
        },
        async setTheme(theme: 'light' | 'dark') {
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            return (this.primaryColor = primaryColor)
        },
        async setAuthorize(authorize: 'login' | 'register') {
            await setCookie(APP_COMMON.CHAT_AUTH_LAYOUT, authorize)
            return (this.authorize = authorize)
        }
    }
})
