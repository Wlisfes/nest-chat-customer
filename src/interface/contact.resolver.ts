import * as env from '@/interface/instance.resolver'

export interface SchemaContact extends env.CommonSchema {
    uid: string
    status: 'delete' | 'enable'
    sender: env.SchemaUser
    receive: env.SchemaUser
}
