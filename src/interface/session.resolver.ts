import * as env from '@/interface/instance.resolver'

/**会话记录表: 会话类型**/
export enum EnumSessionSource {
    contact = 'contact',
    communit = 'communit'
}

/**会话记录表**/
export interface SchemaSession extends env.CommonSchema {
    sid: string
    source: EnumSessionSource
    communit: env.SchemaCommunit
    communitId: string
    contact: env.SchemaContact
    contactId: string
}
