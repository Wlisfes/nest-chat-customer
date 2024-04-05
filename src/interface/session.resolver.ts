import * as env from '@/interface/instance.resolver'

export interface SchemaCession extends env.CommonSchema {
    sid: string
    source: 'private' | 'communit'
    creator: env.SchemaUser
    communit: env.SchemaCommunit
    contact: env.SchemaContact
}
