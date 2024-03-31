export function prevent(evt: Event, handler?: Function) {
    evt.preventDefault()
    return handler?.(evt)
}

export function stop(evt: Event, handler?: Function) {
    evt.preventDefault()
    evt.stopPropagation()
    return handler?.(evt)
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
export async function divineHandler<T>(value: boolean | Function, handler: Function, callback?: Function): Promise<T | void> {
    if ((typeof value === 'boolean' && value) || (typeof value === 'function' && (await value()))) {
        return await handler()
    } else if (typeof callback === 'function') {
        return await callback()
    }
    return undefined
}

/**参数组合函数**/
export async function divineParameter<T>(data: T) {
    return data
}
