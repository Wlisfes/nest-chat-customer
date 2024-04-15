import * as env from '@/interface/instance.resolver'

export interface SchemaSession extends env.CommonSchema {
    sid: string
    source: 'contact' | 'communit'
    communit: env.SchemaCommunit
    communitId: string
    contact: env.SchemaContact
    contactId: string
}
