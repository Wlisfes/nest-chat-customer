import * as env from '@/interface/instance.resolver'

/**好友记录表: 好友状态**/
export enum EnumContactStatus {
    delete = 'delete',
    enable = 'enable'
}

/**好友记录表**/
export interface SchemaContact extends env.CommonSchema {
    uid: string
    status: EnumContactStatus
    user: env.SchemaUser
    userId: string
    nive: env.SchemaUser
    niveId: string
}
