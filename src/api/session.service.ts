import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**会话列表**/
export function httpSessionColumner() {
    return request<env.ColumnResolver<env.SchemaCession>>({
        url: `/session/columner`,
        method: 'GET'
    })
}
