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
export function httpCommunitColumn() {
    return request<env.ColumnResolver<env.SchemaCommunit>>({
        url: `/communit/column`,
        method: 'GET'
    })
}

/**社群列表**/
export function httpCommunitColumnSearch(data: { keyword: string }) {
    return request<env.ColumnResolver<env.SchemaCommunit>>({
        url: `/communit/column/search`,
        method: 'POST',
        data
    })
}

/**社群详情**/
export function httpCommunitResolver(params: { uid: string }) {
    return request<env.SchemaCommunit>({
        url: `/communit/resolver`,
        method: 'GET',
        params
    })
}

/**查看社群详情**/
export function httpCommunitCurrentResolver(params: { uid: string }) {
    return request<env.SchemaCommunit>({
        url: `/communit/current/resolver`,
        method: 'GET',
        params
    })
}
