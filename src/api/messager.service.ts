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
