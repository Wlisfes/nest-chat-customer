import * as env from '@/interface/instance.resolver'

/**消息表: 消息类型**/
export enum EnumMessagerSource {
    text = 'text', //文本
    image = 'image', //图片
    audio = 'audio', //音频
    video = 'video', //视频
    document = 'document' //文档
}

/**消息表: 消息状态**/
export enum EnumMessagerStatus {
    initialize = 'initialize', //初始化
    sending = 'sending', //发送中
    delivered = 'delivered', //发送成功
    failed = 'failed', //发送失败
    deleted = 'deleted' //删除
}

/**消息表: 消息来源**/
export enum EnumMessagerReferrer {
    socket = 'socket',
    http = 'http'
}

/**消息表**/
export interface SchemaMessager extends env.CommonSchema {
    uuid: string
    sid: string
    sessionId: string
    userId: string
    user: env.RestUserResolver
    contactId: string
    communitId: string
    text: string
    source: EnumMessagerSource
    status: EnumMessagerStatus
    reason: string
    medias: Array<env.SchemaMedia>
    reads: Array<{ userId: string }>
}

/**发送自定义消息**/
export interface BodyCustomizeMessager extends Pick<SchemaMessager, 'sessionId' | 'source'> {
    text?: string
    fileId?: string
}

/**发送消息已读操作**/
export interface BodySocketChangeMessager {
    sid: string
    userId: string
    sessionId: string
}

/**会话消息列表**/
export interface QuerySessionColumnMessager extends Pick<SchemaMessager, 'sessionId'> {
    offset: number
    limit: number
}

/**获取消息详情**/
export interface QuerySessionOneMessager extends Pick<SchemaMessager, 'sid'> {}

/**Socket发送自定义消息**/
export interface BodyComposeMessager {
    source: EnumMessagerSource
    text: string
    medias: Array<Omix<Partial<env.SchemaMedia>>>
}
