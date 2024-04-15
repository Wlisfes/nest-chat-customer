import * as env from '@/interface/instance.resolver'

export interface SchemaContact extends env.CommonSchema {
    uid: string
    status: 'delete' | 'enable'
    user: env.SchemaUser
    userId: string
    nive: env.SchemaUser
    niveId: string
}
