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
    sending = 'sending', //发送中
    delivered = 'delivered', //发送成功
    failed = 'failed', //发送失败
    deleted = 'deleted' //删除
}

/**消息表**/
export interface SchemaMessager extends env.CommonSchema {
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
}

/**发送自定义消息**/
export interface BodyCustomizeMessager extends Pick<SchemaMessager, 'sessionId' | 'source'> {
    text?: string
    fileId?: string
}

/**会话消息列表**/
export interface QuerySessionColumnMessager extends Pick<SchemaMessager, 'sessionId'> {
    offset: number
    limit: number
}
