export function prevent(evt: Event, handler?: Function) {
    evt.preventDefault()
    return handler?.(evt)
}

export function stop(evt: Event, handler?: Function) {
    evt.preventDefault()
    evt.stopPropagation()
    return handler?.(evt)
}

/**回车事件**/
export function enter(e: KeyboardEvent, handler?: Function) {
    if (e.key === 'Enter') {
        typeof handler === 'function' && handler()
    }
}

/**根据条件返回不同参数**/
export function divineWherer<T>(where: boolean, value: T, defaultValue?: T): T {
    return (where ? value : defaultValue) as T
}

/**延时方法**/
export function divineDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

/**条件函数执行**/
export async function divineHandler<T>(
    where: boolean | Function,
    scope: Omix<{ handler: Function; failure?: Function }>
): Promise<T | void> {
    if (typeof where === 'function') {
        where = await where()
    }
    if (where) {
        return await scope.handler()
    } else {
        return (await scope.failure?.()) ?? undefined
    }
}

/**参数组合函数**/
export async function divineParameter<T>(data: T) {
    return data
}

/**字节转换文字输出**/
export function divineBytefor(byte: number, dec: number = 2) {
    if (byte === 0) return 'Byte'
    const k = 1024
    const dm = dec < 0 ? 0 : dec
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(byte) / Math.log(k))
    return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}
