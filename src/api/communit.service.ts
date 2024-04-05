import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**新建社群**/
export function httpCommunitCreater(data: Omix<env.BodyCommunitCreater>) {
    return request<env.NoticeResolver>({
        url: `/communit/creater`,
        method: 'POST',
        data
    })
}

/**社群列表**/
export function httpCommunitColumner() {
    return request<env.ColumnResolver<env.SchemaCommunit>>({
        url: `/communit/columner`,
        method: 'GET'
    })
}
