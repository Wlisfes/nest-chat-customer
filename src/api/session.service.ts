import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**会话列表**/
export function httpSessionColumn() {
    return request<env.ColumnResolver<env.SchemaCession>>({
        url: `/session/column`,
        method: 'GET'
    })
}
