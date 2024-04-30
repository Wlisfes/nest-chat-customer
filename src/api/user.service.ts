import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**注册账号**/
export function httpUserRegister(data: Omix<env.BodyUserRegister>) {
    return request<env.NoticeResolver>({
        url: `/user/register`,
        method: 'POST',
        data
    })
}

/**登录账号**/
export function httpUserAuthorizer(data: Omix<env.BodyUserAuthorizer>) {
    return request<env.RestUserAuthorizer>({
        url: `/user/authorizer`,
        method: 'POST',
        data
    })
}

/**账号信息**/
export function httpUserResolver(params: Omix = {}) {
    return request<env.RestUserResolver>({
        url: `/user/resolver`,
        method: 'GET',
        params
    })
}

/**用户基础信息更新**/
export function httpUserUpdate(data: Omix<env.BodyUserUpdate>) {
    return request<env.NoticeResolver>({
        url: `/user/update`,
        method: 'POST',
        data
    })
}
