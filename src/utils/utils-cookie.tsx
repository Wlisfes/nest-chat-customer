import JSCookie from 'js-cookie'

export enum APP_COMMON {
    /**语言存储键**/
    CONST_LOCALE = 'APP_COMMON_LOCALE'
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
