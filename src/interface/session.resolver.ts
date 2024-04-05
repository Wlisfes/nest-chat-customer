import * as env from '@/interface/instance.resolver'

export interface SchemaCession extends env.CommonSchema {
    sid: string
    source: 'private' | 'communit'
    communit: env.SchemaCommunit
    members: Array<env.SchemaUser>
}
