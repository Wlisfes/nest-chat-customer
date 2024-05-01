import * as env from '@/interface/instance.resolver'

/**用户表: 状态**/
export enum EnumUserStatus {
    disable = 'disable',
    enable = 'enable'
}
/**用户表: 主题**/
export enum EnumUserTheme {
    light = 'light',
    dark = 'dark'
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
    theme: EnumUserTheme
    color: { light: string; dark: string }
    paint: boolean
    sound: boolean
    notify: boolean
}

/**注册账号**/
export interface BodyUserRegister {
    nickname: string
    email: string
    password: string
    code: string
}

/**登录账号**/
export interface BodyUserAuthorizer {
    email: string
    password: string
    code: string
}

/**登录账号返回值**/
export interface RestUserAuthorizer {
    token: string
    expire: number
}

/**账号信息**/
export interface RestUserResolver extends SchemaUser {}

/**用户基础信息更新**/
export interface BodyUserUpdate {
    nickname?: string
    comment?: string
    fileId?: string
    theme?: EnumUserTheme
    color?: number
    paint?: boolean
    sound?: boolean
    notify?: boolean
}
