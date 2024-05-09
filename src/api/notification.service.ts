import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**通知列表**/
export function httpNotificationColumn() {
    return request<env.ColumnResolver<env.SchemaNotification>>({
        url: `/notification/column`,
        method: 'GET'
    })
}

/**更新通知状态**/
export function httpNotificationUpdate(data: { uid: string; status: env.EnumNotificationStatus }) {
    return request<env.NoticeResolver>({
        url: `/notification/update`,
        method: 'POST',
        data
    })
}
