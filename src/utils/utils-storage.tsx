export enum APP_COMMON {
    /**语言存储键**/
    CHAT_LOCALE = 'APP_CHAT_LOCALE',
    /**token存储键**/
    CHAT_TOKEN = 'APP_CHAT_TOKEN'
}

export function getStore<T = any>(key: string, defaultValue?: T): T {
    const jsonStr = window.localStorage.getItem(key)
    if (jsonStr) {
        const { expire, value } = JSON.parse(window.atob(jsonStr))
        if (expire === 0 || expire > Date.now()) {
            return JSON.parse(value)
        }
        window.localStorage.removeItem(key)
    }
    return defaultValue as T
}

export async function setStore(key: string, data: any, expire: number = 0) {
    if (expire && expire > 0) {
        const jsonStr = JSON.stringify({ value: JSON.stringify(data), expire: Date.now() + expire })
        return window.localStorage.setItem(key, window.btoa(jsonStr))
    }
    const jsonStr = JSON.stringify({ value: JSON.stringify(data), expire: 0 })
    return window.localStorage.setItem(key, window.btoa(jsonStr))
}

export async function delStore(key: string) {
    window.localStorage.removeItem(key)
}
