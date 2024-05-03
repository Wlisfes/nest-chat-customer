import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**注册账号**/
export function httpUserRegister(data: Omix<{ nickname: string; email: string; password: string; code: string }>) {
    return request<env.NoticeResolver>({
        url: `/user/register`,
        method: 'POST',
        data
    })
}

/**发送注册验证码**/
export function httpUserRegisterSender(data: Omix<{ email: string }>) {
    return request<env.NoticeResolver>({
        url: `/user/register/sender`,
        method: 'POST',
        data
    })
}

/**登录账号**/
export function httpUserAuthorizer(data: Omix<{ email: string; password: string; code: string }>) {
    return request<env.RestUserAuthorizer>({
        url: `/user/authorizer`,
        method: 'POST',
        data
    })
}

/**双因子认证**/
export function httpUserfactor(data: Omix<{ uid: string; code: string }>) {
    return request<env.RestUserAuthorizer>({
        url: `/user/factor/authorizer`,
        method: 'POST',
        data
    })
}

/**发送双因子认证验证码**/
export function httpUserfactorSender(data: Omix<{ uid: string }>) {
    return request<env.RestUserAuthorizer>({
        url: `/user/factor/sender`,
        method: 'POST',
        data
    })
}

/**账号信息**/
export function httpUserResolver() {
    return request<env.RestUserResolver>({
        url: `/user/resolver`,
        method: 'GET'
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
