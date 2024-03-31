import { ref, App } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '@/i18n/messages'
import { APP_COMMON, getCookie, setCookie } from '@/utils/utils-cookie'
export * from '@/i18n/messages'
export * from '@/i18n/i18n-interface'

export const locale = ref<'cn' | 'en'>(getDefaultLocale())
export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    locale: locale.value,
    messages
})

/**获取默认语言**/
export function getDefaultLocale() {
    if (getCookie(APP_COMMON.CHAT_LOCALE)) {
        return getCookie(APP_COMMON.CHAT_LOCALE)
    } else if (['zh', 'zh-CN', 'zh-TW', 'zh-HK'].includes(navigator.language)) {
        return 'cn'
    }
    return 'en'
}

/**切换语言**/
export async function setI18nLocale(value: 'cn' | 'en') {
    return await setCookie(APP_COMMON.CHAT_LOCALE, value).then(() => {
        locale.value = value
        return (i18n.global.locale.value = value)
    })
}

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}

/**错误code转换**/
export function setupNotice(AxiosError: any): string {
    if (typeof AxiosError === 'string') {
        return AxiosError
    }
    //根据请求axios库内置信息判断
    const IsTimeout = /timeout of .+ exceeded/.test(AxiosError?.message)
    if (IsTimeout) {
        /**接口超时**/
        return `网络超时，请稍后在试！`
    }
    return AxiosError.message ?? `系统错误，请稍后在试！`
}
