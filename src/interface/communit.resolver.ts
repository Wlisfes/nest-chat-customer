import * as env from '@/interface/instance.resolver'

/**社群记录表: 社群状态**/
export enum EnumCommunitStatus {
    enable = 'enable',
    dissolve = 'dissolve'
}

/**社群成员表: 社群成员状态**/
export enum EnumCommunitMemberStatus {
    enable = 'enable',
    quit = 'quit',
    kick = 'kick'
}

/**社群成员表: 社群成员角色**/
export enum EnumCommunitMemberRole {
    master = 'master',
    manager = 'manager',
    masses = 'masses'
}

/**社群成员表**/
export interface SchemaCommunitMember extends env.CommonSchema {
    communitId: string
    userId: string
    speak: boolean
    status: EnumCommunitMemberStatus
    role: EnumCommunitMemberRole
    user: env.SchemaUser
}

/**社群记录表**/
export interface SchemaCommunit extends env.CommonSchema {
    uid: string
    name: string
    poster: env.SchemaMedia
    ownId: string
    status: EnumCommunitStatus
    comment: string
    speak: boolean
    member: Array<SchemaCommunitMember>
}

/**新建社群**/
export interface BodyCommunitCreater {
    name: string
    comment: string
    poster: string
}
