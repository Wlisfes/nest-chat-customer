import { defineStore } from 'pinia'
import { APP_STORE } from '@/utils/utils-storage'
import { httpCommonWallpaper } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export const useConfiger = defineStore(APP_STORE.STORE_CONFIGER, {
    persist: true,
    state: () => ({
        theme: env.EnumUserTheme.light,
        primaryColor: '#24B89E',
        authorize: 'login',
        wallpaper: [] as Array<env.RestCommonWallpaper>
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
        },
        /**颜色背景列表**/
        async fetchCommonWallpaper() {
            try {
                return await httpCommonWallpaper().then(({ data }) => {
                    return (this.wallpaper = data.list)
                })
            } catch (e) {
                return (this.wallpaper = [])
            }
        }
    }
})
