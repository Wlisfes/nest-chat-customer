/**验证参数是否为空**/
export function isEmpty(value: any) {
    return ['', null, undefined].includes(value)
}

/**验证参数是否不为空**/
export function isNotEmpty(value: any) {
    return !isEmpty(value)
}

/**根据条件返回不同参数**/
export function divineWherer<T>(where: boolean, value: T, defaultValue?: T): T {
    return (where ? value : defaultValue) as T
}
