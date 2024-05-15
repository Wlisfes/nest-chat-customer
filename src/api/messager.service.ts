import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**会话消息列表**/
export function httpSessionColumnMessager(params: env.QuerySessionColumnMessager) {
    return request<env.ColumnResolver<env.SchemaMessager>>({
        url: `/messager/session/column`,
        method: 'GET',
        params
    })
}

/**获取记录详情**/
export function httpSessionOneMessager(params: env.QuerySessionOneMessager) {
    return request<env.SchemaMessager>({
        url: `/messager/session/resolver`,
        method: 'GET',
        params
    })
}

/**发送自定义消息**/
export function httpSessionCustomizeMessager(data: env.BodySessionCustomizeMessager) {
    return request<Omix<env.NoticeResolver & { sid: string }>>({
        url: `/messager/customize/transmitter`,
        method: 'POST',
        data
    })
}
