import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**通知列表**/
export function httpNotificationColumn() {
    return request<env.ColumnResolver<env.SchemaNotification>>({
        url: `/notification/column`,
        method: 'GET'
    })
}
