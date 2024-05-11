import * as env from '@/interface/instance.resolver'

/**通知记录表: 通知类型**/
export enum EnumNotificationSource {
    contact = 'contact',
    communit = 'communit'
}

/**通知记录表: 通知状态**/
export enum EnumNotificationStatus {
    waitze = 'waitze',
    resolve = 'resolve',
    reject = 'reject'
}

/**通知记录表**/
export interface SchemaNotification extends env.CommonSchema {
    uid: string
    userId: string
    niveId: string
    command: Array<string>
    json: Omix<{ [key in string]: Omix<{ uid: string; comment: string; date: number }> }>
    communitId: string
    communit: env.SchemaCommunit
    user: env.SchemaUser
    nive: env.SchemaUser
    source: EnumNotificationSource
    status: EnumNotificationStatus
}
