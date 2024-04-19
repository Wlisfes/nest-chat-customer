import * as env from '@/interface/instance.resolver'

/**自定义错误类型**/
export interface CustomizeError<T> extends Error {
    data: Omix<T & { message: string; status: number }>
}
