import JSCookie from 'js-cookie'

export enum APP_COMMON {
    /**语言存储键**/
    CHAT_LOCALE = 'APP_CHAT_LOCALE',
    /**token存储键**/
    CHAT_TOKEN = 'APP_CHAT_TOKEN',
    /**授权页面缓存标识存储键**/
    CHAT_AUTH_LAYOUT = 'APP_CHAT_AUTH_LAYOUT'
}

export function getCookie<T = any>(key: string): T {
    return JSCookie.get(key) as T
}

export async function setCookie(key: string, data: any, opts?: typeof JSCookie.attributes) {
    return JSCookie.set(key, data, opts)
}

export async function delCookie(key: string, opts?: typeof JSCookie.attributes) {
    return JSCookie.remove(key, opts)
}
