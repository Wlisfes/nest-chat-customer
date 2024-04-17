import * as env from '@/interface/instance.resolver'

/**用户表: 状态**/
export enum EnumUserStatus {
    disable = 'disable',
    enable = 'enable'
}

/**用户表**/
export interface SchemaUser extends env.CommonSchema {
    uid: string
    status: EnumUserStatus
    nickname: string
    avatar: string
    email: string
    comment: string
    password: string
}

/**注册账号**/
export interface BodyUserRegister extends Pick<SchemaUser, 'nickname' | 'email' | 'password'> {
    code: string
}

/**登录账号**/
export interface BodyUserAuthorizer extends Pick<BodyUserRegister, 'email' | 'password' | 'code'> {}

/**登录账号返回值**/
export interface RestUserAuthorizer {
    token: string
    expire: number
}

/**账号信息**/
export interface RestUserResolver extends SchemaUser {}
