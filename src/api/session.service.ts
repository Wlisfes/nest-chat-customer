import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**会话列表**/
export function httpSessionColumn() {
    return request<env.ColumnResolver<env.SchemaSession>>({
        url: `/session/column`,
        method: 'GET'
    })
}

/**会话详情**/
export function httpSessionOneResolver(params: Omix<{ sid: string }>) {
    return request<env.SchemaMessager>({
        url: `/session/resolver`,
        method: 'GET',
        params
    })
}
