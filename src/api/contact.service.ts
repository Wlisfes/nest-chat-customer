import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**好友关系详情**/
export function httpContactResolver(params: { uid: string }) {
    return request<env.SchemaContact>({
        url: `/contact/resolver`,
        method: 'GET',
        params
    })
}
