import { defineStore } from 'pinia'

export const useConfiger = defineStore('configer', {
    persist: true,
    state: () => ({
        loading: true,
        collapsed: false,
        theme: 'light',
        primaryColor: '#24B89E',
        authorize: 'login'
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
            return (this.authorize = authorize)
        }
    }
})
