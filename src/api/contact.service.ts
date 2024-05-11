import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**好友列表**/
export function httpContactColumn() {
    return request<env.ColumnResolver<env.SchemaContact>>({
        url: `/contact/column`,
        method: 'GET'
    })
}

/**好友关系详情**/
export function httpContactResolver(params: { uid: string }) {
    return request<env.SchemaContact>({
        url: `/contact/resolver`,
        method: 'GET',
        params
    })
}

/**申请添加好友**/
export function httpContactInviteJoiner(data: { niveId: string; comment: string }) {
    return request<env.ColumnResolver<env.SchemaUser>>({
        url: `/contact/invite/joiner`,
        method: 'POST',
        data
    })
}

/**关键字列表搜索**/
export function httpContactSearch(data: { keyword: string }) {
    return request<env.ColumnResolver<env.SchemaUser>>({
        url: `/contact/column/search`,
        method: 'POST',
        data
    })
}
