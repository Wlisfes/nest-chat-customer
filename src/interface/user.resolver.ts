import * as env from '@/interface/instance.resolver'

export interface SchemaUser extends env.CommonSchema {
    uid: string
    nickname: string
    avatar: string
    email: string
    password: string
    status: 'enable' | 'disable'
}

export interface BodyUserRegister extends Pick<SchemaUser, 'nickname' | 'email' | 'password'> {
    code: string
}

export interface BodyUserAuthorizer extends Pick<BodyUserRegister, 'email' | 'password' | 'code'> {}

export interface RestUserAuthorizer {
    token: string
    expire: number
}

export interface RestUserResolver extends SchemaUser {}
