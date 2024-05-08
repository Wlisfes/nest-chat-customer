import { isNotEmpty } from 'class-validator'

export enum APP_STORE {
    STORE_CONFIGER = 'APP_STORE_CONFIGER',
    STORE_USER = 'APP_STORE_USER',
    STORE_CHAT = 'APP_STORE_CHAT',
    STORE_SESSION = 'APP_STORE_SESSION',
    STORE_COMMUNIT = 'APP_STORE_COMMUNIT',
    STORE_MESSANGER = 'APP_STORE_MESSANGER',
    STORE_COMMENT = 'APP_STORE_COMMENT',
    STORE_NOTIFICATION = 'APP_STORE_NOTIFICATION'
}
export enum APP_COMMON {
    /**语言存储键**/
    CHAT_LOCALE = 'APP_COMMON_CHAT_LOCALE',
    /**token存储键**/
    CHAT_TOKEN = 'APP_COMMON_CHAT_TOKEN'
}

export function getStore<T = any>(key: string, defaultValue?: T): T {
    try {
        const jsonStr = window.localStorage.getItem(key)
        if (jsonStr) {
            const { expire, value } = JSON.parse(jsonStr)
            if ((expire === 0 || expire > Date.now()) && isNotEmpty(value)) {
                return JSON.parse(value)
            }
            window.localStorage.removeItem(key)
        }
        return defaultValue as T
    } catch (err) {
        return defaultValue as T
    }
}

export async function setStore(key: string, data: any, expire: number = 0) {
    if (expire && expire > 0) {
        const jsonStr = JSON.stringify({ value: JSON.stringify(data), expire: Date.now() + expire })
        return window.localStorage.setItem(key, jsonStr)
    }
    const jsonStr = JSON.stringify({ value: JSON.stringify(data), expire: 0 })
    return window.localStorage.setItem(key, jsonStr)
}

export async function delStore(key: string) {
    window.localStorage.removeItem(key)
}
